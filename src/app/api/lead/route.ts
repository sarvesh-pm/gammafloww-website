import { NextResponse } from "next/server";

// Receives a demo-request lead from the modal form and emails it to the sales
// inbox via Resend's REST API (no SDK dependency — same server-fetch pattern as
// /api/market). Runs per-request so the secret key is read at runtime.
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

  const safeRegion = REGIONS.has(region) ? region : "";
  const safeTimeframe = TIMEFRAMES.has(timeframe) ? timeframe : "";

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL; // must be on a Resend-verified domain

  // Not configured yet: accept the lead so the booking flow (Calendly handoff)
  // never breaks. delivered:false signals the email wasn't sent.
  if (!apiKey || !to || !from) {
    console.warn("[lead] email not configured (RESEND_API_KEY / LEAD_TO_EMAIL / LEAD_FROM_EMAIL missing)");
    return NextResponse.json({ ok: true, delivered: false });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Work email", email],
    ["Company", company],
    ["Region", safeRegion || "—"],
    ["Timeframe", safeTimeframe || "—"],
    ["Message", message || "—"],
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
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Demo request — ${company}`,
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[lead] resend failed", res.status, await res.text().catch(() => ""));
      // Don't block the user's booking on an email hiccup.
      return NextResponse.json({ ok: true, delivered: false });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    console.error("[lead] resend error", e);
    return NextResponse.json({ ok: true, delivered: false });
  }
}
