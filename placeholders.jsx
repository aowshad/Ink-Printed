// Image pool registry + Placeholder + Silhouette fallback
//
// Drop image files into /images/ and add their paths to the relevant pool array
// below. The Placeholder component will pick from these arrays automatically.
// If a pool is empty, the system falls back to the SVG silhouette + corner label.
//
// Naming convention:
//   images/product-hoodie-01.jpg     → ImagePool.hoodie
//   images/product-tee-01.jpg        → ImagePool.tee
//   images/hero-01.jpg               → ImagePool.hero
//   images/lifestyle-01.jpg          → ImagePool.lifestyle
//   images/customer-01.jpg           → ImagePool.customer
//   images/product-hoodie-printed-01.jpg → ImagePool.printed (for before/after etc.)

const ImagePool = {
  // Plain tees on dark backgrounds / on models
  // Local customer-supplied tee first, then Unsplash fallbacks
  tee: [
    "uploads/AWD_AT001_Personalised_Tee.webp",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&auto=format&fit=crop&q=80"
  ],
  // Hoodies — premium streetwear photography
  hoodie: [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=1200&auto=format&fit=crop&q=80"
  ],
  // Polos — workwear / smart casual
  polo: [
    "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1622445275576-721325763afe?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&auto=format&fit=crop&q=80"
  ],
  // Caps and beanies
  cap: [
    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517941823-815bea90d291?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&auto=format&fit=crop&q=80"
  ],
  // Canvas totes
  tote: [
    "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1200&auto=format&fit=crop&q=80"
  ],
  // Mugs — printed, branded
  mug: [
    "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1572119865084-43c285814d63?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494314671902-399b18174975?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=1200&auto=format&fit=crop&q=80"
  ],
  // Outerwear / jackets
  jacket: [
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=1200&auto=format&fit=crop&q=80"
  ],
  // Hero — moody editorial product shots
  hero: [
    "uploads/model with custom hoodie.png",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1800&auto=format&fit=crop&q=85",
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1800&auto=format&fit=crop&q=85",
    "https://images.unsplash.com/photo-1611042553365-9b101441c135?w=1800&auto=format&fit=crop&q=85",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&auto=format&fit=crop&q=85",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1800&auto=format&fit=crop&q=85"
  ],
  // Lifestyle / behind the scenes — local August_Sky shots first, then Unsplash
  lifestyle: [
    "uploads/August_Sky_23.webp",
    "uploads/August_Sky_24.webp",
    "uploads/August_Sky_27.webp",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=1600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?w=1600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1600&auto=format&fit=crop&q=80"
  ],
  // Customer wearing custom prints — real customer photos first, Unsplash fallbacks after
  customer: [
    "uploads/223808786_1400420930329667_1710071268488522792_n.jpg",
    "uploads/241961223_129122439453947_6870258344357154848_n.jpg",
    "uploads/242003037_387581183073694_4503692978080114072_n.jpg",
    "uploads/245639567_369830304882679_4643342402854339377_n.jpg",
    "uploads/279576295_673090960425615_4901821290324799749_n.jpg",
    "uploads/baby_grow_personalised.webp",
    "uploads/AWD_AT001_Personalised_Tee.webp",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1000&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1000&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1000&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=1000&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1000&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?w=1000&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=1000&auto=format&fit=crop&q=80"
  ],
  // Blank vs Printed pair for Before/After slider — printed-product side
  printed: [
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1606513542745-97629752a13b?w=1200&auto=format&fit=crop&q=80"
  ],
  // Photo placeholder (for any kind="photo" generic uses)
  photo: [
    "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=1200&auto=format&fit=crop&q=80"
  ]
};
window.ImagePool = ImagePool;

// Deterministic pick based on the label string so the same slot always
// renders the same image (no flicker on re-render).
function hashString(s) {
  if (!s) return 0;
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h * 31) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pickImage(poolKey, label) {
  const pool = ImagePool[poolKey];
  if (!pool || pool.length === 0) return null;
  const idx = hashString(label) % pool.length;
  return pool[idx];
}

