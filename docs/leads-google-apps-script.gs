/**
 * GammaFloww — demo-lead → Google Sheet endpoint.
 *
 * Deploy this as a Google Apps Script Web App bound to your leads spreadsheet.
 * The site's /api/lead route POSTs each submission here, and it appends a row.
 *
 * SETUP
 *  1. Create a Google Sheet (sheets.new). Extensions → Apps Script.
 *  2. Replace the default Code.gs with this file. Save.
 *  3. (Recommended) Project Settings (gear) → Script Properties → add
 *     SHARED_SECRET = <a long random string>. Set the same value as
 *     LEAD_SHEET_SECRET in Vercel so only your server can write.
 *  4. Deploy → New deployment → type "Web app":
 *       - Execute as: Me
 *       - Who has access: Anyone
 *     Deploy, authorize, and copy the Web app URL (ends with /exec).
 *  5. In Vercel env vars set LEAD_SHEET_WEBHOOK = that URL
 *     (and LEAD_SHEET_SECRET if you set a secret). Redeploy.
 */
function doPost(e) {
  var expected = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: 'bad-request' });
  }

  if (expected && data.secret !== expected) {
    return json({ ok: false, error: 'unauthorized' });
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Leads') || ss.insertSheet('Leads');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Company', 'Region', 'Timeframe', 'Message']);
  }
  sheet.appendRow([
    data.at || new Date(),
    data.name || '',
    data.email || '',
    data.company || '',
    data.region || '',
    data.timeframe || '',
    data.message || '',
  ]);
  return json({ ok: true });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
