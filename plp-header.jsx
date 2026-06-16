// PLP — Breadcrumb, Category header, Sort/filter status bar

const PLPBreadcrumb = ({ trail }) => (
  <div className="container" style={{ paddingTop: 16, paddingBottom: 16 }}>
    <div style={{
      fontSize: 13,
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexWrap: "nowrap",
      whiteSpace: "nowrap",
      overflow: "hidden"
    }}>
      {trail.map((item, i) => {
        const isLast = i === trail.length - 1;
        return (
          <React.Fragment key={i}>
            {isLast
              ? <span style={{ color: "var(--text-80)" }}>{item}</span>
              : <a href="#" style={{ color: "var(--text-50)" }}>{item}</a>}
            {!isLast && <span style={{ color: "var(--text-30)" }}>›</span>}
          </React.Fragment>
        );
      })}
    </div>
  </div>
);

// Category header — full-width band with typographic sub-category list (Refine-style)
const CategoryHeader = ({ meta, activeSub, setActiveSub }) => {
  const VISIBLE_LIMIT = 5;
  const [showAll, setShowAll] = useState(false);
  const allChips = meta.subCategoryChips;
  const visible = showAll ? allChips : allChips.slice(0, VISIBLE_LIMIT);

  const toggle = (chip) => {
    const next = new Set(activeSub);
    next.has(chip) ? next.delete(chip) : next.add(chip);
    setActiveSub(next);
  };

  return (
    <section style={{
      borderBottom: "1px solid var(--border)",
      paddingTop: 56,
      paddingBottom: 56
    }}>
      <div className="container" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 48,
        alignItems: "start"
      }}>
        {/* Left — title + sub */}
        <div>
          <div className="label-up" style={{
            color: "var(--text-40)"
          }}>{meta.parent}</div>
          <h1 style={{
            fontSize: 48, lineHeight: "56px", fontWeight: 500,
            letterSpacing: "-0.02em",
            margin: 0, marginTop: 8
          }}>{meta.name}</h1>
          <p style={{
            fontSize: 15, lineHeight: "24px",
            color: "var(--text-65)",
            marginTop: 16, marginBottom: 0,
            maxWidth: 480
          }}>{meta.subhead}</p>
        </div>

        {/* Right — typographic sub-category list */}
        <div>
          <ul style={{
            listStyle: "none",
            padding: 0, margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 4
          }}>
            {visible.map(chip => {
              const active = activeSub.has(chip);
              return (
                <li key={chip}>
                  <button
                    onClick={() => toggle(chip)}
                    className="sub-typo"
                    style={{
                      fontFamily: "inherit",
                      fontSize: 40,
                      lineHeight: "48px",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      color: active ? "var(--accent-line)" : "var(--text-30)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 16,
                      cursor: "pointer",
                      transition: "color 200ms"
                    }}>
                    {chip}
                    <span className="sub-typo-arrow" aria-hidden="true" style={{
                      color: active ? "var(--accent-line)" : "var(--text-45)",
                      transition: "transform 200ms, opacity 200ms",
                      display: "inline-flex"
                    }}>
                      <IconArrowRight size={20} strokeWidth={1.5} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {allChips.length > VISIBLE_LIMIT && (
            <button
              onClick={() => setShowAll(s => !s)}
              style={{
                marginTop: 12,
                color: "var(--accent-line)",
                fontSize: 14,
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: 6
              }}>
              {showAll ? "Show fewer" : "Show all"} <IconArrowRight size={13} />
            </button>
          )}
        </div>
      </div>

      <style>{`
        .sub-typo .sub-typo-arrow {
          opacity: 0;
          transform: translateX(-8px);
        }
        .sub-typo:hover {
          color: var(--text) !important;
        }
        .sub-typo:hover .sub-typo-arrow {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </section>
  );
};

// Sort / filter status bar
const SortFilterBar = ({ count, total, filters, setFilters, sort, setSort }) => {
  const pills = activeFilterPills(filters);
  const visiblePills = pills.slice(0, 3);
  const overflow = pills.length - visiblePills.length;
  const anyActive = countActive(filters) > 0;

  const removePill = (p) => {
    const next = { ...filters };
    if (p.group === "price") {
      next.price = [PRICE_MIN, PRICE_MAX];
    } else {
      const val = p.key.split(":").slice(1).join(":");
      const set = new Set(next[p.group]);
      // For colour, label is capitalised — get the original
      if (p.group === "colour") set.delete(val.toLowerCase());
      else set.delete(val);
      next[p.group] = set;
    }
    setFilters(next);
  };

  const clearAll = () => setFilters({
    ...INITIAL_FILTERS,
    sub: new Set(), fit: new Set(), deco: new Set(),
    colour: new Set(), features: new Set(), sizes: new Set(),
    price: [PRICE_MIN, PRICE_MAX]
  });

  return (
    <div style={{
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      position: "sticky",
      top: 108,
      background: "var(--bg)",
      zIndex: 30
    }}>
      <div className="container" style={{
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <span style={{ fontSize: 13, color: "var(--text-60)", whiteSpace: "nowrap" }}>
            {count} of {total} products
          </span>
          {pills.length > 0 && (
            <span style={{ width: 1, height: 16, background: "var(--text-20)" }} />
          )}
          <div style={{ display: "flex", gap: 6, alignItems: "center", overflow: "hidden", minWidth: 0 }}>
            {visiblePills.map(p => (
              <button key={p.key} onClick={() => removePill(p)}
                style={{
                  height: 28, padding: "0 10px",
                  background: "var(--surface-2)",
                  color: "var(--text)",
                  fontSize: 11,
                  fontWeight: 500,
                  borderRadius: 14,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  whiteSpace: "nowrap",
                  transition: "background 200ms"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--text-10)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--surface-2)"}>
                {p.label}
                <IconClose size={10} strokeWidth={2} />
              </button>
            ))}
            {overflow > 0 && (
              <span style={{
                fontSize: 11, color: "var(--text-60)",
                padding: "0 4px"
              }}>+{overflow} more</span>
            )}
            {anyActive && (
              <button onClick={clearAll} style={{
                color: "var(--accent-line)",
                fontSize: 11,
                fontWeight: 500,
                marginLeft: 4
              }}>Clear all</button>
            )}
          </div>
        </div>

        <SortDropdown sort={sort} setSort={setSort} />
      </div>
    </div>
  );
};

const SORT_OPTIONS = ["Bestsellers", "New in", "Price: low to high", "Price: high to low", "Rating", "Most reviewed"];

const SortDropdown = ({ sort, setSort }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    window.addEventListener("mousedown", onDoc);
    return () => window.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative", display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 12, color: "var(--text-60)" }}>Sort:</span>
      <button onClick={() => setOpen(o => !o)} style={{
        height: 36,
        padding: "0 14px",
        borderRadius: 18,
        border: "1px solid var(--text-20)",
        background: "transparent",
        color: "var(--text-85)",
        fontSize: 13,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        whiteSpace: "nowrap",
        transition: "border-color 200ms"
      }}>
        {sort}
        <IconChevronDown size={12} style={{
          transform: open ? "rotate(180deg)" : "rotate(0)",
          transition: "transform 200ms"
        }} />
      </button>
      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 6px)",
          right: 0,
          minWidth: 200,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 6,
          padding: 4,
          zIndex: 10
        }}>
          {SORT_OPTIONS.map(o => (
            <button key={o} onClick={() => { setSort(o); setOpen(false); }} style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "8px 12px",
              borderRadius: 4,
              fontSize: 13,
              color: sort === o ? "var(--accent-line)" : "var(--text)",
              background: sort === o ? "rgba(236,90,180,0.08)" : "transparent",
              transition: "background 200ms"
            }}
            onMouseEnter={e => { if (sort !== o) e.currentTarget.style.background = "var(--surface-2)"; }}
            onMouseLeave={e => { if (sort !== o) e.currentTarget.style.background = "transparent"; }}>
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

Object.assign(window, { PLPBreadcrumb, CategoryHeader, SortFilterBar, SortDropdown, SORT_OPTIONS });
