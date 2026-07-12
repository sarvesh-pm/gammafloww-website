import { NextResponse } from "next/server";

// Receives a demo-request lead from the modal form and forwards it to a Google
// Sheet (via an Apps Script web app) and/or an email inbox (via Resend). No SDK
// deps — same server-fetch pattern as /api/market. Runs per-request so secrets
// are read at runtime.
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

type Lead = {
  name: string;
  email: string;
  company: string;
  region: string;
  timeframe: string;
  message: string;
  at: string;
};

// Append the lead as a row in the Google Sheet behind LEAD_SHEET_WEBHOOK
// (a deployed Apps Script web app). Optional shared secret guards the endpoint.
async function toSheet(lead: Lead): Promise<boolean> {
  const url = process.env.LEAD_SHEET_WEBHOOK;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, secret: process.env.LEAD_SHEET_SECRET ?? "" }),
      redirect: "follow",
    });
    return res.ok;
  } catch (e) {
    console.error("[lead] sheet append failed", e);
    return false;
  }
}

// Optional secondary: email the lead via Resend, if configured.
async function toEmail(lead: Lead): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL; // must be on a Resend-verified domain
  if (!apiKey || !to || !from) return false;

  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Work email", lead.email],
    ["Company", lead.company],
    ["Region", lead.region || "—"],
    ["Timeframe", lead.timeframe || "—"],
    ["Message", lead.message || "—"],
  ];
  const esc = (s: string) => s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]!));
  const html = `<h2>New demo request</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${esc(v)}</td></tr>`)
    .join("")}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: lead.email, subject: `Demo request — ${lead.company}`, html, text }),
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
    name,
    email,
    company,
    region: REGIONS.has(region) ? region : "",
    timeframe: TIMEFRAMES.has(timeframe) ? timeframe : "",
    message,
    at: new Date().toISOString(),
  };

  // Fire both destinations; delivered = at least one succeeded. Never block the
  // visitor's booking on a storage hiccup.
  const [sheet, email_] = await Promise.all([toSheet(lead), toEmail(lead)]);
  if (!sheet && !email_) {
    console.warn("[lead] no destination configured (LEAD_SHEET_WEBHOOK / RESEND_API_KEY)");
  }
  return NextResponse.json({ ok: true, delivered: sheet || email_, stored: { sheet, email: email_ } });
}
