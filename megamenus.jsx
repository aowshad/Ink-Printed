// Mega-menu panels — Clothing, Workwear, Gifts
// Shared building blocks
const MegaCol2 = ({ groups, linkHref = "Listing.html" }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
    {groups.map((g, i) => (
      <div key={i}>
        <div style={megaLabel}>{g.label}</div>
        <ul style={megaList}>
          {g.links.map(l => (
            <li key={l}>
              <a href={linkHref} style={megaLink} className="mm-link">{l}</a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const megaLabel = {
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--text-40)",
  fontWeight: 500,
  marginBottom: 16
};
const megaList = {
  listStyle: "none", padding: 0, margin: 0,
  display: "flex", flexDirection: "column", gap: 10
};
const megaLink = {
  fontSize: 14,
  color: "var(--text-65)",
  display: "inline-block",
  position: "relative",
  transition: "color 200ms ease-out"
};

// Featured product card
const FeaturedProductCard = ({ label = "Featured", name, price, kind, imageLabel }) => (
  <div style={{
    background: "var(--surface-2)",
    borderRadius: 4,
    padding: 16,
    display: "flex",
    flexDirection: "column"
  }}>
    <div style={{
      fontSize: 10,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--accent-line)",
      fontWeight: 500,
      marginBottom: 12
    }}>{label}</div>
    <div style={{
      height: 240,
      borderRadius: 4,
      overflow: "hidden",
      background: "var(--surface-2)",
      position: "relative"
    }}>
      <Placeholder label={imageLabel} kind={kind} />
    </div>
    <div style={{ fontSize: 16, fontWeight: 500, color: "var(--text)", marginTop: 16 }}>{name}</div>
    <div style={{ fontSize: 13, marginTop: 4 }}>
      <span style={{ color: "var(--text-50)" }}>From </span>
      <span style={{ color: "var(--accent-line)", fontWeight: 500 }}>{price}</span>
    </div>
    <a href="Product.html" className="btn btn-primary" style={{
      height: 40, width: "100%", justifyContent: "center",
      fontSize: 13, marginTop: 16
    }}>
      Customise <IconArrowRight size={14} className="arrow" />
    </a>
  </div>
);

// Utility CTA card (used by Workwear bulk order)
const UtilityCTACard = ({ label, heading, body, button, href = "Quote.html" }) => (
  <div style={{
    background: "var(--surface-2)",
    borderRadius: 4,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%"
  }}>
    <div>
      <div style={{
        fontSize: 10,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--accent-line)",
        fontWeight: 500
      }}>{label}</div>
      <div style={{
        fontSize: 16, fontWeight: 500, color: "var(--text)", marginTop: 8,
        letterSpacing: "-0.01em"
      }}>{heading}</div>
      <div style={{
        fontSize: 13, color: "var(--text-65)",
        marginTop: 12, lineHeight: 1.55
      }}>{body}</div>
    </div>
    <a href={href} className="btn btn-primary" style={{
      height: 40, width: "100%", justifyContent: "center",
      fontSize: 13, marginTop: 20
    }}>
      {button} <IconArrowRight size={14} className="arrow" />
    </a>
  </div>
);

// Mood pill
const MoodPill = ({ children, href = "Listing.html" }) => (
  <a href={href} className="mood-pill" style={{
    height: 28,
    padding: "0 12px",
    borderRadius: 14,
    background: "var(--surface-2)",
    color: "var(--text)",
    fontSize: 13,
    display: "inline-flex",
    alignItems: "center",
    transition: "background 200ms ease-out, color 200ms ease-out",
    whiteSpace: "nowrap"
  }}>{children}</a>
);

// Bottom utility row container
const UtilityRow = ({ left, right }) => (
  <div style={{
    marginTop: 32,
    paddingTop: 20,
    borderTop: "1px solid var(--border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24
  }}>
    {left}
    {right}
  </div>
);

// 01 — Clothing
const MM_Clothing = () => (
  <MegaPanel>
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1.3fr",
      gap: 24
    }}>
      <MegaCol2 groups={[{
        label: "T-shirts",
        links: ["Standard tee", "V-neck tee", "Long sleeve tee", "Heavyweight tee", "Oversized tee", "Cool tee", "Baseball tee", "Organic tee", "T-shirt dress"]
      }]} />
      <MegaCol2 groups={[{
        label: "Hoodies & Sweats",
        links: ["Standard hoodie", "Heavyweight hoodie", "Zip-up hoodie", "Two-tone hoodie", "Cropped hoodie", "Hoodie dress", "Organic hoodie", "Sweatshirt", "Zip-up sweatshirt"]
      }]} />
      <MegaCol2 groups={[
        { label: "Polos & Layers", links: ["Mens polo", "Ladies polo", "Soft shell jacket", "Soft shell gilet", "Zip fleece", "Varsity jacket"] },
        { label: "Vests & Crops", links: ["Mens vest", "Ladies vest", "Racer back", "Crop top", "Box crop"] }
      ]} />
      <MegaCol2 groups={[
        { label: "Kids & Baby", links: ["Kids t-shirt", "Kids cool tee", "Kids hoodie", "Kids sweatshirt", "Kids polo", "Kids vest", "Kids varsity", "Kids pjs", "Baby grow", "Baby bib"] },
        { label: "Headwear & More", links: ["Beanie", "Baseball cap", "Pyjamas", "Socks"] }
      ]} />
      <FeaturedProductCard
        name="Heavyweight Hoodie"
        price="£24.99"
        kind="hoodie"
        imageLabel="FEATURED / HOODIE HERO"
      />
    </div>

    <UtilityRow
      left={
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, color: "var(--text-50)" }}>Shop by mood:</span>
          <div style={{ display: "flex", gap: 8 }}>
            <MoodPill>New in</MoodPill>
            <MoodPill>Bestsellers</MoodPill>
            <MoodPill>Organic</MoodPill>
            <MoodPill>Quick-text products</MoodPill>
          </div>
        </div>
      }
      right={
        <a href="Listing.html" style={viewAllLink}>
          View all clothing <IconArrowRight size={13} />
        </a>
      }
    />
  </MegaPanel>
);

