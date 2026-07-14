#!/usr/bin/env node
// Local test for the Google Sheets service-account integration.
// Runs the SAME auth + append logic as src/app/api/lead/route.ts, so if this
// writes a row, the live route will too. Your key stays on your machine.
//
// USAGE:
//   node scripts/test-lead-sheet.mjs <path-to-service-account.json> <SHEET_ID> [subject-email]
//
//   <path-to-service-account.json>  the JSON key you downloaded
//   <SHEET_ID>                      the id from the sheet URL (/d/<ID>/edit)
//   [subject-email]                 OPTIONAL — only for domain-wide delegation
//                                   (a pi42.com user to impersonate)
//
// EXAMPLE:
//   node scripts/test-lead-sheet.mjs ~/Downloads/gammafloww-leads-abc123.json 1AbC...xyz

import { readFileSync } from "node:fs";
import crypto from "node:crypto";

const [keyPath, sheetId, subject] = process.argv.slice(2);

if (!keyPath || !sheetId) {
  console.error("Usage: node scripts/test-lead-sheet.mjs <key.json> <SHEET_ID> [subject-email]");
  process.exit(1);
}

const b64url = (input) =>
  Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

function loadKey() {
  let json;
  try {
    json = JSON.parse(readFileSync(keyPath, "utf8"));
  } catch (e) {
    console.error(`❌ Could not read/parse key file at ${keyPath}\n   ${e.message}`);
    process.exit(1);
  }
  if (!json.client_email || !json.private_key) {
    console.error("❌ That JSON has no client_email / private_key — is it the service-account key?");
    process.exit(1);
  }
  return json;
}

async function getToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: key.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  if (subject) claim.sub = subject;

  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = b64url(JSON.stringify(claim));
  const signature = b64url(crypto.sign("RSA-SHA256", Buffer.from(`${header}.${payload}`), key.private_key));
  const assertion = `${header}.${payload}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
  });
  const body = await res.text();
  if (!res.ok) {
    console.error(`❌ Token request failed (${res.status}). Google said:\n   ${body}`);
    if (subject) console.error("   → With a subject set, this usually means domain-wide delegation isn't authorized for that scope.");
    process.exit(1);
  }
  return JSON.parse(body).access_token;
}

async function append(token) {
  const range = encodeURIComponent("Leads!A1");
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      values: [[new Date().toISOString(), "TEST — local script", "test@example.com", "GammaFloww QA", "United Arab Emirates", "Just exploring", "If you see this row, the integration works ✅"]],
    }),
  });
  const body = await res.text();
  if (!res.ok) {
    console.error(`❌ Append failed (${res.status}). Google said:\n   ${body}\n`);
    if (res.status === 403) console.error("   → Fix: share the sheet (Editor) with the service account email above, OR use domain-wide delegation (pass a subject email).");
    if (res.status === 404) console.error("   → Fix: check the SHEET_ID, and that a tab named exactly 'Leads' exists.");
    process.exit(1);
  }
  return JSON.parse(body);
}

const key = loadKey();
console.log(`• Service account: ${key.client_email}`);
console.log(`• Sheet ID:        ${sheetId}`);
if (subject) console.log(`• Impersonating:   ${subject} (domain-wide delegation)`);
console.log("• Requesting token…");
const token = await getToken(key);
console.log("• Token OK. Appending a test row…");
const result = await append(token);
console.log(`\n✅ Success — appended to ${result.updates?.updatedRange}. Check the 'Leads' tab of your sheet.`);
