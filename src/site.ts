// Business details and promises. Anything in [square brackets] is a placeholder:
// it is hidden on the public site until the real value is filled in (see README → "Before launch").
export const SITE = {
  name: "Aurelium Watches",
  url: "https://aureliumwatches.com",
  company: "[Legal company name, e.g. Aurelium Watches LLC]",
  address1: "[Street address]",
  address2: "[City, State ZIP]",
  email: "sales@aureliumwatches.com",
  phone: "[+1 000 000 0000]",
  whatsapp: "[+1 000 000 0000]",
  hours: "Monday–Saturday, 9 AM–7 PM Eastern",
  indexNowKey: "0cad0245610858c9f875fdd82b994bdc",
};

/** Hides "[placeholder]" values on public pages. */
export const shown = (s: string) => (s.includes("[") ? "" : s);
export const companyName = () => shown(SITE.company) || SITE.name;

/** Business promises shown on the site. Confirm each one before launch (README). */
export const PROMISES = {
  holdHours: 48, // a watch is reserved this long after checkout while payment arrives
  returnDays: 14, // return window from delivery, unworn and in the condition shipped
  dispatchDays: "1–2 business days", // after payment clears
  shipping: "free, fully insured FedEx Priority Overnight with adult signature",
  warrantyPreowned: "12-month Aurelium mechanical warranty",
  warrantyNew: "full manufacturer warranty where the brand provides one, plus our 12-month Aurelium warranty",
  wholesaleMinUnits: 5, // minimum units per wholesale order
  wireOnlyOverUsd: 0, // set e.g. 50000 to force bank wire above an amount (0 = off)
};

/** USD → CAD display rate (Canadian visitors see an approximate CAD figure; charges are in USD). */
export const CAD_RATE = 1.39;
export type Cur = "USD" | "CAD";
export const money = (usd: number, cur: Cur = "USD") =>
  cur === "CAD"
    ? `≈ CA$${Math.round(usd * CAD_RATE).toLocaleString("en-US")}`
    : `$${Math.round(usd).toLocaleString("en-US")}`;

export const US_STATES = "AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY PR".split(" ");
export const CA_PROV = "AB BC MB NB NL NS NT NU ON PE QC SK YT".split(" ");

export const PAY = ["btc", "eth", "usdt", "usdc", "wire"] as const;
export type PayMethod = (typeof PAY)[number];
export const PAY_LABEL: Record<PayMethod, string> = {
  btc: "Bitcoin (BTC)",
  eth: "Ethereum (ETH)",
  usdt: "Tether (USDT)",
  usdc: "USD Coin (USDC)",
  wire: "Bank wire / ACH",
};
export const PAY_NOTE: Record<PayMethod, string> = {
  btc: "Exact BTC amount and wallet address sent by email",
  eth: "Exact ETH amount and wallet address sent by email",
  usdt: "TRC-20 or ERC-20 — address sent by email",
  usdc: "ERC-20 — address sent by email",
  wire: "US domestic wire or ACH · international wire from Canada",
};
export const allowedPay = (usd: number): PayMethod[] =>
  PROMISES.wireOnlyOverUsd && usd > PROMISES.wireOnlyOverUsd ? ["wire"] : [...PAY];
