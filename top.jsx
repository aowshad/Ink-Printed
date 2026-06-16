// Top of page: Utility bar, Primary nav (with mega-menu), Hero
const { useState, useEffect, useRef } = React;

// ── Promo banner config (toggleable, off by default).
// Edit the values inside the markers; set "enabled" to true to render the band.
const PROMO = /*PROMO-BEGIN*/{
  "enabled": true,
  "message": "BLACK FRIDAY · 20% OFF EVERYTHING WITH CODE 'INKBF'",
  "code": "INKBF",
  "endTime": "2026-11-30T23:59:59Z",
  "type": "sale"
}/*PROMO-END*/;

// PromoBanner — full-width band above the utility bar.
// Type variants:
//   'sale'         — acid green fill, near-black text
//   'shipping'     — #141414 fill, white text
//   'announcement' — transparent outline, white text
const PromoBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    try { setDismissed(sessionStorage.getItem("ip-promo-dismissed") === "1"); } catch (e) {}
  }, []);

  useEffect(() => {
    if (!PROMO.enabled || !PROMO.endTime) return;
    const tick = () => {
      const end = new Date(PROMO.endTime).getTime();
      const diff = Math.max(0, end - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setRemaining(`${d}D ${String(h).padStart(2,"0")}H ${String(m).padStart(2,"0")}M ${String(s).padStart(2,"0")}S`);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  if (!PROMO.enabled || dismissed) return null;

  const variantStyle = (() => {
    if (PROMO.type === "shipping") {
      return { background: "var(--surface)", color: "var(--text)", border: "none" };
    }
    if (PROMO.type === "announcement") {
      return { background: "transparent", color: "var(--text)", border: "1px solid var(--text-20)" };
    }
    // default 'sale'
    return { background: "var(--accent)", color: "var(--accent-ink)", border: "none" };
  })();

  const dismiss = () => {
    try { sessionStorage.setItem("ip-promo-dismissed", "1"); } catch (e) {}
    setDismissed(true);
  };

  return (
    <div style={{
      height: 48,
      background: variantStyle.background,
      color: variantStyle.color,
      borderBottom: variantStyle.border,
      display: "flex",
      alignItems: "center"
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        height: "100%"
      }}>
        <span style={{
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.06em",
          textTransform: "uppercase"
        }}>{PROMO.message}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {remaining && (
            <span style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.02em"
            }}>ENDS IN {remaining}</span>
          )}
          <button onClick={dismiss} aria-label="Dismiss promo"
            style={{
              width: 28, height: 28,
              display: "inline-grid",
              placeItems: "center",
              color: variantStyle.color,
              opacity: 0.7,
              transition: "opacity 200ms"
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0.7}>
            <IconClose size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    if (!document.documentElement.classList.contains("js-reveal-ready")) {
      document.documentElement.classList.add("js-reveal-ready");
    }
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Immediate check: if already (mostly) in viewport, show now.
    const checkNow = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // visible if top is within viewport bottom and bottom is within viewport top with some buffer
      if (r.top < vh * 0.95 && r.bottom > 0) {
        el.classList.add("in");
        return true;
      }
      return false;
    };
    if (checkNow()) return;

    let io;
    try {
      io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting || e.intersectionRatio > 0) {
            el.classList.add("in");
            io && io.disconnect();
          }
        });
      }, { threshold: [0, 0.2] });
      io.observe(el);
    } catch (e) { /* noop */ }

    // Safety fallback — if IO never fires, force-reveal after 500ms
    const t = setTimeout(() => { el.classList.add("in"); }, 500);

    return () => { io && io.disconnect(); clearTimeout(t); };
  }, []);
  return ref;
}

// ThemeToggle is defined in placeholders.jsx (loaded on every page) and referenced
// here via the global scope, so the Login page (which omits top.jsx) can reuse it.

// 01 — Utility bar (with PromoBanner above)
const UtilityBar = () => {
  const items = ["10+ YEARS PRINTING", "FAST UK DISPATCH", "SIMPLE PRICING"];
  return (
    <>
      <PromoBanner />
      <style>{`
        .utility-bar { gap: 18px; }
        .utility-bar > span {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        @media (max-width: 1200px) {
          .utility-bar { gap: 14px; }
        }
      `}</style>
      <div className="utility-bar" style={{
        height: 36,
        background: "var(--bg-deeper)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "nowrap",
        minWidth: 0,
        padding: "0 12px",
        position: "relative",
        fontSize: 12,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--text-70)",
        fontWeight: 500
      }}>
      {items.map((s, i) => (
        <React.Fragment key={s}>
          <span>{s}</span>
          {i < items.length - 1 && (
            <span style={{
              width: 4, height: 4, borderRadius: "50%",
              background: "var(--accent)", display: "inline-block",
              flex: "none"
            }} />
          )}
        </React.Fragment>
      ))}
      <div style={{ position: "absolute", right: 12, top: 0, bottom: 0, display: "flex", alignItems: "center" }}>
        <ThemeToggle />
      </div>
    </div>
    </>
  );
};

