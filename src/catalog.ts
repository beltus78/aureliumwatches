// SAMPLE LISTINGS — replace with real stock before launch (README → "Replace the sample watches").
// Images are generated illustrations (/img/w/<slug>.svg) until real photos are added in public/photos/<slug>-1.webp etc.

export type Shape = "round" | "octagon" | "square" | "rect" | "cushion";
export type Bezel = "plain" | "fluted" | "dive" | "bicolor" | "tachy" | "octagon";
export type Strap = "oyster" | "jubilee" | "integrated" | "rubber" | "leather" | "mesh";
export type Look = {
  shape: Shape; metal: "steel" | "yellow" | "rose" | "white" | "twotone" | "bronze";
  dial: string; bezel: Bezel; bezelColor?: string; bezelColor2?: string; strap: Strap; strapColor?: string;
  subdials?: 0 | 2 | 3; date?: boolean; hands?: "sword" | "mercedes" | "dauphine" | "leaf"; accent?: string;
};
export type Condition = "new" | "preowned";
export type Watch = {
  slug: string; brand: string; model: string; ref: string; year: number; cond: Condition;
  grade?: "Unworn" | "Excellent" | "Very good"; set: "Box & papers" | "Papers only" | "Watch only";
  price: number; // USD
  caseMm: number; material: string; movement: string; dial: string; bracelet: string; water: string; power?: string;
  blurb: string; look: Look; featured?: boolean; sold?: boolean;
};

export const BRANDS = [
  { slug: "rolex", name: "Rolex", line: "Submariner, Datejust, GMT-Master II, Daytona and Day-Date — pre-owned with box and papers where available." },
  { slug: "omega", name: "Omega", line: "Speedmaster and Seamaster references, new with full warranty and pre-owned." },
  { slug: "patek-philippe", name: "Patek Philippe", line: "Aquanaut, Calatrava and complications — each piece checked by our watchmaker." },
  { slug: "audemars-piguet", name: "Audemars Piguet", line: "Royal Oak and Royal Oak Offshore, sourced and authenticated for collectors." },
  { slug: "cartier", name: "Cartier", line: "Santos, Tank and Ballon Bleu — new and pre-owned." },
  { slug: "tudor", name: "Tudor", line: "Black Bay and Pelagos tool watches, new with warranty." },
  { slug: "tag-heuer", name: "TAG Heuer", line: "Carrera and Monaco chronographs." },
  { slug: "breitling", name: "Breitling", line: "Navitimer and Superocean pilots' and divers' watches." },
  { slug: "iwc", name: "IWC Schaffhausen", line: "Portugieser and Pilot's Watches." },
] as const;
export const brandSlug = (name: string) => BRANDS.find((b) => b.name === name)!.slug;

