import { BRANDS, brandSlug, condLabel, img, watchName, watchTitle, type Watch } from "./catalog";
import { PAY, PAY_LABEL, PROMISES, SITE, companyName, money, shown, type Cur } from "./site";

export const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export type Page = {
  path: string; title: string; description: string; body: string; cur: Cur;
  image?: string; jsonLd?: object[]; noindex?: boolean; scriptData?: Record<string, unknown>; ogType?: string; rawTitle?: boolean;
};
export type Verify = { google?: string; bing?: string };
let VERIFY: Verify = {};
export const setVerify = (v: Verify) => { VERIFY = v; };

export const MARK = `<svg class="mk" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" stroke-width=".6" opacity=".6"/><path d="M24 9.5 L33.5 37 h-4.2 l-2.1-6.4 h-6.4 l-2.1 6.4 h-4.2 Z M22 26.8 h4 L24 20.4 Z" fill="currentColor"/><g stroke="currentColor" stroke-width="1"><path d="M24 2.5v3"/><path d="M45.5 24h-3"/><path d="M24 45.5v-3"/><path d="M2.5 24h3"/></g></svg>`;
export const LOGO = `<span class="logo">${MARK}<span class="logo-t"><b>Aurelium</b><i>Watches</i></span></span>`;

export const price = (usd: number, cur: Cur) => money(usd, cur);
const priceBlock = (w: Watch, cur: Cur) =>
  `<b>${money(w.price)}</b>${cur === "CAD" ? `<small>${money(w.price, "CAD")}</small>` : ""}`;

/** Catalog card used in every listing. */
export function card(w: Watch, cur: Cur, eager = false) {
  return `<article class="card" data-w data-brand="${brandSlug(w.brand)}" data-cond="${w.cond}" data-price="${w.price}" data-year="${w.year}" data-q="${esc(`${watchTitle(w)} ${w.dial} ${w.material}`.toLowerCase())}">
<a class="card-img" href="/watch/${w.slug}" tabindex="-1" aria-hidden="true"><img src="${img(w)}" alt="" width="400" height="560"${eager ? "" : ' loading="lazy"'} decoding="async"><span class="chip c-${w.cond}">${condLabel(w)}</span>${w.sold ? `<span class="chip c-sold">Sold</span>` : ""}</a>
<div class="card-b"><p class="card-k">${esc(w.brand)}</p><h3 class="card-h"><a href="/watch/${w.slug}">${esc(w.model)}</a></h3>
<p class="card-m">Ref. ${esc(w.ref)} · ${w.cond === "new" ? "New" : w.year} · ${esc(w.set)}</p>
<div class="card-f"><p class="card-p">${priceBlock(w, cur)}</p>${w.sold ? "" : `<button class="add" type="button" data-add="${w.slug}" aria-label="Add ${esc(watchName(w))} to bag">Add to bag</button>`}</div></div></article>`;
}

export const crumbs = (items: [string, string][]) =>
  `<nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a>${items.map(([href, name], i) => (i === items.length - 1 ? ` <span>/</span> <span aria-current="page">${esc(name)}</span>` : ` <span>/</span> <a href="${href}">${esc(name)}</a>`)).join("")}</nav>`;
export const crumbLd = (items: [string, string][]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [["/", "Home"], ...items].map(([href, name], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE.url + href })),
});

const fitTitle = (s: string) => (s.length <= 65 ? s : s.slice(0, 66).replace(/\s+\S*$/, "").replace(/[\s—–|,:-]+$/, ""));
const TAG = "Authenticated pre-owned and new luxury watches, insured overnight across the US and Canada.";

