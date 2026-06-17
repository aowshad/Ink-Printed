// Homepage promo carousel — 3 slides, two layouts:
//   'composed' — the baked Figma artwork (paper + models, via the --banner-image CSS
//                token so it's theme-aware) with a centered live text overlay.
//   'split'    — two columns: a flat var(--banner-bg) text panel + an apparel photo
//                (object-cover) pulled from ImagePool.banner. No scrim over the photo.
//
// Slide-2/3 images come from ImagePool via pickImage('banner', slide.id) (through
// <Placeholder>), so a dead URL falls back to the Silhouette automatically.
//
// Carousel: real rotation, dots control/reflect activeIndex (elongated pill = active),
// ~6s auto-advance that pauses on hover/focus and is disabled under prefers-reduced-motion,
// wrap-around, crossfade, and Left/Right arrow keys when the region has focus.

// Alias hooks — these scripts share one global scope (top.jsx already destructures React).
const { useState: usePromoState, useEffect: usePromoEffect } = React;

const PROMO_SLIDES = [
  {
    id: "wear-your-creativity",
    layout: "composed",
    image: null, // composed renders the baked artwork via the --banner-image CSS token
    heading: "Wear Your Creativity",
    sub: "Design custom t-shirts, hoodies, and apparel that reflect your unique style.",
    ctaLabel: "Shop Collection",
    ctaHref: "Listing.html"
  },
  {
    id: "kit-out-the-whole-team",       // pickImage('banner', …) → ImagePool.banner[1]
    layout: "split",
    heading: "Kit Out the Whole Team",
    sub: "Bulk pricing on custom tees, hoodies & workwear — screen print, DTG and embroidery from 10 units.",
    ctaLabel: "Get a Quote",
    ctaHref: "Quote.html"
  },
  {
    id: "premium-blanks-printready",    // pickImage('banner', …) → ImagePool.banner[2]
    layout: "split",
    heading: "Premium Blanks, Print-Ready",
    sub: "Soft, heavyweight cotton built for custom printing and built to last.",
    ctaLabel: "Browse T-Shirts",
    ctaHref: "Listing.html"
  }
];

// One text block, shared by both layouts so type scale + CTA stay identical.
const PromoSlideText = ({ slide, isActive, align }) => (
  <div className={`promo-heading promo-heading--${align}`}>
    <h2 className="promo-title">{slide.heading}</h2>
    <p className="promo-sub">{slide.sub}</p>
    <a href={slide.ctaHref} className="btn btn-primary promo-cta" tabIndex={isActive ? 0 : -1}>
      {slide.ctaLabel} <IconArrowRight size={16} className="arrow" />
    </a>
  </div>
);

