// PDP — Right column info panel
const { useState: useStateInfo } = React;

// Star rating row
const StarRow = ({ rating = 5, size = 13 }) => {
  const stars = [1,2,3,4,5].map(i => (
    <IconStar key={i} size={size} filled={i <= Math.round(rating)} color="#EC5AB4" />
  ));
  return <span style={{ display: "inline-flex", gap: 2 }}>{stars}</span>;
};

// Card wrapper
const InfoCard = ({ children, style }) => (
  <div style={{
    background: "var(--surface)",
    borderRadius: 6,
    padding: 16,
    ...style
  }}>{children}</div>
);

// 02a — Title card
const TitleCard = ({ product }) => (
  <InfoCard style={{ padding: 20 }}>
    <div className="label-up" style={{ color: "rgba(255,255,255,0.40)" }}>
      {product.categoryTrail.join(" · ")}
    </div>
    <h1 style={{
      fontSize: 28, lineHeight: "36px", fontWeight: 500,
      letterSpacing: "-0.02em",
      margin: 0, marginTop: 8
    }}>{product.name}</h1>

    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
      <StarRow rating={product.rating} size={14} />
      <a href="#reviews" style={{
        fontSize: 13,
        color: "rgba(255,255,255,0.60)",
        textDecoration: "underline",
        textUnderlineOffset: 3
      }}>{product.reviewCount} reviews</a>
    </div>

    <div style={{ marginTop: 16 }}>
      <div style={{
        fontSize: 32, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1
      }}>£{product.price}</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.50)", marginTop: 6 }}>
        Blank product price · print priced in the design lab
      </div>
    </div>

    {/* Bulk savings */}
    <div style={{
      marginTop: 12,
      background: "var(--surface-2)",
      borderRadius: 4,
      padding: 12,
      fontSize: 12,
      color: "rgba(255,255,255,0.70)"
    }}>
      Save <span style={{ color: "var(--accent)", fontWeight: 500 }}>10%</span> at 5+ ·{" "}
      <span style={{ color: "var(--accent)", fontWeight: 500 }}>15%</span> at 10+ ·{" "}
      <span style={{ color: "var(--accent)", fontWeight: 500 }}>25%</span> at 25+ units
    </div>
  </InfoCard>
);

// 02b — Colour swatches
const COLOURS = [
  { name: "White", hex: "#F4F4EE", light: true },
  { name: "Black", hex: "#0A0A0A" },
  { name: "Pink", hex: "#F0A6B8" },
  { name: "Navy", hex: "#1E2A4A" },
  { name: "Stone", hex: "#C9C2B5", light: true },
  { name: "Burgundy", hex: "#6E1F2A" },
  { name: "Olive", hex: "#6A6A2C" },
  { name: "Sand", hex: "#D8C8A8", light: true },
  { name: "Charcoal", hex: "#2A2A2A", oosSize: "XS" }
];