// Placeholder — renders real image if available, silhouette + label otherwise.
// Props:
//   kind   — product type (tee/hoodie/etc.) — used for silhouette + pool lookup
//   pool   — override pool key (e.g. "hero", "customer", "lifestyle")
//   label  — descriptive label, used as seed for image selection and as fallback tag
//   overlay— "soft" (default) / "none" / "strong" — dark gradient overlay on top of imagery
const Placeholder = ({ label, kind = "product", pool, overlay = "none", style, src: srcOverride }) => {
  const poolKey = pool || kind;
  const src = srcOverride || pickImage(poolKey, label);
  const isHero = poolKey === "hero";

  if (src) {
    return (
      <div style={{
        position: "absolute",
        inset: 0,
        width: "100%", height: "100%",
        overflow: "hidden",
        ...style
      }}>
        {/* Silhouette underneath — stays visible if the image fails to load */}
        <div className="ph" style={{ position: "absolute", inset: 0 }}>
          <Silhouette kind={kind} />
          {label && <div className="ph-tag">{label}</div>}
        </div>
        <img src={src} alt={label || ""}
             loading={isHero ? "eager" : "lazy"}
             onError={(e) => { e.currentTarget.style.display = "none"; }}
             style={{
               position: "absolute", inset: 0,
               width: "100%", height: "100%",
               objectFit: "cover", display: "block"
             }} />
        {overlay === "soft" && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(10,10,10,0) 30%, rgba(10,10,10,0.30) 100%)",
            pointerEvents: "none"
          }} />
        )}
        {overlay === "strong" && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(10,10,10,0) 30%, rgba(10,10,10,0.55) 100%)",
            pointerEvents: "none"
          }} />
        )}
      </div>
    );
  }

  return (
    <div className="ph" style={{
      position: "absolute",
      inset: 0,
      width: "100%", height: "100%",
      ...style
    }}>
      <Silhouette kind={kind} />
      {label && <div className="ph-tag">{label}</div>}
    </div>
  );
};

