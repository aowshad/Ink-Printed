// PLP — Filter sidebar

// Counts per option, computed against current filter set minus that group
function countFor(group, value, filters, products) {
  const f = { ...filters, [group]: new Set([...filters[group], value]) };
  // For sizes/features it's any-match; we just include value in the set and count
  return products.filter(p => passesFilters(p, f)).length;
}

const FilterGroup = ({ title, openDefault = false, count = null, children }) => {
  const [open, setOpen] = useState(openDefault);
  return (
    <div style={{
      borderBottom: "1px solid rgba(255,255,255,0.10)",
      padding: "16px 0"
    }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <span className="label-up" style={{ color: "rgba(255,255,255,0.60)" }}>
          {title}
          {count != null && count > 0 && (
            <span style={{
              marginLeft: 8,
              fontSize: 10,
              color: "var(--accent)",
              fontWeight: 500
            }}>{count}</span>
          )}
        </span>
        <span style={{
          color: "rgba(255,255,255,0.50)",
          display: "inline-flex",
          transition: "transform 200ms ease-out",
          transform: open ? "rotate(45deg)" : "rotate(0)"
        }}>
          <IconPlus size={14} />
        </span>
      </button>
      <div style={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        transition: "grid-template-rows 240ms ease-out"
      }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ paddingTop: open ? 14 : 0 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkbox = ({ checked, onChange, label, count }) => (
  <label style={{
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: count === 0 && !checked ? "not-allowed" : "pointer",
    opacity: count === 0 && !checked ? 0.4 : 1,
    padding: "2px 0"
  }}>
    <span style={{
      width: 16, height: 16,
      borderRadius: 3,
      border: checked ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.30)",
      background: checked ? "var(--accent)" : "transparent",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      transition: "background 200ms, border-color 200ms"
    }}>
      {checked && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5l2 2 4-4" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
    <input type="checkbox" checked={checked} onChange={onChange}
           style={{ position: "absolute", opacity: 0, pointerEvents: "none" }} />
    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.80)", flex: 1 }}>{label}</span>
    {count != null && (
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.40)" }}>{count}</span>
    )}
  </label>
);

const ColourSwatchPicker = ({ active, onToggle }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
    {PLP_COLOURS.map(c => {
      const selected = active.has(c.name);
      return (
        <button
          key={c.name}
          aria-label={c.name}
          onClick={() => onToggle(c.name)}
          className="plp-swatch"
          style={{
            width: 24, height: 24,
            borderRadius: "50%",
            background: c.hex,
            border: c.light ? "0.5px solid rgba(0,0,0,0.10)" : "0.5px solid transparent",
            outline: selected ? "2px solid var(--accent)" : "none",
            outlineOffset: 2,
            padding: 0,
            transition: "transform 200ms ease-out",
            position: "relative"
          }} />
      );
    })}
    <style>{`.plp-swatch:hover { transform: scale(1.1); }`}</style>
  </div>
);

const PriceSlider = ({ value, setValue, onApply }) => {
  const [pending, setPending] = useState(value);
  useEffect(() => setPending(value), [value]);

  const [pMin, pMax] = pending;
  const dirty = pMin !== value[0] || pMax !== value[1];
  const fillLeft = ((pMin - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const fillRight = ((pMax - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <div>
      <div className="price-slider">
        <div className="track" />
        <div className="fill" style={{ left: `${fillLeft}%`, right: `${100 - fillRight}%` }} />
        <input type="range" min={PRICE_MIN} max={PRICE_MAX} value={pMin}
          onChange={e => setPending([Math.min(Number(e.target.value), pMax), pMax])} />
        <input type="range" min={PRICE_MIN} max={PRICE_MAX} value={pMax}
          onChange={e => setPending([pMin, Math.max(Number(e.target.value), pMin)])} />
      </div>
      <div style={{
        marginTop: 10,
        display: "flex",
        justifyContent: "space-between",
        fontSize: 11,
        color: "rgba(255,255,255,0.60)"
      }}>
        <span>£{pMin}</span>
        <span>£{pMax}{pMax === PRICE_MAX ? "+" : ""}</span>
      </div>
      {dirty && (
        <button onClick={() => { setValue(pending); onApply && onApply(); }}
          style={{
            marginTop: 12,
            width: "100%",
            height: 32,
            borderRadius: 4,
            background: "var(--accent)",
            color: "#0A0A0A",
            fontSize: 12,
            fontWeight: 500
          }}>Apply</button>
      )}
    </div>
  );
};

// Helpers — count helpers per group
function countSub(value, filters) {
  const f = { ...filters, sub: new Set([value]) };
  return PRODUCTS.filter(p => passesFilters(p, f)).length;
}
function countFit(value, filters) {
  const f = { ...filters, fit: new Set([value]) };
  return PRODUCTS.filter(p => passesFilters(p, f)).length;
}
function countDeco(value, filters) {
  const f = { ...filters, deco: new Set([value]) };
  return PRODUCTS.filter(p => passesFilters(p, f)).length;
}
function countFeat(value, filters) {
  const f = { ...filters, features: new Set([value]) };
  return PRODUCTS.filter(p => passesFilters(p, f)).length;
}

const SUBS = ["Standard", "Heavyweight", "Oversized", "Organic", "Long sleeve", "Kids"];
const FITS = ["Unisex", "Ladies", "Kids"];
const DECOS = ["DTG", "Embroidery", "Vinyl", "Sublimation", "All-over", "Screen"];
const FEATURES = ["Organic", "Quick-text", "Heavyweight", "Bulk", "New"];
const SIZES_ALL = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const KIDS_SIZES = ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"];

const FilterSidebar = ({ filters, setFilters }) => {
  const active = countActive(filters);
  const toggle = (group, value) => {
    const next = new Set(filters[group]);
    next.has(value) ? next.delete(value) : next.add(value);
    setFilters({ ...filters, [group]: next });
  };
  const reset = () => setFilters({
    sub: new Set(), fit: new Set(), deco: new Set(),
    colour: new Set(), features: new Set(), sizes: new Set(),
    price: [PRICE_MIN, PRICE_MAX]
  });

  return (
    <aside style={{
      width: 240,
      flexShrink: 0,
      background: "var(--surface)",
      borderRadius: 6,
      padding: 20,
      position: "sticky",
      top: 180,
      alignSelf: "flex-start",
      maxHeight: "calc(100vh - 200px)",
      overflowY: "auto"
    }} className="no-scrollbar">
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 8
      }}>
        <div style={{
          fontSize: 12, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase"
        }}>Filters</div>
        {active > 0 && (
          <span style={{
            height: 20, padding: "0 8px",
            borderRadius: 10,
            background: "rgba(236,90,180,0.15)",
            color: "var(--accent)",
            fontSize: 11, fontWeight: 500,
            display: "inline-flex", alignItems: "center"
          }}>{active} active</span>
        )}
      </div>

      <FilterGroup title="Sub-category" openDefault={true} count={filters.sub.size}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {SUBS.map(s => (
            <Checkbox key={s}
              checked={filters.sub.has(s)}
              onChange={() => toggle("sub", s)}
              label={s}
              count={countSub(s, { ...filters, sub: new Set() })} />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Fit" openDefault={true} count={filters.fit.size}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FITS.map(s => (
            <Checkbox key={s}
              checked={filters.fit.has(s)}
              onChange={() => toggle("fit", s)}
              label={s}
              count={countFit(s, { ...filters, fit: new Set() })} />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Decoration method" count={filters.deco.size}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {DECOS.map(s => (
            <Checkbox key={s}
              checked={filters.deco.has(s)}
              onChange={() => toggle("deco", s)}
              label={s}
              count={countDeco(s, { ...filters, deco: new Set() })} />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Colour" count={filters.colour.size}>
        <ColourSwatchPicker active={filters.colour} onToggle={(v) => toggle("colour", v)} />
      </FilterGroup>

      <FilterGroup title="Price"
                   count={(filters.price[0] !== PRICE_MIN || filters.price[1] !== PRICE_MAX) ? 1 : 0}>
        <PriceSlider value={filters.price} setValue={(v) => setFilters({ ...filters, price: v })} />
      </FilterGroup>

      <FilterGroup title="Features" count={filters.features.size}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FEATURES.map(s => (
            <Checkbox key={s}
              checked={filters.features.has(s)}
              onChange={() => toggle("features", s)}
              label={s}
              count={countFeat(s, { ...filters, features: new Set() })} />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Size availability" count={filters.sizes.size}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          {SIZES_ALL.map(s => (
            <SizeChip key={s} label={s} active={filters.sizes.has(s)} onClick={() => toggle("sizes", s)} />
          ))}
        </div>
        <div className="label-up" style={{ color: "rgba(255,255,255,0.45)", marginTop: 6, marginBottom: 8 }}>Kids</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {KIDS_SIZES.map(s => (
            <SizeChip key={s} label={s} active={filters.sizes.has(s)} onClick={() => toggle("sizes", s)} />
          ))}
        </div>
      </FilterGroup>

      {active > 0 && (
        <button onClick={reset} style={{
          color: "rgba(255,255,255,0.60)",
          fontSize: 12,
          marginTop: 16,
          textDecoration: "underline",
          textUnderlineOffset: 3
        }}>Reset filters</button>
      )}
    </aside>
  );
};

const SizeChip = ({ label, active, onClick }) => (
  <button onClick={onClick} style={{
    height: 28,
    padding: "0 10px",
    borderRadius: 4,
    border: "1px solid " + (active ? "var(--accent)" : "rgba(255,255,255,0.20)"),
    background: active ? "rgba(236,90,180,0.10)" : "transparent",
    color: active ? "var(--accent)" : "rgba(255,255,255,0.85)",
    fontSize: 12, fontWeight: 500,
    transition: "background 200ms, color 200ms, border-color 200ms"
  }}>{label}</button>
);

Object.assign(window, { FilterSidebar, FilterGroup, Checkbox, ColourSwatchPicker, PriceSlider, SizeChip });
