import { PROMISES, SITE, companyName } from "./site";

const P = PROMISES;
export const FAQ: [string, string][] = [
  ["Are your watches authentic?", `Yes. Every watch is inspected by a watchmaker before it is listed: case, dial, hands, movement, serial and reference numbers, bracelet and papers are checked against the brand's specifications. If any watch we sell is ever shown not to be authentic, we refund the full purchase price. See our authenticity guarantee.`],
  ["What is the difference between new and pre-owned?", `New watches are unworn, with stickers and the brand's warranty card where the brand provides one. Pre-owned watches have had an owner; each listing states the condition grade (Unworn, Excellent or Very good), the year and exactly what comes with it (box and papers, papers only or watch only).`],
  ["How do I pay?", `At checkout you choose cryptocurrency (Bitcoin, Ethereum, USDT or USDC) or a bank wire / ACH. We email the payment details for your order — they never appear on the website. ${`We reserve the watch for ${P.holdHours} hours while your payment arrives.`}`],
  ["How is the crypto amount calculated?", `Prices are set in US dollars. When we confirm your order by email, we give you the exact coin amount at the current market rate and the wallet address. Stablecoins (USDT, USDC) are paid one-to-one in dollars.`],
  ["Do you ship to Canada?", `Yes, to every province and territory. Shipping is ${P.shipping}. Canadian buyers pay any import duties and GST/HST charged at delivery; the watch's country of origin and value are declared accurately on the customs paperwork.`],
  ["How long does delivery take?", `We dispatch within ${P.dispatchDays} after your payment is received. Delivery is overnight to most US and Canadian addresses, and every parcel is insured for its full value until it is signed for.`],
  ["Can I return a watch?", `Yes, within ${P.returnDays} days of delivery, if the watch is unworn and in the same condition, with all stickers, tags and papers it came with. Contact us first for a return authorization.`],
  ["Is there a warranty?", `Pre-owned watches come with our ${P.warrantyPreowned}. New watches come with the ${P.warrantyNew}.`],
  ["Do you buy watches or take trade-ins?", `Yes. Send us photos, the reference number and what comes with the watch, and we will make an offer or a trade-in value toward a watch from our collection.`],
  ["Can I see a watch on video before buying?", `Yes. Ask for a live video call or extra photos and videos of any listed watch, including the caseback and serial.`],
  ["Do you sell wholesale to dealers?", `Yes, to watch dealers, jewelers and resellers in the US and Canada, from ${P.wholesaleMinUnits} pieces per order. Use the wholesale request form and we reply with available stock and trade pricing.`],
];

