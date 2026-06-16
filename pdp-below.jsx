// PDP — Below-fold: Accordion, Reviews, Cross-sell

// Section 03 — Detail accordion
const ACCORDION_ROWS = [
  {
    id: "desc",
    title: "Full description",
    body: (
      <>
        <p style={{ margin: 0 }}>
          A cropped boxy fit cut from a heavyweight cotton-elastane jersey that holds its shape wash after wash.
          Slim through the body with a slightly oversized neckband and shoulder seam — it sits cleanly on top of high-waisted jeans without rolling.
        </p>
        <p style={{ marginTop: 12, marginBottom: 0 }}>
          Designed to take print well: smooth surface, minimal slub, low pile so DTG prints stay crisp.
          Pre-shrunk so what you print stays where you print it.
        </p>
      </>
    )
  },
  {
    id: "print",
    title: "Print & embroidery options",
    body: (
      <>
        <p style={{ margin: 0 }}>
          Compatible with DTG (direct-to-garment) printing, up to 6 colours, full-colour photo-quality artwork supported.
          Max print area 28 × 30 cm front. Screen print available on bulk orders (50+).
          This product is not embroidery-suitable due to the lightweight fabric.
        </p>
      </>
    )
  },
  {
    id: "ship",
    title: "Shipping & returns",
    body: (
      <p style={{ margin: 0 }}>
        Royal Mail Tracked 48 — £3.95, free over £50.
        Dispatch within 48 hours from order. Custom-printed items can be returned within 14 days only if there's a defect with the print or product — see our returns policy for full detail.
      </p>
    )
  },
  {
    id: "care",
    title: "Care instructions",
    body: (
      <p style={{ margin: 0 }}>
        Wash inside out at 30°C. Do not tumble dry. Iron on the reverse side only — never iron directly onto the print. Do not dry clean or bleach.
      </p>
    )
  },
  {
    id: "size",
    title: "Size guide",
    body: (
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ color: "rgba(255,255,255,0.50)" }}>
            <th style={tHead}>Size</th>
            <th style={tHead}>Chest (cm)</th>
            <th style={tHead}>Length (cm)</th>
            <th style={tHead}>Chest (in)</th>
          </tr>
        </thead>
        <tbody>
          {[["XS","84","42","33"], ["S","88","43","34.6"], ["M","92","44","36.2"], ["L","96","45","37.8"], ["XL","100","46","39.4"]].map(r => (
            <tr key={r[0]} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {r.map((c, i) => (
                <td key={i} style={{ ...tCell, fontWeight: i === 0 ? 500 : 400, color: i === 0 ? "#fff" : "rgba(255,255,255,0.75)" }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
];

const tHead = { textAlign: "left", padding: "10px 0", fontWeight: 500, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" };
const tCell = { textAlign: "left", padding: "10px 0" };

const DetailAccordion = () => {
  const [openId, setOpenId] = useState("desc");
  return (
    <section style={{
      background: "var(--surface)",
      borderRadius: 6,
      padding: "8px 24px"
    }}>
      {ACCORDION_ROWS.map((r, i) => {
        const open = openId === r.id;
        return (
          <div key={r.id} style={{
            borderTop: i > 0 ? "1px solid rgba(255,255,255,0.10)" : "none"
          }}>
            <button
              onClick={() => setOpenId(open ? null : r.id)}
              style={{
                width: "100%",
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: 15,
                fontWeight: 500,
                color: "#fff",
                padding: 0
              }}>
              {r.title}
              <span style={{
                color: "rgba(255,255,255,0.50)",
                display: "inline-flex",
                transition: "transform 200ms ease-out",
                transform: open ? "rotate(45deg)" : "rotate(0)"
              }}>
                <IconPlus size={16} />
              </span>
            </button>
            <div style={{
              display: "grid",
              gridTemplateRows: open ? "1fr" : "0fr",
              transition: "grid-template-rows 240ms ease-out"
            }}>
              <div style={{ overflow: "hidden" }}>
                <div style={{
                  paddingBottom: 24,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.70)",
                  maxWidth: 760
                }}>
                  {r.body}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

// Section 04 — Reviews
const REVIEWS = [
  { rating: 5, body: "Lovely soft crop top, great quality print and quick delivery. Will order again.", name: "Nicole", when: "1 year ago", verified: true },
  { rating: 5, body: "Print quality is genuinely impressive — bought 6 for a hen do and they all came out perfect.", name: "Sarah", when: "3 months ago", verified: true },
  { rating: 5, body: "Fits as expected. Cropped but not too short. Detail on the print is sharper than I expected.", name: "Mia", when: "2 months ago", verified: true },
  { rating: 4, body: "Great top, only thing is the white runs slightly small — would size up.", name: "Jordan", when: "5 weeks ago", verified: true }
];

const ReviewsSection = () => {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "5★", "4★", "With photos", "Verified only"];
  const counts = { 5: 11, 4: 1, 3: 0, 2: 0, 1: 0 };
  const total = Object.values(counts).reduce((a,b) => a + b, 0);

  return (
    <section id="reviews">
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24
      }}>
        <h2 style={{ fontSize: 22, fontWeight: 500, margin: 0, letterSpacing: "-0.01em" }}>Reviews</h2>
        <a href="#" style={{
          color: "var(--accent)", fontSize: 14, fontWeight: 500,
          display: "inline-flex", alignItems: "center", gap: 6
        }}>
          Write a review <IconArrowRight size={14} />
        </a>
      </div>

      {/* Summary */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gap: 32,
        background: "var(--surface)",
        borderRadius: 6,
        padding: 24,
        marginBottom: 24
      }}>
        <div>
          <div style={{ fontSize: 48, fontWeight: 500, lineHeight: 1, letterSpacing: "-0.02em" }}>4.9</div>
          <div style={{ marginTop: 8 }}><StarRow rating={5} size={14} /></div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.60)", marginTop: 6 }}>{total} reviews</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[5,4,3,2,1].map(n => {
            const pct = total ? (counts[n] / total) * 100 : 0;
            return (
              <div key={n} style={{
                display: "grid",
                gridTemplateColumns: "32px 1fr 32px",
                gap: 12, alignItems: "center"
              }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.60)" }}>{n}★</span>
                <div style={{ background: "var(--surface-2)", height: 6, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${pct}%`,
                    background: "rgba(255,255,255,0.90)",
                    transition: "width 600ms ease-out"
                  }} />
                </div>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.60)", textAlign: "right" }}>{counts[n]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customer photos */}
      <div style={{ marginBottom: 24 }}>
        <div className="label-up" style={{ color: "rgba(255,255,255,0.50)", marginBottom: 12 }}>Customer photos</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {Array.from({ length: 7 }).map((_, i) => (
            <button key={i} style={{
              width: 80, height: 80, borderRadius: 4, overflow: "hidden",
              padding: 0, position: "relative",
              transition: "transform 200ms ease-out",
              background: "var(--surface)"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <Silhouette kind={i % 2 === 0 ? "tee" : "photo"} />
            </button>
          ))}
          <a href="#" style={{
            color: "var(--accent)", fontSize: 13, fontWeight: 500, marginLeft: 4,
            display: "inline-flex", alignItems: "center", gap: 6
          }}>
            See all <IconArrowRight size={13} />
          </a>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16,
        gap: 16, flexWrap: "wrap"
      }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              height: 32, padding: "0 14px",
              borderRadius: 16,
              border: "1px solid " + (filter === f ? "var(--accent)" : "rgba(255,255,255,0.15)"),
              background: filter === f ? "rgba(236,90,180,0.10)" : "transparent",
              color: filter === f ? "var(--accent)" : "rgba(255,255,255,0.75)",
              fontSize: 13,
              fontWeight: 500,
              transition: "all 200ms"
            }}>{f}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.60)" }}>
          Sort by:
          <select style={{
            background: "var(--surface)", color: "#fff",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 4, padding: "6px 10px",
            fontSize: 13, fontFamily: "inherit"
          }}>
            <option>Most recent</option>
            <option>Highest rated</option>
            <option>Lowest rated</option>
            <option>With photos</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16
      }}>
        {REVIEWS.map((r, i) => (
          <div key={i} style={{
            background: "var(--surface-2)",
            borderRadius: 6,
            padding: 16
          }}>
            <StarRow rating={r.rating} size={13} />
            <p style={{
              fontSize: 14, lineHeight: 1.5,
              color: "rgba(255,255,255,0.80)",
              margin: "10px 0 12px"
            }}>"{r.body}"</p>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.50)" }}>
              {r.name} · {r.when}{r.verified && <> · <span style={{ color: "var(--accent)" }}>Verified buyer</span></>}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 24 }}>
        <button className="btn btn-secondary">Load more reviews <IconArrowRight size={14} className="arrow" /></button>
      </div>
    </section>
  );
};

// Section 05 — Cross-sell rail (4 max, contextually relevant)
const CROSS_SELL = [
  { name: "Racer back vest", from: "9.50", kind: "tee", rating: 4.8, reviews: 88 },
  { name: "Ladies fitted tee", from: "11.00", kind: "tee", rating: 4.9, reviews: 142 },
  { name: "Heavyweight tee", from: "12.00", kind: "tee", rating: 4.7, reviews: 230 },
  { name: "Canvas tote", from: "8.50", kind: "tote", rating: 4.9, reviews: 64 }
];

const CrossSellRail = () => (
  <section>
    <h2 style={{ fontSize: 22, fontWeight: 500, margin: 0, marginBottom: 24, letterSpacing: "-0.01em" }}>
      Often customised with crop tops
    </h2>
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 12
    }}>
      {CROSS_SELL.map((p, i) => <CrossSellCard key={i} {...p} />)}
    </div>
  </section>
);

const CrossSellCard = ({ name, from, kind, rating, reviews }) => {
  const [hover, setHover] = useState(false);
  return (
    <a href="Product.html"
       onMouseEnter={() => setHover(true)}
       onMouseLeave={() => setHover(false)}
       style={{
         background: "var(--surface)",
         borderRadius: 6,
         overflow: "hidden",
         display: "block",
         border: "1px solid var(--border)"
       }}>
      <div style={{ aspectRatio: "1 / 1", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          transform: hover ? "scale(1.04)" : "scale(1)",
          transition: "transform 400ms ease-out"
        }}>
          <Placeholder label={`${name.toUpperCase()}`} kind={kind} />
        </div>
        <div style={{
          position: "absolute", left: 12, right: 12, bottom: 12,
          transform: hover ? "translateY(0)" : "translateY(150%)",
          transition: "transform 300ms ease-out"
        }}>
          <span className="btn btn-secondary" style={{
            width: "100%", justifyContent: "center", height: 38, fontSize: 13,
            background: "rgba(10,10,10,0.65)", backdropFilter: "blur(6px)"
          }}>
            Customise <IconArrowRight size={13} className="arrow" />
          </span>
        </div>
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>{name}</div>
        <div style={{ marginTop: 4, fontSize: 13 }}>
          <span style={{ color: "rgba(255,255,255,0.55)" }}>From £</span>
          <span style={{ color: "var(--accent)", fontWeight: 500 }}>{from}</span>
        </div>
        <div style={{
          marginTop: 6,
          fontSize: 11,
          color: "rgba(255,255,255,0.50)",
          display: "flex", alignItems: "center", gap: 6
        }}>
          <StarRow rating={rating} size={11} />
          <span>{rating} · {reviews} reviews</span>
        </div>
      </div>
    </a>
  );
};

Object.assign(window, { DetailAccordion, ReviewsSection, CrossSellRail, CrossSellCard });
