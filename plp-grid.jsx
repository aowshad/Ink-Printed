// PLP — Product grid, cards, editorial tile, load more, empty state, SEO

// Badge
const ProductBadge = ({ kind }) => {
  if (!kind) return null;
  const map = {
    bestseller: { label: "Bestseller", bg: "var(--accent)", color: "#0A0A0A", outline: false },
    new:        { label: "New",        bg: "#fff",          color: "#0A0A0A", outline: false },
    onmodel:    { label: "On model",   bg: "transparent",   color: "#fff",    outline: true },
    oos:        { label: "Out of stock", bg: "rgba(10,10,10,0.85)", color: "#fff", outline: true },
    soon:       { label: "Coming soon", bg: "transparent",  color: "#fff",    outline: true }
  };
  const s = map[kind];
  if (!s) return null;
  return (
    <span style={{
      position: "absolute",
      top: 10, left: 10,
      fontSize: 9,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      fontWeight: 500,
      padding: "4px 6px",
      borderRadius: 2,
      background: s.bg,
      color: s.color,
      border: s.outline ? "1px solid rgba(255,255,255,0.6)" : "none",
      zIndex: 2,
      whiteSpace: "nowrap"
    }}>{s.label}</span>
  );
};

// Colour swatch row (card variant)
const CardSwatchRow = ({ colours }) => {
  const visible = colours.slice(0, 4);
  const more = colours.length - visible.length;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
      {visible.map(name => {
        const c = PLP_COLOURS.find(x => x.name === name);
        if (!c) return null;
        return (
          <span key={name} style={{
            width: 14, height: 14,
            borderRadius: "50%",
            background: c.hex,
            border: c.light ? "1px solid rgba(255,255,255,0.30)" : "0.5px solid transparent"
          }} />
        );
      })}
      {more > 0 && (
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.60)", marginLeft: 4 }}>
          +{more} more
        </span>
      )}
    </div>
  );
};

// Product card
const PLPProductCard = ({ product: p }) => {
  const [hover, setHover] = useState(false);
  const isOOS = p.stock === "oos";
  const isSoon = p.stock === "soon";
  const dimmed = isOOS;

  // Badge priority: oos > soon > bestseller > new > onmodel
  let badge = null;
  if (isOOS) badge = "oos";
  else if (isSoon) badge = "soon";
  else badge = p.badge;

  const showRating = p.reviews >= 5;

  const cta = isOOS || isSoon ? "Notify me" : "Customise";
  const href = isOOS || isSoon ? "#" : "Product.html";

  // Determine display tag
  const tag = p.fit === "Ladies" ? `T-shirt · ${p.fit}` : p.fit === "Kids" ? `T-shirt · Kids` : "T-shirt";

  return (
    <a href={href}
       onMouseEnter={() => setHover(true)}
       onMouseLeave={() => setHover(false)}
       style={{
         background: "var(--surface)",
         borderRadius: 6,
         overflow: "hidden",
         border: "0.5px solid " + (hover ? "var(--accent)" : "rgba(255,255,255,0.10)"),
         transition: "border-color 200ms ease-out, opacity 200ms",
         opacity: dimmed ? 0.5 : 1,
         display: "block",
         position: "relative"
       }}>
      <div style={{
        aspectRatio: "1 / 1",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)"
      }}>
        <ProductBadge kind={badge} />

        {/* Wishlist */}
        <button aria-label="Save" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          style={{
            position: "absolute",
            top: 10, right: 10,
            width: 24, height: 24,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.60)",
            zIndex: 2,
            transition: "color 200ms"
          }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.60)"}>
          <IconHeart size={16} />
        </button>

        {/* Primary image */}
        <div style={{
          position: "absolute", inset: 0,
          opacity: hover && !dimmed ? 0 : 1,
          transition: "opacity 240ms ease-out"
        }}>
          <Silhouette kind={p.kind} />
        </div>
        {/* Secondary "on model" image (hover) */}
        <div style={{
          position: "absolute", inset: 0,
          opacity: hover && !dimmed ? 1 : 0,
          transition: "opacity 240ms ease-out",
          background: "#1A1A1A"
        }}>
          <Silhouette kind={p.kind === "tee" ? "photo" : p.kind} />
        </div>

        {/* Slide-up CTA */}
        <div style={{
          position: "absolute",
          left: 16, right: 16, bottom: 16,
          transform: hover ? "translateY(0)" : "translateY(150%)",
          transition: "transform 300ms ease-out"
        }}>
          <span className="btn btn-primary" style={{
            width: "100%", justifyContent: "center", height: 40, fontSize: 13
          }}>
            {cta} <IconArrowRight size={13} className="arrow" />
          </span>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <div className="label-up" style={{ color: "rgba(255,255,255,0.40)" }}>
          {tag}
        </div>
        <div style={{
          fontSize: 16, fontWeight: 500, color: "#fff",
          marginTop: 4, letterSpacing: "-0.01em"
        }}>{p.name}</div>

        <CardSwatchRow colours={p.colours} />

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: 12
        }}>
          <div>
            <div style={{
              fontSize: 10,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.40)",
              fontWeight: 500
            }}>From</div>
            <div style={{
              fontSize: 16, fontWeight: 500, color: "var(--accent)",
              lineHeight: 1.1, marginTop: 2
            }}>£{p.from.toFixed(2)}</div>
          </div>
          {showRating ? (
            <div style={{
              fontSize: 11, color: "rgba(255,255,255,0.60)",
              display: "inline-flex", alignItems: "center", gap: 4
            }}>
              <IconStar size={11} filled color="#AACC00" />
              {p.rating} ({p.reviews})
            </div>
          ) : null}
        </div>
      </div>
    </a>
  );
};

