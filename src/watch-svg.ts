import type { Look } from "./catalog";

// Draws a front-view watch illustration from a Look. Used as the placeholder photo for every listing
// (no brand names or logos are drawn). Hands carry classes .hh/.hm/.hs so CSS can animate them.
const C = { x: 200, y: 280 };
const METALS: Record<Look["metal"], [string, string, string]> = {
  steel: ["#f4f6f8", "#c3c9cf", "#8b939b"],
  white: ["#f6f6f4", "#cfd1d3", "#9ea2a6"],
  yellow: ["#f8e6ad", "#d8b464", "#9c7630"],
  rose: ["#f6d2bd", "#d69b7e", "#9d6248"],
  twotone: ["#f4f6f8", "#c3c9cf", "#8b939b"],
  bronze: ["#e6c19a", "#b98654", "#7c5430"],
};
const GOLD: [string, string, string] = ["#f6d9c4", "#d9a083", "#a3684d"];

const n = (v: number) => +v.toFixed(2);
const polar = (r: number, deg: number) => [n(C.x + r * Math.sin((deg * Math.PI) / 180)), n(C.y - r * Math.cos((deg * Math.PI) / 180))] as const;
const lum = (hex: string) => { const h = hex.replace("#", ""); const v = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16); return (0.299 * (v >> 16) + 0.587 * ((v >> 8) & 255) + 0.114 * (v & 255)) / 255; };

