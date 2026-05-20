// Cart data + extra icons

const IconCheck = (p) => (<Icon {...p}><path d="m4 12 5 5L20 7" /></Icon>);
const IconShield = (p) => (<Icon {...p}><path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" /></Icon>);
const IconMail = (p) => (<Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Icon>);
const IconRefresh = (p) => (<Icon {...p}><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></Icon>);const IconPencil = (p) => (<Icon {...p}><path d="m4 20 4-1 11-11-3-3L5 16l-1 4Z" /></Icon>);
const IconBookmark = (p) => (<Icon {...p}><path d="M6 4h12v17l-6-4-6 4V4Z" /></Icon>);
const IconTrash = (p) => (<Icon {...p}><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" /><path d="M10 11v7" /><path d="M14 11v7" /></Icon>);
const IconWarning = (p) => (<Icon {...p}><path d="M12 4 2 20h20L12 4Z" /><path d="M12 11v4" /><path d="M12 17.5v.5" /></Icon>);

Object.assign(window, { IconShield, IconRefresh, IconPencil, IconBookmark, IconTrash, IconWarning });

// Tier thresholds
const TIERS = [
  { units: 5,  pct: 10 },
  { units: 10, pct: 15 },
  { units: 25, pct: 25 }
];

function activeTier(units) {
  if (units >= 25) return TIERS[2];
  if (units >= 10) return TIERS[1];
  if (units >= 5)  return TIERS[0];
  return null;
}
function nextTier(units) {
  if (units < 5)  return TIERS[0];
  if (units < 10) return TIERS[1];
  if (units < 25) return TIERS[2];
  return null;
}

// Initial cart — designed to show single-item + multi-size + quick-text states,
// plus a recently-added flag and an OOS warning.
const INITIAL_CART = [
  {
    id: "li-1",
    productName: "Heavyweight Hoodie",
    subcategory: "Clothing · Hoodies",
    productKind: "hoodie",
    mode: "multi",
    decoration: { method: "Embroidered, left chest", colour: "Black", setupFee: 4 },
    sizeQtys: { S: 1, M: 2, L: 1, XL: 1 },
    unitPrice: 34.00,
    oosSize: null,
    isRecent: false,
    eligibleBulk: false
  },
  {
    id: "li-2",
    productName: "Standard tee",
    subcategory: "Clothing · T-shirts",
    productKind: "tee",
    mode: "single",
    decoration: { method: "DTG print, front centre", colour: "White" },
    size: "L",
    qty: 1,
    unitPrice: 8.95,
    oosSize: "L",
    isRecent: true,
    eligibleBulk: true
  },
  {
    id: "li-3",
    productName: "Two-colour mug",
    subcategory: "Gifts · Mugs",
    productKind: "mug",
    mode: "quicktext",
    decoration: { method: "Quick-text product" },
    text: "I ♥ MUM",
    qty: 1,
    unitPrice: 9.50,
    isRecent: false,
    eligibleBulk: false
  }
];

const SAVED_ITEMS = [
  { id: "sv-1", name: "Embroidered cap", kind: "cap", from: 16.00 },
  { id: "sv-2", name: "Canvas tote",     kind: "tote", from: 8.50 }
];

const CROSS_SELL = [
  { name: "Embroidered cap",    from: 16.00, kind: "cap" },
  { name: "Heritage polo",      from: 18.00, kind: "polo" },
  { name: "Canvas tote",        from: 8.50,  kind: "tote" },
  { name: "Sweatshirt",         from: 22.00, kind: "hoodie" }
];

// Helpers — total units across items
function unitsOf(item) {
  if (item.mode === "multi") return Object.values(item.sizeQtys).reduce((a,b) => a+b, 0);
  return item.qty;
}
function lineSubtotal(item) {
  const units = unitsOf(item);
  return units * item.unitPrice + (item.decoration?.setupFee || 0);
}
function cartUnits(items) { return items.reduce((a, i) => a + unitsOf(i), 0); }
function cartSubtotal(items) { return items.reduce((a, i) => a + lineSubtotal(i), 0); }

Object.assign(window, {
  TIERS, activeTier, nextTier,
  INITIAL_CART, SAVED_ITEMS, CROSS_SELL,
  unitsOf, lineSubtotal, cartUnits, cartSubtotal
});