// Editorial tile (replaces a card slot)
const EditorialTile = ({ label, headline, sub, link }) => (
  <a href="#" style={{
    background: "#0A0A0A",
    borderRadius: 6,
    border: "0.5px solid rgba(255,255,255,0.10)",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 320,
    transition: "border-color 200ms"
  }}
  onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"}>
    <div className="label-up" style={{ color: "var(--accent)" }}>{label}</div>
    <div>
      <div style={{
        fontSize: 22, lineHeight: "28px", fontWeight: 500,
        letterSpacing: "-0.02em"
      }}>{headline}</div>
      <p style={{
        fontSize: 13, color: "rgba(255,255,255,0.65)",
        margin: 0, marginTop: 8, lineHeight: 1.5
      }}>{sub}</p>
      <div style={{
        marginTop: 14, color: "var(--accent)",
        fontSize: 13, fontWeight: 500,
        display: "inline-flex", alignItems: "center", gap: 6
      }}>
        {link} <IconArrowRight size={13} />
      </div>
    </div>
  </a>
);

// Compose grid: insert editorial tile after every 9 cards
const ProductGrid = ({ products, loaded }) => {
  const visible = products.slice(0, loaded);
  const items = [];

  visible.forEach((p, i) => {
    items.push({ kind: "card", product: p });
    if ((i + 1) % 9 === 0 && i !== visible.length - 1) {
      items.push({ kind: "edit" });
    }
  });

  // Force at least one editorial tile for short lists
  if (visible.length > 0 && !items.some(x => x.kind === "edit")) {
    // Insert at position 5 (or after the visible set if smaller)
    const pos = Math.min(5, items.length);
    items.splice(pos, 0, { kind: "edit" });
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 12,
      flex: 1,
      alignContent: "start"
    }}>
      {items.map((it, i) => it.kind === "card"
        ? <PLPProductCard key={it.product.id} product={it.product} />
        : <EditorialTile key={`edit-${i}`}
            label="Quick-text"
            headline="Type. Order. Done."
            sub="Quick-text products: pick a design, type your text, checkout in under a minute. No designer needed."
            link="Browse quick-text" />
      )}
    </div>
  );
};

// Load more + pagination
const LoadMore = ({ loaded, total, onLoadMore, loadCount }) => {
  const showing = Math.min(loaded, total);
  const pct = total > 0 ? (showing / total) * 100 : 0;

  if (loadCount >= 3 && total > loaded) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
        <Pagination total={total} loaded={loaded} />
      </div>
    );
  }

  return (
    <div style={{
      marginTop: 32,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12
    }}>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.60)" }}>
        Showing {showing} of {total}
      </div>
      <div style={{
        width: 200, height: 4, borderRadius: 2,
        background: "var(--surface-2)",
        overflow: "hidden"
      }}>
        <div style={{
          width: `${pct}%`,
          height: "100%",
          background: "#fff",
          transition: "width 400ms ease-out"
        }} />
      </div>
      {showing < total && (
        <button onClick={onLoadMore} className="btn btn-secondary" style={{ height: 44, marginTop: 8 }}>
          Load more <IconArrowRight size={14} className="arrow" />
        </button>
      )}
    </div>
  );
};

