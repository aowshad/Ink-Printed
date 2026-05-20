// PLP — product dataset + category meta + extra icons

// Additional icons used by PLP only
const IconHeart = (p) => (<Icon {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" /></Icon>);
const IconSearchNo = (p) => (<Icon {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /><path d="M4 4l16 16" /></Icon>);
const IconSlidersV = (p) => (<Icon {...p}><path d="M4 6h16" /><path d="M4 12h10" /><path d="M4 18h6" /><circle cx="18" cy="12" r="2" /><circle cx="14" cy="18" r="2" /></Icon>);

Object.assign(window, { IconHeart, IconSearchNo, IconSlidersV });

// Category meta
const CATEGORY = {
  parent: "Clothing",
  name: "T-shirts",
  subhead: "Twelve cuts. One canvas. Print on standard, heavyweight, oversized, organic and more.",
  subCategoryChips: ["Standard", "Heavyweight", "Oversized", "Organic", "Long sleeve", "Kids"],
  breadcrumb: ["Home", "Clothing", "T-shirts"]
};

// Dataset — 14 products with variation across every filter dimension
const PRODUCTS = [
  { id: "p01", name: "Standard tee",        sub: "Standard",    fit: "Unisex", deco: ["DTG","Vinyl"],             colours: ["white","black","navy","stone","olive","burgundy","sand","pink"], from: 8.95,  rating: 4.8, reviews: 211, badge: "bestseller", stock: "in",  features: ["Quick-text"],   sizes: ["S","M","L","XL","2XL"], kind: "tee" },
  { id: "p02", name: "Heavyweight tee",     sub: "Heavyweight", fit: "Unisex", deco: ["DTG","Screen"],             colours: ["black","white","navy","burgundy","olive"],                        from: 12.00, rating: 4.9, reviews: 188, badge: "bestseller", stock: "in",  features: ["Heavyweight","Bulk"], sizes: ["S","M","L","XL","2XL"], kind: "tee" },
  { id: "p03", name: "Oversized tee",       sub: "Oversized",   fit: "Unisex", deco: ["DTG","All-over"],           colours: ["black","white","stone","sand"],                                   from: 14.00, rating: 4.7, reviews: 92,  badge: "new",        stock: "in",  features: ["New","Heavyweight"], sizes: ["S","M","L","XL"], kind: "tee" },
  { id: "p04", name: "Organic tee",         sub: "Organic",     fit: "Unisex", deco: ["DTG"],                       colours: ["natural","white","black","olive","navy"],                         from: 11.50, rating: 4.9, reviews: 154, badge: null,         stock: "in",  features: ["Organic"],      sizes: ["S","M","L","XL"], kind: "tee" },
  { id: "p05", name: "Cool tee",            sub: "Standard",    fit: "Unisex", deco: ["Sublimation","All-over"],   colours: ["white","black","navy","sand"],                                   from: 13.95, rating: 4.6, reviews: 64,  badge: null,         stock: "in",  features: [],               sizes: ["S","M","L","XL"], kind: "tee" },
  { id: "p06", name: "Long sleeve tee",     sub: "Long sleeve", fit: "Unisex", deco: ["DTG","Vinyl"],               colours: ["black","white","stone","navy"],                                   from: 12.50, rating: 4.8, reviews: 47,  badge: null,         stock: "in",  features: [],               sizes: ["S","M","L","XL"], kind: "tee" },
  { id: "p07", name: "Ladies fitted tee",   sub: "Standard",    fit: "Ladies", deco: ["DTG"],                       colours: ["white","black","pink","navy","stone","sand"],                     from: 10.50, rating: 4.9, reviews: 142, badge: "onmodel",    stock: "in",  features: ["Quick-text"],   sizes: ["XS","S","M","L"], kind: "tee" },
  { id: "p08", name: "Racer back vest",     sub: "Standard",    fit: "Ladies", deco: ["DTG","Vinyl"],               colours: ["white","black","stone"],                                          from: 9.50,  rating: 4.8, reviews: 88,  badge: null,         stock: "in",  features: [],               sizes: ["XS","S","M","L"], kind: "tee" },
  { id: "p09", name: "Kids t-shirt",        sub: "Kids",        fit: "Kids",   deco: ["DTG","Vinyl"],               colours: ["white","black","pink","red","navy","sand"],                       from: 7.95,  rating: 4.7, reviews: 73,  badge: null,         stock: "in",  features: ["Quick-text"],   sizes: ["3-4Y","5-6Y","7-8Y","9-10Y","11-12Y"], kind: "tee" },
  { id: "p10", name: "Baseball tee",        sub: "Standard",    fit: "Unisex", deco: ["DTG"],                       colours: ["white","black","navy","burgundy"],                                from: 13.50, rating: 4.6, reviews: 38,  badge: "new",        stock: "in",  features: ["New"],          sizes: ["S","M","L","XL"], kind: "tee" },
  { id: "p11", name: "V-neck tee",          sub: "Standard",    fit: "Unisex", deco: ["DTG","Vinyl"],               colours: ["white","black","navy","stone"],                                   from: 9.50,  rating: 4.5, reviews: 21,  badge: null,         stock: "in",  features: [],               sizes: ["S","M","L","XL"], kind: "tee" },
  { id: "p12", name: "Heavyweight oversized tee", sub: "Heavyweight", fit: "Unisex", deco: ["DTG","Screen"],         colours: ["black","white","olive","stone","sand"],                          from: 16.00, rating: 4.9, reviews: 109, badge: "bestseller", stock: "in",  features: ["Heavyweight","Bulk"], sizes: ["S","M","L","XL","2XL"], kind: "tee" },
  { id: "p13", name: "Crop top",            sub: "Standard",    fit: "Ladies", deco: ["DTG"],                       colours: ["white","black","pink","navy","stone","burgundy","olive","sand"], from: 8.95,  rating: 4.9, reviews: 12,  badge: null,         stock: "in",  features: [],               sizes: ["XS","S","M","L","XL"], kind: "tee" },
  { id: "p14", name: "Organic kids tee",    sub: "Kids",        fit: "Kids",   deco: ["DTG"],                       colours: ["natural","white","navy","sand"],                                  from: 9.95,  rating: 4.8, reviews: 31,  badge: null,         stock: "soon",features: ["Organic","New"], sizes: ["3-4Y","5-6Y","7-8Y","9-10Y"], kind: "tee" },
  { id: "p15", name: "T-shirt dress",       sub: "Standard",    fit: "Ladies", deco: ["DTG","All-over"],            colours: ["white","black","stone","sand","olive"],                          from: 18.00, rating: 4.7, reviews: 22,  badge: "new",        stock: "oos", features: ["New"],          sizes: ["XS","S","M","L"], kind: "tee" },
  { id: "p16", name: "Pocket tee",          sub: "Standard",    fit: "Unisex", deco: ["DTG"],                       colours: ["white","black","navy","stone"],                                   from: 10.50, rating: 4.6, reviews: 18,  badge: null,         stock: "in",  features: [],               sizes: ["S","M","L","XL"], kind: "tee" }
];

// Colour swatch palette (PLP context)
const PLP_COLOURS = [
  { name: "white",    hex: "#F4F4EE", light: true },
  { name: "black",    hex: "#0A0A0A" },
  { name: "navy",     hex: "#1E2A4A" },
  { name: "stone",    hex: "#C9C2B5", light: true },
  { name: "sand",     hex: "#D8C8A8", light: true },
  { name: "natural",  hex: "#E5DDC8", light: true },
  { name: "olive",    hex: "#6A6A2C" },
  { name: "burgundy", hex: "#6E1F2A" },
  { name: "pink",     hex: "#F0A6B8" },
  { name: "red",      hex: "#A41E22" },
  { name: "grey",     hex: "#5A5A5A" },
  { name: "charcoal", hex: "#2A2A2A" }
];

// Initial filter state
const INITIAL_FILTERS = {
  sub: new Set(),
  fit: new Set(),
  deco: new Set(),
  colour: new Set(),
  features: new Set(),
  sizes: new Set(),
  price: [0, 30]
};
const PRICE_MIN = 0, PRICE_MAX = 30;

// Filter predicate
function passesFilters(p, f) {
  if (f.sub.size && !f.sub.has(p.sub)) return false;
  if (f.fit.size && !f.fit.has(p.fit)) return false;
  if (f.deco.size && !p.deco.some(d => f.deco.has(d))) return false;
  if (f.colour.size && !p.colours.some(c => f.colour.has(c))) return false;
  if (f.features.size && !p.features.some(x => f.features.has(x))) return false;
  if (f.sizes.size && !p.sizes.some(s => f.sizes.has(s))) return false;
  if (p.from < f.price[0] || p.from > f.price[1]) return false;
  return true;
}

function countActive(f) {
  return f.sub.size + f.fit.size + f.deco.size + f.colour.size +
         f.features.size + f.sizes.size +
         ((f.price[0] !== PRICE_MIN || f.price[1] !== PRICE_MAX) ? 1 : 0);
}

// Build active-filter pill list
function activeFilterPills(f) {
  const pills = [];
  for (const v of f.sub) pills.push({ key: `sub:${v}`, label: v, group: "sub" });
  for (const v of f.fit) pills.push({ key: `fit:${v}`, label: v, group: "fit" });
  for (const v of f.deco) pills.push({ key: `deco:${v}`, label: v, group: "deco" });
  for (const v of f.colour) pills.push({ key: `colour:${v}`, label: cap(v), group: "colour" });
  for (const v of f.features) pills.push({ key: `features:${v}`, label: v, group: "features" });
  for (const v of f.sizes) pills.push({ key: `sizes:${v}`, label: v, group: "sizes" });
  if (f.price[0] !== PRICE_MIN || f.price[1] !== PRICE_MAX) {
    pills.push({ key: "price", label: `£${f.price[0]}–£${f.price[1]}`, group: "price" });
  }
  return pills;
}
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

Object.assign(window, {
  CATEGORY, PRODUCTS, PLP_COLOURS, INITIAL_FILTERS, PRICE_MIN, PRICE_MAX,
  passesFilters, countActive, activeFilterPills, cap
});
