// Cart — Add-to-basket confirmation drawer

const DRAWER_TIMEOUT = 8; // seconds

const AddToBasketDrawer = ({ open, onClose, item, items }) => {
  const [remaining, setRemaining] = useState(DRAWER_TIMEOUT);
  const [hovered, setHovered] = useState(false);
  const tickRef = useRef(null);

  // Reset timer when drawer opens
  useEffect(() => {
    if (!open) return;
    setRemaining(DRAWER_TIMEOUT);
  }, [open]);

  // Tick down (paused on hover)
  useEffect(() => {
    if (!open || hovered) return;
    tickRef.current = setInterval(() => {
      setRemaining(r => Math.max(0, r - 0.1));
    }, 100);
    return () => clearInterval(tickRef.current);
  }, [open, hovered]);

  // Auto-close when timer hits 0
  useEffect(() => {
    if (open && remaining <= 0) onClose();
  }, [open, remaining, onClose]);

  // Escape closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!item) return null;

  const subtotal = cartSubtotal(items);
  const units = cartUnits(items);
  const next = nextTier(units);
  const lineTotal = lineSubtotal(item);
  const lineUnits = unitsOf(item);

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.40)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 240ms ease-out",
        zIndex: 70
      }} />

      {/* Drawer */}
      <aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "fixed",
          top: 0, right: 0, bottom: 0,
          width: 380,
          maxWidth: "100vw",
          background: "var(--bg)",
          borderLeft: "1px solid var(--text-10)",
          zIndex: 71,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 320ms ease-out",
          display: "flex",
          flexDirection: "column"
        }}>
        {/* Header */}
        <div style={{
          padding: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--text-10)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              width: 20, height: 20, borderRadius: "50%",
              background: "var(--accent)",
              display: "inline-grid", placeItems: "center",
              color: "#0A0A0A"
            }}>
              <IconCheck size={12} strokeWidth={2.5} />
            </span>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Added to basket</span>
          </div>
          <button onClick={onClose} aria-label="Close" style={{
            color: "rgba(255,255,255,0.60)",
            width: 28, height: 28,
            display: "inline-grid", placeItems: "center"
          }}>
            <IconClose size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 16, flex: 1, overflowY: "auto" }}>
          {/* Added item */}
          <div style={{
            background: "var(--surface-2)",
            borderRadius: 4,
            padding: 12,
            display: "grid",
            gridTemplateColumns: "56px 1fr auto",
            gap: 12,
            alignItems: "center"
          }}>
            <div style={{
              width: 56, height: 56,
              background: "var(--bg)",
              borderRadius: 4,
              overflow: "hidden"
            }}>
              <Silhouette kind={item.productKind} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{item.productName}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>
                {item.mode === "quicktext"
                  ? <>Quick-text · "{item.text}"</>
                  : <>{item.decoration?.colour} · {item.decoration?.method}</>}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>
                {lineUnits} unit{lineUnits === 1 ? "" : "s"} · £{lineTotal.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Subtotal row */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            padding: "10px 0",
            margin: "12px 0",
            borderTop: "0.5px solid var(--text-10)",
            borderBottom: "0.5px solid var(--text-10)"
          }}>
            <span style={{ color: "rgba(255,255,255,0.65)" }}>
              Basket subtotal ({items.length} items)
            </span>
            <span style={{ color: "#fff", fontWeight: 500 }}>£{subtotal.toFixed(2)}</span>
          </div>

          {/* Discount nudge */}
          {next && (
            <div style={{
              background: "var(--surface-2)",
              borderRadius: 4,
              padding: 10,
              marginTop: 6
            }}>
              <div style={{ fontSize: 12, color: "#fff" }}>
                <span style={{ color: "var(--accent)", fontWeight: 500 }}>
                  Add {next.units - units} more units
                </span>
                {" "}for {next.pct}% off
              </div>
              <div style={{
                height: 4, borderRadius: 2,
                background: "rgba(255,255,255,0.10)",
                marginTop: 8,
                overflow: "hidden"
              }}>
                <div style={{
                  width: `${Math.min(units / next.units, 1) * 100}%`,
                  height: "100%",
                  background: "var(--accent)",
                  transition: "width 400ms ease-out"
                }} />
              </div>
            </div>
          )}

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
            <a href="Cart.html" className="btn btn-primary" style={{
              height: 44, width: "100%", justifyContent: "center", fontSize: 14
            }}>
              View basket & checkout <IconArrowRight size={14} className="arrow" />
            </a>
            <button onClick={onClose} className="btn btn-secondary" style={{
              height: 44, width: "100%", justifyContent: "center", fontSize: 14
            }}>
              Continue shopping
            </button>
          </div>

          {/* Auto-dismiss note */}
          <div style={{
            marginTop: 12,
            fontSize: 9,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.40)",
            textAlign: "center"
          }}>
            Closes automatically in {Math.ceil(remaining)} second{Math.ceil(remaining) === 1 ? "" : "s"}
          </div>
        </div>

        {/* Countdown bar */}
        <div style={{
          height: 2,
          background: "rgba(255,255,255,0.05)"
        }}>
          <div style={{
            height: "100%",
            width: `${(remaining / DRAWER_TIMEOUT) * 100}%`,
            background: "var(--accent)",
            transition: "width 100ms linear"
          }} />
        </div>
      </aside>
    </>
  );
};

Object.assign(window, { AddToBasketDrawer, DRAWER_TIMEOUT });
