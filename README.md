# Aurelium Watches — aureliumwatches.com

Authenticated pre-owned and new luxury watches for buyers in the USA and Canada, plus wholesale for dealers.
Checkout by crypto (BTC, ETH, USDT, USDC) or bank wire/ACH; wholesale and contact by request form.

**Stack:** Cloudflare Worker (TypeScript, server-rendered HTML, no framework) · D1 database `aureliumwatches` (orders, wholesale requests, contact messages) · Cloudflare Email Sending (`EMAIL` binding) for order emails · static files in `public/`. Deploys from GitHub `main` with Cloudflare Workers Builds.

## How an order works
1. Buyer adds watches to the bag (stored in their browser) and checks out: name, email, phone, US/Canada street address, payment method.
2. The order is saved in D1 (`orders`) and two emails go out: one to `sales@`, one to the buyer **with the payment details** from `src/payments.ts`. Payment details never appear on the website.
3. The watch is reserved for 48 hours (`PROMISES.holdHours`). BTC/ETH buyers are told to wait for your email with the exact coin amount.

## Before launch — fill in
| What | Where |
|---|---|
| Legal company name, street address, city/state/ZIP, phone, WhatsApp (placeholders in [brackets] stay hidden until filled) | `src/site.ts` → `SITE` |
| Crypto wallet addresses and bank details | `src/payments.ts` |
| Promises: hold time, return days, dispatch time, warranty, wholesale minimum, carrier | `src/site.ts` → `PROMISES` |
| USD→CAD display rate (1.39) | `src/site.ts` → `CAD_RATE` |
| **Replace the sample watches** (16 sample listings with sample prices) with real stock | `src/catalog.ts` → `WATCHES` |
| Real photos: `public/photos/<slug>-1.webp` (2, 3… for more), then list the slug and photo count in `PHOTOS` | `src/catalog.ts` |

## Cloudflare setup (one time)
1. Domain: add `aureliumwatches.com` to Cloudflare and change the nameservers at Namecheap to the two Cloudflare gives you (it currently points to the Nova cPanel server, which only shows an empty file listing).
2. Database: done — D1 `aureliumwatches` (id `99470737-5be7-4418-9db6-2fcef63bf9ac`, Eastern North America) exists with migration 0001 applied.
3. Workers & Pages → Create → Import a repository → `beltus78/aureliumwatches`, branch `main`. Build command: none. Deploy command: `npx wrangler deploy`.
4. Settings → Domains & Routes → add `aureliumwatches.com` and `www.aureliumwatches.com` (www redirects to the apex).
5. Email: Email Service → Email Sending → onboard `aureliumwatches.com` so order emails go out from orders@. Set up an inbox for sales@ (e.g. Zoho Mail Free, like Liquidation Auction Center).

## See orders and requests
Cloudflare dashboard → D1 → `aureliumwatches` → Console:
```
SELECT order_number, full_name, email, country, region, payment, subtotal_usd, created_at FROM orders ORDER BY created_at DESC;
SELECT company, email, country, qty, budget, brands, created_at FROM wholesale_requests ORDER BY created_at DESC;
```

## Local
`npm install && npx wrangler d1 migrations apply aureliumwatches --local && npx wrangler dev --port 8787 --ip 127.0.0.1` · type check: `npm run check`