// Self-contained silhouette: an SVG centred inside its own positioned wrapper.
// Callers don't need to set position:relative on the container.
const Silhouette = ({ kind }) => {
  const stroke = "var(--text-10)";
  const fill = "var(--text-025)";
  const svg = (() => {
    if (kind === "tee") return (
      <svg viewBox="0 0 200 200" width="62%" height="62%">
        <path d="M50 50 L80 35 Q100 50 120 35 L150 50 L165 75 L140 85 L140 165 Q140 170 135 170 L65 170 Q60 170 60 165 L60 85 L35 75 Z"
              fill={fill} stroke={stroke} strokeWidth="1" />
      </svg>
    );
    if (kind === "hoodie") return (
      <svg viewBox="0 0 200 200" width="68%" height="68%">
        <path d="M55 55 Q70 30 100 30 Q130 30 145 55 L170 75 L150 95 L150 170 Q150 175 145 175 L55 175 Q50 175 50 170 L50 95 L30 75 Z"
              fill={fill} stroke={stroke} strokeWidth="1" />
        <path d="M85 30 Q100 55 115 30" fill="none" stroke={stroke} strokeWidth="1" />
        <path d="M95 50 L95 80 Q100 85 105 80 L105 50" fill="none" stroke={stroke} strokeWidth="1" />
      </svg>
    );
    if (kind === "cap") return (
      <svg viewBox="0 0 200 160" width="68%" height="68%">
        <path d="M30 105 Q30 55 100 55 Q170 55 170 105 L170 115 Q170 120 165 120 L100 120 L100 105 Q100 80 70 80 Q40 80 40 110 Z"
              fill={fill} stroke={stroke} strokeWidth="1" />
      </svg>
    );
    if (kind === "tote") return (
      <svg viewBox="0 0 200 200" width="62%" height="62%">
        <path d="M50 65 L150 65 L160 175 L40 175 Z" fill={fill} stroke={stroke} strokeWidth="1" />
        <path d="M75 65 Q75 30 100 30 Q125 30 125 65" fill="none" stroke={stroke} strokeWidth="1" />
      </svg>
    );
    if (kind === "polo") return (
      <svg viewBox="0 0 200 200" width="62%" height="62%">
        <path d="M50 50 L85 35 L100 55 L115 35 L150 50 L165 75 L140 85 L140 165 Q140 170 135 170 L65 170 Q60 170 60 165 L60 85 L35 75 Z"
              fill={fill} stroke={stroke} strokeWidth="1" />
        <path d="M95 55 L95 90 M105 55 L105 90" stroke={stroke} strokeWidth="1" />
      </svg>
    );
    if (kind === "mug") return (
      <svg viewBox="0 0 200 200" width="55%" height="55%">
        <rect x="50" y="60" width="90" height="100" rx="6" fill={fill} stroke={stroke} strokeWidth="1" />
        <path d="M140 80 Q170 80 170 110 Q170 140 140 140" fill="none" stroke={stroke} strokeWidth="1" />
      </svg>
    );
    if (kind === "jacket") return (
      <svg viewBox="0 0 200 200" width="62%" height="62%">
        <path d="M50 55 L80 35 L100 50 L120 35 L150 55 L165 80 L150 90 L150 170 Q150 175 145 175 L55 175 Q50 175 50 170 L50 90 L35 80 Z"
              fill={fill} stroke={stroke} strokeWidth="1" />
        <path d="M100 50 L100 175" stroke={stroke} strokeWidth="1" />
      </svg>
    );
    if (kind === "photo" || kind === "customer" || kind === "lifestyle") return (
      <svg viewBox="0 0 200 200" width="35%" height="35%" opacity="0.5">
        <rect x="20" y="40" width="160" height="120" rx="4" fill="none" stroke={stroke} strokeWidth="1.5" />
        <circle cx="65" cy="80" r="10" fill="none" stroke={stroke} strokeWidth="1.5" />
        <path d="M20 140 L70 100 L110 130 L150 95 L180 130 L180 160 L20 160 Z" fill={fill} stroke={stroke} strokeWidth="1.5" />
      </svg>
    );
    return null;
  })();

  if (!svg) return null;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center"
      }}>{svg}</div>
    </div>
  );
};

// Brand logomark — updated SVG wordmark
const Wordmark = ({ size = 20 }) => (
  <img
    src="assets/logo-updated.svg"
    alt="InkPrinted"
    style={{
      height: Math.round(size * 1.4),
      width: "auto",
      display: "block"
    }}
  />
);

// Re-usable content-blocker note for sections waiting on real photos
const SupplyBlocker = ({ children = "Mark to supply real customer photography before launch." }) => (
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
    <span>{children}</span>
  </div>
);

// Theme toggle — flips html[data-theme], persists to localStorage. Lives here
// because placeholders.jsx loads on every page (incl. Login, which omits top.jsx).
// Reads the attribute the FOUC guard already set, so it stays in sync on load.
const ThemeToggle = () => {
  const [theme, setTheme] = React.useState(
    (typeof document !== "undefined" && document.documentElement.dataset.theme) || "dark"
  );
  const isDark = theme !== "light";
  const toggle = () => {
    const next = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("ip-theme", next); } catch (e) {}
    setTheme(next);
  };
  return (
    <button
      onClick={toggle}
      className="theme-toggle"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={!isDark}
      title={isDark ? "Light mode" : "Dark mode"}
      style={{
        width: 28, height: 28,
        display: "inline-grid", placeItems: "center",
        color: "var(--text-70)",
        borderRadius: 4,
        flex: "none",
        transition: "color 200ms ease-out, background 200ms ease-out"
      }}
    >
      {isDark ? <IconMoon size={16} /> : <IconSun size={16} />}
      <style>{`
        .theme-toggle:hover { color: var(--text); background: var(--text-08); }
        .theme-toggle:focus-visible { outline: 2px solid var(--accent-line); outline-offset: 2px; }
      `}</style>
    </button>
  );
};

Object.assign(window, { Placeholder, Silhouette, Wordmark, SupplyBlocker, ImagePool, pickImage, ThemeToggle });
