// Mid sections: Category grid, How It Works, Bestsellers
const { useRef: useRefMid } = React;

// 04 — Category Grid
const Categories = () => {
  const eyeRef = useReveal();
  const tiles = [
    { name: "Clothing", count: "215 products", kind: "hoodie", grow: 1.4, label: "HERO / TEE RACK" },
    { name: "Workwear", count: "62 products", kind: "polo", grow: 1.0, label: "WORKWEAR / POLO" },
    { name: "Gifts", count: "48 products", kind: "mug", grow: 1.0, label: "GIFTS / MUG SHOT" },
    { name: "Gallery", count: "1,200+ prints", kind: "photo", grow: 1.2, label: "GALLERY / CUSTOMER" }
  ];
  return (
    <section style={{ paddingTop: 120, paddingBottom: 80 }}>
      <div className="container">
        <div ref={eyeRef} className="reveal" style={{ marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Shop by Category</div>
          <h2 className="h2">Find your canvas.</h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: `${tiles.map(t => `${t.grow}fr`).join(" ")}`,
          gap: 16,
          height: 480
        }}>
          {tiles.map(t => <CategoryTile key={t.name} {...t} />)}
        </div>
      </div>
    </section>
  );
};

const CategoryTile = ({ name, count, kind, label }) => {
  const [hover, setHover] = useState(false);
  return (
    <a href="Listing.html"
       onMouseEnter={() => setHover(true)}
       onMouseLeave={() => setHover(false)}
       style={{
         position: "relative",
         height: "100%",
         borderRadius: 6,
         overflow: "hidden",
         background: "var(--surface)",
         border: hover ? "1px solid var(--accent)" : "1px solid var(--border)",
         transition: "border-color 200ms ease-out",
         display: "block"
       }}>
      {/* Background placeholder */}
      <div style={{
        position: "absolute", inset: 0,
        transform: hover ? "scale(1.04)" : "scale(1)",
        transition: "transform 400ms ease-out"
      }}>
        <Placeholder label={label} kind={kind} />
      </div>
      {/* Dark overlay for legibility */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(10,10,10,0) 40%, rgba(10,10,10,0.78) 100%)"
      }} />
      {/* Bottom content */}
      <div style={{
        position: "absolute",
        left: 24, right: 24, bottom: 24,
        display: "flex", flexDirection: "column", gap: 6
      }}>
        <div style={{
          fontSize: 28, fontWeight: 500, color: "#fff",
          letterSpacing: "-0.02em", lineHeight: 1.1
        }}>{name}</div>
        <div style={{ fontSize: 13, color: "var(--accent)", fontWeight: 500 }}>{count}</div>
      </div>
    </a>
  );
};