// 02 — Workwear
const MM_Workwear = () => (
  <MegaPanel>
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1.3fr",
      gap: 24
    }}>
      <MegaCol2 groups={[{
        label: "Hi-vis & Safety",
        links: ["Hi-vis vest", "Dog hi-vis vest"]
      }]} />
      <MegaCol2 groups={[{
        label: "Uniform Tops",
        links: ["Mens polo", "Ladies polo", "Kids polo", "Tunic", "Apron"]
      }]} />
      <MegaCol2 groups={[{
        label: "Outerwear",
        links: ["Soft shell jacket", "Soft shell gilet", "Zip fleece"]
      }]} />
      <UtilityCTACard
        label="Team Order?"
        heading="Bulk pricing & setup"
        body="Ordering 10+ uniforms? Get a quote, branded mock-ups, and a dedicated contact."
        button="Request a quote"
      />
    </div>

    <UtilityRow
      left={
        <div style={{ fontSize: 13, color: "var(--text-50)" }}>
          Need same-day for a uniform emergency? Call{" "}
          <a href="tel:08000000000" style={{ color: "var(--accent-line)", fontWeight: 500 }}>
            0800 000 0000
          </a>
        </div>
      }
      right={
        <a href="Listing.html" style={viewAllLink}>
          View all workwear <IconArrowRight size={13} />
        </a>
      }
    />
  </MegaPanel>
);

// 03 — Gifts
const MM_Gifts = () => (
  <MegaPanel>
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1.3fr",
      gap: 24
    }}>
      <MegaCol2 groups={[{
        label: "Mugs",
        links: ["Standard mug", "Two-colour mug", "Heat change mug", "Two-tone rim mug"]
      }]} />
      <MegaCol2 groups={[{
        label: "Home & Other",
        links: ["Cushion", "Pillow case", "Canvas shopper", "Large canvas sack", "Tattoos"]
      }]} />
      <div style={{
        background: "var(--surface-2)",
        borderRadius: 4,
        padding: 20,
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{
          fontSize: 10,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--accent-line)",
          fontWeight: 500
        }}>Quick Gift</div>
        <div style={{
          height: 120,
          borderRadius: 4,
          overflow: "hidden",
          marginTop: 12,
          position: "relative",
          background: "var(--surface-2)"
        }}>
          <Placeholder label="I ♥ ___ MUG" kind="mug" />
        </div>
        <div style={{ fontSize: 16, fontWeight: 500, color: "var(--text)", marginTop: 16, letterSpacing: "-0.01em" }}>
          Just add your text
        </div>
        <div style={{
          fontSize: 13, color: "var(--text-65)",
          marginTop: 8, lineHeight: 1.55
        }}>
          No designer needed. Type your message and order. Personalised gifts in under a minute.
        </div>
        <a href="Listing.html" style={{
          color: "var(--accent-line)", fontSize: 13, fontWeight: 500, marginTop: 16,
          display: "inline-flex", alignItems: "center", gap: 6
        }}>
          Shop quick gifts <IconArrowRight size={13} />
        </a>
      </div>
    </div>

    <UtilityRow
      left={
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, color: "var(--text-50)" }}>Shop by occasion:</span>
          <div style={{ display: "flex", gap: 8 }}>
            <MoodPill>Birthday</MoodPill>
            <MoodPill>Wedding</MoodPill>
            <MoodPill>New baby</MoodPill>
          </div>
        </div>
      }
      right={
        <a href="Listing.html" style={viewAllLink}>
          View all gifts <IconArrowRight size={13} />
        </a>
      }
    />
  </MegaPanel>
);

const viewAllLink = {
  color: "var(--accent-line)",
  fontSize: 13,
  fontWeight: 500,
  display: "inline-flex",
  alignItems: "center",
  gap: 6
};

// Shared shell — supplies link hover style + panel padding
const MegaPanel = ({ children }) => (
  <div style={{
    paddingTop: 48,
    paddingBottom: 32,
    background: "var(--surface)"
  }}>
    <div className="container">
      {children}
    </div>
    <style>{`
      .mm-link:hover { color: var(--text); }
      .mm-link::after {
        content: "";
        position: absolute;
        left: 0; right: 0;
        bottom: -4px;
        height: 1px;
        background: var(--accent-line);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 200ms ease-out;
      }
      .mm-link:hover::after { transform: scaleX(1); }
      .mood-pill:hover {
        background: var(--accent);
        color: var(--accent-ink);
      }
    `}</style>
  </div>
);

Object.assign(window, {
  MM_Clothing, MM_Workwear, MM_Gifts,
  MegaCol2, FeaturedProductCard, UtilityCTACard, MoodPill, MegaPanel
});
