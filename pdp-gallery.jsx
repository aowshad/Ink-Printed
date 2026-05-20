// PDP — Breadcrumb + Image gallery (left column)
const { useState: useStateGal, useRef: useRefGal } = React;

// Breadcrumb
const Breadcrumb = ({ trail }) => (
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
              ? <span style={{ color: "rgba(255,255,255,0.80)" }}>{item}</span>
              : <a href="#" style={{
                  color: "rgba(255,255,255,0.50)",
                  transition: "color 200ms"
                }} onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.50)"}
                >{item}</a>}
            {!isLast && <span style={{ color: "rgba(255,255,255,0.30)" }}>›</span>}
          </React.Fragment>
        );
      })}
    </div>
  </div>
);

// Print area badge
const PrintAreaBadge = ({ children }) => (
  <div style={{
    position: "absolute",
    top: 16, left: 16,
    background: "rgba(10,10,10,0.85)",
    border: "1px solid rgba(255,255,255,0.10)",
    backdropFilter: "blur(8px)",
    color: "#fff",
    fontSize: 11,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    fontWeight: 500,
    padding: "6px 10px",
    borderRadius: 3,
    zIndex: 2,
    whiteSpace: "nowrap"
  }}>{children}</div>
);

// Zoom button
const ZoomButton = ({ onClick }) => (
  <button onClick={onClick} aria-label="Zoom image" style={{
    position: "absolute",
    right: 16, bottom: 16,
    background: "rgba(255,255,255,0.92)",
    color: "#0A0A0A",
    width: 40, height: 40,
    borderRadius: 20,
    display: "inline-flex",
    alignItems: "center", justifyContent: "center",
    zIndex: 2,
    transition: "background 200ms"
  }}
  onMouseEnter={e => e.currentTarget.style.background = "#fff"}
  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.92)"}
  >
    <IconZoom size={18} strokeWidth={1.75} />
  </button>
);

// Image gallery
const SHOTS = [
  { id: "blank-front", label: "BLANK / FRONT", kind: "tee", printed: false },
  { id: "on-model-front", label: "ON MODEL · PRINTED", kind: "tee", printed: true },
  { id: "on-model-back", label: "ON MODEL / BACK", kind: "tee", printed: false },
  { id: "fabric-detail", label: "FABRIC DETAIL", kind: "tee", printed: false },
  { id: "lifestyle", label: "LIFESTYLE", kind: "photo", printed: false },
  { id: "customer", label: "CUSTOMER", kind: "tee", printed: true }
];

const ImageGallery = () => {
  const [active, setActive] = useStateGal(1); // start on the printed-example shot
  const shot = SHOTS[active];

  return (
    <div style={{
      display: "flex",
      gap: 12,
      alignItems: "flex-start"
    }}>
      {/* Thumbs */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: 72,
        flexShrink: 0
      }}>
        {SHOTS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            aria-label={s.label}
            style={{
              width: 64, height: 64,
              borderRadius: 4,
              overflow: "hidden",
              border: i === active
                ? "2px solid var(--accent)"
                : "1px solid rgba(255,255,255,0.15)",
              position: "relative",
              transition: "border-color 200ms ease-out",
              padding: 0
            }}>
            <div style={{ position: "absolute", inset: 0, background: "#141414" }}>
              <Silhouette kind={s.kind} />
            </div>
            {s.printed && (
              <span style={{
                position: "absolute",
                bottom: 4, right: 4,
                width: 6, height: 6,
                borderRadius: "50%",
                background: "var(--accent)"
              }} />
            )}
          </button>
        ))}
      </div>

      {/* Main image */}
      <div style={{
        flex: 1,
        aspectRatio: "1 / 1",
        maxHeight: 600,
        background: "var(--surface)",
        borderRadius: 6,
        position: "relative",
        overflow: "hidden"
      }}>
        <PrintAreaBadge>Print area: 28 × 30 cm</PrintAreaBadge>
        <ZoomButton onClick={() => alert("Zoom lightbox — to be wired up")} />
        <div style={{ position: "absolute", inset: 0 }}>
          <Placeholder label={shot.label} kind={shot.kind} />
          {shot.printed && (
            // Faux printed graphic overlaid on the placeholder silhouette
            <div style={{
              position: "absolute",
              left: "50%", top: "48%",
              transform: "translate(-50%, -50%)",
              width: 120, height: 120,
              borderRadius: 4,
              border: "1px solid rgba(170,204,0,0.5)",
              background: "rgba(170,204,0,0.08)",
              display: "grid",
              placeItems: "center",
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 9,
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              textAlign: "center"
            }}>
              <div>
                Your<br/>design<br/>here
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Breadcrumb, ImageGallery, PrintAreaBadge, ZoomButton });
