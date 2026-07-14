# DNS cutover — point gammafloww.com at Vercel

Moving **gammafloww.com** off the current Framer site to the new Next.js site
hosted on **Vercel**.

## Facts

- **Registrar:** GoDaddy (registration only — no DNS records live here).
- **DNS host:** Cloudflare (nameservers `henry.ns.cloudflare.com` /
  `paloma.ns.cloudflare.com`). **All record changes happen in Cloudflare.**
- **Current target:** Framer
  - apex `gammafloww.com` → A `31.43.160.6`, `31.43.161.6`
  - `www` → CNAME `sites.framer.app`
- **Vercel project:** `gammafloww-website` (primary domain = `www.gammafloww.com`;
  apex 308-redirects to `www`).

## Records Vercel requires

Both are CNAMEs to the same target, proxy **disabled**. Apex-as-CNAME works
because Cloudflare flattens CNAMEs at the root.

| Domain              | Type  | Name | Value                                    | Proxy       |
| ------------------- | ----- | ---- | ---------------------------------------- | ----------- |
| `gammafloww.com`    | CNAME | `@`  | `ddc45288595aba30.vercel-dns-017.com`    | DNS only    |
| `www.gammafloww.com`| CNAME | `www`| `ddc45288595aba30.vercel-dns-017.com`    | DNS only    |

> Vercel's older values (`cname.vercel-dns.com`, A `76.76.21.21`) still work, but
> use the new target above.

## Change to make in Cloudflare (gammafloww.com zone → DNS → Records)

**1. Apex `gammafloww.com`**
- Delete the existing `A` records (`31.43.160.6`, `31.43.161.6` → Framer).
- Add: **CNAME** · Name `@` · Target `ddc45288595aba30.vercel-dns-017.com` ·
  Proxy status **DNS only (grey cloud)**.

**2. `www` subdomain**
- Edit the existing `www` CNAME (currently `sites.framer.app`):
  - Target → `ddc45288595aba30.vercel-dns-017.com` · Proxy status **DNS only (grey cloud)**.

**Important**
- Both records must be **DNS only** — turn the orange proxy cloud **off**. Vercel
  issues its own SSL; Cloudflare's proxy on top breaks cert issuance.
- **Do not touch any other records** — especially `MX` and `TXT` (SPF/DKIM) email
  records. Only the apex and `www` change.

## After the change

1. In Vercel → project → **Settings → Domains**, click **Refresh** on each row.
2. `Invalid Configuration` → `Valid Configuration`; Vercel auto-issues HTTPS.
3. https://gammafloww.com serves the new site (apex → `www`).

Verify from a terminal:

```bash
dig +short CNAME www.gammafloww.com     # → ddc45288595aba30.vercel-dns-017.com
dig +short gammafloww.com               # → Vercel IPs (flattened from the apex CNAME)
```

## Rollback

Keep the **Framer subscription active** until the new site is confirmed live. To
roll back, restore the old records: apex `A` → `31.43.160.6` / `31.43.161.6`,
`www` CNAME → `sites.framer.app`.