const PromoCarousel = () => {
  const [active, setActive] = usePromoState(0);
  const [paused, setPaused] = usePromoState(false);
  const count = PROMO_SLIDES.length;
  const go = (i) => setActive(((i % count) + count) % count);

  // Auto-advance ~6s. Skipped when paused (hover/focus), when <2 slides, or when the
  // user prefers reduced motion.
  usePromoEffect(() => {
    if (count < 2 || paused) return;
    const reduce = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setActive(a => (a + 1) % count), 6000);
    return () => clearInterval(t);
  }, [paused, active, count]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
  };

  return (
    <section
      className="promo-band"
      role="region"
      aria-roledescription="carousel"
      aria-label="Promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      <div className="promo-track" aria-live="polite">
        {PROMO_SLIDES.map((slide, i) => {
          const isActive = i === active;
          return (
            <div
              key={slide.id}
              className={`promo-slide promo-slide--${slide.layout}${isActive ? " is-active" : ""}`}
              aria-hidden={!isActive}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
            >
              {slide.layout === "composed" ? (
                <div className="container promo-content">
                  <PromoSlideText slide={slide} isActive={isActive} align="center" />
                </div>
              ) : (
                <div className="promo-split">
                  <div className="promo-split-text">
                    <PromoSlideText slide={slide} isActive={isActive} align="left" />
                  </div>
                  <div className="promo-split-img">
                    <Placeholder pool="banner" kind="tee" label={slide.id} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination dots — vertical, left, over the neutral panel edge. Active = pill. */}
      <div className="promo-dots" role="tablist" aria-label="Choose promotion">
        {PROMO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className="promo-dot"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
            onClick={() => go(i)}
          />
        ))}
      </div>

      <style>{`
        .promo-band {
          position: relative;
          width: 100%;
          aspect-ratio: 1920 / 651;
          min-height: 340px;
          max-height: 651px;
          background: var(--banner-bg);
          border-top: 1px solid var(--border);
          // border-bottom: 1px solid var(--border);
          overflow: hidden;
        }
        .promo-track { position: absolute; inset: 0; }

        /* Slides stack for crossfade; only the active one is interactive. */
        .promo-slide {
          position: absolute; inset: 0;
          opacity: 0; pointer-events: none;
          transition: opacity 500ms ease-out;
        }
        .promo-slide.is-active { opacity: 1; pointer-events: auto; }

        .promo-slide--composed {
          background-image: var(--banner-image);   /* none in dark theme */
          background-size: cover; background-position: center; background-repeat: no-repeat;
          display: flex; align-items: center;
        }
        .promo-content { display: flex; justify-content: center; width: 100%; }

        .promo-split { display: grid; grid-template-columns: 1fr 1fr; height: 100%; }
        .promo-split-text { background: var(--banner-bg); display: flex; align-items: center; }
        .promo-split-img { position: relative; overflow: hidden; }

        .promo-heading {
          position: relative;
          display: flex; flex-direction: column; gap: 24px;
          max-width: 560px;
        }
        .promo-heading--center { align-items: center; text-align: center; margin: 0 auto; max-width: 683px; }
        .promo-heading--left {
          align-items: flex-start; text-align: left;
          padding: 0 clamp(32px, 4vw, 56px);
          padding-left: clamp(72px, 8vw, 112px);   /* clears the left dots */
        }
        .promo-title {
          margin: 0; font-weight: 700; letter-spacing: -0.02em; color: var(--text);
          font-size: clamp(36px, 5vw, 64px); line-height: 1.08;
        }
        .promo-sub {
          margin: 0; color: var(--text-muted);
          font-size: clamp(16px, 1.6vw, 20px); line-height: 28px; max-width: 520px;
        }
        .promo-cta { height: 48px; }

        .promo-dots {
          position: absolute; left: 28px; top: 50%; transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 8px; z-index: 3;
        }
        .promo-dot {
          width: 8px; height: 8px; border-radius: 31px;
          background: var(--border); border: none; padding: 0; cursor: pointer;
          transition: height 200ms ease-out, width 200ms ease-out, background 200ms ease-out;
        }
        .promo-dot[aria-current="true"] { background: var(--accent); height: 28px; }
        .promo-dot:focus-visible { outline: 2px solid var(--accent-line); outline-offset: 2px; }

        /* Tablet: flat low-opacity paper wash behind the composed (over-image) text only. */
        @media (max-width: 1024px) and (min-width: 640px) {
          .promo-slide--composed .promo-heading--center::before {
            content: ""; position: absolute; inset: -24px -40px;
            background: var(--banner-bg); opacity: 0.72; border-radius: 8px; z-index: -1;
          }
        }

        /* Mobile: no cover-crop of the wide art; stack split slides; one slide in flow
           so the band gets real height; dots go horizontal below. No horizontal scroll. */
        @media (max-width: 639px) {
          .promo-band { aspect-ratio: auto; min-height: 0; max-height: none; }
          .promo-slide {
            position: static; display: none;
            opacity: 1; pointer-events: auto; transition: none;
          }
          .promo-slide.is-active { display: block; }
          .promo-slide--composed { background-image: none !important; padding: 48px 0; }
          .promo-split { grid-template-columns: 1fr; }
          .promo-split-text { padding: 48px 0; }
          .promo-split-img { aspect-ratio: 16 / 10; }
          .promo-heading--left { padding: 0 16px; }
          .promo-dots {
            position: static; transform: none; left: auto;
            flex-direction: row; justify-content: center; margin: 28px 0 0;
          }
          .promo-dot[aria-current="true"] { height: 8px; width: 28px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .promo-slide, .promo-dot { transition: none; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { PromoCarousel, PROMO_SLIDES });
