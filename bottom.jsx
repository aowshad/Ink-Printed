// Lower sections: Pricing band, Gallery, Trust strip, Final CTA, Footer

// 07 — Simple pricing band
const PricingBand = () => {
  const ref = useReveal();
  return (
    <section style={{ background: "var(--accent)", paddingTop: 80, paddingBottom: 80 }}>
      <div className="container">
        <div ref={ref} className="reveal" style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 48,
          alignItems: "center"
        }}>
          <div>
            <h2 className="h2" style={{ color: "var(--accent-ink)", maxWidth: 640 }}>
              No setup fees. No minimums.<br />One price per item.
            </h2>
            <p style={{
              fontSize: 16, lineHeight: "26px",
              color: "rgba(10,10,10,0.8)",
              marginTop: 16, maxWidth: 520
            }}>
              What you see on the product page is what you pay. Discounts kick in automatically at 5, 10 and 25 units.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <a href="Quote.html" className="btn btn-invert">
              See pricing <IconArrowRight size={16} className="arrow" />
            </a>
          </div>
        </div>
        {/* Discount ticks */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 24,
          marginTop: 56,
          paddingTop: 32,
          borderTop: "1px solid rgba(10,10,10,0.15)"
        }}>
          {[
            ["1+", "Base price"],
            ["5+", "−10%"],
            ["10+", "−15%"],
            ["25+", "−25%"]
          ].map(([qty, off]) => (
            <div key={qty}>
              <div className="mono" style={{
                fontSize: 14,
                color: "rgba(10,10,10,0.6)",
                letterSpacing: "0.04em"
              }}>QTY {qty}</div>
              <div style={{
                fontSize: 24,
                fontWeight: 700,
                color: "var(--accent-ink)",
                letterSpacing: "-0.02em",
                marginTop: 6
              }}>{off}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 08 — Gallery (bento)
const GALLERY = [
  { tag: "EMBROIDERED POLO", kind: "polo", area: "tall",
    src: "https://images.unsplash.com/photo-1625910513520-bed0389ce32f?w=1200&auto=format&fit=crop&q=80" },
  { tag: "DTG HOODIE", kind: "hoodie", area: "large",
    src: "https://images.unsplash.com/photo-1608054321461-55d899ee08a4?w=1200&auto=format&fit=crop&q=80" },
  { tag: "SCREEN PRINT TEE", kind: "tee", area: "sq1",
    src: "https://images.unsplash.com/photo-1627933540891-1fb6a397c89b?w=1200&auto=format&fit=crop&q=80" },
  { tag: "EMBROIDERED CAP", kind: "cap", area: "sq2",
    src: "https://images.unsplash.com/photo-1760050516469-03cf01c92085?w=1200&auto=format&fit=crop&q=80" },
  { tag: "TOTE BAG", kind: "tote", area: "sm1",
    src: "https://images.unsplash.com/photo-1624911104820-5316c700b907?w=1200&auto=format&fit=crop&q=80" },
  { tag: "WORKSHOP POLO", kind: "polo", area: "sm2",
    src: "https://images.unsplash.com/photo-1739809006763-49663591bdcd?w=1200&auto=format&fit=crop&q=80" },
  { tag: "DTG TEE", kind: "tee", area: "sm3",
    src: "https://images.unsplash.com/photo-1647058485457-af0fb8a66a2b?w=1200&auto=format&fit=crop&q=80" }
];

const Gallery = () => {
  const ref = useReveal();
  return (
    <section style={{ paddingTop: 120, paddingBottom: 80 }}>
      <div className="container">
        <div ref={ref} className="reveal" style={{ marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Real work</div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32 }}>
            <h2 className="h2" style={{ maxWidth: 720 }}>Customer prints, in the wild.</h2>
            <a href="Listing.html" style={{
              color: "var(--accent-line)", fontSize: 14, fontWeight: 500,
              display: "inline-flex", alignItems: "center", gap: 8
            }}>
              See full gallery <IconArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Content blocker sticky */}
        <ContentBlocker />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "240px 240px",
          gap: 16
        }}>
          <GalleryTile {...GALLERY[0]} style={{ gridColumn: "1 / span 1", gridRow: "1 / span 2" }} />
          <GalleryTile {...GALLERY[1]} style={{ gridColumn: "2 / span 2", gridRow: "1 / span 2" }} />
          <GalleryTile {...GALLERY[2]} style={{ gridColumn: "4 / span 1", gridRow: "1 / span 1" }} />
          <GalleryTile {...GALLERY[3]} style={{ gridColumn: "4 / span 1", gridRow: "2 / span 1" }} />
        </div>

        {/* Second row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginTop: 16
        }}>
          <GalleryTile {...GALLERY[4]} style={{ height: 220 }} />
          <GalleryTile {...GALLERY[5]} style={{ height: 220 }} />
          <GalleryTile {...GALLERY[6]} style={{ height: 220 }} />
        </div>
      </div>
    </section>
  );
};

const ContentBlocker = () => (
  <div style={{
    background: "rgba(236,90,180,0.06)",
    border: "1px dashed rgba(236,90,180,0.45)",
    borderRadius: 4,
    padding: "14px 16px",
    marginBottom: 32,
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 12,
    color: "var(--accent-line)",
    letterSpacing: "0.02em",
    textTransform: "uppercase"
  }}>
    <span style={{
      background: "var(--accent)",
      color: "var(--accent-ink)",
      fontWeight: 700,
      padding: "2px 6px",
      borderRadius: 2,
      fontSize: 10
    }}>BLOCKER</span>
    <span>Mark to supply real customer photography before launch.</span>
  </div>
);

const GalleryTile = ({ tag, kind, src, style }) => {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="Listing.html"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        borderRadius: 6,
        overflow: "hidden",
        border: hover ? "1px solid var(--accent-line)" : "1px solid var(--border)",
        transition: "border-color 200ms ease-out",
        background: "var(--surface)",
        display: "block",
        ...style
      }}>
      <div style={{
        position: "absolute", inset: 0,
        transform: hover ? "scale(1.04)" : "scale(1)",
        transition: "transform 400ms ease-out"
      }}>
        <Placeholder label={tag} kind={kind} src={src} />
      </div>
      {/* Tag on hover */}
      <div style={{
        position: "absolute",
        top: 12, left: 12,
        opacity: hover ? 1 : 0,
        transform: hover ? "translateY(0)" : "translateY(-4px)",
        transition: "opacity 200ms ease-out, transform 200ms ease-out",
        background: "rgba(10,10,10,0.85)",
        border: "1px solid rgba(255,255,255,0.15)",
        color: "var(--on-media)",
        fontSize: 11,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "5px 8px",
        borderRadius: 2,
        fontWeight: 500
      }}>{tag}</div>
    </a>
  );
};