const ColourSwatchRow = ({ colourIdx, setColourIdx }) => {
  const active = COLOURS[colourIdx];
  return (
    <InfoCard>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <span className="label-up" style={{ color: "rgba(255,255,255,0.50)" }}>Colour</span>
        <span style={{ fontSize: 14, fontWeight: 500 }}>{active.name}</span>
      </div>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        marginTop: 14
      }}>
        {COLOURS.map((c, i) => {
          const selected = i === colourIdx;
          const oos = c.oos;
          return (
            <button
              key={c.name}
              aria-label={c.name}
              onClick={() => !oos && setColourIdx(i)}
              style={{
                width: 32, height: 32,
                borderRadius: "50%",
                background: c.hex,
                border: selected ? "1px solid transparent" : "1px solid rgba(255,255,255,0.25)",
                outline: selected ? "2px solid var(--accent)" : "none",
                outlineOffset: 2,
                boxShadow: c.light ? "inset 0 0 0 1px rgba(0,0,0,0.10)" : "none",
                position: "relative",
                cursor: oos ? "not-allowed" : "pointer",
                padding: 0,
                opacity: oos ? 0.5 : 1
              }}>
              {oos && (
                <span style={{
                  position: "absolute", inset: 0,
                  display: "grid", placeItems: "center"
                }}>
                  <span style={{
                    display: "block", width: "120%", height: 1,
                    background: "rgba(255,255,255,0.7)",
                    transform: "rotate(-45deg)"
                  }} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </InfoCard>
  );
};

// 02c — Quantity card
const SIZES = ["XS", "S", "M", "L", "XL"];

const QuantityCard = ({ qty, setQty, sizeIdx, setSizeIdx, multi, setMulti, sizeQtys, setSizeQtys, oosSizes }) => {
  const totalMulti = Object.values(sizeQtys).reduce((a,b) => a + b, 0);
  return (
    <InfoCard>
      <div className="label-up" style={{ color: "rgba(255,255,255,0.50)" }}>How many?</div>

      {/* Segmented toggle */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "var(--surface-2)",
        borderRadius: 4,
        padding: 4,
        gap: 4,
        marginTop: 12
      }}>
        {[false, true].map(mode => (
          <button
            key={String(mode)}
            onClick={() => setMulti(mode)}
            style={{
              height: 36,
              borderRadius: 3,
              background: multi === mode ? "#fff" : "transparent",
              color: multi === mode ? "#0A0A0A" : "rgba(255,255,255,0.60)",
              fontSize: 13,
              fontWeight: 500,
              transition: "background 200ms ease-out, color 200ms ease-out"
            }}>
            {mode ? "Multiple sizes" : "Single item"}
          </button>
        ))}
      </div>

      {!multi ? (
        // Single mode
        <div style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "1fr 120px",
          gap: 12,
          alignItems: "end"
        }}>
          <div>
            <div className="label-up" style={{ color: "rgba(255,255,255,0.50)", marginBottom: 8 }}>Size</div>
            <div style={{ display: "flex", gap: 8 }}>
              {SIZES.map((s, i) => {
                const oos = oosSizes.has(s);
                const selected = i === sizeIdx;
                return (
                  <button key={s} onClick={() => !oos && setSizeIdx(i)}
                    style={{
                      height: 40, padding: "0 14px",
                      borderRadius: 4,
                      border: "1px solid rgba(255,255,255,0.25)",
                      background: selected ? "#fff" : "transparent",
                      color: selected ? "#0A0A0A" : oos ? "rgba(255,255,255,0.30)" : "#fff",
                      fontSize: 14, fontWeight: 500,
                      cursor: oos ? "not-allowed" : "pointer",
                      transition: "background 200ms, color 200ms, border-color 200ms",
                      textDecoration: oos ? "line-through" : "none",
                      minWidth: 44
                    }}>{s}</button>
                );
              })}
            </div>
          </div>
          <div>
            <div className="label-up" style={{ color: "rgba(255,255,255,0.50)", marginBottom: 8 }}>Qty</div>
            <Stepper value={qty} setValue={setQty} />
          </div>
        </div>
      ) : (
        // Multi mode
        <div style={{ marginTop: 16 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 8
          }}>
            {SIZES.map(s => (
              <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{
                  fontSize: 12, color: "rgba(255,255,255,0.60)", fontWeight: 500
                }}>{s}</span>
                <Stepper compact value={sizeQtys[s] || 0} setValue={(v) => setSizeQtys({ ...sizeQtys, [s]: v })} />
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 12, fontSize: 12,
            color: "rgba(255,255,255,0.60)",
            display: "flex", justifyContent: "space-between"
          }}>
            <span>Total: <span style={{ color: "#fff" }}>{totalMulti}</span> item{totalMulti === 1 ? "" : "s"}</span>
            <span>Auto-discount kicks in at 5+</span>
          </div>
        </div>
      )}

      {/* Out-of-stock notice for current colour */}
      {!multi && oosSizes.has(SIZES[sizeIdx]) && (
        <div style={{
          marginTop: 12,
          fontSize: 12,
          color: "rgba(255,255,255,0.65)",
          padding: 10,
          borderRadius: 4,
          background: "rgba(236,90,180,0.06)",
          border: "1px solid rgba(236,90,180,0.25)"
        }}>
          Out of stock in {COLOURS[0].name} {SIZES[sizeIdx]} —{" "}
          try another colour or <a href="#" style={{ color: "var(--accent)", fontWeight: 500 }}>notify me</a>
        </div>
      )}
    </InfoCard>
  );
};

const Stepper = ({ value, setValue, compact }) => {
  const W = compact ? 88 : 120;
  const H = 40;
  return (
    <div style={{
      width: W, height: H,
      border: "1px solid rgba(255,255,255,0.25)",
      borderRadius: 4,
      display: "grid",
      gridTemplateColumns: "40px 1fr 40px",
      alignItems: "center"
    }}>
      <button aria-label="Decrease" onClick={() => setValue(Math.max(0, value - 1))}
        style={{
          height: H, color: "#fff",
          borderRight: "1px solid rgba(255,255,255,0.10)"
        }}>
        <IconMinus size={14} />
      </button>
      <span style={{
        textAlign: "center", fontSize: 14, fontWeight: 500, color: "#fff"
      }}>{value}</span>
      <button aria-label="Increase" onClick={() => setValue(value + 1)}
        style={{
          height: H, color: "#fff",
          borderLeft: "1px solid rgba(255,255,255,0.10)"
        }}>
        <IconPlus size={14} />
      </button>
    </div>
  );
};

// 02d — Size guide / fit row
const SizeGuideRow = () => (
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 11,
    color: "rgba(255,255,255,0.60)",
    padding: "4px 4px",
    letterSpacing: "0.02em"
  }}>
    <a href="#" style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      color: "rgba(255,255,255,0.85)",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      fontSize: 11,
      fontWeight: 500
    }}>
      <IconRuler size={14} />
      Size guide
    </a>
    <span>True to size · Slim fit</span>
  </div>
);