export const POLICIES = {
  shipping: `## Free insured shipping
Every order ships ${P.shipping}. The parcel is insured for its full value from our office until it is signed for at your address. Nothing on the outside of the box shows that it contains a watch.

## When your watch ships
We dispatch within ${P.dispatchDays} after your payment is received. You get a tracking number by email the same day.

## Where we ship
All 50 US states, Washington D.C., Puerto Rico and every Canadian province and territory. We do not ship to P.O. boxes or freight forwarders.

## Canada
Canadian orders ship with full customs paperwork. Import duties and GST/HST, if charged, are collected by the carrier at delivery. See [shipping to Canada](/canada).`,
  returns: `## ${P.returnDays}-day returns
If a watch is not right for you, you can return it within ${P.returnDays} days of delivery. It must be unworn and in the same condition, with all stickers, tags, boxes and papers it came with. Contact us first for a return authorization; returns are shipped insured.

## Refunds
Once the watch is back and inspected, we refund the purchase price to you by bank wire or in the stablecoin you paid with, within 5 business days. Shipping costs for returns are paid by the buyer unless the watch was not as described.

## Warranty
- Pre-owned watches: ${P.warrantyPreowned} covering the movement.
- New watches: ${P.warrantyNew}.
- The warranty does not cover damage from accidents, water entry after the case has been opened by someone else, or normal wear to straps, crystals and plating.

## Not as described
If a watch arrives in a different condition from its listing, tell us within 3 days of delivery and we cover return shipping and a full refund.`,
  authenticity: `## Our authenticity guarantee
Every watch we sell is genuine. If any watch bought from ${SITE.name} is ever shown not to be authentic by the brand or an independent authentication service, we refund the full purchase price — no time limit.

## How each watch is checked
- **Reference and serial:** the case, serial and reference numbers are checked against the brand's records and the papers, where available.
- **Case, dial and hands:** printing, applied markers, lume, crystal and bezel are checked under magnification against the brand's specification.
- **Movement:** the caseback is opened where appropriate, the calibre is identified, and rate, amplitude and power reserve are measured on a timing machine.
- **Bracelet and clasp:** codes, end links and clasp are checked for originality.
- **Water resistance:** pressure-tested before shipping.

## What comes with your watch
Each listing states exactly what is included: box and papers, papers only, or watch only, plus the year on the papers. Ask for photos of the papers before you buy.`,
  payment: `## Payment methods
- **Bitcoin (BTC)**, **Ethereum (ETH)**
- **Tether (USDT)** on TRC-20 or ERC-20, **USD Coin (USDC)** on ERC-20
- **Bank wire / ACH** — US domestic wire or ACH, or international wire in USD from Canada

## How it works
1. Add a watch to your bag and complete checkout — choose how you want to pay.
2. We confirm the watch is reserved and email the payment details: the wallet address and exact coin amount, or our bank details. Payment details never appear on the website.
3. Send the payment with your order number as the reference. We reserve the watch for ${P.holdHours} hours.
4. As soon as the payment is received, your watch is shipped ${P.shipping}.

## Safety
Only send money to the details in the email from ${SITE.email} that carries your order number. We never change payment details by phone or by text message. If you are unsure, call or WhatsApp us before you pay.`,
  terms: `## Who we are
${SITE.name} is operated by ${companyName()}. Contact: ${SITE.email}.

## Prices and availability
Prices are in US dollars. Canadian-dollar figures are shown for reference only. Most watches are one of a kind; an order is confirmed once we email you that the watch is reserved. If a watch is sold before your order reaches us, we refund any payment in full.

## Payment
Orders are paid by cryptocurrency or bank wire as described on the [how to pay](/how-to-pay) page. Ownership passes to you once payment has been received in full.

## Shipping, returns and warranty
See [shipping](/shipping) and [returns & warranty](/returns).

## Trademarks
${SITE.name} is an independent dealer and is not affiliated with any watch brand. Brand and model names are used only to describe the watches offered.

## Governing law
These terms are governed by the laws of the state in which ${companyName()} is registered.`,
  privacy: `## What we collect
When you place an order or send a request we collect your name, email, phone, shipping address and the details of your order. We use them only to process your order, ship it and answer you.

## What we don't do
We do not sell your data. We do not store card details (we don't take cards). Payment details for your order are sent to you by email only.

## Cookies
We use a small cookie to remember your currency choice, and your bag is stored in your own browser.

## Your rights
Write to ${SITE.email} to see, correct or delete your data.`,
};

/** Tiny markdown → HTML (## h2, ### h3, - lists, 1. lists, **bold**, [text](link)). */
export function md(s: string) {
  const inline = (x: string) => x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  const out: string[] = []; let list: "ul" | "ol" | null = null;
  const close = () => { if (list) { out.push(`</${list}>`); list = null; } };
  for (const raw of s.split("\n")) {
    const line = raw.trim();
    if (!line) { close(); continue; }
    let m;
    if ((m = line.match(/^(#{2,3}) (.+)$/))) { close(); out.push(`<h${m[1]!.length}>${inline(m[2]!)}</h${m[1]!.length}>`); }
    else if ((m = line.match(/^- (.+)$/))) { if (list !== "ul") { close(); out.push("<ul>"); list = "ul"; } out.push(`<li>${inline(m[1]!)}</li>`); }
    else if ((m = line.match(/^\d+\. (.+)$/))) { if (list !== "ol") { close(); out.push("<ol>"); list = "ol"; } out.push(`<li>${inline(m[1]!)}</li>`); }
    else { close(); out.push(`<p>${inline(line)}</p>`); }
  }
  close();
  return out.join("\n");
}