export function layout(pg: Page) {
  const url = SITE.url + pg.path;
  const title = fitTitle(pg.rawTitle || pg.title.includes(SITE.name) || pg.title.length + SITE.name.length + 3 > 65 ? pg.title : `${pg.title} | ${SITE.name}`);
  let d = pg.description;
  if (d.length < 110) d = `${d.replace(/\s*$/, "")}${/[.!?]$/.test(d) ? "" : "."} ${TAG}`;
  if (d.length > 160) d = d.slice(0, 159).replace(/\s+\S*$/, "") + "…";
  const image = pg.image ?? `${SITE.url}/og-default.jpg`;
  const nav: [string, string][] = [["/watches", "All watches"], ["/pre-owned", "Pre-owned"], ["/new", "New"], ["/brands", "Brands"], ["/wholesale", "Wholesale"], ["/authenticity", "Authenticity"]];
  const other = pg.cur === "USD" ? "CAD" : "USD";
  const phone = shown(SITE.phone), wa = shown(SITE.whatsapp);
  const tel = phone.replace(/[^\d+]/g, "");
  const addr = [shown(SITE.address1), shown(SITE.address2)].filter(Boolean);
  const orgLd = { "@context": "https://schema.org", "@type": "Store", "@id": `${SITE.url}/#store`, name: SITE.name, url: SITE.url, logo: `${SITE.url}/favicon.svg`, image: `${SITE.url}/og-default.jpg`, email: SITE.email,
    ...(phone ? { telephone: phone } : {}), ...(addr.length ? { address: { "@type": "PostalAddress", streetAddress: addr[0], addressLocality: addr[1] ?? "", addressCountry: "US" } } : {}),
    areaServed: [{ "@type": "Country", name: "United States" }, { "@type": "Country", name: "Canada" }], currenciesAccepted: "USD", paymentAccepted: "Cryptocurrency, Bank wire" };
  return `<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(d)}">
${pg.noindex ? `<meta name="robots" content="noindex,follow">` : `<link rel="canonical" href="${url}">`}
<meta property="og:site_name" content="${SITE.name}"><meta property="og:type" content="${pg.ogType ?? "website"}"><meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(d)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${esc(image)}"><meta property="og:locale" content="en_US"><meta name="twitter:card" content="summary_large_image">
${VERIFY.google ? `<meta name="google-site-verification" content="${esc(VERIFY.google)}">` : ""}${VERIFY.bing ? `<meta name="msvalidate.01" content="${esc(VERIFY.bing)}">` : ""}
<meta name="theme-color" content="#0A0D14"><link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/cormorant-500.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/fonts/manrope-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/styles.css?v=1">
${[orgLd, ...(pg.jsonLd ?? [])].map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`).join("")}
</head><body>
<a class="skip" href="#main">Skip to content</a>
<div class="util"><div class="wrap util-in"><span>Free insured overnight shipping · USA &amp; Canada · Pay by crypto or bank wire</span>
<a class="cur" href="?cur=${other}" rel="nofollow" title="Show prices in ${other}"><b>${pg.cur}</b><span> / ${other}</span></a></div></div>
<header class="hd"><div class="wrap hd-in">
<a href="/" class="hd-logo" aria-label="${SITE.name} — home">${LOGO}</a>
<nav class="hd-nav" aria-label="Main">${nav.map(([p, n]) => `<a href="${p}"${pg.path === p ? ' aria-current="page"' : ""}>${n}</a>`).join("")}</nav>
<a class="hd-bag" href="/bag" aria-label="Shopping bag"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8Z M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="1.4"/></svg><b data-bagcount>0</b></a>
<button class="burger" type="button" aria-label="Menu" aria-expanded="false" data-burger><i></i><i></i></button>
</div></header>
<main id="main">${pg.body}</main>
<footer class="ft"><div class="wrap">
<div class="ft-top"><p class="ft-big">Every watch checked by a watchmaker.<br><em>Every parcel insured to your door.</em></p><a class="btn btn-gold" href="/watches">Shop the collection</a></div>
<div class="ft-grid">
<div>${LOGO}<p class="small">${[companyName(), ...addr].map(esc).join("<br>")}<br><a href="mailto:${SITE.email}">${SITE.email}</a>${phone ? `<br><a href="tel:${tel}">${esc(phone)}</a>` : ""}${wa ? `<br><a href="https://wa.me/${wa.replace(/\D/g, "")}">WhatsApp ${esc(wa)}</a>` : ""}<br>${esc(SITE.hours)}</p></div>
<div><h4>Shop</h4><a href="/watches">All watches</a><a href="/pre-owned">Pre-owned watches</a><a href="/new">New watches</a><a href="/brands">All brands</a><a href="/wholesale">Wholesale for dealers</a></div>
<div><h4>Brands</h4>${BRANDS.slice(0, 7).map((b) => `<a href="/brands/${b.slug}">${esc(b.name)}</a>`).join("")}</div>
<div><h4>Service</h4><a href="/authenticity">Authenticity guarantee</a><a href="/how-to-pay">How to pay</a><a href="/shipping">Shipping &amp; insurance</a><a href="/returns">Returns &amp; warranty</a><a href="/faq">FAQ</a><a href="/canada">Shipping to Canada</a><a href="/guides">Watch guides</a></div>
<div><h4>Company</h4><a href="/about">About us</a><a href="/contact">Contact</a><a href="/terms">Terms of sale</a><a href="/privacy">Privacy</a></div>
</div>
<p class="small ft-pay">We accept: ${PAY.map((m) => PAY_LABEL[m]).join(" · ")}</p>
<p class="small ft-tm">${SITE.name} is an independent watch dealer. We are not affiliated with, authorized by or endorsed by any of the brands we sell. Brand names and model names are trademarks of their owners and are used only to describe the watches offered.</p>
<p class="small ft-copy">© ${new Date().getUTCFullYear()} ${esc(companyName())}. All rights reserved.</p></div></footer>
${wa ? `<a class="wa" href="https://wa.me/${wa.replace(/\D/g, "")}" aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.1.1-1.8-.1-2.9-1-4.9-3.9-5-4.1-.2-.2-1.2-1.6-1.2-3s.8-2.2 1-2.5c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.6.3.1.2.1.7-.1 1.3Z"/></svg></a>` : ""}
<script>window.__CUR=${JSON.stringify(pg.cur)};${pg.scriptData ? `window.__D=${JSON.stringify(pg.scriptData).replace(/</g, "\\u003c")};` : ""}</script>
<script src="/app.js?v=1" defer></script><script src="/motion.js?v=1" defer></script>
</body></html>`;
}

export const holdNote = () => `We reserve the watch for ${PROMISES.holdHours} hours while your payment arrives.`;
