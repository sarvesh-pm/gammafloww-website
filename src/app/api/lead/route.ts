import { NextResponse } from "next/server";
import crypto from "node:crypto";

// Receives a demo-request lead from the modal form and appends it to a Google
// Sheet via the Sheets API, authenticated as a service account (no public
// endpoint). Optional Resend email as a secondary. No SDK deps. Runs
// per-request so secrets are read at runtime.
export const dynamic = "force-dynamic";

const REGIONS = new Set([
  "United Arab Emirates", "European Union", "United Kingdom", "Asia-Pacific",
  "Latin America", "Africa", "North America", "Other",
]);
const TIMEFRAMES = new Set([
  "As soon as possible", "1–3 months", "3–6 months", "6+ months", "Just exploring",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Free/personal email providers — accepted, but flagged so sales can tell a
// business contact from a personal one at a glance.
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.in", "outlook.com",
  "hotmail.com", "live.com", "msn.com", "icloud.com", "me.com", "aol.com",
  "proton.me", "protonmail.com", "gmx.com", "mail.com", "yandex.com", "zoho.com",
]);
const isPersonalEmail = (email: string) =>
  FREE_EMAIL_DOMAINS.has(email.split("@")[1]?.toLowerCase() ?? "");

type Lead = {
  name: string;
  email: string;
  company: string;
  region: string;
  timeframe: string;
  message: string;
  at: string;
};

const b64url = (input: Buffer | string) =>
  Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

// Mint a short-lived Google OAuth access token from the service account's
// private key (signed JWT bearer flow — no googleapis dependency).
async function googleAccessToken(): Promise<string | null> {
  const email = process.env.GOOGLE_SA_EMAIL;
  const rawKey = process.env.GOOGLE_SA_PRIVATE_KEY;
  if (!email || !rawKey) return null;
  const key = rawKey.replace(/\\n/g, "\n"); // env vars store the key with escaped newlines

  const now = Math.floor(Date.now() / 1000);
  const claim: Record<string, unknown> = {
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  // Domain-wide delegation: impersonate a pi42.com user if configured (used when
  // the org blocks sharing files directly with the service account).
  if (process.env.GOOGLE_SA_SUBJECT) claim.sub = process.env.GOOGLE_SA_SUBJECT;

  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = b64url(JSON.stringify(claim));
  const signature = b64url(crypto.sign("RSA-SHA256", Buffer.from(`${header}.${payload}`), key));
  const assertion = `${header}.${payload}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) {
    console.error("[lead] google token failed", res.status, await res.text().catch(() => ""));
    return null;
  }
  const json = await res.json();
  return typeof json.access_token === "string" ? json.access_token : null;
}

// Append the lead as a row to the pi42.com sheet via the Sheets API.
async function toSheetsApi(lead: Lead): Promise<boolean> {
  const sheetId = process.env.LEAD_SHEET_ID;
  if (!sheetId) return false;
  try {
    const token = await googleAccessToken();
    if (!token) return false;
    const range = encodeURIComponent("Leads!A1");
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        values: [[lead.at, lead.name, lead.email, lead.company, lead.region, lead.timeframe, lead.message]],
      }),
    });
    if (!res.ok) console.error("[lead] sheets append failed", res.status, await res.text().catch(() => ""));
    return res.ok;
  } catch (e) {
    console.error("[lead] sheets error", e);
    return false;
  }
}

// Optional secondary: email the lead via Resend, if configured.
async function toEmail(lead: Lead): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!apiKey || !to || !from) return false;

  const personal = isPersonalEmail(lead.email);
  const rows: [string, string][] = [
    ["Name", lead.name], ["Email", lead.email], ["Email type", personal ? "Personal" : "Business"],
    ["Company", lead.company], ["Region", lead.region || "—"],
    ["Timeframe", lead.timeframe || "—"], ["Message", lead.message || "—"],
  ];
  const esc = (s: string) => s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]!));
  const html = `<h2>New demo request</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${esc(v)}</td></tr>`)
    .join("")}</table>`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: lead.email, subject: `Demo request${personal ? " · personal email" : ""} — ${lead.company}`, html, text: rows.map(([k, v]) => `${k}: ${v}`).join("\n") }),
    });
    if (!res.ok) console.error("[lead] resend failed", res.status, await res.text().catch(() => ""));
    return res.ok;
  } catch (e) {
    console.error("[lead] resend error", e);
    return false;
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad-request" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Silently accept + drop.
  if (clip(body.company_site, 200)) return NextResponse.json({ ok: true, delivered: false });

  const name = clip(body.name, 120);
  const email = clip(body.email, 200);
  const company = clip(body.company, 160);
  const region = clip(body.region, 60);
  const timeframe = clip(body.timeframe, 60);
  const message = clip(body.message, 2000);

  if (!name || !company || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const lead: Lead = {
    name, email, company,
    region: REGIONS.has(region) ? region : "",
    timeframe: TIMEFRAMES.has(timeframe) ? timeframe : "",
    message,
    at: new Date().toISOString(),
  };

  // Fire configured destinations; delivered = at least one succeeded. Never
  // block the visitor's booking on a storage hiccup.
  const [sheet, email_] = await Promise.all([toSheetsApi(lead), toEmail(lead)]);
  if (!sheet && !email_) {
    console.warn("[lead] no destination configured (LEAD_SHEET_ID / RESEND_API_KEY)");
  }
  return NextResponse.json({ ok: true, delivered: sheet || email_, stored: { sheet, email: email_ } });
}
