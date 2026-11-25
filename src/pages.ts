import { BRANDS, BY_SLUG, WATCHES, brandSlug, condLabel, img, watchName, watchTitle, type Watch } from "./catalog";
import { FAQ, POLICIES, md } from "./content";
import { GUIDES, GUIDE_BY_SLUG } from "./guides";
import { card, crumbLd, crumbs, esc, holdNote, type Page } from "./html";
import { CA_PROV, PAY, PAY_LABEL, PAY_NOTE, PROMISES, SITE, US_STATES, companyName, money, shown, type Cur } from "./site";
import { watchSvg } from "./watch-svg";

type Out = Omit<Page, "cur">;
const P = PROMISES;
const feat = () => WATCHES.filter((w) => w.featured && !w.sold);
const faqLd = (items: [string, string][]) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
const faqHtml = (items: [string, string][]) => `<div class="faq" data-stagger>${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>`;
const itemList = (ws: Watch[]) => ({ "@context": "https://schema.org", "@type": "ItemList", itemListElement: ws.map((w, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE.url}/watch/${w.slug}`, name: watchTitle(w) })) });

// ---------- home ----------
function story() {
  const hero = BY_SLUG.get("rolex-cosmograph-daytona-126500ln-white-2024")!;
  const ch: [string, string, string, boolean][] = [
    ["Aurelium Watches · USA & Canada", "Time, *verified.*", "Authenticated pre-owned and new luxury watches — every piece opened and checked by a watchmaker before it reaches you.", true],
    ["Pre-owned", "Worn once. *Loved twice.*", "Rolex, Patek Philippe, Audemars Piguet and Omega with the year, the condition and exactly what's in the box — stated plainly.", false],
    ["New & wholesale", "Unworn. *By the piece or the case.*", "New watches with warranty for collectors, and trade supply for dealers and jewelers across North America.", false],
    ["Delivered", "Insured to *your door.*", "Pay by crypto or bank wire. Free overnight delivery with signature, insured for every dollar until it's in your hand.", true],
  ];
  const flyPool = [["rolex-submariner-date-126610ln-2023", "omega-seamaster-diver-300m-blue-new"], ["patek-philippe-aquanaut-5167a-2019", "rolex-gmt-master-ii-126710blro-2021"], ["cartier-santos-de-cartier-medium-new", "tudor-black-bay-58-m79030n-new"], ["audemars-piguet-royal-oak-15510st-blue-2023", "rolex-datejust-41-126334-blue-2022"]];
  const spots = [{ x: -10, y: 4, w: 22 }, { x: 80, y: 52, w: 22 }];
  const title = (h: string) => esc(h).replace(/\*(.+?)\*/g, "<em>$1</em>");
  return `<section class="story" data-story style="--n:${ch.length}">
<div class="story-stage"><div class="story-bg" aria-hidden="true"><span class="ring r1"></span><span class="ring r2"></span><span class="ring r3"></span></div><div class="wrap story-in">
<ol class="story-dots" aria-hidden="true">${ch.map((_, i) => `<li data-dot>${["I", "II", "III", "IV"][i]}</li>`).join("")}</ol>
<div class="story-text">${ch.map(([k, h, p, cta], i) => `<div class="chap" data-chap><p class="kicker">${esc(k)}</p>
${i === 0 ? `<h1 class="h-hero">${title(h)}</h1>` : `<h2 class="h-hero">${title(h)}</h2>`}<p class="lead">${esc(p)}</p>
${cta ? `<p class="links">${i === 0 ? `<a class="btn btn-gold" href="/watches">Shop the collection</a><a class="btn btn-line" href="/wholesale">Wholesale for dealers</a>` : `<a class="btn btn-gold" href="/pre-owned">Pre-owned</a><a class="btn btn-line" href="/new">New watches</a>`}</p>` : ""}</div>`).join("")}</div>
<div class="story-visual"><div class="hero-watch" aria-hidden="true">${watchSvg(hero.look, "hero", { animated: true })}</div>
${flyPool.map((pair, i) => pair.map((slug, j) => { const w = BY_SLUG.get(slug)!, s = spots[j]!; return `<div class="fly-pos" style="left:${s.x}%;top:${s.y}%;width:${s.w}%"><a class="fly" data-fly="${i}" href="/watch/${w.slug}" tabindex="-1"><img src="${img(w)}" alt="" width="400" height="560" loading="${i === 0 ? "eager" : "lazy"}"><i>${esc(w.brand)}</i></a></div>`; }).join("")).join("")}
</div></div><p class="story-hint" aria-hidden="true">Scroll</p></div></section>`;
}

export function home(cur: Cur): Out {
  const f = feat();
  return {
    path: "/", rawTitle: true,
    title: "Aurelium Watches — Pre-Owned & New Luxury Watches, USA & Canada",
    description: "Authenticated pre-owned and new Rolex, Patek Philippe, Audemars Piguet, Omega and Cartier watches. Free insured overnight shipping in the US and Canada. Pay by crypto or wire.",
    jsonLd: [{ "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url }, itemList(f)],
    body: `${story()}
<section class="brands-strip" aria-label="Brands we carry"><div class="marquee"><div class="marquee-in">${[...BRANDS, ...BRANDS].map((b) => `<a href="/brands/${b.slug}">${esc(b.name)}</a>`).join("<span>✦</span>")}</div></div></section>
<section class="sec"><div class="wrap"><div class="sec-h"><p class="kicker">Just in</p><h2 class="h2" data-split>Recently added watches</h2><a class="more" href="/watches">View all ${WATCHES.filter((w) => !w.sold).length} watches →</a></div>
<div class="grid" data-stagger>${f.slice(0, 8).map((w, i) => card(w, cur, i < 4)).join("")}</div></div></section>
<section class="doors"><div class="wrap doors-in" data-stagger>
<a class="door" href="/pre-owned"><span class="door-n">01</span><h3>Pre-owned</h3><p>Checked, timed and pressure-tested. Year, condition grade and box &amp; papers stated on every listing.</p><span class="door-go">Shop pre-owned →</span></a>
<a class="door" href="/new"><span class="door-n">02</span><h3>New</h3><p>Unworn watches with stickers and the brand's warranty card where the brand provides one.</p><span class="door-go">Shop new →</span></a>
<a class="door" href="/wholesale"><span class="door-n">03</span><h3>Wholesale</h3><p>Trade supply for dealers, jewelers and resellers in the US and Canada, from ${P.wholesaleMinUnits} pieces.</p><span class="door-go">Request trade stock →</span></a>
</div></section>
<section class="sec sec-ivory"><div class="wrap split">
<div><p class="kicker">Our guarantee</p><h2 class="h2" data-split>Opened, checked and timed — before it's listed.</h2><p class="lead dark">If any watch we sell is ever shown not to be genuine, you get the full purchase price back. No time limit.</p><a class="btn btn-ink" href="/authenticity">How we authenticate</a></div>
<ol class="steps" data-stagger><li><b>Reference &amp; serial</b><span>Matched to the model, dial and papers.</span></li><li><b>Dial, hands &amp; case</b><span>Inspected under magnification against the brand's specification.</span></li><li><b>Movement</b><span>Calibre identified; rate and amplitude measured on a timing machine.</span></li><li><b>Water resistance</b><span>Pressure-tested before it ships.</span></li></ol>
</div></section>
<section class="sec"><div class="wrap pay-band">
<div data-reveal="left"><p class="kicker">Payment</p><h2 class="h2">Crypto or bank wire.</h2><p class="lead">${PAY.map((m) => esc(PAY_LABEL[m])).join(" · ")}. Payment details are sent by email for your order only — never posted on a website. ${esc(holdNote())}</p><a class="btn btn-line" href="/how-to-pay">How to pay</a></div>
<div data-reveal="right"><p class="kicker">Delivery</p><h2 class="h2">Overnight. Insured. Signed for.</h2><p class="lead">${esc(P.shipping[0]!.toUpperCase() + P.shipping.slice(1))}, to all 50 states and every Canadian province. Dispatched within ${esc(P.dispatchDays)} of payment.</p><a class="btn btn-line" href="/shipping">Shipping &amp; insurance</a></div>
</div></section>
<section class="sec sec-ink2"><div class="wrap"><div class="sec-h"><p class="kicker">Guides</p><h2 class="h2" data-split>Buy with confidence</h2><a class="more" href="/guides">All guides →</a></div>
<div class="guides" data-stagger>${GUIDES.slice(0, 3).map(guideCard).join("")}</div></div></section>
<section class="sec"><div class="wrap narrow"><p class="kicker">Questions</p><h2 class="h2" data-split>Before you buy</h2>${faqHtml(FAQ.slice(0, 5))}<p><a class="more" href="/faq">All questions →</a></p></div></section>`,
  };
}
const guideCard = (g: (typeof GUIDES)[number]) => `<a class="g-card" href="/guides/${g.slug}"><span class="g-k">Guide</span><h3>${esc(g.title)}</h3><p>${esc(g.description)}</p><span class="g-go">Read →</span></a>`;

// ---------- listings ----------
function filters(ws: Watch[], showCond: boolean) {
  const brands = BRANDS.filter((b) => ws.some((w) => brandSlug(w.brand) === b.slug));
  return `<form class="filters" data-filters onsubmit="return false"><label><span>Brand</span><select name="brand"><option value="">All brands</option>${brands.map((b) => `<option value="${b.slug}">${esc(b.name)}</option>`).join("")}</select></label>
${showCond ? `<label><span>Condition</span><select name="cond"><option value="">New &amp; pre-owned</option><option value="new">New</option><option value="preowned">Pre-owned</option></select></label>` : ""}
<label><span>Sort</span><select name="sort"><option value="">Recommended</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="year-desc">Newest year</option></select></label>
<label class="f-q"><span>Search</span><input name="q" type="search" placeholder="Model, reference, dial…"></label><p class="f-count" data-count-out>${ws.length} watches</p></form>`;
}
function listing(o: { path: string; title: string; h1: string; kicker: string; intro: string; desc: string; ws: Watch[]; crumb: [string, string][]; showCond?: boolean; after?: string; cur: Cur }): Out {
  return {
    path: o.path, title: o.title, description: o.desc, jsonLd: [crumbLd(o.crumb), itemList(o.ws)],
    body: `<section class="page-hd"><div class="wrap">${crumbs(o.crumb)}<p class="kicker">${esc(o.kicker)}</p><h1 class="h1" data-split>${esc(o.h1)}</h1><p class="lead">${esc(o.intro)}</p></div></section>
<section class="sec sec-tight"><div class="wrap">${filters(o.ws, o.showCond ?? true)}
<div class="grid" data-list>${o.ws.map((w, i) => card(w, o.cur, i < 4)).join("")}</div><p class="empty" data-empty hidden>No watches match. <a href="/contact">Ask us to source one →</a></p></div></section>${o.after ?? ""}`,
  };
}
export const all = (cur: Cur) => listing({ cur, path: "/watches", title: "Luxury Watches for Sale — New & Pre-Owned", h1: "All watches", kicker: "The collection",
  intro: "Every watch is authenticated, priced in US dollars and shipped free, insured overnight to the US and Canada.",
  desc: "Shop authenticated new and pre-owned luxury watches: Rolex, Patek Philippe, Audemars Piguet, Omega, Cartier, Tudor and more. Free insured shipping in the US and Canada.",
  ws: WATCHES, crumb: [["/watches", "All watches"]] });
export const preowned = (cur: Cur) => listing({ cur, path: "/pre-owned", title: "Pre-Owned Luxury Watches — Authenticated", h1: "Pre-owned watches", kicker: "Pre-owned", showCond: false,
  intro: "Opened, timed and pressure-tested by a watchmaker. Every listing states the year, the condition grade and exactly what comes with it.",
  desc: "Authenticated pre-owned Rolex, Patek Philippe, Audemars Piguet, Omega and Breitling watches with box and papers. Full-refund authenticity guarantee, insured overnight shipping.",
  ws: WATCHES.filter((w) => w.cond === "preowned"), crumb: [["/pre-owned", "Pre-owned watches"]],
  after: `<section class="sec sec-ivory"><div class="wrap narrow prose">${md(`## How we grade pre-owned watches\n- **Unworn:** never worn; may still have protective stickers.\n- **Excellent:** light signs of wear visible only up close; no dents or deep scratches.\n- **Very good:** normal light wear such as hairlines on the bracelet or case.\n\nEvery pre-owned watch comes with our ${P.warrantyPreowned} and our [authenticity guarantee](/authenticity).`)}</div></section>` });
export const newWatches = (cur: Cur) => listing({ cur, path: "/new", title: "New Luxury Watches — Unworn, With Warranty", h1: "New watches", kicker: "New", showCond: false,
  intro: "Unworn watches with stickers, full box and the brand's warranty card where the brand provides one.",
  desc: "Buy new, unworn Omega, Cartier, Tudor and TAG Heuer watches with warranty. Pay by crypto or bank wire; free insured overnight shipping across the US and Canada.",
  ws: WATCHES.filter((w) => w.cond === "new"), crumb: [["/new", "New watches"]] });

export function brands(): Out {
  return {
    path: "/brands", title: "Watch Brands — Rolex, Patek Philippe, AP, Omega & More", description: "Browse authenticated new and pre-owned watches by brand: Rolex, Patek Philippe, Audemars Piguet, Omega, Cartier, Tudor, TAG Heuer, Breitling and IWC.",
    jsonLd: [crumbLd([["/brands", "Brands"]])],
    body: `<section class="page-hd"><div class="wrap">${crumbs([["/brands", "Brands"]])}<p class="kicker">Brands</p><h1 class="h1" data-split>Shop by brand</h1></div></section>
<section class="sec sec-tight"><div class="wrap brand-grid" data-stagger>${BRANDS.map((b) => { const n = WATCHES.filter((w) => brandSlug(w.brand) === b.slug).length; return `<a class="brand-card" href="/brands/${b.slug}"><h2>${esc(b.name)}</h2><p>${esc(b.line)}</p><span>${n} ${n === 1 ? "watch" : "watches"} →</span></a>`; }).join("")}</div></section>`,
  };
}
export function brand(cur: Cur, slug: string): Out | null {
  const b = BRANDS.find((x) => x.slug === slug);
  if (!b) return null;
  const ws = WATCHES.filter((w) => brandSlug(w.brand) === slug);
  return listing({ cur, path: `/brands/${slug}`, title: `${b.name} Watches for Sale — New & Pre-Owned`, h1: `${b.name} watches`, kicker: "Brand",
    intro: `${b.line} Authenticated, with free insured shipping to the US and Canada.`,
    desc: `Shop authenticated ${b.name} watches, new and pre-owned. ${b.line} Pay by crypto or bank wire, free insured overnight shipping.`,
    ws, crumb: [["/brands", "Brands"], [`/brands/${slug}`, b.name]],
    after: ws.length ? "" : `<section class="sec"><div class="wrap narrow"><p class="lead">New ${esc(b.name)} pieces arrive often. <a href="/contact">Tell us the reference you want →</a></p></div></section>` });
}

// ---------- product ----------
export function watch(cur: Cur, slug: string): Out | null {
  const w = BY_SLUG.get(slug);
  if (!w) return null;
  const rows: [string, string][] = [["Brand", w.brand], ["Model", w.model], ["Reference", w.ref], ["Year", w.cond === "new" ? `${w.year} (new)` : String(w.year)], ["Condition", w.cond === "new" ? "New, unworn" : `Pre-owned — ${w.grade}`], ["Box & papers", w.set], ["Case", `${w.caseMm} mm, ${w.material}`], ["Movement", w.movement], ["Dial", w.dial], ["Bracelet / strap", w.bracelet], ["Water resistance", w.water], ...(w.power ? [["Power reserve", w.power] as [string, string]] : [])];
  const related = WATCHES.filter((x) => x.slug !== w.slug && !x.sold && (x.brand === w.brand || x.cond === w.cond)).slice(0, 4);
  const bs = brandSlug(w.brand);
  const crumb: [string, string][] = [["/brands", "Brands"], [`/brands/${bs}`, w.brand], [`/watch/${w.slug}`, `${w.model} ${w.ref}`]];
  const wa = shown(SITE.whatsapp);
  const ask = `Hello, I'm interested in the ${watchTitle(w)} (${SITE.url}/watch/${w.slug}).`;
  const productLd = {
    "@context": "https://schema.org", "@type": "Product", name: watchTitle(w), sku: w.slug, mpn: w.ref, brand: { "@type": "Brand", name: w.brand }, image: [`${SITE.url}${img(w)}`],
    description: w.blurb, color: w.dial, material: w.material,
    offers: { "@type": "Offer", url: `${SITE.url}/watch/${w.slug}`, priceCurrency: "USD", price: w.price, availability: w.sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      itemCondition: w.cond === "new" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition", seller: { "@id": `${SITE.url}/#store` },
      shippingDetails: { "@type": "OfferShippingDetails", shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "USD" }, shippingDestination: [{ "@type": "DefinedRegion", addressCountry: "US" }, { "@type": "DefinedRegion", addressCountry: "CA" }],
        deliveryTime: { "@type": "ShippingDeliveryTime", handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" }, transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" } } },
      hasMerchantReturnPolicy: { "@type": "MerchantReturnPolicy", applicableCountry: ["US", "CA"], returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow", merchantReturnDays: P.returnDays, returnMethod: "https://schema.org/ReturnByMail", returnFees: "https://schema.org/ReturnShippingFees" } },
  };
  return {
    path: `/watch/${w.slug}`, ogType: "product", image: img(w).endsWith(".svg") ? undefined : `${SITE.url}${img(w)}`,
    title: `${watchTitle(w)} — ${condLabel(w)}`,
    description: `${condLabel(w)} ${watchName(w)} ref. ${w.ref}${w.cond === "preowned" ? `, ${w.year}, ${w.grade?.toLowerCase()} condition` : ""}, ${w.set.toLowerCase()}. ${w.caseMm} mm ${w.material}. Authenticated, free insured shipping US & Canada.`,
    jsonLd: [crumbLd(crumb), productLd],
    scriptData: { product: w.slug },
    body: `<section class="pdp"><div class="wrap">${crumbs(crumb)}<div class="pdp-in">
<div class="pdp-media" data-reveal="zoom"><div class="pdp-img"><img src="${img(w)}" alt="${esc(watchTitle(w))}" width="400" height="560" fetchpriority="high"></div>${img(w).endsWith(".svg") ? `<p class="small muted">Illustration. Ask for real photos or a live video of this exact watch.</p>` : ""}</div>
<div class="pdp-info"><p class="kicker"><a href="/brands/${bs}">${esc(w.brand)}</a> · ${condLabel(w)}</p><h1 class="h1 pdp-h">${esc(w.model)}</h1><p class="pdp-ref">Ref. ${esc(w.ref)} · ${w.cond === "new" ? "New" : w.year} · ${esc(w.set)}</p>
<p class="pdp-price">${money(w.price)}${cur === "CAD" ? ` <small>${money(w.price, "CAD")}</small>` : ""}</p>
${w.sold ? `<p class="sold-note">This watch has been sold. <a href="/contact">Ask us to find another →</a></p>` : `<div class="pdp-cta"><button class="btn btn-gold" type="button" data-add="${w.slug}" data-go="1">Buy now</button><button class="btn btn-line" type="button" data-add="${w.slug}">Add to bag</button></div>`}
<p class="pdp-ask">${wa ? `<a href="https://wa.me/${wa.replace(/\D/g, "")}?text=${encodeURIComponent(ask)}">Ask on WhatsApp</a> · ` : ""}<a href="mailto:${SITE.email}?subject=${encodeURIComponent(watchTitle(w))}&amp;body=${encodeURIComponent(ask)}">Ask by email</a> · <a href="/contact">Request a live video</a></p>
<ul class="pdp-trust"><li>Authenticity guaranteed — full refund if ever shown not genuine</li><li>${esc(P.shipping[0]!.toUpperCase() + P.shipping.slice(1))}</li><li>${P.returnDays}-day returns · ${esc(w.cond === "new" ? P.warrantyNew : P.warrantyPreowned)}</li><li>Pay by crypto (BTC, ETH, USDT, USDC) or bank wire</li></ul>
<p class="pdp-blurb">${esc(w.blurb)}</p>
<table class="specs"><tbody>${rows.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}</tbody></table>
</div></div></div></section>
${related.length ? `<section class="sec"><div class="wrap"><div class="sec-h"><h2 class="h2">You may also like</h2></div><div class="grid" data-stagger>${related.map((x) => card(x, cur)).join("")}</div></div></section>` : ""}`,
  };
}

// ---------- bag / checkout ----------
export function bag(): Out {
  const opts = (list: string[]) => list.map((s) => `<option>${s}</option>`).join("");
  return {
    path: "/bag", noindex: true, title: "Your bag", description: "Your shopping bag and secure checkout.",
    scriptData: { catalog: Object.fromEntries(WATCHES.map((w) => [w.slug, { n: watchName(w), r: w.ref, p: w.price, i: img(w), c: condLabel(w), y: w.year, s: w.sold ? 1 : 0 }])), us: US_STATES, ca: CA_PROV },
    body: `<section class="page-hd"><div class="wrap"><p class="kicker">Checkout</p><h1 class="h1">Your bag</h1></div></section>
<section class="sec sec-tight"><div class="wrap co">
<div class="co-bag"><div data-bag><p class="muted">Loading…</p></div></div>
<form class="co-form" data-checkout novalidate>
<h2 class="h3">1. Your details</h2>
<div class="row2"><label>Full name<input name="fullName" required autocomplete="name" maxlength="120"></label><label>Email<input name="email" type="email" required autocomplete="email" maxlength="200"></label></div>
<label>Phone / WhatsApp<input name="phone" type="tel" required autocomplete="tel" maxlength="40"></label>
<h2 class="h3">2. Delivery address</h2>
<div class="row2"><label>Country<select name="country" required data-country><option value="US">United States</option><option value="CA">Canada</option></select></label><label><span data-region-label>State</span><select name="region" required data-region><option value="">Choose…</option>${opts(US_STATES)}</select></label></div>
<label>Street address<input name="address" required autocomplete="street-address" maxlength="300"></label>
<div class="row2"><label>City<input name="city" required autocomplete="address-level2" maxlength="100"></label><label><span data-postal-label>ZIP code</span><input name="postal" required autocomplete="postal-code" maxlength="12"></label></div>
<p class="small muted">We ship to street addresses only — no P.O. boxes or freight forwarders. Adult signature required.</p>
<h2 class="h3">3. Payment method</h2>
<div class="paylist">${PAY.map((m, i) => `<label class="pay"><input type="radio" name="payment" value="${m}"${i === 0 ? " checked" : ""}><span><b>${esc(PAY_LABEL[m])}</b><small>${esc(PAY_NOTE[m])}</small></span></label>`).join("")}</div>
<p class="small muted">We email the payment details for your order after checkout. ${esc(holdNote())}</p>
<label>Notes (optional)<textarea name="notes" rows="3" maxlength="2000" placeholder="Engraving questions, delivery instructions, trade-in…"></textarea></label>
<label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
<label class="check"><input type="checkbox" name="agree" required><span>I agree to the <a href="/terms" target="_blank">terms of sale</a>, <a href="/returns" target="_blank">returns policy</a> and <a href="/privacy" target="_blank">privacy policy</a>.</span></label>
<p class="form-err" data-err role="alert" hidden></p>
<button class="btn btn-gold btn-wide" type="submit" data-submit>Place order</button>
<p class="small muted">Prices in US dollars. Nothing is charged now — you pay after we confirm the watch is reserved.</p>
</form></div></section>`,
  };
}
export function thanks(n: string): Out {
  return {
    path: "/thanks", noindex: true, title: "Thank you — order received", description: "Your order has been received.",
    body: `<section class="page-hd center"><div class="wrap narrow"><p class="kicker">Order ${esc(n)}</p><h1 class="h1">Thank you. Your watch is reserved.</h1>
<p class="lead">We've emailed your order confirmation${n ? ` (${esc(n)})` : ""} with the payment details. ${esc(holdNote())} Please put your order number in the payment reference.</p>
<p class="lead">Only pay to the details in the email from ${esc(SITE.email)}. We never change payment details by phone or text.</p>
<p><a class="btn btn-line" href="/watches">Continue browsing</a></p></div></section>`,
  };
}

// ---------- wholesale ----------
export function wholesale(): Out {
  const items: [string, string][] = [
    ["Who can apply?", "Registered watch dealers, jewelers, pawn and pre-owned stores and established online resellers in the US and Canada."],
    ["What is the minimum order?", `${P.wholesaleMinUnits} pieces per order, any mix of brands and conditions.`],
    ["Which brands are available?", `Mainly Rolex, Omega, Tudor, Cartier, TAG Heuer, Breitling and IWC, with Patek Philippe and Audemars Piguet on request. Stock changes weekly; we send a current list after your request.`],
    ["How do I pay?", "By bank wire or in USDT/USDC. Trade invoices are issued in US dollars."],
    ["Do you need a resale certificate?", "US buyers: please include your state resale certificate number so we can document a sale for resale. Canadian buyers: include your business number."],
  ];
  return {
    path: "/wholesale", title: "Wholesale Luxury Watches for Dealers — US & Canada",
    description: `Trade supply of authenticated new and pre-owned luxury watches for dealers, jewelers and resellers in the US and Canada. From ${P.wholesaleMinUnits} pieces. Request current stock and trade pricing.`,
    jsonLd: [crumbLd([["/wholesale", "Wholesale"]]), faqLd(items)],
    body: `<section class="page-hd"><div class="wrap">${crumbs([["/wholesale", "Wholesale"]])}<p class="kicker">Trade</p><h1 class="h1" data-split>Wholesale watches for dealers</h1>
<p class="lead">Authenticated new and pre-owned luxury watches by the piece or by the lot, for dealers, jewelers and resellers across the US and Canada.</p></div></section>
<section class="sec sec-tight"><div class="wrap split">
<div><ol class="steps" data-stagger><li><b>Tell us what you need</b><span>Brands, references, condition, quantity and budget.</span></li><li><b>Receive the stock list</b><span>Current pieces with references, years, condition and trade prices.</span></li><li><b>Confirm and pay</b><span>Trade invoice in USD, paid by wire or stablecoin.</span></li><li><b>Insured delivery</b><span>Each watch authenticated and shipped overnight, insured, signed for.</span></li></ol>
${faqHtml(items)}</div>
<form class="co-form card-form" data-form="/api/wholesale" novalidate><h2 class="h3">Request trade stock</h2>
<div class="row2"><label>Company<input name="company" required maxlength="160"></label><label>Contact name<input name="name" required maxlength="120"></label></div>
<div class="row2"><label>Email<input name="email" type="email" required maxlength="200"></label><label>Phone / WhatsApp<input name="phone" type="tel" required maxlength="40"></label></div>
<div class="row2"><label>Country<select name="country"><option value="US">United States</option><option value="CA">Canada</option></select></label><label>Business type<select name="bizType"><option value="dealer">Watch dealer</option><option value="jeweler">Jeweler</option><option value="pawn">Pawn / pre-owned store</option><option value="online">Online reseller</option><option value="other">Other</option></select></label></div>
<label>Resale certificate / business number<input name="taxId" maxlength="60"></label>
<div class="row2"><label>Condition<select name="cond"><option value="both">New &amp; pre-owned</option><option value="new">New only</option><option value="preowned">Pre-owned only</option></select></label><label>Pieces per order<select name="qty"><option>${P.wholesaleMinUnits}–10</option><option>11–25</option><option>26–50</option><option>50+</option></select></label></div>
<label>Brands and references wanted<textarea name="brands" rows="3" required maxlength="1500" placeholder="e.g. Rolex Submariner 126610LN ×3, Omega Speedmaster ×5, Tudor BB58…"></textarea></label>
<label>Budget per order (USD)<select name="budget"><option>Under $25,000</option><option>$25,000–$100,000</option><option>$100,000–$250,000</option><option>Over $250,000</option></select></label>
<label>Anything else (optional)<textarea name="message" rows="3" maxlength="2000"></textarea></label>
<label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
<p class="form-err" data-err role="alert" hidden></p><p class="form-ok" data-ok hidden>Thank you — your request is in. We reply with current stock and trade pricing within one business day.</p>
<button class="btn btn-gold btn-wide" type="submit">Send request</button></form>
</div></section>`,
  };
}

// ---------- info pages ----------
function info(path: string, title: string, h1: string, kicker: string, desc: string, body: string, extraLd: object[] = []): Out {
  const crumb: [string, string][] = [[path, h1]];
  return { path, title, description: desc, jsonLd: [crumbLd(crumb), ...extraLd],
    body: `<section class="page-hd"><div class="wrap narrow">${crumbs(crumb)}<p class="kicker">${esc(kicker)}</p><h1 class="h1" data-split>${esc(h1)}</h1></div></section><section class="sec sec-tight"><div class="wrap narrow prose">${body}</div></section>` };
}
export const authenticity = () => info("/authenticity", "Authenticity Guarantee — How We Check Every Watch", "Authenticity guarantee", "Our promise", "How Aurelium Watches authenticates every new and pre-owned watch: reference and serial, dial, movement and water resistance — with a full-refund guarantee.", md(POLICIES.authenticity));
export const shipping = () => info("/shipping", "Free Insured Shipping — USA & Canada", "Shipping & insurance", "Delivery", "Free, fully insured overnight shipping with adult signature for every watch, to all US states and every Canadian province.", md(POLICIES.shipping));
export const returns = () => info("/returns", "Returns & Warranty", "Returns & warranty", "Peace of mind", `${P.returnDays}-day returns on unworn watches, and a 12-month warranty on every pre-owned watch. How returns, refunds and warranty work at Aurelium Watches.`, md(POLICIES.returns));
export const howToPay = () => info("/how-to-pay", "How to Pay — Crypto (BTC, ETH, USDT, USDC) or Bank Wire", "How to pay", "Payment", "Pay for your watch with Bitcoin, Ethereum, USDT, USDC or bank wire. How checkout, payment details and reservation work, and how to pay safely.", md(POLICIES.payment));
export const terms = () => ({ ...info("/terms", "Terms of Sale", "Terms of sale", "Legal", "Terms of sale for watches bought from Aurelium Watches: prices, payment, ownership, shipping, returns and trademarks.", md(POLICIES.terms)), noindex: true });
export const privacy = () => ({ ...info("/privacy", "Privacy Policy", "Privacy", "Legal", "How Aurelium Watches collects, uses and protects your personal information.", md(POLICIES.privacy)), noindex: true });
export const faq = () => info("/faq", "FAQ — Buying a Luxury Watch From Aurelium", "Frequently asked questions", "Help", "Answers about authenticity, payment by crypto or wire, insured shipping to the US and Canada, returns, warranty, trade-ins and wholesale.", faqHtml(FAQ), [faqLd(FAQ)]);
export const about = () => info("/about", "About Aurelium Watches", "About us", "Who we are", "Aurelium Watches is an independent dealer of authenticated new and pre-owned luxury watches, serving collectors and the trade across the US and Canada.",
  md(`${SITE.name} is an independent dealer of new and pre-owned luxury watches, serving collectors and the trade across the United States and Canada.

## What we believe
- **Every watch checked.** Nothing is listed until a watchmaker has opened, timed and pressure-tested it. See [how we authenticate](/authenticity).
- **Plain descriptions.** Year, condition grade and exactly what comes in the box — written on every listing.
- **Delivered safely.** Free insured overnight delivery with signature, to the US and Canada.

## Buy, sell and trade
We buy watches and take trade-ins, source specific references on request and supply dealers through our [wholesale program](/wholesale).

## Contact
${companyName()} · ${[shown(SITE.address1), shown(SITE.address2)].filter(Boolean).join(", ") || "United States"} · [${SITE.email}](mailto:${SITE.email})`));
export function canada(cur: Cur): Out {
  return info("/canada", "Luxury Watches Shipped to Canada — Insured, All Provinces", "Shipping luxury watches to Canada", "Canada", "Buy authenticated Rolex, Omega, Cartier and more from Aurelium Watches with free insured delivery to every Canadian province. Customs, GST/HST and payment explained.",
    md(`We ship to every Canadian province and territory — free, fully insured, with adult signature. Prices on the site show an approximate Canadian-dollar figure${cur === "CAD" ? " (you're seeing it now)" : ""}; orders are charged in US dollars.

## Customs, duty and GST/HST
Every parcel goes with a commercial invoice showing the true value and the country of manufacture. GST or HST, and any duty that applies, is collected by the carrier at delivery. Read our guide: [buying a luxury watch from the US in Canada](/guides/buying-a-luxury-watch-from-the-us-in-canada).

## Paying from Canada
Pay with Bitcoin, Ethereum, USDT, USDC, or an international bank wire in US dollars. See [how to pay](/how-to-pay).

## Returns
Our ${P.returnDays}-day [returns policy](/returns) applies to Canadian orders.

[Shop pre-owned](/pre-owned) · [Shop new](/new) · [Wholesale for Canadian dealers](/wholesale)`));
}
export function contact(): Out {
  const phone = shown(SITE.phone), wa = shown(SITE.whatsapp);
  return {
    path: "/contact", title: "Contact Aurelium Watches", description: "Questions about a watch, a live video request, selling or trading in your watch, or sourcing a reference? Contact Aurelium Watches by email, phone or WhatsApp.",
    jsonLd: [crumbLd([["/contact", "Contact"]])],
    body: `<section class="page-hd"><div class="wrap">${crumbs([["/contact", "Contact"]])}<p class="kicker">Contact</p><h1 class="h1" data-split>Talk to a watch specialist</h1></div></section>
<section class="sec sec-tight"><div class="wrap split">
<div class="prose"><p class="lead">Ask about a watch, request a live video, sell or trade in a watch, or ask us to find a reference.</p>
<p><b>Email</b><br><a href="mailto:${SITE.email}">${SITE.email}</a></p>${phone ? `<p><b>Phone</b><br><a href="tel:${phone.replace(/[^\d+]/g, "")}">${esc(phone)}</a></p>` : ""}${wa ? `<p><b>WhatsApp</b><br><a href="https://wa.me/${wa.replace(/\D/g, "")}">${esc(wa)}</a></p>` : ""}
<p><b>Hours</b><br>${esc(SITE.hours)}</p>${[shown(SITE.address1), shown(SITE.address2)].filter(Boolean).length ? `<p><b>Office</b><br>${[shown(SITE.address1), shown(SITE.address2)].filter(Boolean).map(esc).join("<br>")}<br><span class="small muted">Viewing by appointment only.</span></p>` : ""}</div>
<form class="co-form card-form" data-form="/api/contact" novalidate><h2 class="h3">Send a message</h2>
<div class="row2"><label>Name<input name="name" required maxlength="120"></label><label>Email<input name="email" type="email" required maxlength="200"></label></div>
<div class="row2"><label>Phone (optional)<input name="phone" type="tel" maxlength="40"></label><label>Topic<select name="topic"><option>A watch on the site</option><option>Live video request</option><option>Sell or trade in my watch</option><option>Find a reference for me</option><option>Order or payment</option><option>Other</option></select></label></div>
<label>Message<textarea name="message" rows="5" required maxlength="3000"></textarea></label>
<label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
<p class="form-err" data-err role="alert" hidden></p><p class="form-ok" data-ok hidden>Thank you — we reply within one business day.</p>
<button class="btn btn-gold btn-wide" type="submit">Send message</button></form></div></section>`,
  };
}

// ---------- guides ----------
export function guides(): Out {
  return {
    path: "/guides", title: "Watch Buying Guides — Authenticity, Crypto, Canada", description: "Practical guides for buying a new or pre-owned luxury watch: how to spot a fake, box and papers, paying with crypto and buying from Canada.",
    jsonLd: [crumbLd([["/guides", "Guides"]])],
    body: `<section class="page-hd"><div class="wrap">${crumbs([["/guides", "Guides"]])}<p class="kicker">Guides</p><h1 class="h1" data-split>Watch buying guides</h1></div></section>
<section class="sec sec-tight"><div class="wrap guides" data-stagger>${[...GUIDES].reverse().map(guideCard).join("")}</div></section>`,
  };
}
export function guide(slug: string): Out | null {
  const g = GUIDE_BY_SLUG.get(slug);
  if (!g) return null;
  const crumb: [string, string][] = [["/guides", "Guides"], [`/guides/${g.slug}`, g.title]];
  const others = GUIDES.filter((x) => x.slug !== g.slug).slice(-3);
  return {
    path: `/guides/${g.slug}`, ogType: "article", title: g.title, description: g.description,
    jsonLd: [crumbLd(crumb), { "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.description, datePublished: g.published, dateModified: g.updated ?? g.published, author: { "@type": "Organization", name: SITE.name }, publisher: { "@id": `${SITE.url}/#store` }, mainEntityOfPage: `${SITE.url}/guides/${g.slug}` }],
    body: `<article><section class="page-hd"><div class="wrap narrow">${crumbs(crumb)}<p class="kicker">Guide · <time datetime="${g.updated ?? g.published}">${new Date(g.updated ?? g.published).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time></p><h1 class="h1">${esc(g.title)}</h1><p class="lead">${esc(g.description)}</p></div></section>
<section class="sec sec-tight"><div class="wrap narrow prose">${md(g.body)}</div></section></article>
<section class="sec sec-ink2"><div class="wrap"><div class="sec-h"><h2 class="h2">From the collection</h2><a class="more" href="/watches">All watches →</a></div><div class="grid" data-stagger>${feat().slice(0, 4).map((w) => card(w, "USD")).join("")}</div></div></section>
<section class="sec"><div class="wrap"><div class="sec-h"><h2 class="h2">More guides</h2></div><div class="guides">${others.map(guideCard).join("")}</div></div></section>`,
  };
}

export const notFound = (): Out => ({
  path: "/404", noindex: true, title: "Page not found", description: "This page could not be found.",
  body: `<section class="page-hd center"><div class="wrap narrow"><p class="kicker">404</p><h1 class="h1">This page has stopped ticking.</h1><p class="lead">The watch may have been sold or the link has changed.</p><p><a class="btn btn-gold" href="/watches">See all watches</a></p></div></section>`,
});