const Pagination = ({ total, loaded }) => {
  const perPage = 9;
  const pages = Math.ceil(total / perPage);
  const current = Math.ceil(loaded / perPage);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <PageBtn label="←" />
      {Array.from({ length: pages }).map((_, i) => (
        <PageBtn key={i} label={String(i + 1)} active={i + 1 === current} />
      ))}
      <PageBtn label="→" />
    </div>
  );
};
const PageBtn = ({ label, active }) => (
  <button style={{
    minWidth: 32, height: 32, padding: "0 10px",
    borderRadius: 16,
    background: active ? "#fff" : "transparent",
    color: active ? "#0A0A0A" : "rgba(255,255,255,0.80)",
    border: active ? "1px solid transparent" : "1px solid rgba(255,255,255,0.15)",
    fontSize: 12, fontWeight: 500,
    transition: "all 200ms"
  }}>{label}</button>
);

// Empty state
const EmptyState = ({ onClear }) => (
  <div style={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "80px 24px",
    background: "var(--surface)",
    borderRadius: 6,
    maxWidth: 480,
    margin: "0 auto"
  }}>
    <div style={{ color: "rgba(255,255,255,0.30)" }}>
      <IconSearchNo size={48} strokeWidth={1.25} />
    </div>
    <div style={{ fontSize: 24, fontWeight: 500, marginTop: 20, letterSpacing: "-0.01em" }}>No matches</div>
    <p style={{
      fontSize: 14, color: "rgba(255,255,255,0.65)",
      marginTop: 8, maxWidth: 320, lineHeight: 1.5
    }}>Try removing a filter or two, or browse all t-shirts.</p>
    <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
      <button onClick={onClear} className="btn btn-primary" style={{ height: 44 }}>
        Clear filters <IconArrowRight size={14} className="arrow" />
      </button>
      <a href="#" className="btn btn-secondary" style={{ height: 44 }}>
        Browse all <IconArrowRight size={14} className="arrow" />
      </a>
    </div>
  </div>
);

// SEO content block
const SEOBlock = () => (
  <div style={{
    background: "var(--surface)",
    borderRadius: 6,
    padding: 24,
    marginTop: 80
  }}>
    <h3 style={{
      fontSize: 18, fontWeight: 500, margin: 0,
      letterSpacing: "-0.01em"
    }}>About custom-printed t-shirts</h3>
    <div style={{
      fontSize: 14, color: "rgba(255,255,255,0.65)",
      lineHeight: 1.6, marginTop: 12, maxWidth: 720
    }}>
      <p style={{ margin: 0 }}>
        Every t-shirt in this section is printed to order in the UK using direct-to-garment (DTG) inks or vinyl transfer, depending on your design. Standard cotton, heavyweight 200gsm+, oversized boxy fits, organic GOTS-certified cotton, ladies fitted, kids — pick a base, drop your artwork in our design lab, and we'll print it.
      </p>
      <p style={{ marginTop: 12, marginBottom: 0 }}>
        Orders dispatch within 48 hours. Bulk discounts kick in automatically at 5, 10 and 25 units. No setup fees, no minimums, no faff.
      </p>
    </div>
    <div style={{
      display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20
    }}>
      {["Heavyweight tees", "Organic cotton", "Oversized fit", "Kids tees", "Ladies fit", "DTG print", "Quick-text", "Bulk orders"].map(t => (
        <a key={t} href="#" style={{
          height: 28, padding: "0 12px",
          borderRadius: 14,
          background: "var(--surface-2)",
          color: "rgba(255,255,255,0.70)",
          fontSize: 11,
          display: "inline-flex",
          alignItems: "center",
          fontWeight: 500,
          transition: "background 200ms, color 200ms"
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#0A0A0A"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "var(--surface-2)"; e.currentTarget.style.color = "rgba(255,255,255,0.70)"; }}
        >{t}</a>
      ))}
    </div>
  </div>
);

Object.assign(window, {
  PLPProductCard, ProductBadge, CardSwatchRow,
  EditorialTile, ProductGrid, LoadMore, Pagination, PageBtn,
  EmptyState, SEOBlock
});
