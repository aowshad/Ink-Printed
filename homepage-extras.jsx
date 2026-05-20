// Homepage extras — new sections inspired by Marble / Refine / Nexa / Elevated
// (Marquee strip, Quick-text editorial band, Before/After slider, Customer review wall,
//  Instagram block, BrandLogoStrip)

import { useState } from "react";

const { useState: useStateExtras, useEffect: useEffectExtras, useRef: useRefExtras } = React;

// ── Tiny acid-green star (used in marquee + reviews)
const AcidStar = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#AACC00" aria-hidden="true">
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />
  </svg>
);

// ──────────────────────────────────────────────────────────────────────────
// 1. MARQUEE STRIP — between Hero and Categories
// ──────────────────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "10+ Years Printing",
  "Fast UK Dispatch",
  "No Setup Fees",
  "No Minimums",
  "Printed in the UK",
  "Free Shipping Over £50"
];

const MarqueeStrip = () => {
  const renderRow = (k) => (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 48,
      flexShrink: 0,
      paddingRight: 48
    }} key={k}>
      {MARQUEE_ITEMS.map((s, i) => (
        <React.Fragment key={i}>
          <span style={{
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.90)",
            whiteSpace: "nowrap"
          }}>{s}</span>
          <AcidStar />
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="ip-marquee" style={{
      background: "#000",
      borderTop: "1px solid rgba(255,255,255,0.10)",
      borderBottom: "1px solid rgba(255,255,255,0.10)",
      height: 56,
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      width: "100%"
    }}>
      <div className="ip-marquee-track">
        {renderRow("a")}
        {renderRow("b")}
      </div>
      <style>{`
        .ip-marquee-track {
          display: flex;
          width: max-content;
          animation: ipMarquee 30s linear infinite;
        }
        .ip-marquee:hover .ip-marquee-track {
          animation-play-state: paused;
        }
        @keyframes ipMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// 2. BEFORE / AFTER SLIDER — between How It Works and Bestsellers
// ──────────────────────────────────────────────────────────────────────────
const BeforeAfterSlider = () => {
  const [pos, setPos] = useStateExtras(50);
  const containerRef = useRefExtras(null);
  const dragging = useRefExtras(false);

  const update = (clientX) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(r.width, clientX - r.left));
    setPos((x / r.width) * 100);
  };

  useEffectExtras(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      update(x);
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <section style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div className="container" style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="eyebrow">From blank to brand</div>
          <h2 className="h2" style={{ marginTop: 16, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
            Drag to see the transformation.
          </h2>
        </div>


        <div
          ref={containerRef}
          onMouseDown={(e) => { dragging.current = true; update(e.clientX); }}
          onTouchStart={(e) => { dragging.current = true; update(e.touches[0].clientX); }}
          style={{
            position: "relative",
            width: "100%",
            height: 560,
            borderRadius: 6,
            overflow: "hidden",
            background: "var(--surface)",
            cursor: "ew-resize",
            userSelect: "none"
          }}>
          {/* After image (full width, behind) — printed.
              Specific URL pair; swap in Mark's real shot when supplied. */}
          <div style={{ position: "absolute", inset: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1400&auto=format&fit=crop&q=85"
              alt="Printed hoodie"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Before image — blank, clipped from left to `pos` */}
          <div style={{
            position: "absolute",
            inset: 0,
            clipPath: `inset(0 ${100 - pos}% 0 0)`
          }}>
            <img
              src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1400&auto=format&fit=crop&q=85"
              alt="Blank hoodie"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Labels */}
          <span style={{
            position: "absolute", top: 16, left: 16,
            background: "var(--accent)", color: "#0A0A0A",
            fontSize: 11, fontWeight: 500, letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "4px 8px",
            borderRadius: 2,
            zIndex: 3
          }}>Blank</span>
          <span style={{
            position: "absolute", top: 16, right: 16,
            background: "var(--accent)", color: "#0A0A0A",
            fontSize: 11, fontWeight: 500, letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "4px 8px",
            borderRadius: 2,
            zIndex: 3
          }}>Printed</span>

          {/* Divider line + handle */}
          <div style={{
            position: "absolute",
            top: 0, bottom: 0,
            left: `${pos}%`,
            width: 2,
            background: "var(--accent)",
            transform: "translateX(-1px)",
            zIndex: 2,
            pointerEvents: "none"
          }} />
          <div style={{
            position: "absolute",
            top: "50%",
            left: `${pos}%`,
            transform: "translate(-50%, -50%)",
            width: 40, height: 40,
            borderRadius: "50%",
            background: "var(--bg)",
            border: "2px solid var(--accent)",
            display: "grid",
            placeItems: "center",
            cursor: "ew-resize",
            zIndex: 3
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#AACC00" strokeWidth="2" strokeLinecap="round">
              <path d="M5 4 2 7l3 3" />
              <path d="m9 4 3 3-3 3" />
            </svg>
          </div>
        </div>

        <p style={{
          textAlign: "center",
          fontSize: 12,
          color: "var(--text-60)",
          marginTop: 16
        }}>
          Real customer order · Studio Crew · Black heavyweight hoodie · DTG print
        </p>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// 3. QUICK-TEXT EDITORIAL BAND — between Bestsellers and Pricing band
// ──────────────────────────────────────────────────────────────────────────
const QuickTextBand = () => (
  <section style={{ paddingTop: 80, paddingBottom: 80 }}>
    <div className="container">
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0,
        minHeight: 480,
        borderRadius: 6,
        overflow: "hidden"
      }}>
        {/* Left — image panel */}
        <div style={{
          position: "relative",
          minHeight: 480,
          background: "var(--surface)"
        }}>
          <Placeholder label="QUICK-TEXT / I ♥ MUM MUG" kind="mug" pool="mug" overlay="soft" />
          <span style={{
            position: "absolute",
            bottom: 20, left: 20,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
            zIndex: 2
          }}>Quick-text product</span>
        </div>

        {/* Right — content panel */}
        <div style={{
          background: "var(--surface)",
          padding: 64,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <div className="eyebrow">Type. Order. Done.</div>
          <h2 style={{
            fontSize: 40,
            lineHeight: "48px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            margin: "16px 0 0"
          }}>No designer needed.</h2>
          <p style={{
            fontSize: 16,
            lineHeight: "26px",
            color: "var(--text-65)",
            maxWidth: 360,
            margin: "16px 0 0"
          }}>
            Some of our products skip the designer entirely. Pick one, type your text, and we'll print it. Done in under a minute.
          </p>
          <div style={{ marginTop: 28 }}>
            <a href="Listing.html" className="btn btn-primary">
              Browse quick-text <IconArrowRight size={16} className="arrow" />
            </a>
          </div>

          {/* Sample products row */}
          <div style={{
            display: "flex", gap: 16,
            marginTop: 28
          }}>
            {[
              { name: "I ♥ Mug", kind: "mug" },
              { name: "Name tee", kind: "tee" },
              { name: "Slogan tote", kind: "tote" }
            ].map(s => (
              <a key={s.name} href="Product.html" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6
              }}>
                <span style={{
                  width: 56, height: 56,
                  background: "var(--surface-2)",
                  borderRadius: 4,
                  overflow: "hidden",
                  position: "relative"
                }}>
                  <Silhouette kind={s.kind} />
                </span>
                <span style={{ fontSize: 11, color: "var(--text-65)" }}>{s.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ──────────────────────────────────────────────────────────────────────────
// 4. CUSTOMER REVIEW WALL — staggered (Nexa-inspired) — between Gallery and Trust strip
// ──────────────────────────────────────────────────────────────────────────
const CUSTOMER_REVIEWS = [
  { rating: 5, body: "Genuinely impressed by the print quality and the speed.", name: "Nicole, hen-do" },
  { rating: 5, body: "Ordered 60 polos for our team — turned around in a week.", name: "Tom, build co." },
  { rating: 5, body: "Easy to design, fast to ship. Quality fabric, sharp print.", name: "Mia, brand owner" },
  { rating: 5, body: "Embroidery looks premium. Logo perfectly placed.", name: "Sarah, agency" },
  { rating: 4, body: "Print was great. Only minor: white tee runs a touch small.", name: "Jordan, runner" }
];

const CustomerReviewWall = () => {
  const ref = useReveal();
  return (
    <section style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div className="container">
        <div ref={ref} className="reveal" style={{ marginBottom: 56, maxWidth: 720 }}>
          <div className="eyebrow">Loved by thousands</div>
          <h2 className="h2" style={{ marginTop: 16 }}>What our customers say.</h2>
        </div>

        {(!ImagePool.customer || ImagePool.customer.length === 0) && <SupplyBlocker>Customer photos pending — drop into /images/customer-*.jpg</SupplyBlocker>}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 16,
          alignItems: "start"
        }}>
          {CUSTOMER_REVIEWS.map((r, i) => (
            <CustomerReviewCard key={i} review={r} stagger={i % 2 === 1} delayMs={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CustomerReviewCard = ({ review, stagger, delayMs }) => {
  const ref = useRefExtras(null);
  useEffectExtras(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => el.classList.add("in");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(reveal, delayMs);
          io.disconnect();
        }
      });
    }, { threshold: 0.2 });
    io.observe(el);
    const t = setTimeout(reveal, 800 + delayMs);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  return (
    <div
      ref={ref}
      className="reveal review-card"
      style={{
        background: "var(--surface)",
        borderRadius: 6,
        overflow: "hidden",
        transform: `translateY(${stagger ? 40 : 0}px)`,
        transition: "opacity 600ms ease-out, transform 600ms ease-out"
      }}>
      <div style={{
        aspectRatio: "1 / 1",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)"
      }}>
        <Placeholder label="CUSTOMER" kind="photo" pool="customer" overlay="soft" />
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: "inline-flex", gap: 2 }}>
          {[1, 2, 3, 4, 5].map(i => (
            <AcidStar key={i} size={11} />
          ))}
        </div>
        <p style={{
          fontSize: 13, lineHeight: 1.5,
          color: "var(--text)",
          margin: "8px 0 8px",
          fontWeight: 400
        }}>"{review.body}"</p>
        <div style={{ fontSize: 11, color: "var(--text-50)" }}>{review.name}</div>
      </div>
      <style>{`
        .review-card.reveal { opacity: 0; }
        .review-card.reveal.in { opacity: 1; }
      `}</style>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// 5. INSTAGRAM TAG BLOCK — before footer
// ──────────────────────────────────────────────────────────────────────────
const InstagramBlock = () => {
  const hasImages = ImagePool.customer && ImagePool.customer.length > 0;
  return (
    <section style={{ paddingTop: 64, paddingBottom: 32 }}>
      <div className="container">
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          marginBottom: 28,
          flexWrap: "wrap"
        }}>
          <span style={{ fontSize: 18, fontWeight: 500, color: "#fff" }}>
            See your prints on Instagram
          </span>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
            style={{
              color: "var(--accent)",
              fontSize: 16, fontWeight: 500,
              display: "inline-flex", alignItems: "center", gap: 6
            }}>
            @inkprinted <IconArrowRight size={14} />
          </a>
        </div>

        {!hasImages && <SupplyBlocker>Instagram tiles pending — drop into /images/customer-*.jpg</SupplyBlocker>}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 8
        }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <InstagramTile key={i} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const InstagramTile = ({ index }) => {
  const [hover, setHover] = useStateExtras(false);
  return (
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        aspectRatio: "1 / 1",
        background: "var(--surface)",
        borderRadius: 6,
        overflow: "hidden",
        position: "relative",
        display: "block"
      }}>
      <div style={{
        position: "absolute", inset: 0,
        transform: hover ? "scale(1.04)" : "scale(1)",
        transition: "transform 400ms ease-out"
      }}>
        <Placeholder label={`CUSTOMER-${index + 1}`} kind="photo" pool="customer" overlay="soft" />
      </div>
      <span style={{
        position: "absolute",
        top: 10, right: 10,
        width: 24, height: 24,
        display: "inline-grid", placeItems: "center",
        color: "var(--accent)",
        opacity: hover ? 1 : 0,
        transition: "opacity 200ms ease-out",
        zIndex: 2
      }}>
        <IconInstagram size={18} />
      </span>
    </a>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// 6. BRAND LOGO STRIP — built, hidden by default (Mark to supply logos)
// ──────────────────────────────────────────────────────────────────────────
const BrandLogoStrip = ({ visible = false }) => {
  if (!visible) return null;
  return (
    <section style={{ paddingTop: 64, paddingBottom: 64 }}>
      <div className="container" style={{ textAlign: "center" }}>
        <div className="eyebrow" style={{ marginBottom: 24 }}>Trusted by</div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 32,
          flexWrap: "wrap"
        }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} style={{
              height: 32,
              minWidth: 100,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 13,
              color: "rgba(255,255,255,0.40)",
              opacity: 1,
              transition: "color 200ms"
            }}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.80)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.40)"}>
              CLIENT {i + 1}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, {
  MarqueeStrip,
  BeforeAfterSlider,
  QuickTextBand,
  CustomerReviewWall,
  InstagramBlock,
  BrandLogoStrip,
  AcidStar
});