// 05 — How it works
const HowItWorks = () => {
  const ref = useReveal();
  const steps = [
    { n: "01", t: "Pick your product.", d: "Browse over 60 printable and embroiderable items." },
    { n: "02", t: "Add your design.", d: "Upload, type, or build it in our editor. Live preview included." },
    { n: "03", t: "We print and ship.", d: "Made in the UK, dispatched in 48 hours." }
  ];
  return (
    <section style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div className="container">
        <div ref={ref} className="reveal" style={{ marginBottom: 80, maxWidth: 720 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>How it works</div>
          <h2 className="h2">Three steps. No headaches.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 64 }}>
          {steps.map(s => (
            <div key={s.n}>
              <div style={{
                fontSize: 120,
                lineHeight: 1,
                fontWeight: 500,
                color: "var(--accent)",
                letterSpacing: "-0.04em"
              }}>{s.n}</div>
              <div style={{
                fontSize: 20, fontWeight: 500, color: "#fff",
                marginTop: 24, letterSpacing: "-0.01em"
              }}>{s.t}</div>
              <div style={{
                fontSize: 15, lineHeight: "24px",
                color: "var(--text-65)", marginTop: 12, maxWidth: 280
              }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 06 — Bestsellers rail
const PRODUCTS = [
  { name: "Stencil Heavy Hoodie", from: "34.00", kind: "hoodie" },
  { name: "Classic Tee", from: "9.50", kind: "tee" },
  { name: "Heritage Polo", from: "18.00", kind: "polo" },
  { name: "Oversized Tee", from: "14.00", kind: "tee" },
  { name: "5-Panel Cap", from: "16.00", kind: "cap" },
  { name: "Embroidered Beanie", from: "12.00", kind: "cap" },
  { name: "Canvas Tote", from: "8.50", kind: "tote" },
  { name: "Workshop Polo", from: "16.00", kind: "polo" },
  { name: "Zip-Through Hoodie", from: "38.00", kind: "hoodie" },
  { name: "Heavyweight Tee", from: "12.00", kind: "tee" },
  { name: "Two-tone Mug", from: "9.50", kind: "mug" },
  { name: "Slogan Mug", from: "8.95", kind: "mug" }
];

const BESTSELLER_TABS = [
  { key: "all",     label: "All",      match: null },
  { key: "tee",     label: "T-shirts", match: ["tee"] },
  { key: "hoodie",  label: "Hoodies",  match: ["hoodie"] },
  { key: "polo",    label: "Polos",    match: ["polo"] },
  { key: "mug",     label: "Mugs",     match: ["mug"] },
  { key: "cap",     label: "Caps",     match: ["cap"] }
];

const Bestsellers = () => {
  const ref = useReveal();
  const railRef = useRef(null);
  const [tab, setTab] = useState("all");

  const filtered = (() => {
    const t = BESTSELLER_TABS.find(x => x.key === tab);
    if (!t || !t.match) return PRODUCTS;
    return PRODUCTS.filter(p => t.match.includes(p.kind));
  })();

  // Scroll back to start on filter change
  useEffect(() => {
    if (railRef.current) railRef.current.scrollTo({ left: 0, behavior: "smooth" });
  }, [tab]);

  const scrollBy = (delta) => {
    railRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section style={{ paddingTop: 120, paddingBottom: 80 }}>
      <div className="container">
        <div ref={ref} className="reveal" style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 24,
          gap: 16
        }}>
          <h2 className="h2" style={{ maxWidth: 720 }}>What's selling this week.</h2>
          <a href="Listing.html" style={{
            color: "var(--accent)", fontSize: 14, fontWeight: 500,
            display: "inline-flex", alignItems: "center", gap: 8,
            whiteSpace: "nowrap"
          }} className="text-link">
            View all <IconArrowRight size={14} />
          </a>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex",
          gap: 24,
          marginBottom: 32,
          borderBottom: "1px solid var(--text-10)",
          overflowX: "auto",
          whiteSpace: "nowrap"
        }} className="no-scrollbar">
          {BESTSELLER_TABS.map(t => {
            const active = t.key === tab;
            return (
              <button key={t.key} onClick={() => setTab(t.key)}
                style={{
                  height: 40,
                  padding: "0 4px",
                  background: "transparent",
                  color: active ? "#fff" : "rgba(255,255,255,0.70)",
                  fontSize: 14,
                  fontWeight: active ? 500 : 400,
                  borderBottom: active ? "1px solid var(--accent)" : "1px solid transparent",
                  marginBottom: -1,
                  transition: "color 200ms, border-color 200ms"
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.70)"; }}>
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div ref={railRef} className="no-scrollbar" style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingLeft: "max(96px, calc((100vw - 1280px) / 2 + 96px))",
          paddingRight: 96,
          paddingBottom: 16
        }}>
          {filtered.map((p, i) => (
            <ProductCard key={`${tab}-${i}`} {...p} index={i + 1} />
          ))}
          <div style={{ flex: "0 0 1px" }} />
        </div>
        {/* Arrows */}
        <div style={{
          position: "absolute",
          right: "max(96px, calc((100vw - 1280px) / 2 + 96px))",
          bottom: -56,
          display: "flex",
          gap: 8
        }}>
          <button aria-label="Scroll left" onClick={() => scrollBy(-320)} style={ghostBtn}>
            <IconArrowRight size={16} style={{ transform: "rotate(180deg)" }} />
          </button>
          <button aria-label="Scroll right" onClick={() => scrollBy(320)} style={ghostBtn}>
            <IconArrowRight size={16} />
          </button>
        </div>
      </div>
      <div style={{ height: 56 }} />
    </section>
  );
};

const ghostBtn = {
  width: 40, height: 40,
  border: "1px solid var(--text-20)",
  borderRadius: 4,
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  color: "#fff",
  transition: "border-color 200ms, background 200ms"
};

const ProductCard = ({ name, from, kind, index }) => {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="Product.html"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 280,
        flexShrink: 0,
        scrollSnapAlign: "start",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 6,
        overflow: "hidden",
        transition: "background 200ms ease-out, border-color 200ms ease-out",
        backgroundColor: hover ? "var(--surface-hover)" : "var(--surface)",
        display: "block",
        color: "inherit",
        textDecoration: "none"
      }}
    >
      <div style={{ height: 320, position: "relative", overflow: "hidden" }}>
        <Placeholder label={`SKU-${String(index).padStart(3, "0")}`} kind={kind} />
        {/* Slide-up button */}
        <div style={{
          position: "absolute",
          left: 16, right: 16, bottom: 16,
          transform: hover ? "translateY(0)" : "translateY(150%)",
          transition: "transform 300ms ease-out",
        }}>
          <span className="btn btn-primary" style={{ width: "100%", justifyContent: "center", height: 44, fontSize: 14 }}>
            Customise <IconArrowRight size={14} className="arrow" />
          </span>
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>{name}</div>
        <div style={{ marginTop: 6, fontSize: 14 }}>
          <span style={{ color: "var(--text-60)" }}>From £</span>
          <span style={{ color: "var(--accent)", fontWeight: 500 }}>{from}</span>
        </div>
      </div>
    </a>
  );
};

Object.assign(window, { Categories, HowItWorks, Bestsellers, ProductCard });
