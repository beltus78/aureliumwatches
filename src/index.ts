import { BRANDS, BY_SLUG, WATCHES, watchTitle } from "./catalog";
import { GUIDES } from "./guides";
import { esc, layout, setVerify, type Page } from "./html";
import { PAY_DETAILS } from "./payments";
import { CA_PROV, PAY_LABEL, PROMISES, SITE, US_STATES, allowedPay, companyName, money, shown, type Cur, type PayMethod } from "./site";
import { watchSvg } from "./watch-svg";
import * as P from "./pages";

export interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  EMAIL?: SendEmail; // Cloudflare Email Sending binding (optional)
  RESEND_API_KEY?: string; // optional fallback
  SALES_EMAIL: string;
  EMAIL_FROM: string;
  GOOGLE_SITE_VERIFICATION?: string;
  BING_SITE_VERIFICATION?: string;
}
const YEAR = 31536000;
const SEC = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-frame-options": "SAMEORIGIN",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
  "strict-transport-security": "max-age=31536000",
};
const html = (pg: Page, status = 200) => new Response(layout(pg), { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "private, max-age=120", ...SEC } });
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", ...SEC } });
const cookieOf = (req: Request, k: string) => req.headers.get("cookie")?.match(new RegExp(`(?:^|;\\s*)${k}=([A-Za-z]{2,3})`))?.[1];

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (url.hostname.startsWith("www.")) { url.hostname = url.hostname.slice(4); return Response.redirect(url.toString(), 301); }
    let path = url.pathname;
    if (path.length > 1 && path.endsWith("/")) return Response.redirect(new URL(path.replace(/\/+$/, "") + url.search, url).toString(), 301);
    setVerify({ google: env.GOOGLE_SITE_VERIFICATION, bing: env.BING_SITE_VERIFICATION });

    if (req.method === "POST") {
      if (path === "/api/order") return order(req, env);
      if (path === "/api/wholesale") return wholesaleReq(req, env);
      if (path === "/api/contact") return contactMsg(req, env);
      return json({ ok: false }, 405);
    }
    if (path === "/robots.txt") return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /bag\nDisallow: /thanks\nSitemap: ${SITE.url}/sitemap.xml\n`, { headers: { "content-type": "text/plain" } });
    if (path === "/sitemap.xml") return sitemap();
    let m = path.match(/^\/img\/w\/([a-z0-9-]+)\.svg$/);
    if (m) {
      const w = BY_SLUG.get(m[1]!);
      if (!w) return new Response("Not found", { status: 404 });
      return new Response(watchSvg(w.look, "w", { title: watchTitle(w) }), { headers: { "content-type": "image/svg+xml", "cache-control": "public, max-age=604800" } });
    }
    if (/\.[a-z0-9]+$/i.test(path)) return env.ASSETS.fetch(req);

    const curQ = url.searchParams.get("cur");
    if (curQ === "USD" || curQ === "CAD") {
      url.searchParams.delete("cur");
      return new Response(null, { status: 302, headers: { location: url.pathname + url.search, "set-cookie": `cur=${curQ}; Path=/; Max-Age=${YEAR}; SameSite=Lax; Secure`, "cache-control": "no-store" } });
    }
    const cc = cookieOf(req, "cur");
    const country = (req as Request & { cf?: { country?: string } }).cf?.country;
    const cur: Cur = cc === "USD" || cc === "CAD" ? cc : country === "CA" ? "CAD" : "USD";
    const pg = route(cur, path, url);
    return pg ? html({ ...pg, cur }) : html({ ...P.notFound(), cur }, 404);
  },
};

function route(cur: Cur, path: string, url: URL) {
  switch (path) {
    case "/": return P.home(cur);
    case "/watches": return P.all(cur);
    case "/pre-owned": return P.preowned(cur);
    case "/new": return P.newWatches(cur);
    case "/brands": return P.brands();
    case "/wholesale": return P.wholesale();
    case "/bag": return P.bag();
    case "/thanks": return P.thanks((url.searchParams.get("n") ?? "").replace(/[^A-Z0-9-]/g, "").slice(0, 30));
    case "/authenticity": return P.authenticity();
    case "/shipping": return P.shipping();
    case "/returns": return P.returns();
    case "/how-to-pay": return P.howToPay();
    case "/faq": return P.faq();
    case "/about": return P.about();
    case "/contact": return P.contact();
    case "/canada": return P.canada(cur);
    case "/terms": return P.terms();
    case "/privacy": return P.privacy();
    case "/guides": return P.guides();
  }
  let m;
  if ((m = path.match(/^\/brands\/([a-z0-9-]+)$/))) return P.brand(cur, m[1]!);
  if ((m = path.match(/^\/watch\/([a-z0-9-]+)$/))) return P.watch(cur, m[1]!);
  if ((m = path.match(/^\/guides\/([a-z0-9-]+)$/))) return P.guide(m[1]!);
  return null;
}

// ---------- sitemap ----------
const CONTENT_UPDATED = "2026-11-25";
function sitemap() {
  const pages: [string, string][] = [
    ...["/", "/watches", "/pre-owned", "/new", "/brands", "/wholesale", "/authenticity", "/how-to-pay", "/shipping", "/returns", "/faq", "/about", "/contact", "/canada"].map((p) => [p, CONTENT_UPDATED] as [string, string]),
    ...BRANDS.map((b) => [`/brands/${b.slug}`, CONTENT_UPDATED] as [string, string]),
    ...WATCHES.map((w) => [`/watch/${w.slug}`, CONTENT_UPDATED] as [string, string]),
    ["/guides", GUIDES.map((g) => g.updated ?? g.published).sort().at(-1)!],
    ...GUIDES.map((g) => [`/guides/${g.slug}`, g.updated ?? g.published] as [string, string]),
  ];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(([p, d]) => `<url><loc>${SITE.url}${p}</loc><lastmod>${d}</lastmod></url>`).join("")}</urlset>`,
    { headers: { "content-type": "application/xml", "cache-control": "public, max-age=3600" } });
}