export function watchSvg(L: Look, id = "w", opts: { title?: string; animated?: boolean } = {}) {
  const [m1, m2, m3] = METALS[L.metal];
  const bez = L.metal === "twotone" ? GOLD : METALS[L.metal];
  const light = lum(L.dial) > 0.55;
  const ink = light ? "#1c1f26" : "#eef0f2";
  const idx = L.metal === "yellow" ? "#f3d68f" : L.metal === "rose" ? "#f2c2a7" : light ? "#2a2e36" : "#e9ecef";
  const accent = L.accent ?? (light ? "#2a2e36" : "#e9ecef");
  const P = (s: string) => `${id}-${s}`;
  const isRound = L.shape === "round" || L.shape === "octagon" || L.shape === "cushion";
  const strapW = L.shape === "rect" ? 118 : L.shape === "square" ? 150 : L.strap === "integrated" ? 176 : 132;
  const dialR = L.shape === "octagon" ? 86 : L.shape === "cushion" ? 92 : 94;

  const defs = `<defs>
<linearGradient id="${P("m")}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${m1}"/><stop offset=".45" stop-color="${m2}"/><stop offset="1" stop-color="${m3}"/></linearGradient>
<linearGradient id="${P("mv")}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${m3}"/><stop offset=".3" stop-color="${m1}"/><stop offset=".7" stop-color="${m2}"/><stop offset="1" stop-color="${m3}"/></linearGradient>
<linearGradient id="${P("b")}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bez[0]}"/><stop offset=".5" stop-color="${bez[1]}"/><stop offset="1" stop-color="${bez[2]}"/></linearGradient>
<radialGradient id="${P("d")}" cx=".42" cy=".36" r=".75"><stop offset="0" stop-color="${L.dial}" stop-opacity=".72"/><stop offset=".08" stop-color="${L.dial}"/><stop offset="1" stop-color="${shade(L.dial, -0.35)}"/></radialGradient>
<linearGradient id="${P("g")}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient>
<linearGradient id="${P("s")}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${shade(L.strapColor ?? "#222", -0.3)}"/><stop offset=".5" stop-color="${L.strapColor ?? "#222"}"/><stop offset="1" stop-color="${shade(L.strapColor ?? "#222", -0.3)}"/></linearGradient>
<filter id="${P("sh")}" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#000" flood-opacity=".45"/></filter>
</defs>`;

  // ---------- strap / bracelet ----------
  const strap = (top: boolean) => {
    const y0 = top ? 0 : 400, y1 = top ? 160 : 560, h = y1 - y0, x = C.x - strapW / 2;
    const taper = top ? `M${x + 10} ${y0} L${x + strapW - 10} ${y0} L${x + strapW} ${y1} L${x} ${y1}Z` : `M${x} ${y0} L${x + strapW} ${y0} L${x + strapW - 10} ${y1} L${x + 10} ${y1}Z`;
    if (L.strap === "leather" || L.strap === "rubber") {
      const stitch = L.strap === "leather" ? `<path d="${taper}" transform="translate(0 0)" fill="none" stroke="${shade(L.strapColor ?? "#222", 0.35)}" stroke-width="1.4" stroke-dasharray="5 4" opacity=".6" style="transform-box:fill-box;transform-origin:center;transform:scale(.88,.97)"/>` : "";
      const grooves = L.strap === "rubber" ? Array.from({ length: 9 }, (_, i) => `<rect x="${x + 18}" y="${y0 + 10 + i * (h / 9)}" width="${strapW - 36}" height="3" rx="1.5" fill="#000" opacity=".25"/>`).join("") : "";
      return `<path d="${taper}" fill="url(#${P("s")})"/>${stitch}${grooves}`;
    }
    if (L.strap === "mesh") return `<path d="${taper}" fill="url(#${P("mv")})"/>`;
    const cols = L.strap === "jubilee" ? [0.16, 0.12, 0.16, 0.12, 0.16].map((v) => v / 0.72) : L.strap === "integrated" ? [0.2, 0.6, 0.2] : [0.32, 0.36, 0.32];
    const rows = L.strap === "jubilee" ? 9 : L.strap === "integrated" ? 6 : 6;
    let out = `<path d="${taper}" fill="${m3}"/>`;
    for (let r = 0; r < rows; r++) {
      const ly = y0 + (r * h) / rows + 2, lh = h / rows - 4;
      let lx = x + 4;
      cols.forEach((c, ci) => {
        const w = (strapW - 8) * (c / cols.reduce((a, b) => a + b, 0));
        const center = L.strap === "integrated" ? ci === 1 : ci % 2 === 1;
        out += `<rect x="${n(lx + 1)}" y="${n(ly)}" width="${n(w - 2)}" height="${n(lh)}" rx="${L.strap === "jubilee" ? 5 : 3}" fill="url(#${center && L.metal === "twotone" ? P("b") : P("mv")})" opacity="${center ? 1 : 0.92}"/>`;
        lx += w;
      });
    }
    return out;
  };

  // ---------- case ----------
  let caseShape = "", bezel = "", dialClip = "";
  if (L.shape === "round") {
    const lx = strapW / 2 + 4;
    const lug = (sx: number, sy: number) => `<path d="M${C.x + sx * (lx - 18)} ${C.y + sy * 96} C ${C.x + sx * (lx - 20)} ${C.y + sy * 128}, ${C.x + sx * (lx - 14)} ${C.y + sy * 146}, ${C.x + sx * (lx - 6)} ${C.y + sy * 152} L ${C.x + sx * (lx + 10)} ${C.y + sy * 150} C ${C.x + sx * (lx + 14)} ${C.y + sy * 130}, ${C.x + sx * (lx + 22)} ${C.y + sy * 104}, ${C.x + sx * (lx + 30)} ${C.y + sy * 86}Z" fill="url(#${P("m")})"/>`;
    caseShape = `<rect x="${C.x - strapW / 2 + 2}" y="${C.y - 146}" width="${strapW - 4}" height="26" rx="5" fill="url(#${P("mv")})"/><rect x="${C.x - strapW / 2 + 2}" y="${C.y + 120}" width="${strapW - 4}" height="26" rx="5" fill="url(#${P("mv")})"/>${lug(-1, -1)}${lug(1, -1)}${lug(-1, 1)}${lug(1, 1)}<circle cx="${C.x}" cy="${C.y}" r="124" fill="url(#${P("m")})"/>`;
    dialClip = `<circle cx="${C.x}" cy="${C.y}" r="${dialR}"/>`;
  } else if (L.shape === "cushion") {
    caseShape = `<rect x="${C.x - 122}" y="${C.y - 118}" width="244" height="236" rx="86" fill="url(#${P("m")})"/><rect x="${C.x - 70}" y="${C.y - 150}" width="140" height="40" rx="10" fill="url(#${P("m")})"/><rect x="${C.x - 70}" y="${C.y + 110}" width="140" height="40" rx="10" fill="url(#${P("m")})"/>`;
    dialClip = `<rect x="${C.x - 92}" y="${C.y - 90}" width="184" height="180" rx="60"/>`;
  } else if (L.shape === "octagon") {
    caseShape = `<rect x="${C.x - 126}" y="${C.y - 120}" width="252" height="240" rx="70" fill="url(#${P("m")})"/><rect x="${C.x - 88}" y="${C.y - 150}" width="176" height="44" rx="8" fill="url(#${P("m")})"/><rect x="${C.x - 88}" y="${C.y + 106}" width="176" height="44" rx="8" fill="url(#${P("m")})"/>`;
    dialClip = `<rect x="${C.x - 86}" y="${C.y - 86}" width="172" height="172" rx="30"/>`;
  } else if (L.shape === "square") {
    caseShape = `<rect x="${C.x - 112}" y="${C.y - 118}" width="224" height="236" rx="30" fill="url(#${P("m")})"/>`;
    dialClip = `<rect x="${C.x - 84}" y="${C.y - 88}" width="168" height="176" rx="14"/>`;
  } else {
    caseShape = `<rect x="${C.x - 84}" y="${C.y - 126}" width="168" height="252" rx="10" fill="url(#${P("m")})"/><rect x="${C.x - 94}" y="${C.y - 126}" width="18" height="252" rx="8" fill="url(#${P("mv")})"/><rect x="${C.x + 76}" y="${C.y - 126}" width="18" height="252" rx="8" fill="url(#${P("mv")})"/>`;
    dialClip = `<rect x="${C.x - 66}" y="${C.y - 104}" width="132" height="208" rx="4"/>`;
  }

  if (isRound && L.shape === "round") {
    const rO = 116, rI = dialR + 2;
    if (L.bezel === "plain") bezel = `<circle cx="${C.x}" cy="${C.y}" r="${rO - 6}" fill="url(#${P("b")})"/>`;
    else if (L.bezel === "fluted") bezel = `<circle cx="${C.x}" cy="${C.y}" r="${rO}" fill="url(#${P("b")})"/>` + Array.from({ length: 72 }, (_, i) => { const [a, b] = polar(rO - 1, i * 5), [c, d] = polar(rI + 2, i * 5); return `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="${bez[2]}" stroke-width="2.2" opacity=".55"/>`; }).join("");
    else {
      const c1 = L.bezelColor ?? "#111", c2 = L.bezelColor2 ?? c1;
      const ring = L.bezel === "bicolor"
        ? `<path d="M${C.x - rO + 6} ${C.y} A${rO - 6} ${rO - 6} 0 0 1 ${C.x + rO - 6} ${C.y}Z" fill="${c1}"/><path d="M${C.x - rO + 6} ${C.y} A${rO - 6} ${rO - 6} 0 0 0 ${C.x + rO - 6} ${C.y}Z" fill="${c2}"/>`
        : `<circle cx="${C.x}" cy="${C.y}" r="${rO - 6}" fill="${c1}"/>`;
      const tc = lum(c1) > 0.55 ? "#1b1d22" : "#e8e3d6";
      const ticks = Array.from({ length: 60 }, (_, i) => {
        const big = i % 5 === 0; if (L.bezel === "dive" && i === 0) return "";
        const [a, b] = polar(rO - 10, i * 6), [c, d] = polar(rO - (big ? 22 : 15), i * 6);
        return `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="${tc}" stroke-width="${big ? 3 : 1.3}" opacity="${L.bezel === "dive" && i > 15 && !big ? 0 : 0.9}"/>`;
      }).join("");
      const pip = L.bezel === "dive" || L.bezel === "bicolor" ? `<path d="M${C.x} ${C.y - rO + 26} l-8 -14 h16Z" fill="${tc}"/>` : "";
      bezel = `<circle cx="${C.x}" cy="${C.y}" r="${rO}" fill="url(#${P("b")})"/>${ring}${ticks}${pip}`;
    }
  } else if (L.shape === "octagon") {
    const pts = Array.from({ length: 8 }, (_, i) => polar(112, 22.5 + i * 45).join(",")).join(" ");
    bezel = `<polygon points="${pts}" fill="url(#${P("b")})" stroke="${m3}" stroke-width="1.5"/>` + Array.from({ length: 8 }, (_, i) => { const [a, b] = polar(100, 22.5 + i * 45); return `<circle cx="${a}" cy="${b}" r="6" fill="${m2}" stroke="${m3}"/><line x1="${a - 4}" y1="${b}" x2="${a + 4}" y2="${b}" stroke="${m3}" stroke-width="1.4"/>`; }).join("");
  } else if (L.shape === "square") {
    bezel = Array.from({ length: 8 }, (_, i) => { const [a, b] = [[C.x - 98, C.y - 104], [C.x, C.y - 108], [C.x + 98, C.y - 104], [C.x + 102, C.y], [C.x + 98, C.y + 104], [C.x, C.y + 108], [C.x - 98, C.y + 104], [C.x - 102, C.y]][i]!; return i % 2 ? "" : `<circle cx="${a}" cy="${b}" r="5.5" fill="${m2}" stroke="${m3}"/>`; }).join("");
  }

  // ---------- dial ----------
  let dial = `<g clip-path="url(#${P("dc")})"><rect x="0" y="0" width="400" height="560" fill="url(#${P("d")})"/>`;
  if (L.shape === "rect" || L.shape === "square") {
    const wR = L.shape === "rect" ? 54 : 74, hR = L.shape === "rect" ? 92 : 78;
    dial += `<rect x="${C.x - wR}" y="${C.y - hR}" width="${wR * 2}" height="${hR * 2}" fill="none" stroke="${idx}" stroke-width="1" opacity=".55"/>`;
    for (let i = 0; i < 12; i++) {
      const a = (i * 30 * Math.PI) / 180, dx = Math.sin(a), dy = -Math.cos(a);
      const k = Math.min(wR / Math.abs(dx || 1e-6), hR / Math.abs(dy || 1e-6));
      const ox = C.x + dx * k, oy = C.y + dy * k, ix = C.x + dx * (k - 15), iy = C.y + dy * (k - 15);
      dial += `<line x1="${n(ox)}" y1="${n(oy)}" x2="${n(ix)}" y2="${n(iy)}" stroke="${idx}" stroke-width="${i % 3 === 0 ? 4 : 2.2}" stroke-linecap="round"/>`;
    }
  } else {
    for (let i = 0; i < 60; i++) {
      const [a, b] = polar(dialR - 4, i * 6), [c, d] = polar(dialR - (i % 5 ? 8 : 10), i * 6);
      dial += `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="${idx}" stroke-width="${i % 5 ? 0.8 : 1.4}" opacity=".7"/>`;
    }
    for (let i = 0; i < 12; i++) {
      if (L.subdials === 3 && (i === 3 || i === 6 || i === 9)) continue;
      if (L.subdials === 2 && (i === 3 || i === 9)) continue;
      if (L.date && !L.subdials && i === 3) continue;
      const deg = i * 30;
      if (L.bezel === "dive" || L.bezel === "bicolor") {
        const [a, b] = polar(dialR - 26, deg);
        dial += i === 0 ? `<path d="M${C.x} ${C.y - dialR + 14} l-11 18 h22Z" fill="${idx}" stroke="${shade(L.dial, -0.4)}" stroke-width="1"/>`
          : i % 3 === 0 ? `<rect x="${a - 4.5}" y="${b - 11}" width="9" height="22" rx="1.5" fill="${idx}" transform="rotate(${deg} ${a} ${b})"/>`
          : `<circle cx="${a}" cy="${b}" r="6.2" fill="${idx}"/>`;
      } else {
        const [a, b] = polar(dialR - 16, deg), [c, d] = polar(dialR - (i % 3 === 0 ? 38 : 32), deg);
        dial += `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="${idx}" stroke-width="${i === 0 ? 7 : i % 3 === 0 ? 5.5 : 4}" stroke-linecap="round"/>`;
      }
    }
  }
  if (L.subdials) {
    const at = L.subdials === 3 ? [90, 180, 270] : [90, 270];
    for (const deg of at) {
      const [a, b] = polar(dialR * 0.48, deg), rr = dialR * 0.24;
      const sub = light && lum(L.dial) > 0.8 ? "#1b1d22" : shade(L.dial, light ? -0.12 : 0.12);
      dial += `<circle cx="${a}" cy="${b}" r="${n(rr)}" fill="${sub}" stroke="${idx}" stroke-width="1" opacity=".95"/>`;
      for (let k = 0; k < 12; k++) { const x1 = a + (rr - 2) * Math.sin(k * Math.PI / 6), y1 = b - (rr - 2) * Math.cos(k * Math.PI / 6), x2 = a + (rr - 6) * Math.sin(k * Math.PI / 6), y2 = b - (rr - 6) * Math.cos(k * Math.PI / 6); dial += `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${lum(sub) > 0.5 ? "#222" : "#e9ecef"}" stroke-width="1"/>`; }
      dial += `<line x1="${a}" y1="${b}" x2="${n(a + rr * 0.6 * Math.sin(deg))}" y2="${n(b - rr * 0.6 * Math.cos(deg))}" stroke="${lum(sub) > 0.5 ? "#222" : "#e9ecef"}" stroke-width="1.6"/>`;
    }
  }
  if (L.date && !L.subdials && L.shape !== "rect") {
    const [a, b] = polar(dialR - 30, 90);
    dial += `<rect x="${a - 13}" y="${b - 10}" width="26" height="20" rx="2" fill="#f7f6f1" stroke="${idx}" stroke-width="1.2"/><text x="${a}" y="${b + 6}" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="#15171b">25</text>`;
  }
  dial += `</g>`;

  // ---------- hands (10:09:36) ----------
  const handCol = L.metal === "yellow" ? "#f3d68f" : L.metal === "rose" ? "#f2c2a7" : light ? "#20242b" : "#f1f3f5";
  const lumeCol = light ? "#20242b" : "#e8ecef";
  const len = L.shape === "rect" ? 0.95 : 1;
  const hand = (kind: string, l: number, w: number) => {
    const t = L.hands ?? "sword";
    if (kind === "s") return `<line x1="${C.x}" y1="${C.y + 22}" x2="${C.x}" y2="${C.y - l}" stroke="${L.accent && L.bezel === "bicolor" ? L.accent : L.accent && !light ? L.accent : light ? "#b32a20" : "#d63a2a"}" stroke-width="1.8"/><circle cx="${C.x}" cy="${C.y}" r="4.5" fill="${handCol}"/>`;
    if (t === "leaf") return `<path d="M${C.x} ${C.y - l} C ${C.x + w} ${C.y - l * 0.6}, ${C.x + w * 0.6} ${C.y - 8}, ${C.x} ${C.y + 10} C ${C.x - w * 0.6} ${C.y - 8}, ${C.x - w} ${C.y - l * 0.6}, ${C.x} ${C.y - l}Z" fill="${L.accent ?? handCol}"/>`;
    if (t === "dauphine") return `<path d="M${C.x} ${C.y - l} L${C.x + w / 2} ${C.y - l * 0.18} L${C.x} ${C.y + 12} L${C.x - w / 2} ${C.y - l * 0.18}Z" fill="${handCol}"/><path d="M${C.x} ${C.y - l} L${C.x + w / 2} ${C.y - l * 0.18} L${C.x} ${C.y + 12}Z" fill="#000" opacity=".18"/>`;
    if (t === "mercedes" && kind === "h") return `<path d="M${C.x - w / 2} ${C.y + 10} h${w} v${-l * 0.62} h${-w}Z" fill="${handCol}"/><circle cx="${C.x}" cy="${C.y - l * 0.72}" r="${w * 1.05}" fill="none" stroke="${handCol}" stroke-width="3.2"/><path d="M${C.x - 2} ${C.y - l * 0.72} V${C.y - l} h4 V${C.y - l * 0.72}Z" fill="${handCol}"/><circle cx="${C.x}" cy="${C.y - l * 0.72}" r="${w * 0.6}" fill="${lumeCol}" opacity=".85"/>`;
    return `<path d="M${C.x - w / 2} ${C.y + 12} L${C.x - w / 2} ${C.y - l + w} L${C.x} ${C.y - l} L${C.x + w / 2} ${C.y - l + w} L${C.x + w / 2} ${C.y + 12}Z" fill="${handCol}"/><path d="M${C.x - w / 4} ${C.y - 14} L${C.x - w / 4} ${C.y - l + w + 4} L${C.x} ${C.y - l + 6} L${C.x + w / 4} ${C.y - l + w + 4} L${C.x + w / 4} ${C.y - 14}Z" fill="${lumeCol}" opacity="${light ? 0 : 0.85}"/>`;
  };
  const hh = 304.8, hm = 57.6, hs = 216;
  const an = opts.animated;
  const hands = `<g filter="url(#${P("sh")})" style="filter:drop-shadow(0 3px 3px rgba(0,0,0,.35))">
<g transform="rotate(${hh} ${C.x} ${C.y})"><g class="${an ? "hh" : ""}">${hand("h", dialR * 0.55 * len, 13)}</g></g>
<g transform="rotate(${hm} ${C.x} ${C.y})"><g class="${an ? "hm" : ""}">${hand("m", dialR * 0.86 * len, 10)}</g></g>
<g transform="rotate(${hs} ${C.x} ${C.y})"><g class="${an ? "hs" : ""}">${hand("s", dialR * 0.9 * len, 2)}</g></g></g>`;

  const crown = L.shape === "rect" || L.shape === "square"
    ? `<rect x="${C.x + (L.shape === "rect" ? 92 : 110)}" y="${C.y - 11}" width="14" height="22" rx="4" fill="url(#${P("mv")})"/><circle cx="${C.x + (L.shape === "rect" ? 110 : 128)}" cy="${C.y}" r="7" fill="#2a4a8f"/>`
    : `<rect x="${C.x + 118}" y="${C.y - 15}" width="20" height="30" rx="5" fill="url(#${P("mv")})"/>${L.subdials ? `<rect x="${C.x + 104}" y="${C.y - 72}" width="16" height="20" rx="4" fill="url(#${P("mv")})" transform="rotate(30 ${C.x + 112} ${C.y - 62})"/><rect x="${C.x + 104}" y="${C.y + 52}" width="16" height="20" rx="4" fill="url(#${P("mv")})" transform="rotate(-30 ${C.x + 112} ${C.y + 62})"/>` : ""}`;

  const glass = `<g clip-path="url(#${P("dc")})"><path d="M60 120 L320 120 L80 420Z" fill="url(#${P("g")})"/></g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 560" role="img"${opts.title ? ` aria-label="${opts.title.replace(/"/g, "&quot;")}"` : ' aria-hidden="true"'}>${defs}
<clipPath id="${P("dc")}">${dialClip}</clipPath>
${strap(true)}${strap(false)}<g filter="url(#${P("sh")})">${crown}${caseShape}</g>${bezel}
<g>${dialClip.replace("/>", ` fill="${shade(L.dial, -0.5)}"/>`)}</g>${dial}${hands}${glass}</svg>`;
}

function shade(hex: string, amt: number) {
  const h = hex.replace("#", "");
  const v = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const f = (c: number) => Math.max(0, Math.min(255, Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt)));
  return `#${[(v >> 16) & 255, (v >> 8) & 255, v & 255].map((c) => f(c).toString(16).padStart(2, "0")).join("")}`;
}