const W: Watch[] = [
  { slug: "rolex-submariner-date-126610ln-2023", brand: "Rolex", model: "Submariner Date", ref: "126610LN", year: 2023, cond: "preowned", grade: "Excellent", set: "Box & papers", price: 14250,
    caseMm: 41, material: "Oystersteel", movement: "Automatic, calibre 3235, 70-hour reserve", dial: "Black, Chromalight luminous", bracelet: "Oyster, Glidelock clasp", water: "300 m", power: "70 hours",
    blurb: "A 2023 Submariner Date in excellent condition, complete with box, warranty card and hang tags. Light signs of wear on the clasp only; the case retains its factory edges.",
    look: { shape: "round", metal: "steel", dial: "#0b0c0f", bezel: "dive", bezelColor: "#111317", strap: "oyster", date: true, hands: "mercedes" }, featured: true },
  { slug: "rolex-datejust-41-126334-blue-2022", brand: "Rolex", model: "Datejust 41", ref: "126334", year: 2022, cond: "preowned", grade: "Excellent", set: "Box & papers", price: 13400,
    caseMm: 41, material: "Oystersteel and 18k white gold fluted bezel", movement: "Automatic, calibre 3235", dial: "Bright blue, baton indexes", bracelet: "Jubilee", water: "100 m", power: "70 hours",
    blurb: "The classic Datejust 41 with a white gold fluted bezel and sunburst blue dial on the five-link Jubilee bracelet. Full set from 2022.",
    look: { shape: "round", metal: "steel", dial: "#1d3f7a", bezel: "fluted", strap: "jubilee", date: true, hands: "dauphine" }, featured: true },
  { slug: "rolex-gmt-master-ii-126710blro-2021", brand: "Rolex", model: "GMT-Master II", ref: "126710BLRO", year: 2021, cond: "preowned", grade: "Very good", set: "Box & papers", price: 22900,
    caseMm: 40, material: "Oystersteel, Cerachrom two-colour bezel", movement: "Automatic, calibre 3285 GMT", dial: "Black", bracelet: "Jubilee", water: "100 m", power: "70 hours",
    blurb: "Blue and red ceramic bezel GMT-Master II on Jubilee, 2021 papers. Light desk-diving marks on the bracelet; bezel and crystal are flawless.",
    look: { shape: "round", metal: "steel", dial: "#0b0c0f", bezel: "bicolor", bezelColor: "#1e3a8a", bezelColor2: "#9b1c22", strap: "jubilee", date: true, hands: "mercedes", accent: "#c9372c" }, featured: true },
  { slug: "rolex-cosmograph-daytona-126500ln-white-2024", brand: "Rolex", model: "Cosmograph Daytona", ref: "126500LN", year: 2024, cond: "preowned", grade: "Unworn", set: "Box & papers", price: 29800,
    caseMm: 40, material: "Oystersteel, black Cerachrom bezel", movement: "Automatic chronograph, calibre 4131", dial: "White, black counters", bracelet: "Oyster, Oysterlock clasp", water: "100 m", power: "72 hours",
    blurb: "Unworn 2024 Daytona with the white “panda” dial, stickers still on the caseback. Full set with 2024 warranty card.",
    look: { shape: "round", metal: "steel", dial: "#f3f1ea", bezel: "tachy", bezelColor: "#121316", strap: "oyster", subdials: 3, hands: "sword" }, featured: true },
  { slug: "rolex-day-date-40-228238-champagne-2020", brand: "Rolex", model: "Day-Date 40", ref: "228238", year: 2020, cond: "preowned", grade: "Excellent", set: "Box & papers", price: 42500,
    caseMm: 40, material: "18k yellow gold", movement: "Automatic, calibre 3255", dial: "Champagne, Roman numerals", bracelet: "President", water: "100 m", power: "70 hours",
    blurb: "The “President” in 18k yellow gold with a champagne Roman dial. Serviced, with box and 2020 papers.",
    look: { shape: "round", metal: "yellow", dial: "#d8c08a", bezel: "fluted", strap: "jubilee", date: true, hands: "dauphine" }, featured: true },
  { slug: "omega-seamaster-diver-300m-blue-new", brand: "Omega", model: "Seamaster Diver 300M Co-Axial Master Chronometer", ref: "210.30.42.20.03.001", year: 2025, cond: "new", grade: "Unworn", set: "Box & papers", price: 5900,
    caseMm: 42, material: "Stainless steel, blue ceramic bezel", movement: "Automatic, Co-Axial Master Chronometer calibre 8800", dial: "Blue ceramic, laser-engraved waves", bracelet: "Stainless steel", water: "300 m", power: "55 hours",
    blurb: "Brand-new Seamaster Diver 300M with the wave-pattern ceramic dial, supplied with full manufacturer warranty card.",
    look: { shape: "round", metal: "steel", dial: "#163a6b", bezel: "dive", bezelColor: "#1a3b6e", strap: "oyster", date: true, hands: "sword" }, featured: true },
  { slug: "omega-speedmaster-moonwatch-professional-new", brand: "Omega", model: "Speedmaster Moonwatch Professional", ref: "310.30.42.50.01.001", year: 2025, cond: "new", grade: "Unworn", set: "Box & papers", price: 7400,
    caseMm: 42, material: "Stainless steel, aluminium tachymeter bezel", movement: "Manual-wind chronograph, calibre 3861", dial: "Black, step dial", bracelet: "Stainless steel", water: "50 m", power: "50 hours",
    blurb: "The Moonwatch, new and unworn, with Hesalite crystal and the manual-wind calibre 3861. Full warranty.",
    look: { shape: "round", metal: "steel", dial: "#0e0f12", bezel: "tachy", bezelColor: "#0c0c0e", strap: "oyster", subdials: 3, hands: "sword" } },
  { slug: "patek-philippe-aquanaut-5167a-2019", brand: "Patek Philippe", model: "Aquanaut", ref: "5167A-001", year: 2019, cond: "preowned", grade: "Excellent", set: "Box & papers", price: 59900,
    caseMm: 40.8, material: "Stainless steel", movement: "Automatic, calibre 324 S C", dial: "Black gradient, embossed pattern", bracelet: "Tropical composite strap", water: "120 m", power: "45 hours",
    blurb: "Aquanaut 5167A from 2019 with its black embossed dial and composite strap. Complete with box, Certificate of Origin and spare strap.",
    look: { shape: "cushion", metal: "steel", dial: "#1b1d21", bezel: "plain", strap: "rubber", strapColor: "#1c1e22", date: true, hands: "sword" }, featured: true },
  { slug: "audemars-piguet-royal-oak-15510st-blue-2023", brand: "Audemars Piguet", model: "Royal Oak Selfwinding 41", ref: "15510ST.OO.1320ST.06", year: 2023, cond: "preowned", grade: "Excellent", set: "Box & papers", price: 47800,
    caseMm: 41, material: "Stainless steel", movement: "Automatic, calibre 4302", dial: "Blue “Grande Tapisserie”", bracelet: "Integrated steel bracelet", water: "50 m", power: "70 hours",
    blurb: "Royal Oak 15510ST with the blue tapisserie dial and integrated bracelet, 2023 warranty card. Lightly worn, never polished.",
    look: { shape: "octagon", metal: "steel", dial: "#1f3e6e", bezel: "octagon", strap: "integrated", date: true, hands: "sword" }, featured: true },
  { slug: "cartier-santos-de-cartier-medium-new", brand: "Cartier", model: "Santos de Cartier, Medium", ref: "WSSA0029", year: 2025, cond: "new", grade: "Unworn", set: "Box & papers", price: 7650,
    caseMm: 35.1, material: "Steel", movement: "Automatic, calibre 1847 MC", dial: "Silvered opaline, Roman numerals", bracelet: "Steel, QuickSwitch", water: "100 m", power: "40 hours",
    blurb: "New Santos de Cartier in the medium size with QuickSwitch bracelet and an extra leather strap in the box.",
    look: { shape: "square", metal: "steel", dial: "#e9e6de", bezel: "plain", strap: "oyster", hands: "leaf", accent: "#22345e" } },
  { slug: "cartier-tank-must-large-new", brand: "Cartier", model: "Tank Must, Large", ref: "WSTA0041", year: 2025, cond: "new", grade: "Unworn", set: "Box & papers", price: 3250,
    caseMm: 33.7, material: "Steel", movement: "Quartz", dial: "Silvered, Roman numerals", bracelet: "Black alligator-effect leather", water: "30 m",
    blurb: "The Tank Must in the large size, new, on black leather. A quiet dress watch for every day.",
    look: { shape: "rect", metal: "steel", dial: "#eceae3", bezel: "plain", strap: "leather", strapColor: "#151515", hands: "leaf", accent: "#22345e" } },
  { slug: "tudor-black-bay-58-m79030n-new", brand: "Tudor", model: "Black Bay Fifty-Eight", ref: "M79030N-0001", year: 2025, cond: "new", grade: "Unworn", set: "Box & papers", price: 4000,
    caseMm: 39, material: "Stainless steel", movement: "Automatic, calibre MT5402", dial: "Black domed, gilt accents", bracelet: "Riveted steel bracelet", water: "200 m", power: "70 hours",
    blurb: "Black Bay 58 in black with gilt details on the riveted bracelet, new with five-year transferable warranty.",
    look: { shape: "round", metal: "steel", dial: "#0f0f10", bezel: "dive", bezelColor: "#0e0e10", strap: "oyster", hands: "sword", accent: "#c9a45a" } },
  { slug: "tag-heuer-carrera-chronograph-cbn2011-new", brand: "TAG Heuer", model: "Carrera Chronograph 42", ref: "CBN2011.BA0642", year: 2025, cond: "new", grade: "Unworn", set: "Box & papers", price: 6350,
    caseMm: 42, material: "Stainless steel", movement: "Automatic chronograph, Heuer 02", dial: "Blue sunray", bracelet: "Steel bracelet", water: "100 m", power: "80 hours",
    blurb: "Carrera with the in-house Heuer 02 chronograph and an 80-hour reserve. New, full warranty.",
    look: { shape: "round", metal: "steel", dial: "#1c3d6b", bezel: "tachy", bezelColor: "#cfd2d6", strap: "oyster", subdials: 3, date: true, hands: "sword" } },
  { slug: "breitling-navitimer-b01-43-ab0138-2022", brand: "Breitling", model: "Navitimer B01 Chronograph 43", ref: "AB0138211B1A1", year: 2022, cond: "preowned", grade: "Very good", set: "Box & papers", price: 7200,
    caseMm: 43, material: "Stainless steel", movement: "Automatic chronograph, calibre B01", dial: "Black, silver counters", bracelet: "Steel bracelet", water: "30 m", power: "70 hours",
    blurb: "The pilot's chronograph with slide-rule bezel, 2022 papers. Fine hairlines on the case consistent with light use.",
    look: { shape: "round", metal: "steel", dial: "#0f1013", bezel: "fluted", strap: "oyster", subdials: 3, date: true, hands: "sword" } },
  { slug: "iwc-portugieser-chronograph-iw371605-2021", brand: "IWC Schaffhausen", model: "Portugieser Chronograph", ref: "IW371605", year: 2021, cond: "preowned", grade: "Excellent", set: "Box & papers", price: 7600,
    caseMm: 41, material: "Stainless steel", movement: "Automatic chronograph, calibre 69355", dial: "Silver-plated, blue hands", bracelet: "Dark blue alligator leather", water: "30 m", power: "46 hours",
    blurb: "Portugieser Chronograph with the blue-accented silver dial, 2021, on its original blue leather strap.",
    look: { shape: "round", metal: "steel", dial: "#ecebe6", bezel: "plain", strap: "leather", strapColor: "#1b2a4a", subdials: 2, hands: "leaf", accent: "#1f3b78" } },
  { slug: "omega-constellation-41-rose-gold-2022", brand: "Omega", model: "Constellation Co-Axial Master Chronometer 41", ref: "131.63.41.21.99.001", year: 2022, cond: "preowned", grade: "Excellent", set: "Box & papers", price: 11800,
    caseMm: 41, material: "Steel and 18k Sedna gold", movement: "Automatic, calibre 8900", dial: "Silver, diamond indexes", bracelet: "Two-tone steel and Sedna gold", water: "50 m", power: "60 hours",
    blurb: "Two-tone Constellation with Sedna gold bezel and diamond hour markers, 2022 papers.",
    look: { shape: "round", metal: "twotone", dial: "#e7e2d8", bezel: "plain", strap: "jubilee", date: true, hands: "dauphine" } },
];

export const WATCHES = W;
export const BY_SLUG = new Map(W.map((w) => [w.slug, w]));
export const watchName = (w: Watch) => `${w.brand} ${w.model}`;
export const watchTitle = (w: Watch) => `${w.brand} ${w.model} ${w.ref}${w.cond === "preowned" ? ` (${w.year})` : ""}`;
export const condLabel = (w: Watch) => (w.cond === "new" ? "New" : "Pre-owned");
/** Image URLs: real photos if present (public/photos/<slug>-1.webp), else the generated illustration. */
export const PHOTOS: Record<string, number> = {}; // e.g. { "rolex-submariner-date-126610ln-2023": 4 }
export const img = (w: Watch, i = 1) => (PHOTOS[w.slug] ? `/photos/${w.slug}-${i}.webp` : `/img/w/${w.slug}.svg`);
