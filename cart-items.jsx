// Cart line items + saved-for-later

// Tiny quantity stepper (28px tall)
const MiniStepper = ({ value, setValue, onRemove }) => (
  <div style={{
    width: 96, height: 28,
    border: "0.5px solid var(--text-25)",
    borderRadius: 4,
    display: "grid",
    gridTemplateColumns: "28px 1fr 28px",
    alignItems: "center"
  }}>
    <button aria-label="Decrease"
      onClick={() => value <= 1 ? onRemove && onRemove() : setValue(value - 1)}
      style={{ height: 28, color: "var(--text)" }}>
      <IconMinus size={12} />
    </button>
    <span style={{ textAlign: "center", fontSize: 13, fontWeight: 500 }}>{value}</span>
    <button aria-label="Increase" onClick={() => setValue(value + 1)} style={{ height: 28, color: "var(--text)" }}>
      <IconPlus size={12} />
    </button>
  </div>
);

// Multi-size breakdown editor (inline chips → click to edit a row)
const SizeBreakdownInset = ({ sizeQtys, setSizeQtys, editingSize, setEditingSize }) => {
  const entries = Object.entries(sizeQtys).filter(([_, q]) => q > 0);
  return (
    <div style={{
      background: "var(--surface-2)",
      borderRadius: 4,
      padding: 10,
      marginTop: 10
    }}>
      <div className="label-up" style={{
        color: "var(--text-40)",
        fontSize: 9,
        marginBottom: 8
      }}>Size breakdown</div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
        {entries.map(([size, qty]) => {
          const editing = editingSize === size;
          if (editing) {
            return (
              <span key={size} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, color: "var(--text)" }}>{size}</span>
                <MiniStepper value={qty}
                  setValue={(v) => setSizeQtys({ ...sizeQtys, [size]: v })}
                  onRemove={() => setSizeQtys({ ...sizeQtys, [size]: 0 })} />
                <button onClick={() => setEditingSize(null)}
                  style={{ fontSize: 11, color: "var(--accent-line)", fontWeight: 500 }}>
                  Done
                </button>
              </span>
            );
          }
          return (
            <button key={size} onClick={() => setEditingSize(size)}
              style={{
                fontSize: 12,
                color: "var(--text-80)",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "2px 0",
                borderBottom: "1px dashed transparent",
                transition: "border-color 200ms"
              }}
              onMouseEnter={e => e.currentTarget.style.borderBottomColor = "var(--text-40)"}
              onMouseLeave={e => e.currentTarget.style.borderBottomColor = "transparent"}>
              {size} <span style={{ color: "var(--text-50)" }}>×</span> {qty}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Custom badge under design preview
const ItemTypeBadge = ({ kind }) => {
  const map = {
    custom:  { label: "Custom", bg: "var(--text)",   color: "var(--bg)", outline: false },
    text:    { label: "Text",   bg: "transparent",   color: "var(--text)",    outline: true },
    blank:   { label: "Blank",  bg: "transparent",   color: "var(--text-55)", outline: true }
  };
  const s = map[kind];
  if (!s) return null;
  return (
    <span style={{
      position: "absolute",
      right: 6, bottom: 6,
      fontSize: 9,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      fontWeight: 500,
      padding: "3px 5px",
      borderRadius: 2,
      background: s.bg,
      color: s.color,
      border: s.outline ? "1px solid var(--text-45)" : "none",
      whiteSpace: "nowrap"
    }}>{s.label}</span>
  );
};

// One cart line item
const CartLineItem = ({ item, setItem, requestRemove }) => {
  const [editingSize, setEditingSize] = useState(null);
  const [editingQty, setEditingQty] = useState(false);
  const units = unitsOf(item);
  const lineTotal = lineSubtotal(item);
  const badgeKind = item.mode === "quicktext" ? "text" : "custom";

  return (
    <div className={item.isRecent ? "item-recent" : ""}
         style={{
           background: "var(--surface)",
           borderRadius: 6,
           padding: 16,
           display: "grid",
           gridTemplateColumns: "120px 1fr auto",
           gap: 16
         }}>
      {/* Col 1 — design preview */}
      <div style={{
        width: 120, height: 120,
        background: "var(--bg)",
        borderRadius: 6,
        position: "relative",
        overflow: "hidden"
      }}>
        <Silhouette kind={item.productKind} />
        {/* Faux print mark for non-blank items */}
        {item.mode !== "blank" && (
          <div style={{
            position: "absolute",
            left: "50%", top: "48%",
            transform: "translate(-50%, -50%)",
            width: 50, height: 50,
            borderRadius: 3,
            border: "1px solid rgba(236,90,180,0.4)",
            background: "rgba(236,90,180,0.08)",
            display: "grid", placeItems: "center"
          }}>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 7,
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.06em"
            }}>Design</span>
          </div>
        )}
        <ItemTypeBadge kind={badgeKind} />
      </div>

      {/* Col 2 — details */}
      <div style={{ minWidth: 0 }}>
        <div className="label-up" style={{
          color: "var(--text-40)",
          fontSize: 9
        }}>{item.subcategory}</div>
        <div style={{
          fontSize: 16, fontWeight: 500, marginTop: 4, letterSpacing: "-0.01em"
        }}>{item.productName}</div>
        {item.mode !== "quicktext" && (
          <div style={{
            fontSize: 12, color: "var(--text-65)",
            marginTop: 2
          }}>
            {item.decoration.colour} · {item.decoration.method}
            {item.decoration.setupFee && (
              <span style={{
                marginLeft: 8, color: "var(--accent-line)", fontSize: 11, fontWeight: 500
              }}>+£{item.decoration.setupFee} embroidery setup</span>
            )}
          </div>
        )}

        {/* State-specific qty editors */}
        {item.mode === "single" && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            marginTop: 10
          }}>
            <span style={{ fontSize: 12, color: "var(--text-65)" }}>
              Size {item.size}
            </span>
            <span style={{ color: "var(--text-30)" }}>·</span>
            <MiniStepper value={item.qty}
              setValue={(v) => setItem({ ...item, qty: v })}
              onRemove={requestRemove} />
          </div>
        )}

        {item.mode === "multi" && (
          <SizeBreakdownInset
            sizeQtys={item.sizeQtys}
            setSizeQtys={(v) => setItem({ ...item, sizeQtys: v })}
            editingSize={editingSize}
            setEditingSize={setEditingSize} />
        )}

        {item.mode === "quicktext" && (
          <>
            <div style={{
              background: "var(--surface-2)",
              borderRadius: 4,
              padding: 10,
              marginTop: 10,
              fontSize: 12,
              color: "var(--text)"
            }}>
              <span style={{ color: "var(--text-50)" }}>Text:</span>{" "}
              <span style={{ fontStyle: "italic" }}>"{item.text}"</span>
            </div>
            <div style={{ marginTop: 10 }}>
              <MiniStepper value={item.qty}
                setValue={(v) => setItem({ ...item, qty: v })}
                onRemove={requestRemove} />
            </div>
          </>
        )}

        {/* OOS warning */}
        {item.oosSize && (
          <div style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 10px",
            background: "rgba(244,180,0,0.06)",
            border: "1px solid rgba(244,180,0,0.30)",
            borderRadius: 4,
            fontSize: 11,
            color: "rgba(255,225,150,0.95)"
          }}>
            <IconWarning size={12} strokeWidth={1.5} />
            1 of these isn't currently available in your selected size — we'll notify you within 24 hours.
          </div>
        )}

        {/* Actions row */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          marginTop: 14
        }}>
          <ActionLink icon={<IconPencil size={12} />} colour="var(--accent-line)" label="Edit design" />
          {item.mode === "multi" && (
            <ActionLink icon={<IconPlus size={12} />} label="Edit quantities" onClick={() => {
              // Open first size for inline edit
              const firstSize = Object.keys(item.sizeQtys)[0];
              setEditingSize(firstSize);
            }} />
          )}
          <ActionLink icon={<IconBookmark size={12} />} label="Save for later" />
          <ActionLink icon={<IconTrash size={12} />} label="Remove" onClick={requestRemove} />
        </div>
      </div>

      {/* Col 3 — price */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "flex-end", textAlign: "right",
        gap: 4
      }}>
        <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}>
          £{lineTotal.toFixed(2)}
        </div>
        <div style={{ fontSize: 10, color: "var(--text-60)" }}>
          £{item.unitPrice.toFixed(2)} × {units}
        </div>
        {item.eligibleBulk && (
          <div style={{
            fontSize: 9,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--accent-line)",
            fontWeight: 500,
            marginTop: 4
          }}>Eligible for bulk discount</div>
        )}
      </div>
    </div>
  );
};