// ---------- forms ----------
class UserError extends Error {}
function v() {
  const fail = (msg: string): never => { throw new UserError(msg); };
  const str = (x: unknown, max: number, required = true) => {
    const s = typeof x === "string" ? x.trim() : "";
    if (required && !s) fail("Please fill in all required fields.");
    if (s.length > max) fail("One of the fields is too long.");
    return s;
  };
  const email = (x: unknown) => { const s = str(x, 200).toLowerCase(); if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) fail("Please enter a valid email address."); return s; };
  return { fail, str, email };
}
const one = <T extends string>(x: unknown, list: readonly T[], dflt: T): T => (list.includes(x as T) ? (x as T) : dflt);
const ymd = () => new Date().toISOString().slice(2, 10).replace(/-/g, "");
const rnd = () => crypto.getRandomValues(new Uint32Array(1))[0]!.toString(36).toUpperCase().padStart(6, "0").slice(0, 5);
const handle = (fn: () => Promise<Response>) => fn().catch((e) => {
  if (e instanceof UserError) return json({ ok: false, error: e.message }, 400);
  console.error(e);
  return json({ ok: false, error: "Something went wrong. Please try again or email us." }, 500);
});

async function order(req: Request, env: Env) {
  return handle(async () => {
    const d = (await req.json()) as Record<string, unknown>;
    if (d["website"]) return json({ ok: true, orderNumber: "AW-OK" });
    const c = v();
    const country = d["country"] === "CA" ? "CA" : "US";
    const o = {
      full_name: c.str(d["fullName"], 120), email: c.email(d["email"]), phone: c.str(d["phone"], 40), country,
      region: c.str(d["region"], 3), address: c.str(d["address"], 300), city: c.str(d["city"], 100), postal: c.str(d["postal"], 12).toUpperCase(),
      payment: c.str(d["payment"], 10) as PayMethod, notes: c.str(d["notes"], 2000, false) || null,
    };
    if (!d["agree"]) c.fail("Please accept the terms of sale.");
    if (!(country === "CA" ? CA_PROV : US_STATES).includes(o.region)) c.fail("Please choose your state or province.");
    if (/\b(p\.?\s*o\.?\s*box|post office box)\b/i.test(o.address)) c.fail("We can't ship to P.O. boxes. Please enter a street address.");
    const raw = Array.isArray(d["items"]) ? (d["items"] as unknown[]) : [];
    const slugs = [...new Set(raw.map(String))];
    if (!slugs.length || slugs.length > 20) c.fail("Your bag is empty.");
    const items = slugs.map((s) => { const w = BY_SLUG.get(s); if (!w || w.sold) c.fail("A watch in your bag is no longer available."); return { slug: w!.slug, name: watchTitle(w!), price_usd: w!.price }; });
    const subtotal = items.reduce((s, i) => s + i.price_usd, 0);
    if (!allowedPay(subtotal).includes(o.payment)) c.fail("Please choose an available payment method.");

    const n = `AW-${ymd()}-${rnd()}`;
    await env.DB.prepare(`INSERT INTO orders (id, order_number, full_name, email, phone, country, region, address, city, postal, payment, notes, items, subtotal_usd) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
      .bind(crypto.randomUUID(), n, o.full_name, o.email, o.phone, o.country, o.region, o.address, o.city, o.postal, o.payment, o.notes, JSON.stringify(items), subtotal).run();

    const table = `<table cellpadding="8" style="border-collapse:collapse;font-size:14px;width:100%">${items.map((i) => `<tr style="border-bottom:1px solid #E6DCC6"><td>${esc(i.name)}</td><td align="right">${money(i.price_usd)}</td></tr>`).join("")}
<tr><td><b>Shipping</b> — free, insured overnight</td><td align="right">$0</td></tr><tr><td><b>Total (USD)</b></td><td align="right"><b>${money(subtotal)}</b></td></tr></table>`;
    const pay = PAY_DETAILS[o.payment];
    const payBlock = `<div style="background:#F6F0E2;border-left:4px solid #B8975A;padding:14px 16px;margin:18px 0"><p style="margin:0 0 8px"><b>Payment: ${esc(PAY_LABEL[o.payment])}</b></p>
${pay.lines.map((x) => `<p style="margin:0 0 4px">${esc(x)}</p>`).join("")}
<p style="margin:10px 0 0;font-size:13px">Put <b>${n}</b> in the payment reference. We reserve your watch for ${PROMISES.holdHours} hours.</p>
<p style="margin:6px 0 0;font-size:13px">Only pay to the details in this email from ${SITE.email}. We never change payment details by phone or text message.</p></div>`;
    await Promise.all([
      sendEmail(env, env.SALES_EMAIL, `New order ${n} — ${money(subtotal)} — ${o.full_name} (${o.region}, ${country}) — ${PAY_LABEL[o.payment]}`,
        mail("New order", fields([["Order", n], ["Name", o.full_name], ["Email", o.email], ["Phone", o.phone], ["Ship to", `${o.address}, ${o.city}, ${o.region} ${o.postal}, ${country}`], ["Payment", PAY_LABEL[o.payment]], ["Notes", o.notes]]) + table), o.email),
      sendEmail(env, o.email, `Your order ${n} — ${SITE.name}`,
        mail("Thank you — your watch is reserved", `<p>Hello ${esc(o.full_name.split(" ")[0])},</p><p>Thank you for your order <b>${n}</b>. Your watch is reserved for ${PROMISES.holdHours} hours while your payment arrives.</p>${table}${payBlock}<p>${o.payment === "btc" || o.payment === "eth" ? "We will reply shortly with the exact coin amount at the current rate. Please wait for that email before sending." : "As soon as your payment is received, your watch ships overnight, insured and signed for."}</p><p>Questions? Just reply to this email.</p>`), env.SALES_EMAIL),
    ]);
    return json({ ok: true, orderNumber: n });
  });
}

async function wholesaleReq(req: Request, env: Env) {
  return handle(async () => {
    const d = (await req.json()) as Record<string, unknown>;
    if (d["website"]) return json({ ok: true });
    const c = v();
    const r = {
      company: c.str(d["company"], 160), name: c.str(d["name"], 120), email: c.email(d["email"]), phone: c.str(d["phone"], 40),
      country: d["country"] === "CA" ? "CA" : "US", biz_type: one(d["bizType"], ["dealer", "jeweler", "pawn", "online", "other"] as const, "other"),
      tax_id: c.str(d["taxId"], 60, false) || null, cond: one(d["cond"], ["both", "new", "preowned"] as const, "both"),
      qty: c.str(d["qty"], 20, false), brands: c.str(d["brands"], 1500), budget: c.str(d["budget"], 40, false), message: c.str(d["message"], 2000, false) || null,
    };
    await env.DB.prepare(`INSERT INTO wholesale_requests (id, company, name, email, phone, country, biz_type, tax_id, cond, qty, brands, budget, message) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`)
      .bind(crypto.randomUUID(), r.company, r.name, r.email, r.phone, r.country, r.biz_type, r.tax_id, r.cond, r.qty, r.brands, r.budget, r.message).run();
    await sendEmail(env, env.SALES_EMAIL, `Wholesale request — ${r.company} (${r.country}) — ${r.qty} pcs, ${r.budget}`,
      mail("New wholesale request", fields([["Company", r.company], ["Contact", r.name], ["Email", r.email], ["Phone", r.phone], ["Country", r.country], ["Business type", r.biz_type], ["Resale cert / BN", r.tax_id], ["Condition", r.cond], ["Pieces per order", r.qty], ["Budget", r.budget], ["Brands / references", r.brands], ["Message", r.message]])), r.email);
    return json({ ok: true });
  });
}

async function contactMsg(req: Request, env: Env) {
  return handle(async () => {
    const d = (await req.json()) as Record<string, unknown>;
    if (d["website"]) return json({ ok: true });
    const c = v();
    const m = { name: c.str(d["name"], 120), email: c.email(d["email"]), phone: c.str(d["phone"], 40, false) || null, topic: c.str(d["topic"], 60, false) || null, message: c.str(d["message"], 3000) };
    await env.DB.prepare("INSERT INTO contact_messages (id, name, email, phone, topic, message) VALUES (?,?,?,?,?,?)").bind(crypto.randomUUID(), m.name, m.email, m.phone, m.topic, m.message).run();
    await sendEmail(env, env.SALES_EMAIL, `Website message: ${m.topic ?? "General"} — ${m.name}`, mail("New contact message", fields([["Name", m.name], ["Email", m.email], ["Phone", m.phone], ["Topic", m.topic], ["Message", m.message]])), m.email);
    return json({ ok: true });
  });
}

const fields = (rows: [string, unknown][]) => rows.filter(([, x]) => x != null && x !== "").map(([k, x]) => `<p style="margin:0 0 6px"><b>${esc(k)}:</b> ${esc(x)}</p>`).join("");
const mail = (title: string, body: string) => `<!doctype html><html lang="en"><body style="margin:0;background:#F6F0E2;font-family:Arial,Helvetica,sans-serif;color:#151A24">
<div style="max-width:620px;margin:0 auto;background:#fff"><div style="background:#0A0D14;padding:20px 24px"><p style="margin:0;font:600 20px Georgia,serif;color:#F3EEE4;letter-spacing:.04em">Aurelium <span style="color:#CDB384;font-style:italic">Watches</span></p></div>
<div style="padding:24px"><h1 style="font:500 24px Georgia,serif;margin:0 0 14px">${esc(title)}</h1>${body}<hr style="border:none;border-top:1px solid #E6DCC6;margin:22px 0">
<p style="font-size:12px;color:#5E6573">${esc([companyName(), shown(SITE.address1), shown(SITE.address2)].filter(Boolean).join(" · "))} · ${SITE.email} · ${SITE.url}</p></div></div></body></html>`;

async function sendEmail(env: Env, to: string, subject: string, htmlBody: string, replyTo?: string) {
  const text = htmlBody.replace(/<(br|\/p|\/tr|\/h1|hr)[^>]*>/gi, "\n").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\n{3,}/g, "\n\n").trim();
  const fm = env.EMAIL_FROM.match(/^(.*?)\s*<([^>]+)>$/);
  const from = fm ? { name: fm[1]!.trim(), email: fm[2]!.trim() } : env.EMAIL_FROM;
  if (env.EMAIL) {
    try { await env.EMAIL.send({ from, to, subject, html: htmlBody, text, ...(replyTo ? { replyTo } : {}) }); return true; }
    catch (e) { console.error(`Email Sending failed: ${(e as Error).message} — ${subject}`); if (!env.RESEND_API_KEY) return false; }
  }
  if (!env.RESEND_API_KEY) { console.warn(`Email not sent (no EMAIL binding or RESEND_API_KEY): ${subject}`); return false; }
  try {
    const r = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({ from: env.EMAIL_FROM, to: [to], subject, html: htmlBody, text, ...(replyTo ? { reply_to: replyTo } : {}) }) });
    if (!r.ok) console.error(`Resend ${r.status}: ${await r.text()}`);
    return r.ok;
  } catch (e) { console.error(e); return false; }
}
