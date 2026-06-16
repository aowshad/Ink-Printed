// Homepage promo banner — the ARTWORK is one flat baked image (paper + models +
// chevron, exported from Figma to uploads/banner-bg.jpg). Only the heading, CTA and
// pagination dots are coded HTML overlaid on top, so the copy stays live/translatable.
//
// Theme behaviour is driven purely by CSS tokens (--banner-bg / --banner-image in
// theme.css) keyed off html[data-theme] — light shows the paper artwork, dark shows a
// dark surface band. No per-component theme JS.
//
// Carousel shell: PROMO_SLIDES drives both the rendered slide and the dots. Push more
// slides to the array later and dots + selection pick them up automatically. There is
// only one slide today, so there is no auto-advance (nothing animates on its own —
// prefers-reduced-motion safe by construction).

// Alias hooks — these scripts share one global scope, so re-destructuring React
// top-level (as top.jsx already does) would collide.
const { useState: usePromoState } = React;

const PROMO_SLIDES = [
  {
    id: "wear-your-creativity",
    heading: "Wear Your Creativity",
    subcopy: "Design custom t-shirts, hoodies, and apparel that reflect your unique style.",
    cta: { label: "Shop Collection", href: "Listing.html" }
  }
  // To add slides: push { id, heading, subcopy, cta:{label,href} } here.
];

const PromoCarousel = () => {
  const [active, setActive] = usePromoState(0);
  const slide = PROMO_SLIDES[active] || PROMO_SLIDES[0];

  return (
    <section className="promo-band" role="region" aria-label="Promotions">
      <div className="promo-overlay">
        <div className="container promo-content">
          <div className="promo-heading">
            <h2 className="promo-title">{slide.heading}</h2>
            <p className="promo-sub">{slide.subcopy}</p>
            <a href={slide.cta.href} className="btn btn-primary promo-cta">
              {slide.cta.label} <IconArrowRight size={16} className="arrow" />
            </a>
          </div>
        </div>

        <div className="promo-dots" role="tablist" aria-label="Choose promotion">
          {PROMO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className="promo-dot"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .promo-band {
          position: relative;
          width: 100%;
          aspect-ratio: 1920 / 651;      /* matches the baked artwork */
          min-height: 320px;
          max-height: 651px;
          background-color: var(--banner-bg);
          background-image: var(--banner-image);   /* none in dark theme */
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }
        .promo-overlay { position: absolute; inset: 0; display: flex; align-items: center; }
        .promo-content { display: flex; justify-content: center; width: 100%; }
        .promo-heading {
          display: flex; flex-direction: column; align-items: center;
          gap: 24px; text-align: center; max-width: 683px; position: relative;
        }
        .promo-title {
          margin: 0; font-weight: 700; letter-spacing: -0.02em;
          color: var(--text);
          font-size: clamp(36px, 5vw, 64px);
          line-height: 1.08;
        }
        .promo-sub {
          margin: 0; color: var(--text-muted);
          font-size: clamp(16px, 1.6vw, 20px); line-height: 28px;
          max-width: 520px;
        }
        .promo-cta { height: 48px; }

        /* Pagination dots — vertical group on the left (matches Figma). Active dot
           elongates into a pill. Tokened: accent active / hairline border inactive. */
        .promo-dots {
          position: absolute; left: var(--gutter); top: 50%;
          transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 8px; z-index: 2;
        }
        .promo-dot {
          width: 8px; height: 8px; border-radius: 31px;
          background: var(--border); border: none; padding: 0; cursor: pointer;
          transition: height 200ms ease-out, width 200ms ease-out, background 200ms ease-out;
        }
        .promo-dot[aria-current="true"] { background: var(--accent); height: 28px; }
        .promo-dot:focus-visible { outline: 2px solid var(--accent-line); outline-offset: 2px; }

        /* Tablet: a model can edge toward centre on the cover-crop — drop a flat,
           low-opacity paper wash behind the text zone (no gradient, no shadow). */
        @media (max-width: 1024px) and (min-width: 640px) {
          .promo-heading::before {
            content: ""; position: absolute; inset: -24px -40px;
            background: var(--banner-bg); opacity: 0.72; border-radius: 8px; z-index: -1;
          }
        }

        /* Mobile: never cover-crop the wide artwork (a model would slide under the
           headline). Drop the image, render on the plain paper/dark band, dots go
           horizontal below the CTA. No horizontal scroll. */
        @media (max-width: 639px) {
          .promo-band {
            aspect-ratio: auto; min-height: 0; max-height: none;
            background-image: none !important;
            padding: 48px 0;
          }
          .promo-overlay { position: static; }
          .promo-dots {
            position: static; transform: none; left: auto;
            flex-direction: row; justify-content: center; margin-top: 28px;
          }
          .promo-dot[aria-current="true"] { height: 8px; width: 28px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .promo-dot { transition: none; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { PromoCarousel, PROMO_SLIDES });
