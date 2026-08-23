# Islam Khaled Lawyer Site — GARHY TECH Project

Production-grade bilingual legal contact PWA for Counselor Islam Khaled Al-Sahmoudi.

## Source of truth

- `public/` contains the exact production static application snapshot.
- `scripts/check.mjs` validates critical assets, contact actions, social-preview metadata, RTL/PWA behavior, and secure external links.
- `scripts/build.mjs` produces the Vercel Build Output API bundle in `.vercel/output/` and applies the production security headers.
- `PRODUCTION_SNAPSHOT_SHA256.txt` records immutable SHA-256 checksums for the recovered production files.

## Local verification

```bash
npm ci
npm run check
npm run build
diff -qr public .vercel/output/static
```

## Deployment safety

The repository build is deterministic and does not require runtime secrets or external application dependencies. Production should only be replaced after the integrity checks and build parity verification pass.
