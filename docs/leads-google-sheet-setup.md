# Capturing demo leads in a Google Sheet (pi42.com, service account)

`/api/lead` appends each submission to a Google Sheet using the **Sheets API**,
authenticated as a **service account**. There is **no public endpoint** — the
sheet is never shared publicly, and nothing runs as an Apps Script web app.
Everything stays inside pi42.com's control.

## Data flow

```
Form → POST /api/lead (Vercel) → Sheets API (auth: service account) → your sheet
```

## One-time setup

### 1. Create the sheet
- Create a Google Sheet in your pi42.com Drive. Add a tab named **`Leads`**.
- (Optional) Header row: `Timestamp | Name | Email | Company | Region | Timeframe | Message`.
- Grab the **Sheet ID** from the URL: `docs.google.com/spreadsheets/d/<SHEET_ID>/edit`.

### 2. Create a service account (Google Cloud Console)
- Console → create/select a project (ideally under the pi42.com org).
- **APIs & Services → Library → enable "Google Sheets API".**
- **APIs & Services → Credentials → Create credentials → Service account.** Name it e.g. `gammafloww-leads`.
- Open the service account → **Keys → Add key → Create new key → JSON** → download it.
  From the JSON you need `client_email` and `private_key`.

### 3. Give the service account write access to the sheet — pick ONE
- **A. Direct share (simplest):** Share the sheet (Editor) with the service
  account's `client_email` (looks like `…@….iam.gserviceaccount.com`).
  Works if your Workspace allows sharing with that address.
- **B. Domain-wide delegation (if external sharing is blocked):** Your Workspace
  admin authorizes the service account's **client ID** for scope
  `https://www.googleapis.com/auth/spreadsheets` (Admin console → Security → API
  controls → Domain-wide delegation). Then set `GOOGLE_SA_SUBJECT` to a pi42.com
  user who owns/can edit the sheet — the service account acts as that user.

### 4. Vercel env vars (Project → Settings → Environment Variables)

| Name | Value |
|---|---|
| `LEAD_SHEET_ID` | the Sheet ID from step 1 |
| `GOOGLE_SA_EMAIL` | the service account `client_email` |
| `GOOGLE_SA_PRIVATE_KEY` | the `private_key` from the JSON (paste as-is, including the `\n`s) |
| `GOOGLE_SA_SUBJECT` | *(only for option B)* a pi42.com user email, e.g. `sarvesh@pi42.com` |

### 5. Redeploy
Redeploy so the vars load. Then a form submission appends a row, and
`/api/lead` returns `stored: { sheet: true }`.