// 02 — Primary nav
const NAV = [
  { label: "Clothing", hasMenu: true,  href: "Listing.html" },
  { label: "Workwear", hasMenu: true,  href: "Listing.html" },
  { label: "Gifts",    hasMenu: true,  href: "Listing.html" },
  { label: "Gallery",  hasMenu: false, href: "Homepage.html#gallery" }
];

const MENU_RENDERERS = {
  Clothing: () => <MM_Clothing />,
  Workwear: () => <MM_Workwear />,
  Gifts: () => <MM_Gifts />
};

const Nav = () => {
  const [stuck, setStuck] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);   // currently rendered menu
  const [visible, setVisible] = useState(false);    // controls .in animation class
  const headerRef = useRef(null);
  const openTimer = useRef(null);
  const closeTimer = useRef(null);
  const hideUnmountTimer = useRef(null);

  // Cancel any pending timers
  const clearTimers = () => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    clearTimeout(hideUnmountTimer.current);
  };

  // Request open after 200ms intent delay
  const requestOpen = (label) => {
    if (!label) return requestClose();
    clearTimers();
    if (openMenu === label) {
      setVisible(true);
      return;
    }
    openTimer.current = setTimeout(() => {
      setOpenMenu(label);
      // next frame, set visible=true for the transition to play
      requestAnimationFrame(() => setVisible(true));
    }, 200);
  };

  // Request close with 300ms forgiveness
  const requestClose = () => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setVisible(false);
      hideUnmountTimer.current = setTimeout(() => setOpenMenu(null), 200);
    }, 300);
  };

  // Immediate close (Escape, click outside)
  const closeNow = () => {
    clearTimers();
    setVisible(false);
    hideUnmountTimer.current = setTimeout(() => setOpenMenu(null), 200);
  };

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape + outside click
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e) => { if (e.key === "Escape") closeNow(); };
    const onDocClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) closeNow();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDocClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDocClick);
    };
  }, [openMenu]);

  useEffect(() => () => clearTimers(), []);

  return (
    <>
      {/* Backdrop dim over page content below the nav */}
      <div aria-hidden="true" style={{
        position: "fixed",
        left: 0, right: 0,
        top: stuck ? 72 : 108,
        bottom: 0,
        background: "rgba(0,0,0,0.30)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 240ms ease-out",
        zIndex: 40
      }} onClick={closeNow} />

      <header
        ref={headerRef}
        onMouseLeave={requestClose}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "var(--bg)",
          borderBottom: stuck ? "1px solid var(--text-15)" : "1px solid transparent",
          transition: "border-color 200ms ease-out"
        }}
      >
        <div className="container" style={{
          height: 72,
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          position: "relative",
          zIndex: 2
        }}>
          {/* Left wordmark */}
          <div>
            <a href="Homepage.html" aria-label="InkPrinted home">
              <Wordmark size={20} />
            </a>
          </div>

          {/* Center nav */}
          <nav style={{ display: "flex", gap: 36 }}
               onMouseEnter={() => { clearTimeout(closeTimer.current); }}>
            {NAV.map(item => (
              <NavLink
                key={item.label}
                item={item}
                isOpen={openMenu === item.label && visible}
                onEnter={() => requestOpen(item.hasMenu ? item.label : null)}
              />
            ))}
          </nav>

          {/* Right icons */}
          <div style={{ display: "flex", gap: 22, justifyContent: "flex-end", alignItems: "center" }}>
            <button aria-label="Search" style={iconBtn}><IconSearch /></button>
            <a href="Login.html" aria-label="Account" style={iconBtn}><IconUser /></a>
            <a href="Cart.html" aria-label="Basket" style={{ ...iconBtn, position: "relative" }}>
              <IconBag />
              <span style={{
                position: "absolute",
                top: -2, right: -2,
                width: 8, height: 8, borderRadius: "50%",
                background: "var(--accent)"
              }} />
            </a>
          </div>
        </div>

        {/* Mega menu panel */}
        {openMenu && (
          <div
            onMouseEnter={() => { clearTimeout(closeTimer.current); }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0, right: 0,
              borderBottom: "1px solid var(--border)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-8px)",
              transition: visible
                ? "opacity 240ms ease-out, transform 240ms ease-out"
                : "opacity 160ms ease-out, transform 160ms ease-out",
              zIndex: 1
            }}
          >
            {MENU_RENDERERS[openMenu] && MENU_RENDERERS[openMenu]()}
          </div>
        )}
      </header>
    </>
  );
};

