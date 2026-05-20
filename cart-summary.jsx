// Cart — Discount progress bar, Order summary, Express checkout, Trust strip

// Discount progress bar
const DiscountProgressBar = ({ units }) => {
  if (units === 0) return null;
  const active = activeTier(units);
  const next = nextTier(units);
  const maxScale = 25;
  const pct = Math.min(units / maxScale, 1) * 100;

  let message;
  if (!active && next) {
    message = (
      <>
        Add <span style={{ color: "var(--accent)", fontWeight: 500 }}>{next.units - units} more units</span> to unlock <span style={{ color: "var(--accent)", fontWeight: 500 }}>{next.pct}% off</span> your order
      </>
    );
  } else if (active && next) {
    message = (
      <>
        <span style={{ color: "var(--accent)", fontWeight: 500 }}>{active.pct}% off</span> applied. Add <span style={{ color: "var(--accent)", fontWeight: 500 }}>{next.units - units} more</span> for {next.pct}% off
      </>
    );
  } else {
    return (
      <div style={{
        background: "rgba(170,204,0,0.08)",
        border: "1px solid rgba(170,204,0,0.45)",
        borderRadius: 6,
        padding: 16,
        display: "flex",
        alignItems: "center",
        gap: 12
      }}>
        <span style={{
          width: 24, height: 24, borderRadius: "50%",
          background: "var(--accent)", color: "#0A0A0A",
          display: "inline-grid", placeItems: "center"
        }}>
          <IconCheck size={14} strokeWidth={2.5} />
        </span>
        <span style={{ fontSize: 14, color: "#fff", fontWeight: 500 }}>
          Maximum bulk discount applied — <span style={{ color: "var(--accent)" }}>25% off</span> your order
        </span>
      </div>
    );
  }

  return (
    <div style={{
      background: "var(--surface)",
      borderRadius: 6,
      padding: 16
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16
      }}>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>{message}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.60)", whiteSpace: "nowrap" }}>
          {units} / {next.units} units
        </div>
      </div>

      {/* Track */}
      <div style={{
        position: "relative",
        height: 6,
        borderRadius: 3,
        background: "var(--surface-2)",
        marginTop: 14
      }}>
        <div style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: `${pct}%`,
          background: "var(--accent)",
          borderRadius: 3,
          transition: "width 400ms ease-out"
        }} />
        {/* Tick marks */}
        {TIERS.map(t => {
          const x = (t.units / maxScale) * 100;
          const isNext = next && t.units === next.units;
          return (
            <span key={t.units} style={{
              position: "absolute",
              top: -2, bottom: -2,
              left: `${x}%`,
              width: 2,
              transform: "translateX(-50%)",
              background: isNext ? "var(--accent)" : "rgba(255,255,255,0.40)",
              borderRadius: 1
            }} />
          );
        })}
      </div>

      {/* Tier labels */}
      <div style={{
        position: "relative",
        marginTop: 8,
        height: 14
      }}>
        {TIERS.map(t => {
          const x = (t.units / maxScale) * 100;
          const isNext = next && t.units === next.units;
          return (
            <div key={t.units} style={{
              position: "absolute",
              left: `${x}%`,
              transform: "translateX(-50%)",
              fontSize: 9,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: isNext ? "var(--accent)" : "rgba(255,255,255,0.40)",
              whiteSpace: "nowrap",
              fontWeight: 500
            }}>
              {t.units} units · {t.pct}% off
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Order summary
const OrderSummary = ({ items, promoCode, setPromoCode, appliedCode, setAppliedCode }) => {
  const units = cartUnits(items);
  const subtotal = cartSubtotal(items);
  const tier = activeTier(units);
  const bulkDiscount = tier ? subtotal * (tier.pct / 100) : 0;
  const codeDiscount = appliedCode ? appliedCode.amount : 0;
  const shipping = subtotal - bulkDiscount - codeDiscount >= 50 ? 0 : 4.95;
  const total = Math.max(0, subtotal - bulkDiscount - codeDiscount + shipping);

  const printTotal = items.reduce((a, i) => a + (i.decoration?.setupFee || 0), 0);
  // For demo: include explicit "Print & embroidery" line ~ a per-unit print contribution
  // We'll approximate as 12% of subtotal (already inside unit price). For display, show only setup fees if any.

  return (
    <div style={{
      background: "var(--surface)",
      borderRadius: 6,
      padding: 20
    }}>
      <div style={{
        fontSize: 14, fontWeight: 500, marginBottom: 14
      }}>Order summary</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12 }}>
        <SummaryRow label="Subtotal" value={`£${subtotal.toFixed(2)}`} />
        {printTotal > 0 && <SummaryRow label="Embroidery setup" value={`£${printTotal.toFixed(2)}`} />}
        <SummaryRow
          label={tier ? `Bulk discount (${tier.pct}%)` : "Bulk discount (unlock at 10+)"}
          value={tier ? `−£${bulkDiscount.toFixed(2)}` : "—"}
          dim={!tier}
          accent={!!tier} />
        {appliedCode && (
          <SummaryRow
            label={`Code ${appliedCode.code}`}
            value={`−£${codeDiscount.toFixed(2)}`}
            accent
            onRemove={() => setAppliedCode(null)} />
        )}
        <SummaryRow label="UK shipping" value={shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`} accent={shipping === 0} />
      </div>

      {/* Promo code */}
      <PromoCodeInput value={promoCode} setValue={setPromoCode} appliedCode={appliedCode} setAppliedCode={setAppliedCode} />

      {/* Divider */}
      <div style={{
        height: 1, background: "rgba(255,255,255,0.10)",
        margin: "16px 0"
      }} />

      {/* Total */}
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between"
      }}>
        <span style={{ fontSize: 14, fontWeight: 500 }}>Total</span>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>
            £{total.toFixed(2)}
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.60)" }}>incl. VAT</div>
        </div>
      </div>

      {/* CTA */}
      <a href="#" className="btn btn-primary" style={{
        height: 52, width: "100%",
        justifyContent: "center", marginTop: 14,
        fontSize: 15, fontWeight: 500
      }}>
        Checkout securely <IconArrowRight size={16} className="arrow" />
      </a>

      {/* Payment icons */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 8,
        marginTop: 14,
        flexWrap: "wrap"
      }}>
        {["VISA", "MC", "AMEX", "PYPL", " Pay", "G Pay"].map(b => (
          <span key={b} style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 9,
            fontWeight: 500,
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.50)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 3,
            padding: "4px 6px",
            height: 20,
            display: "inline-flex",
            alignItems: "center"
          }}>{b}</span>
        ))}
      </div>
    </div>
  );
};

const SummaryRow = ({ label, value, dim, accent, onRemove }) => (
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }}>
    <span style={{ color: dim ? "rgba(255,255,255,0.40)" : "rgba(255,255,255,0.75)" }}>
      {label}
    </span>
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      color: accent ? "var(--accent)" : (dim ? "rgba(255,255,255,0.40)" : "#fff"),
      fontWeight: accent ? 500 : 400
    }}>
      {value}
      {onRemove && (
        <button onClick={onRemove} style={{ color: "rgba(255,255,255,0.50)" }}>
          <IconClose size={12} />
        </button>
      )}
    </span>
  </div>
);

const PromoCodeInput = ({ value, setValue, appliedCode, setAppliedCode }) => {
  const apply = () => {
    if (!value.trim()) return;
    setAppliedCode({ code: value.toUpperCase(), amount: 14.87 });
    setValue("");
  };
  if (appliedCode) return null;
  return (
    <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
      <input
        type="text"
        placeholder="Promo code"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") apply(); }}
        style={{
          flex: 1,
          height: 36,
          background: "transparent",
          border: "0.5px solid rgba(255,255,255,0.25)",
          borderRadius: 4,
          color: "#fff",
          padding: "0 12px",
          fontSize: 12,
          outline: "none"
        }}
        onFocus={e => e.target.style.borderColor = "var(--accent)"}
        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.25)"}
      />
      <button onClick={apply} style={{
        height: 36, padding: "0 12px",
        background: "var(--surface-2)",
        color: "#fff", fontSize: 11, fontWeight: 500,
        borderRadius: 4,
        transition: "background 200ms"
      }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.10)"}
      onMouseLeave={e => e.currentTarget.style.background = "var(--surface-2)"}>
        Apply
      </button>
    </div>
  );
};

// Express checkout
const ExpressCheckout = () => (
  <div style={{
    background: "var(--surface)",
    borderRadius: 6,
    padding: 12
  }}>
    <div className="label-up" style={{
      color: "rgba(255,255,255,0.40)",
      textAlign: "center",
      marginBottom: 10,
      fontSize: 9
    }}>OR EXPRESS CHECKOUT</div>
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 6
    }}>
      <ExpressBtn label="Pay" sub="" bg="#000" color="#fff" />
      <ExpressBtn label="G" sub="Pay" bg="#000" color="#fff" />
      <ExpressBtn label="PayPal" sub="" bg="#FFC439" color="#003087" />
    </div>
  </div>
);

const ExpressBtn = ({ label, sub, bg, color }) => (
  <button style={{
    height: 36,
    background: bg,
    color: color,
    borderRadius: 4,
    fontSize: 13,
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4
  }}>
    {label}{sub && <span style={{ fontWeight: 400 }}>{sub}</span>}
  </button>
);

// Trust strip
const TrustStripCard = () => {
  const rows = [
    [<IconTruck size={14} />, "Dispatched within 48 hours"],
    [<IconRefresh size={14} />, "Free returns on stocked items"],
    [<IconShield size={14} />, "Secure checkout · SSL encrypted"],
    [<IconMail size={14} />, "Questions? hello@inkprinted.co.uk"]
  ];
  return (
    <div style={{
      background: "var(--surface)",
      borderRadius: 6,
      padding: 14
    }}>
      {rows.map(([icon, label], i) => (
        <div key={i} style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "6px 0",
          fontSize: 11,
          color: "rgba(255,255,255,0.65)"
        }}>
          <span style={{ color: "rgba(255,255,255,0.50)" }}>{icon}</span>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

// Cross-sell rail
const CartCrossSell = ({ items }) => {
  // Determine dominant category for the sub-line
  const counts = {};
  for (const i of items) {
    const cat = i.subcategory.split(" · ")[1] || "items";
    counts[cat] = (counts[cat] || 0) + 1;
  }
  const dominant = Object.entries(counts).sort((a,b) => b[1] - a[1])[0]?.[0] || "products";
  const dominantLower = dominant.toLowerCase();

  return (
    <section style={{
      background: "var(--surface)",
      borderRadius: 6,
      padding: 24,
      marginTop: 32
    }}>
      <h3 style={{ fontSize: 16, fontWeight: 500, margin: 0, letterSpacing: "-0.01em" }}>
        Order something to match?
      </h3>
      <p style={{
        fontSize: 12, color: "rgba(255,255,255,0.60)",
        margin: 0, marginTop: 6
      }}>
        Customers who customised a {dominantLower.replace(/s$/, "")} often added these to their order:
      </p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 10,
        marginTop: 18
      }}>
        {CROSS_SELL.map((p, i) => <MiniProductCard key={i} {...p} />)}
      </div>
    </section>
  );
};

const MiniProductCard = ({ name, from, kind }) => {
  const [hover, setHover] = useState(false);
  return (
    <a href="Product.html"
       onMouseEnter={() => setHover(true)}
       onMouseLeave={() => setHover(false)}
       style={{
         background: "var(--bg)",
         borderRadius: 6,
         overflow: "hidden",
         border: "0.5px solid rgba(255,255,255,0.08)",
         display: "block"
       }}>
      <div style={{ aspectRatio: "1 / 1", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          transform: hover ? "scale(1.04)" : "scale(1)",
          transition: "transform 400ms ease-out"
        }}>
          <Placeholder label={name.toUpperCase()} kind={kind} />
        </div>
        <div style={{
          position: "absolute",
          left: 12, right: 12, bottom: 12,
          transform: hover ? "translateY(0)" : "translateY(150%)",
          transition: "transform 300ms ease-out"
        }}>
          <span className="btn btn-primary" style={{
            width: "100%", justifyContent: "center", height: 36, fontSize: 12
          }}>
            Customise <IconArrowRight size={12} className="arrow" />
          </span>
        </div>
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>{name}</div>
        <div style={{ marginTop: 2, fontSize: 12, color: "var(--accent)", fontWeight: 500 }}>
          From £{from.toFixed(2)}
        </div>
      </div>
    </a>
  );
};

// Empty cart
const EmptyCart = () => (
  <div style={{
    background: "var(--surface)",
    borderRadius: 6,
    padding: "80px 24px",
    textAlign: "center"
  }}>
    <div style={{
      width: 64, height: 64,
      margin: "0 auto 20px",
      color: "rgba(255,255,255,0.30)",
      display: "grid",
      placeItems: "center"
    }}>
      <IconBag size={48} strokeWidth={1.25} />
    </div>
    <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.01em" }}>
      Your basket is empty
    </div>
    <p style={{
      fontSize: 14, color: "rgba(255,255,255,0.65)",
      maxWidth: 360, margin: "8px auto 0", lineHeight: 1.5
    }}>
      Pick a product, design it your way, and we'll print and ship it in 48 hours.
    </p>
    <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20 }}>
      {["Clothing", "Workwear", "Gifts"].map(c => (
        <a key={c} href="Listing.html" style={{
          height: 36, padding: "0 14px",
          background: "var(--surface-2)",
          borderRadius: 18,
          fontSize: 12, fontWeight: 500,
          color: "#fff",
          display: "inline-flex", alignItems: "center",
          transition: "background 200ms"
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.10)"}
        onMouseLeave={e => e.currentTarget.style.background = "var(--surface-2)"}>
          {c}
        </a>
      ))}
    </div>
    <div style={{ marginTop: 24, display: "inline-block" }}>
      <a href="Listing.html" className="btn btn-primary">
        Start designing <IconArrowRight size={14} className="arrow" />
      </a>
    </div>
  </div>
);

Object.assign(window, {
  DiscountProgressBar, OrderSummary, ExpressCheckout, TrustStripCard,
  CartCrossSell, MiniProductCard, EmptyCart, SummaryRow, PromoCodeInput
});