const ActionLink = ({ icon, label, colour = "var(--text-60)", onClick }) => {
  const isAccent = colour === "var(--accent-line)";
  return (
    <button onClick={onClick} style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11,
      color: colour,
      fontWeight: 500,
      transition: "color 200ms"
    }}
    onMouseEnter={e => {
      e.currentTarget.style.color = isAccent ? "var(--accent)" : "var(--text)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.color = colour;
    }}>
      {icon} {label}
    </button>
  );
};

// Saved-for-later section
const SavedForLater = ({ items }) => {
  const [open, setOpen] = useState(false);
  if (!items.length) return null;
  return (
    <div style={{
      background: "var(--surface)",
      borderRadius: 6,
      overflow: "hidden",
      marginTop: 12
    }}>
      <button onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          padding: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 14,
          fontWeight: 500
        }}>
        Saved for later <span style={{ color: "var(--text-50)", marginLeft: 6, fontWeight: 400 }}>({items.length})</span>
        <IconChevronDown size={14} style={{
          color: "var(--text-50)",
          transform: open ? "rotate(180deg)" : "rotate(0)",
          transition: "transform 200ms"
        }} />
      </button>
      {open && (
        <div style={{
          padding: "0 16px 16px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12
        }}>
          {items.map(i => (
            <div key={i.id} style={{
              background: "var(--surface-2)",
              borderRadius: 4,
              padding: 10,
              display: "flex",
              gap: 12,
              alignItems: "center"
            }}>
              <div style={{
                width: 64, height: 64,
                background: "var(--bg)",
                borderRadius: 4,
                flexShrink: 0,
                overflow: "hidden"
              }}>
                <Silhouette kind={i.kind} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{i.name}</div>
                <div style={{
                  display: "flex", gap: 14, marginTop: 6
                }}>
                  <button style={{
                    fontSize: 11, color: "var(--accent-line)", fontWeight: 500
                  }}>Move to basket</button>
                  <button style={{ fontSize: 11, color: "var(--text-60)" }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Object.assign(window, {
  MiniStepper, SizeBreakdownInset, ItemTypeBadge, CartLineItem,
  ActionLink, SavedForLater
});