// 02e — Primary CTA (must be tracked by sticky bar)
const PrimaryCTA = ({ productName, totalQty, onClick }) => (
  <button onClick={onClick} data-pdp-cta="true" className="btn btn-primary" style={{
    height: 64,
    width: "100%",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: 500,
    letterSpacing: "-0.01em",
    marginTop: 4
  }}>
    Customise this {productName} <IconArrowRight size={18} className="arrow" />
  </button>
);

// 02f — Trust micro-row
const TrustMicroRow = () => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    fontSize: 11,
    color: "rgba(255,255,255,0.60)",
    marginTop: 4
  }}>
    {[
      [<IconTruck size={14} />, "48h dispatch"],
      [<IconReturnArrow size={14} />, "Free returns"],
      [<IconPin size={14} />, "Printed in the UK"]
    ].map(([icon, label], i) => (
      <div key={label} style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        padding: "8px 0",
        borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.10)" : "none"
      }}>
        <span style={{ color: "rgba(255,255,255,0.60)" }}>{icon}</span>
        <span>{label}</span>
      </div>
    ))}
  </div>
);

// 02g — Quick specs card
const QuickSpecsCard = ({ specs }) => (
  <InfoCard>
    <div className="label-up" style={{ color: "rgba(255,255,255,0.50)" }}>Quick specs</div>
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      columnGap: 16,
      rowGap: 14,
      marginTop: 14
    }}>
      {specs.map(([label, value]) => (
        <div key={label}>
          <div className="label-up" style={{ color: "rgba(255,255,255,0.50)" }}>{label}</div>
          <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>{value}</div>
        </div>
      ))}
    </div>
  </InfoCard>
);

// Bulk prompt below CTA when qty ≥ 10
const BulkPrompt = () => (
  <div style={{
    marginTop: 12,
    background: "rgba(236,90,180,0.06)",
    border: "1px solid rgba(236,90,180,0.30)",
    borderRadius: 4,
    padding: "10px 12px",
    fontSize: 12,
    color: "rgba(255,255,255,0.75)"
  }}>
    Ordering 10+? You may qualify for our{" "}
    <a href="Quote.html" style={{ color: "var(--accent)", fontWeight: 500 }}>team-order service →</a>
  </div>
);

Object.assign(window, {
  TitleCard, ColourSwatchRow, QuantityCard, SizeGuideRow,
  PrimaryCTA, TrustMicroRow, QuickSpecsCard, BulkPrompt,
  StarRow, Stepper, InfoCard, COLOURS, SIZES
});