const iconBtn = {
  width: 32, height: 32,
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  color: "var(--text)",
  borderRadius: 2,
  transition: "color 200ms ease-out"
};

const NavLink = ({ item, isOpen, onEnter }) => {
  return (
    <a
      href={item.href || "#"}
      onMouseEnter={onEnter}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        height: 72,
        fontSize: 14,
        color: "var(--text)",
        fontWeight: 400,
        position: "relative",
        borderBottom: isOpen ? "1px solid var(--accent-line)" : "1px solid transparent",
        transition: "border-color 200ms ease-out"
      }}
      className="nav-link"
    >
      {item.label}
      {item.hasMenu && <IconChevron size={12} strokeWidth={1.5} />}
      <style>{`
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0; right: 0;
          bottom: 26px;
          height: 1px;
          background: var(--accent-line);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 200ms ease-out;
        }
        .nav-link:hover::after { transform: scaleX(1); }
      `}</style>
    </a>
  );
};

// 03 — Hero (Marble-inspired 50/50 split)
const Hero = () => {
  const ref = useReveal();
  const [shotIdx, setShotIdx] = useState(0);
  const totalShots = 3;
  return (
    <section style={{ background: "var(--bg)" }}>
      <div className="container" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0,
        minHeight: 640,
        alignItems: "stretch",
        paddingTop: 24,
        paddingBottom: 24
      }}>
        {/* Left — image panel */}
        <div style={{
          position: "relative",
          minHeight: 640,
          overflow: "hidden",
          borderRadius: 6,
          background: "var(--surface)"
        }}>
          <Placeholder
            
            kind="hoodie"
            pool="hero"
            overlay="strong"
          />
          {/* Bottom-left: image counter + floating label, single row */}
          <div style={{
            position: "absolute",
            bottom: 24, left: 24,
            display: "flex",
            alignItems: "center",
            gap: 16,
            zIndex: 2
          }}>
            <button
              aria-label="Next image"
              onClick={() => setShotIdx((shotIdx + 1) % totalShots)}
              style={{
                width: 48, height: 48,
                borderRadius: "50%",
                background: "var(--bg)",
                border: "1px solid var(--text-25)",
                color: "var(--text)",
                fontSize: 13,
                fontWeight: 500,
                display: "inline-grid",
                placeItems: "center",
                transition: "border-color 200ms, background 200ms"
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent-line)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--text-25)"; }}>
              {shotIdx + 1}/{totalShots}
            </button>
            <span style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--on-media)"
            }}>
              Embroidered · Heavyweight hoodie
            </span>
          </div>
        </div>

        {/* Right — content panel */}
        <div ref={ref} className="reveal" style={{
          padding: 56,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <div style={{ maxWidth: 480 }}>
            <div className="eyebrow">Custom Print & Embroidery</div>
            <h1 className="h1" style={{ marginTop: 24, textWrap: "balance" }}>
              Print something <span style={{ color: "var(--accent-line)" }}>worth</span> wearing.
            </h1>
            <p style={{
              fontSize: 18, lineHeight: "28px",
              color: "var(--text-65)",
              maxWidth: 460,
              marginTop: 24
            }}>
              Designed by you, printed by us in the UK. No minimums, no setup fees, no faff.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
              <a href="Listing.html" className="btn btn-primary">
                Start Designing <IconArrowRight size={16} className="arrow" />
              </a>
              <a href="Listing.html" className="btn btn-secondary">
                Browse Products <IconArrowRight size={16} className="arrow" />
              </a>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 14, marginTop: 28,
              fontSize: 12, color: "var(--text-50)", letterSpacing: "0.02em",
              flexWrap: "wrap"
            }}>
              <span>No minimums</span>
              <Dot />
              <span>Free UK shipping over £50</span>
              <Dot />
              <span>48-hour dispatch</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Dot = () => (
  <span style={{
    width: 3, height: 3, borderRadius: "50%",
    background: "var(--accent)", display: "inline-block"
  }} />
);

Object.assign(window, { UtilityBar, Nav, Hero, useReveal, Dot });
