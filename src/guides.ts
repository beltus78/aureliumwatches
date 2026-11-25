// Watch guides (SEO). Served at /guides/<slug>. Append new guides at the end.
// Body: markdown subset — "## " / "### " headings, "- " or "1. " lists, **bold**, [text](/link). Internal links must be real URLs
// (/watches, /pre-owned, /new, /brands/<slug>, /watch/<slug>, /wholesale, /authenticity, /how-to-pay, /shipping, /returns, /faq, /canada, /contact).
// Never: fake reviews, invented statistics, prices in guide text, promises beyond src/site.ts PROMISES.
export type Guide = { slug: string; title: string; description: string; published: string; updated?: string; keyword: string; body: string };

export const GUIDES: Guide[] = [
  {
    slug: "how-to-tell-if-a-rolex-is-real",
    title: "How to Tell if a Rolex Is Real: A Buyer's Checklist",
    description: "The checks a watchmaker uses to authenticate a Rolex — serial and reference, dial printing, cyclops, rehaut, bracelet codes and movement — before you buy pre-owned.",
    published: "2026-11-25",
    keyword: "how to tell if a rolex is real",
    body: `Counterfeit Rolex watches have become very good from a distance. Up close, and with the right checks, they still give themselves away. This is the checklist we use before any pre-owned Rolex is listed on [our pre-owned page](/pre-owned).

## 1. Match the reference and the serial
Every modern Rolex has a model reference engraved between the lugs at 12 o'clock and a serial number engraved on the rehaut (the inner ring between dial and crystal) at 6 o'clock. The reference must match the model, dial and bezel in front of you, and the serial should match the warranty card if the watch has papers. A reference that does not exist for that dial colour, or a serial that differs from the papers, is the first red flag.

## 2. Look at the rehaut
Since the mid-2000s Rolex engraves "ROLEX ROLEX ROLEX" around the rehaut. On a genuine watch the letters are crisp, evenly spaced and line up exactly with the minute markers. Fakes often show uneven depth or letters that drift out of alignment.

## 3. Check the dial printing under magnification
Use a 10x loupe. Genuine dials have sharp, raised printing with clean edges and perfectly even spacing; applied hour markers sit straight and are filled with even lume. Smudged letters, rough edges on the crown logo or lume that glows unevenly suggest a replacement or fake dial.

## 4. The cyclops lens
On date models the cyclops magnifies the date about 2.5 times, so the date fills the lens. Many fakes magnify less and the date looks small and floating.

## 5. Weight and finishing
Oystersteel and solid gold feel dense. Bracelet links should be solid, end links should fit the case with no gaps, and the clasp should close with a firm, precise click. Brushed and polished surfaces meet in clean lines.

## 6. The movement
This is the only check that is conclusive. A watchmaker opens the caseback and identifies the calibre — a genuine Rolex movement has specific finishing, engravings and parts. On a timing machine it should run within chronometer tolerance. We do this for every watch; see [how we authenticate](/authenticity).

## 7. Box and papers are helpful, not proof
Papers can be faked as well. They add value and history, but they only count when the serial and reference match the watch. Read [what "box and papers" means](/guides/box-and-papers-explained).

## Buy from someone who guarantees it
The simplest protection is a seller who opens the watch, puts the result in writing and refunds you in full if it is ever shown not to be genuine. Every Rolex in our collection comes with that guarantee — browse [pre-owned Rolex watches](/brands/rolex) or ask us for a live video of any piece.`,
  },
  {
    slug: "buying-a-luxury-watch-with-crypto",
    title: "Buying a Luxury Watch With Crypto: How It Works and How to Stay Safe",
    description: "How paying for a Rolex, Patek Philippe or Omega with Bitcoin, Ethereum, USDT or USDC works, how the amount is set, and the checks that keep your payment safe.",
    published: "2026-11-25",
    keyword: "buy luxury watch with crypto",
    body: `More watch buyers in the US and Canada now pay with crypto. It is fast, it works across borders and it avoids card limits on large purchases. It also cannot be reversed, so the process and the seller matter. Here is how it works with us and what to check with any dealer.

## Which coins can you use?
We accept **Bitcoin (BTC)**, **Ethereum (ETH)**, **Tether (USDT)** on TRC-20 or ERC-20 and **USD Coin (USDC)** on ERC-20. Stablecoins are the simplest: the dollar price is paid one-to-one, so the amount never moves while you send it.

## How the amount is set
Watch prices are set in US dollars. After checkout we email you the exact coin amount at the current market rate and the wallet address for your order. For BTC and ETH, send within the time given in the email so the rate still applies. Full steps are on [how to pay](/how-to-pay).

## Send on the right network
USDT exists on several networks. Sending USDT on the wrong network to an address can mean the funds are lost. Always copy the address and network exactly from the email for your order, and send a small test amount first if you are unsure.

## Safety checks before you pay
- **Only use payment details from the email carrying your order number.** A real dealer never changes wallet addresses by text, social media or a phone call.
- **Ask for a live video** of the exact watch with today's date on a piece of paper.
- **Get the authenticity guarantee in writing.** Ours is a full refund if the watch is ever shown not to be genuine — see [our authenticity guarantee](/authenticity).
- **Check returns and shipping.** Insured, signed-for delivery and a return window protect you after payment. See [shipping](/shipping) and [returns](/returns).

## Taxes and records
Spending crypto can be a taxable event in both the US and Canada. Keep the order confirmation and the transaction hash; your accountant will want both.

## Ready to buy?
Browse [new watches](/new) and [pre-owned watches](/pre-owned), add one to your bag and choose crypto at checkout. Questions first? [Contact us](/contact).`,
  },
  {
    slug: "box-and-papers-explained",
    title: "Box and Papers Explained: Does a Full Set Matter When Buying a Watch?",
    description: "What box and papers means for a pre-owned Rolex, Omega or Patek Philippe, why a full set holds value, and what to check before paying more for one.",
    published: "2026-11-25",
    keyword: "watch box and papers",
    body: `"Box and papers" is the first thing many buyers look for on a pre-owned luxury watch. It usually adds to the price, so it is worth knowing what it really means.

## What counts as "papers"?
The papers are the brand's warranty card or certificate, dated and stamped when the watch was first sold, with the serial number and reference. For modern Rolex watches this is a plastic warranty card; older watches had paper certificates. Manuals, hang tags and the outer box are nice extras but are not the papers.

## Full set, papers only, watch only
- **Box and papers (full set):** original box, warranty card and usually tags and booklets.
- **Papers only:** the warranty card without the original box.
- **Watch only:** no papers. The watch can be just as genuine; it simply has less documented history.
Every listing in [our collection](/watches) says which of these you get.

## Why a full set holds value
Papers show where and when the watch was first sold and that the serial matches. Collectors pay more for that history, and a full set is usually easier to resell later.

## What to check
- The serial on the card must match the serial on the watch.
- The reference on the card must match the model and dial.
- The date and the dealer stamp should be plausible for that model's production years.
Papers can be faked, so they do not replace a physical inspection. Read [how to tell if a Rolex is real](/guides/how-to-tell-if-a-rolex-is-real).

## Is a watch without papers worth buying?
Yes, if it has been authenticated by someone who opens the case and guarantees the result. A watch-only piece is often the better value if you plan to wear it rather than resell it. Every watch we sell, with or without papers, carries [our authenticity guarantee](/authenticity).`,
  },
  {
    slug: "buying-a-luxury-watch-from-the-us-in-canada",
    title: "Buying a Luxury Watch From the US in Canada: Shipping, Duties and GST/HST",
    description: "What Canadian buyers should know when ordering a Rolex, Omega or Cartier from a US dealer: insured shipping, customs paperwork, duties, GST/HST and returns.",
    published: "2026-11-25",
    keyword: "buy luxury watch canada",
    body: `The US pre-owned market is the largest in North America, so many Canadian collectors look south for the reference they want. Here is what to expect when the watch crosses the border.

## Shipping
We ship to every province and territory with full insurance until the parcel is signed for. See [shipping to Canada](/canada) and [shipping & insurance](/shipping).

## Customs paperwork
Every Canadian parcel travels with a commercial invoice showing the true value and the watch's country of manufacture. Under-declaring the value is illegal and also leaves the watch under-insured, so we never do it.

## Duties and GST/HST
Canada charges GST, or HST in participating provinces, on imported goods, and duty may apply depending on how the watch is classified and where it was made. These are collected by the carrier at delivery. The Canada Border Services Agency publishes the current rules; check them or ask the carrier for an estimate before you buy.

## Paying from Canada
Canadian buyers can pay with crypto (BTC, ETH, USDT, USDC) or an international bank wire in US dollars. Prices on our site show an approximate Canadian-dollar figure; the order is charged in US dollars. See [how to pay](/how-to-pay).

## Returns from Canada
Our [return window](/returns) applies to Canadian orders too. Returns go back insured with a customs declaration marking them as returned goods.

## Find your watch
Browse [pre-owned](/pre-owned) and [new](/new) watches, or [contact us](/contact) for a reference you can't find.`,
  },
];
export const GUIDE_BY_SLUG = new Map(GUIDES.map((g) => [g.slug, g]));