// 09 — Trust strip
const TrustStrip = () => {
  const ref = useReveal();
  const stats = [
    ["10+", "Years printing"],
    ["UK", "Based & shipped"],
    ["4.8★", "From 2,000+ reviews"],
    ["48h", "From order to dispatch"]
  ];
  return (
    <section style={{
      paddingTop: 80, paddingBottom: 80,
      borderTop: "1px solid var(--text-10)",
      borderBottom: "1px solid var(--text-10)"
    }}>
      <div ref={ref} className="reveal container" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: 24
      }}>
        {stats.map(([n, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{
              fontSize: 56,
              fontWeight: 700,
              color: "var(--accent-line)",
              letterSpacing: "-0.03em",
              lineHeight: 1
            }}>{n}</div>
            <div className="label-up" style={{
              color: "var(--text-60)",
              marginTop: 12
            }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// 10 — Final CTA
const FinalCTA = () => {
  const ref = useReveal();
  return (
    <section style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div ref={ref} className="reveal" style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "0 24px",
        textAlign: "center"
      }}>
        <div style={{
          width: 48, height: 2,
          background: "var(--accent)",
          margin: "0 auto 32px"
        }} />
        <h2 style={{
          fontSize: 64,
          lineHeight: "72px",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          margin: 0
        }}>Ready to print something good?</h2>
        <p style={{
          fontSize: 16,
          lineHeight: "26px",
          color: "var(--text-65)",
          marginTop: 16,
          maxWidth: 480,
          marginLeft: "auto",
          marginRight: "auto"
        }}>
          Start with a blank product or upload your design. Live preview, no commitment.
        </p>
        <div style={{ marginTop: 32, display: "inline-block" }}>
          <a href="Listing.html" className="btn btn-primary btn-lg">
            Start designing <IconArrowRight size={18} className="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
};

// 11 — Footer
const Footer = () => {
  const cols = [
    { title: "Shop", items: [
      ["Clothing",     "Listing.html"],
      ["Workwear",     "Listing.html"],
      ["Gifts",        "Listing.html"],
      ["New arrivals", "Listing.html"],
      ["Sale",         "Listing.html"]
    ] },
    { title: "Help", items: [
      ["FAQs",            "Quote.html#faq"],
      ["Delivery",        "#"],
      ["Returns",         "#"],
      ["Artwork guide",   "#"],
      ["Bulk orders",     "Quote.html"],
      ["Contact",         "Quote.html"]
    ] },
    { title: "Account", items: [
      ["Sign in",         "Login.html"],
      ["Create account",  "Login.html"],
      ["Dashboard",       "Account.html"],
      ["Saved designs",   "Account.html"],
      ["Track order",     "Account.html"]
    ] },
    { title: "Company", items: [
      ["About",           "#"],
      ["Sustainability",  "#"],
      ["Trade & bulk",    "Quote.html"],
      ["Reviews",         "#"],
      ["Press",           "#"]
    ] }
  ];
  return (
    <footer style={{
      background: "var(--bg-deeper)",
      paddingTop: 80,
      paddingBottom: 48
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr",
          gap: 48
        }}>
          {/* Brand col */}
          <div>
            <a href="Homepage.html"><Wordmark size={24} /></a>
            <p style={{
              fontSize: 14,
              color: "var(--text-60)",
              marginTop: 16,
              maxWidth: 280,
              lineHeight: "22px"
            }}>Custom print & embroidery, made in the UK.</p>

            <div style={{ marginTop: 32 }}>
              <div className="label-up" style={{
                color: "var(--text)",
                marginBottom: 12,
                fontWeight: 500,
                opacity: 0.9,
                letterSpacing: "0.06em"
              }}>
                First-order discount, new product drops.
              </div>
              <form style={{ display: "flex", gap: 8 }} onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="you@email.com"
                  style={{
                    flex: 1,
                    height: 48,
                    background: "transparent",
                    border: "1px solid var(--text-20)",
                    borderRadius: 4,
                    color: "var(--text)",
                    padding: "0 14px",
                    fontFamily: "inherit",
                    fontSize: 14,
                    outline: "none"
                  }}
                  onFocus={e => e.target.style.borderColor = "var(--accent-line)"}
                  onBlur={e => e.target.style.borderColor = "var(--text-20)"}
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe <IconArrowRight size={14} className="arrow" />
                </button>
              </form>
            </div>
          </div>

          {/* Link cols */}
          {cols.map(c => (
            <div key={c.title}>
              <div className="label-up" style={{ color: "var(--accent-line)", marginBottom: 18 }}>{c.title}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {c.items.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} style={{
                      fontSize: 14,
                      color: "var(--text-70)",
                      transition: "color 200ms"
                    }}
                    onMouseEnter={e => e.target.style.color = "var(--text)"}
                    onMouseLeave={e => e.target.style.color = "var(--text-70)"}
                    >{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider + bottom row */}
        <div style={{
          marginTop: 64,
          paddingTop: 24,
          borderTop: "1px solid var(--text-10)",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 24
        }}>
          <div style={{ fontSize: 12, color: "var(--text-40)" }}>
            © 2026 InkPrinted Ltd. Registered in England & Wales.
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center", justifyContent: "center" }}>
            {["VISA", "MC", "AMEX", "PYPL", " Pay", "G Pay"].map(b => (
              <span key={b} style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.06em",
                color: "var(--text-55)",
                border: "1px solid var(--text-15)",
                borderRadius: 3,
                padding: "5px 8px",
                height: 24,
                display: "inline-flex",
                alignItems: "center"
              }}>{b}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, justifyContent: "flex-end", color: "var(--text-50)" }}>
            <a href="#" aria-label="Instagram"><IconInstagram /></a>
            <a href="#" aria-label="TikTok"><IconTikTok /></a>
            <a href="#" aria-label="Facebook"><IconFacebook /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

Object.assign(window, { PricingBand, Gallery, TrustStrip, FinalCTA, Footer });
