// Quote intake — 4-step guided form + success state

const { useState, useMemo } = React;

// Extra icons (only declare ones not already in icons.jsx)
const IconUploadCloud = (p) => (<Icon {...p}><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /><path d="M7 10l5-5 5 5" /><path d="M12 5v12" /></Icon>);
const IconUsers = (p) => (<Icon {...p}><circle cx="9" cy="8" r="3.5" /><path d="M3 20c.8-3 3.3-4.5 6-4.5s5.2 1.5 6 4.5" /><circle cx="17" cy="9" r="2.5" /><path d="M15.5 20c.6-2.3 2.3-3.5 4-3.5" /></Icon>);
const IconCake = (p) => (<Icon {...p}><path d="M4 21h16" /><path d="M5 13h14v8H5z" /><path d="M5 13c0-2 2-3 7-3s7 1 7 3" /><path d="M12 4v6" /><path d="M9 4a3 3 0 1 0 6 0" /></Icon>);
const IconTrophy = (p) => (<Icon {...p}><path d="M6 4h12v6a6 6 0 0 1-12 0V4Z" /><path d="M6 5H3v3a3 3 0 0 0 3 3" /><path d="M18 5h3v3a3 3 0 0 1-3 3" /><path d="M10 17h4l-1 4h-2l-1-4Z" /></Icon>);
const IconStore = (p) => (<Icon {...p}><path d="M3 9h18l-1.5 11H4.5L3 9Z" /><path d="M3 9 5 4h14l2 5" /><path d="M8 9v3a4 4 0 0 0 8 0V9" /></Icon>);
const IconLight = (p) => (<Icon {...p}><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 3a6 6 0 0 0-4 10c1 1 1.5 2 1.5 3h5c0-1 .5-2 1.5-3a6 6 0 0 0-4-10Z" /></Icon>);
const IconHeartHand = (p) => (<Icon {...p}><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" /></Icon>);
const IconMore = (p) => (<Icon {...p}><circle cx="6" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="18" cy="12" r="1.5" /></Icon>);
const IconShirt = (p) => (<Icon {...p}><path d="M8 4 4 7l2 4 2-1v10h8V10l2 1 2-4-4-3-2 2h-4l-2-2Z" /></Icon>);
const IconHoodie = (p) => (<Icon {...p}><path d="M8 4 5 7l2 4v10h10V11l2-4-3-3-2 2c-1-.5-3-.5-4 0L8 4Z" /><path d="M10 4c.7 1.5 3.3 1.5 4 0" /></Icon>);
const IconJacket2 = (p) => (<Icon {...p}><path d="M7 4 4 7v14h16V7l-3-3-3 3h-4L7 4Z" /><path d="M11 7v14" /></Icon>);
const IconVest = (p) => (<Icon {...p}><path d="M7 5 5 7v14h14V7l-2-2-2 2h-6L7 5Z" /></Icon>);
const IconMug2 = (p) => (<Icon {...p}><rect x="4" y="8" width="11" height="12" rx="2" /><path d="M15 11h2a3 3 0 0 1 0 6h-2" /></Icon>);
const IconCap2 = (p) => (<Icon {...p}><path d="M3 14c0-4 4-7 9-7s9 3 9 7v1h-6a2 2 0 0 1-2-2c0-2-1-3-3-3s-3 1-3 3" /></Icon>);
const IconBag2 = (p) => (<Icon {...p}><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></Icon>);
const IconPhone = (p) => (<Icon {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></Icon>);

// ── Hero
const QuoteHero = () => (
  <section style={{
    background: "var(--bg)",
    padding: "40px 0"
  }}>
    <div className="container" style={{
      display: "grid",
      gridTemplateColumns: "1.5fr 1fr",
      gap: 32,
      alignItems: "center"
    }}>
      <div>
        <div className="label-up" style={{ color: "var(--accent)" }}>Bulk orders · Custom jobs</div>
        <h1 style={{
          fontSize: 44, lineHeight: 1.1, fontWeight: 500,
          letterSpacing: "-0.02em",
          margin: "12px 0 0"
        }}>
          Tell us what you need.<br/>
          We'll come back in <span style={{ color: "var(--accent)" }}>24h</span>.
        </h1>
        <p style={{
          fontSize: 14, lineHeight: 1.55,
          color: "rgba(255,255,255,0.70)",
          marginTop: 14, marginBottom: 0,
          maxWidth: 480
        }}>
          For team kit, large orders, unusual products or anything outside our standard range. Bulk discounts kick in at 10 units.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12
      }}>
        <StatTile value="24h" label="Quote turnaround" />
        <StatTile value="10+" label="Min order for bulk" />
        <StatTile value="10+" label="Years printing" />
        <StatTile value="UK" label="Based & printed" />
      </div>
    </div>
  </section>
);

const StatTile = ({ value, label }) => (
  <div style={{
    background: "var(--surface)",
    borderRadius: 4,
    padding: 16
  }}>
    <div style={{
      fontSize: 24, fontWeight: 500,
      color: "var(--accent)",
      letterSpacing: "-0.02em",
      lineHeight: 1
    }}>{value}</div>
    <div className="label-up" style={{
      color: "rgba(255,255,255,0.70)",
      marginTop: 6,
      fontSize: 10
    }}>{label}</div>
  </div>
);

// ── Step indicator
const STEPS = ["Project", "Product", "Artwork", "Contact"];

const StepIndicator = ({ step }) => (
  <div>
    <div style={{ display: "flex", gap: 4 }}>
      {STEPS.map((_, i) => (
        <div key={i} style={{
          flex: 1,
          height: 3,
          borderRadius: 2,
          background: i <= step ? "var(--accent)" : "var(--surface-2)",
          transition: "background 240ms ease-out"
        }} />
      ))}
    </div>
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${STEPS.length}, 1fr)`,
      gap: 4,
      marginTop: 12
    }}>
      {STEPS.map((label, i) => (
        <div key={label} style={{
          fontSize: 9,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontWeight: 500,
          color: i <= step ? "var(--accent)" : "rgba(255,255,255,0.30)"
        }}>
          {i + 1} {label}
        </div>
      ))}
    </div>
  </div>
);

// ── Reusable form pieces

// Tile select (single or multi)
const TileGrid = ({ options, value, setValue, multi, cols = 3 }) => {
  const isSelected = (key) => multi ? (value || []).includes(key) : value === key;
  const toggle = (key) => {
    if (multi) {
      const v = value || [];
      setValue(v.includes(key) ? v.filter(x => x !== key) : [...v, key]);
    } else {
      setValue(key);
    }
  };
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 8
    }}>
      {options.map(opt => {
        const selected = isSelected(opt.key);
        const dashed = opt.dashed;
        return (
          <button key={opt.key} type="button" onClick={() => toggle(opt.key)}
            style={{
              padding: 16,
              background: "var(--surface-2)",
              borderRadius: 4,
              border: dashed
                ? "1px dashed " + (selected ? "var(--accent)" : "rgba(255,255,255,0.25)")
                : "1px solid " + (selected ? "var(--accent)" : "transparent"),
              color: selected ? "#fff" : "rgba(255,255,255,0.85)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 10,
              textAlign: "left",
              transition: "background 200ms, border-color 200ms, color 200ms",
              cursor: "pointer"
            }}
            onMouseEnter={e => { if (!selected) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
            onMouseLeave={e => { if (!selected) e.currentTarget.style.background = "var(--surface-2)"; }}>
            {opt.icon && <opt.icon size={20} strokeWidth={1.5} />}
            <span style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// Pill row (single or multi)
const PillRow = ({ options, value, setValue, multi }) => {
  const isSelected = (key) => multi ? (value || []).includes(key) : value === key;
  const toggle = (key) => {
    if (multi) {
      const v = value || [];
      setValue(v.includes(key) ? v.filter(x => x !== key) : [...v, key]);
    } else {
      setValue(key);
    }
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map(opt => {
        const selected = isSelected(opt.key);
        return (
          <button key={opt.key} type="button" onClick={() => toggle(opt.key)}
            style={{
              height: 36,
              padding: "0 14px",
              borderRadius: 18,
              background: selected ? "#fff" : "var(--surface-2)",
              color: selected ? "#0A0A0A" : "rgba(255,255,255,0.85)",
              fontSize: 13,
              fontWeight: 500,
              transition: "background 200ms, color 200ms",
              whiteSpace: "nowrap"
            }}>{opt.label}</button>
        );
      })}
    </div>
  );
};

// Yes/No toggle
const YesNoToggle = ({ value, setValue }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    background: "var(--surface-2)",
    borderRadius: 4,
    padding: 4,
    gap: 4,
    width: 200
  }}>
    {[["yes", "Yes"], ["no", "No"]].map(([k, l]) => (
      <button key={k} type="button" onClick={() => setValue(k)}
        style={{
          height: 32,
          borderRadius: 3,
          background: value === k ? "#fff" : "transparent",
          color: value === k ? "#0A0A0A" : "rgba(255,255,255,0.65)",
          fontSize: 13, fontWeight: 500
        }}>{l}</button>
    ))}
  </div>
);

// Checkbox
const Checkbox = ({ checked, onChange, children }) => (
  <label style={{
    display: "flex", alignItems: "flex-start",
    gap: 10, cursor: "pointer",
    fontSize: 12,
    color: "rgba(255,255,255,0.75)",
    lineHeight: 1.5
  }}>
    <span style={{
      width: 16, height: 16,
      borderRadius: 3,
      border: checked ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.30)",
      background: checked ? "var(--accent)" : "transparent",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
      marginTop: 1,
      transition: "background 200ms, border-color 200ms",
      color: "#0A0A0A"
    }}>
      {checked && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5l2 2 4-4" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
    <input type="checkbox" checked={checked} onChange={onChange}
           style={{ position: "absolute", opacity: 0, pointerEvents: "none" }} />
    <span>{children}</span>
  </label>
);

// Field group label
const FieldLabel = ({ children, optional }) => (
  <div className="label-up" style={{
    color: "rgba(255,255,255,0.60)",
    marginBottom: 8
  }}>
    {children}
    {optional && <span style={{ color: "rgba(255,255,255,0.30)", fontWeight: 400, marginLeft: 6, textTransform: "none", letterSpacing: 0 }}>(optional)</span>}
  </div>
);

// ── Step content components

const Step1 = ({ data, setField }) => {
  const projectOptions = [
    { key: "team",       label: "Team / company kit",       icon: IconUsers },
    { key: "event",      label: "Event (stag/hen/wedding)", icon: IconCake },
    { key: "sports",     label: "Sports team / club",       icon: IconTrophy },
    { key: "retail",     label: "Retail / brand",           icon: IconStore },
    { key: "personal",   label: "Personal project",         icon: IconLight },
    { key: "charity",    label: "Charity / fundraiser",     icon: IconHeartHand },
    { key: "other",      label: "Something else",           icon: IconMore }
  ];
  const deadlineOptions = [
    { key: "urgent",   label: "Within 2 weeks (urgent)" },
    { key: "2-4",      label: "2–4 weeks" },
    { key: "flexible", label: "4+ weeks / flexible" }
  ];

  return (
    <>
      <StepHeading title="Tell us about the project." sub="Two quick questions and we'll know who we're quoting for." />

      <FormGroup>
        <FieldLabel>What's this for?</FieldLabel>
        <TileGrid options={projectOptions} value={data.projectType} setValue={(v) => setField("projectType", v)} cols={4} />
      </FormGroup>

      <FormGroup>
        <FieldLabel>Project deadline?</FieldLabel>
        <PillRow options={deadlineOptions} value={data.deadline} setValue={(v) => setField("deadline", v)} />
        {data.deadline && (
          <div style={{ marginTop: 12 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginRight: 10 }}>
              Need it by a specific date?
            </span>
            <input type="date" className="fld"
                   value={data.deadlineDate || ""}
                   onChange={e => setField("deadlineDate", e.target.value)}
                   style={{ width: 180, height: 36, display: "inline-block", padding: "0 10px", colorScheme: "dark" }} />
          </div>
        )}
      </FormGroup>

      <FormGroup>
        <FieldLabel optional>Quick description</FieldLabel>
        <textarea className="fld"
          placeholder="Anything we should know upfront?"
          value={data.description || ""}
          onChange={e => setField("description", e.target.value)} />
      </FormGroup>
    </>
  );
};

const Step2 = ({ data, setField }) => {
  const productOptions = [
    { key: "tee",       label: "T-shirts",          icon: IconShirt },
    { key: "hoodie",    label: "Hoodies & sweats",  icon: IconHoodie },
    { key: "polo",      label: "Polos",             icon: IconShirt },
    { key: "outerwear", label: "Outerwear",         icon: IconJacket2 },
    { key: "workwear",  label: "Workwear / hi-vis", icon: IconVest },
    { key: "gifts",     label: "Mugs & gifts",      icon: IconMug2 },
    { key: "headwear",  label: "Caps & headwear",   icon: IconCap2 },
    { key: "bags",      label: "Bags & totes",      icon: IconBag2 },
    { key: "other",     label: "Something else",    icon: IconMore, dashed: true }
  ];
  const quantityOptions = [
    { key: "10-25",   label: "10–25" },
    { key: "25-50",   label: "25–50" },
    { key: "50-100",  label: "50–100" },
    { key: "100-250", label: "100–250" },
    { key: "250+",    label: "250+" }
  ];
  const decoOptions = [
    { key: "DTG",        label: "DTG print" },
    { key: "Embroidery", label: "Embroidery" },
    { key: "Vinyl",      label: "Vinyl" },
    { key: "Sublimation",label: "Sublimation" },
    { key: "All-over",   label: "All-over print" },
    { key: "Not sure",   label: "Not sure yet" }
  ];

  const showSameDesign = ["100-250", "250+"].includes(data.quantity);

  return (
    <>
      <StepHeading title="What are we making?" sub="Pick everything that applies. We'll quote each separately if needed." />

      <FormGroup>
        <FieldLabel>Product category (pick any)</FieldLabel>
        <TileGrid options={productOptions} value={data.products} setValue={(v) => setField("products", v)} multi cols={3} />
      </FormGroup>

      <FormGroup>
        <FieldLabel>Approximate quantity</FieldLabel>
        <PillRow options={quantityOptions} value={data.quantity} setValue={(v) => setField("quantity", v)} />
      </FormGroup>

      <FormGroup>
        <FieldLabel>Decoration method (pick any)</FieldLabel>
        <PillRow options={decoOptions} value={data.deco} setValue={(v) => setField("deco", v)} multi />
      </FormGroup>

      {showSameDesign && (
        <FormGroup>
          <FieldLabel>Will all items have the same design?</FieldLabel>
          <YesNoToggle value={data.sameDesign} setValue={(v) => setField("sameDesign", v)} />
        </FormGroup>
      )}
    </>
  );
};

const Step3 = ({ data, setField }) => {
  const readinessOptions = [
    { key: "ready", label: "Yes, ready to upload" },
    { key: "rough", label: "I have a rough idea" },
    { key: "help",  label: "I need design help" }
  ];

  return (
    <>
      <StepHeading title="Got artwork ready?" sub="If not, no problem — we'll work with what you've got." />

      <FormGroup>
        <PillRow options={readinessOptions} value={data.artwork} setValue={(v) => setField("artwork", v)} />
      </FormGroup>

      {data.artwork === "ready" && (
        <>
          <FormGroup>
            <FieldLabel>Upload your file(s)</FieldLabel>
            <FileUpload files={data.files || []} setFiles={(v) => setField("files", v)} />
          </FormGroup>
          <FormGroup>
            <FieldLabel optional>Notes about placement, colours, sizes</FieldLabel>
            <textarea className="fld"
              placeholder="e.g. Left chest, 8 cm wide, in white thread"
              value={data.artworkNotes || ""}
              onChange={e => setField("artworkNotes", e.target.value)} />
          </FormGroup>
        </>
      )}

      {data.artwork === "rough" && (
        <FormGroup>
          <FieldLabel>Describe your design or share a reference</FieldLabel>
          <textarea className="fld"
            placeholder="Describe what you'd like, link an image, or paste a social post URL"
            value={data.artworkRough || ""}
            onChange={e => setField("artworkRough", e.target.value)} />
        </FormGroup>
      )}

      {data.artwork === "help" && (
        <>
          <FormGroup>
            <FieldLabel>Tell us what you're going for</FieldLabel>
            <textarea className="fld"
              placeholder="The brief, the vibe, anything that helps us picture it"
              value={data.artworkBrief || ""}
              onChange={e => setField("artworkBrief", e.target.value)} />
          </FormGroup>
          <div style={{
            background: "rgba(236,90,180,0.06)",
            border: "1px solid rgba(236,90,180,0.30)",
            borderRadius: 4,
            padding: 12,
            fontSize: 12,
            color: "rgba(255,255,255,0.80)",
            lineHeight: 1.55
          }}>
            Our team can help with simple design work — typically <span style={{ color: "var(--accent)", fontWeight: 500 }}>£25–75</span> depending on complexity. We'll quote this with your order.
          </div>
        </>
      )}
    </>
  );
};

const Step4 = ({ data, setField }) => {
  const reachOptions = [
    { key: "email", label: "Email (most common)" },
    { key: "phone", label: "Phone call" },
    { key: "either", label: "Either works" }
  ];
  const callTimeOptions = [
    { key: "morning",   label: "Morning (9–12)" },
    { key: "afternoon", label: "Afternoon (12–5)" },
    { key: "evening",   label: "Evening (5–7)" },
    { key: "anytime",   label: "Anytime" }
  ];

  const showCompany = ["team", "retail", "sports", "charity"].includes(data.projectType);
  const wantsPhone = (data.reach || []).includes("phone") || (data.reach || []).includes("either");

  return (
    <>
      <StepHeading title="Where should we send the quote?" sub="We never share your details. GDPR-friendly." />

      <FormGroup>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <FieldLabel>First name</FieldLabel>
            <input className="fld" value={data.first || ""}
              onChange={e => setField("first", e.target.value)} placeholder="Jane" />
          </div>
          <div>
            <FieldLabel>Last name</FieldLabel>
            <input className="fld" value={data.last || ""}
              onChange={e => setField("last", e.target.value)} placeholder="Smith" />
          </div>
        </div>
      </FormGroup>

      <FormGroup>
        <FieldLabel>Email</FieldLabel>
        <input className="fld" type="email" value={data.email || ""}
          onChange={e => setField("email", e.target.value)} placeholder="you@email.com" />
      </FormGroup>

      <FormGroup>
        <FieldLabel optional>Phone</FieldLabel>
        <input className="fld" type="tel" value={data.phone || ""}
          onChange={e => setField("phone", e.target.value)} placeholder="07XXX XXXXXX" />
      </FormGroup>

      {showCompany && (
        <FormGroup>
          <FieldLabel optional>Company / organisation</FieldLabel>
          <input className="fld" value={data.company || ""}
            onChange={e => setField("company", e.target.value)} placeholder="e.g. Acme Building Ltd." />
        </FormGroup>
      )}

      <FormGroup>
        <FieldLabel>How should we reach you?</FieldLabel>
        <PillRow options={reachOptions} value={data.reach} setValue={(v) => setField("reach", v)} multi />
      </FormGroup>

      {wantsPhone && (
        <FormGroup>
          <FieldLabel>Best time to call</FieldLabel>
          <PillRow options={callTimeOptions} value={data.callTime} setValue={(v) => setField("callTime", v)} />
        </FormGroup>
      )}

      <FormGroup>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Checkbox checked={!!data.consent} onChange={() => setField("consent", !data.consent)}>
            I agree to InkPrinted contacting me about this quote.
          </Checkbox>
          <Checkbox checked={!!data.updates} onChange={() => setField("updates", !data.updates)}>
            Send me occasional updates on new products and offers.
          </Checkbox>
        </div>
      </FormGroup>
    </>
  );
};

// ── File upload area
const FileUpload = ({ files, setFiles }) => {
  const [dragging, setDragging] = useState(false);
  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files || []);
    setFiles([...files, ...dropped.map(f => ({ name: f.name, size: f.size }))]);
  };
  const onPick = (e) => {
    const picked = Array.from(e.target.files || []);
    setFiles([...files, ...picked.map(f => ({ name: f.name, size: f.size }))]);
  };
  return (
    <>
      <label
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{
          display: "block",
          padding: 24,
          border: "1px dashed " + (dragging ? "var(--accent)" : "rgba(255,255,255,0.25)"),
          borderRadius: 6,
          background: dragging ? "rgba(236,90,180,0.04)" : "var(--surface-2)",
          textAlign: "center",
          cursor: "pointer",
          transition: "background 200ms, border-color 200ms"
        }}>
        <input type="file" multiple
               onChange={onPick}
               style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
               accept=".png,.jpg,.jpeg,.svg,.ai,.eps,.pdf" />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "var(--accent)" }}><IconUploadCloud size={20} strokeWidth={1.5} /></span>
          <span style={{ fontSize: 13, color: "#fff" }}>
            <span style={{ color: "var(--accent)", fontWeight: 500 }}>Drop files here</span> or click to browse
          </span>
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 8 }}>
          PNG, JPG, SVG, AI, EPS, PDF — up to 25 MB
        </div>
      </label>
      {files.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0", display: "flex", flexDirection: "column", gap: 6 }}>
          {files.map((f, i) => (
            <li key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 12,
              color: "rgba(255,255,255,0.80)",
              background: "var(--surface-2)",
              borderRadius: 4,
              padding: "8px 12px"
            }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "var(--accent)" }}><IconCheck size={12} strokeWidth={2.5} /></span>
                {f.name}
              </span>
              <button type="button"
                onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                style={{ color: "rgba(255,255,255,0.50)" }}>
                <IconClose size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

// Step heading
const StepHeading = ({ title, sub }) => (
  <div style={{ marginTop: 24 }}>
    <h2 style={{ fontSize: 22, fontWeight: 500, margin: 0, letterSpacing: "-0.01em" }}>{title}</h2>
    {sub && <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", margin: "6px 0 0" }}>{sub}</p>}
  </div>
);

const FormGroup = ({ children }) => (
  <div style={{ marginTop: 24 }}>{children}</div>
);

// ── Validation per step
function canContinue(step, data) {
  if (step === 0) return !!data.projectType && !!data.deadline;
  if (step === 1) return (data.products || []).length > 0 && !!data.quantity && (data.deco || []).length > 0;
  if (step === 2) {
    if (!data.artwork) return false;
    if (data.artwork === "ready") return (data.files || []).length > 0;
    if (data.artwork === "rough") return !!(data.artworkRough || "").trim();
    if (data.artwork === "help") return !!(data.artworkBrief || "").trim();
  }
  if (step === 3) {
    return !!data.first && !!data.last && !!data.email && (data.reach || []).length > 0 && !!data.consent;
  }
  return false;
}

// ── Success state
const SuccessState = ({ data, onReset }) => (
  <div style={{
    background: "var(--surface)",
    borderRadius: 6,
    padding: 40,
    textAlign: "center"
  }}>
    <div style={{
      width: 56, height: 56,
      borderRadius: "50%",
      background: "var(--accent)",
      color: "#0A0A0A",
      display: "grid", placeItems: "center",
      margin: "0 auto 20px"
    }}>
      <IconCheck size={28} strokeWidth={2.5} />
    </div>
    <h2 style={{ fontSize: 28, fontWeight: 500, margin: 0, letterSpacing: "-0.02em" }}>
      Quote request sent.
    </h2>
    <p style={{
      fontSize: 14, color: "rgba(255,255,255,0.70)",
      maxWidth: 460, margin: "10px auto 0", lineHeight: 1.55
    }}>
      We'll review your project and email{" "}
      <span style={{ color: "#fff" }}>{data.email}</span>{" "}
      within 24 hours. For urgent jobs, give us a ring on{" "}
      <a href="tel:08000000000" style={{ color: "var(--accent)", fontWeight: 500 }}>0800 000 0000</a>.
    </p>

    {/* Recap card */}
    <div style={{
      background: "var(--surface-2)",
      borderRadius: 6,
      padding: 20,
      textAlign: "left",
      margin: "32px auto 0",
      maxWidth: 540
    }}>
      <div className="label-up" style={{ color: "rgba(255,255,255,0.50)", marginBottom: 12 }}>What we received</div>
      <RecapRow label="Project"   value={prettyProject(data.projectType)} />
      <RecapRow label="Deadline"  value={prettyDeadline(data.deadline, data.deadlineDate)} />
      <RecapRow label="Products"  value={(data.products || []).map(prettyProduct).join(", ") || "—"} />
      <RecapRow label="Quantity"  value={data.quantity || "—"} />
      <RecapRow label="Decoration"value={(data.deco || []).join(", ") || "—"} />
      <RecapRow label="Artwork"   value={prettyArtwork(data.artwork)} />
      <RecapRow label="Contact"   value={`${data.first || ""} ${data.last || ""} · ${data.email || ""}`.trim()} last />
    </div>

    <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28 }}>
      <a href="Homepage.html" className="btn btn-secondary">Back to shopping</a>
      <a href="Account.html" className="btn btn-primary">
        View your account <IconArrowRight size={14} className="arrow" />
      </a>
    </div>
  </div>
);

const RecapRow = ({ label, value, last }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "100px 1fr",
    gap: 12,
    padding: "8px 0",
    borderBottom: last ? "none" : "0.5px solid rgba(255,255,255,0.08)",
    fontSize: 12
  }}>
    <span style={{ color: "rgba(255,255,255,0.50)" }}>{label}</span>
    <span style={{ color: "#fff" }}>{value || "—"}</span>
  </div>
);

const prettyProject = (k) => ({
  team: "Team / company kit", event: "Event", sports: "Sports team / club",
  retail: "Retail / brand", personal: "Personal", charity: "Charity / fundraiser", other: "Other"
}[k] || "—");
const prettyDeadline = (k, date) => {
  const base = { urgent: "Within 2 weeks (urgent)", "2-4": "2–4 weeks", flexible: "4+ weeks / flexible" }[k] || "—";
  return date ? `${base} · ${date}` : base;
};
const prettyProduct = (k) => ({
  tee: "T-shirts", hoodie: "Hoodies & sweats", polo: "Polos", outerwear: "Outerwear",
  workwear: "Workwear", gifts: "Mugs & gifts", headwear: "Caps", bags: "Bags & totes", other: "Other"
}[k] || k);
const prettyArtwork = (k) => ({ ready: "Ready to upload", rough: "Rough idea", help: "Needs design help" }[k] || "—");

// ── Sidebar cards
const HelpCard = () => (
  <div style={{
    background: "var(--surface)",
    borderRadius: 6,
    padding: 20
  }}>
    <div className="label-up" style={{ color: "var(--accent)" }}>Prefer to talk?</div>
    <div style={{ fontSize: 14, fontWeight: 500, marginTop: 8 }}>Call us direct</div>
    <a href="tel:08000000000" style={{
      fontSize: 18, fontWeight: 500, color: "var(--accent)",
      display: "inline-flex", alignItems: "center", gap: 8,
      marginTop: 6, letterSpacing: "-0.01em"
    }}>
      <IconPhone size={16} strokeWidth={1.5} />
      0800 000 0000
    </a>
    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.60)", marginTop: 4 }}>Mon–Fri, 9am–5pm</div>

    <div style={{
      height: 1, background: "rgba(255,255,255,0.10)",
      margin: "16px 0"
    }} />

    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontSize: 12,
      color: "rgba(255,255,255,0.65)"
    }}>
      <IconMail size={14} strokeWidth={1.5} />
      <a href="mailto:hello@inkprinted.co.uk" style={{ color: "rgba(255,255,255,0.85)" }}>
        hello@inkprinted.co.uk
      </a>
    </div>
  </div>
);

const WhyUsCard = () => (
  <div style={{
    background: "var(--surface)",
    borderRadius: 6,
    padding: 20
  }}>
    <div style={{ fontSize: 14, fontWeight: 500 }}>Why trust us with your bulk job?</div>
    <ul style={{
      listStyle: "none", padding: 0,
      margin: "14px 0 0",
      display: "flex", flexDirection: "column", gap: 12
    }}>
      {[
        "10+ years of UK custom printing experience",
        "Dedicated contact for your project",
        "Free branded mock-ups before you commit",
        "Transparent pricing — no hidden setup fees"
      ].map(item => (
        <li key={item} style={{
          display: "flex", alignItems: "flex-start", gap: 10,
          fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.5
        }}>
          <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }}>
            <IconCheck size={12} strokeWidth={2.5} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const TestimonialCard = () => (
  <div style={{
    background: "var(--surface)",
    borderRadius: 6,
    padding: 20
  }}>
    <div className="label-up" style={{ color: "var(--accent)" }}>Recent bulk order</div>
    <blockquote style={{
      fontSize: 12, color: "rgba(255,255,255,0.65)",
      fontStyle: "italic",
      margin: "12px 0 8px",
      lineHeight: 1.5
    }}>
      "Ordered 120 polos for our team — print quality was spot on and they arrived three days early."
    </blockquote>
    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.40)" }}>
      — Tom, building contractor
    </div>
  </div>
);

// ── FAQ block
const FAQ = () => {
  const items = [
    ["How long does a bulk order take?", "7–14 working days from artwork approval, depending on quantity and decoration method."],
    ["Can you match brand colours?", "Yes — Pantone colour matching available on embroidery and most print methods at no extra cost."],
    ["Minimum quantity for bulk pricing?", "Bulk discounts apply from 10 units of the same garment. Mixed orders also qualify on a sliding scale."],
    ["Do you provide branded mock-ups?", "Yes, free of charge with every quote. Mock-ups delivered within 24h of receiving your artwork."]
  ];
  return (
    <section id="faq" style={{
      background: "var(--surface)",
      borderRadius: 6,
      padding: 24,
      marginTop: 32,
      scrollMarginTop: 100
    }}>
      <h3 style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>Bulk order FAQs</h3>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
        marginTop: 20
      }}>
        {items.map(([q, a]) => (
          <div key={q}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{q}</div>
            <p style={{
              fontSize: 12, color: "rgba(255,255,255,0.65)",
              margin: "4px 0 0", lineHeight: 1.55
            }}>{a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ── Main app
const QuoteApp = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    products: [],
    deco: [],
    files: [],
    reach: ["email"],
    consent: false,
    updates: true
  });

  const setField = (key, value) => setData(d => ({ ...d, [key]: value }));
  const canGo = canContinue(step, data);

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
      window.scrollTo({ top: document.getElementById("form-anchor").offsetTop - 24, behavior: "smooth" });
    } else {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const back = () => setStep(s => Math.max(0, s - 1));

  return (
    <>
      <UtilityBar />
      <Nav />

      <QuoteHero />

      <main className="container" id="form-anchor" style={{
        display: "grid",
        gridTemplateColumns: "1fr 320px",
        gap: 16,
        paddingTop: 32,
        paddingBottom: 64,
        alignItems: "flex-start"
      }}>
        <section style={{
          background: "var(--surface)",
          borderRadius: 6,
          padding: 28
        }}>
          {submitted ? (
            <SuccessState data={data} onReset={() => { setSubmitted(false); setStep(0); }} />
          ) : (
            <>
              <StepIndicator step={step} />

              {step === 0 && <Step1 data={data} setField={setField} />}
              {step === 1 && <Step2 data={data} setField={setField} />}
              {step === 2 && <Step3 data={data} setField={setField} />}
              {step === 3 && <Step4 data={data} setField={setField} />}

              <div style={{
                marginTop: 32,
                paddingTop: 20,
                borderTop: "0.5px solid rgba(255,255,255,0.10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap"
              }}>
                <button type="button" onClick={back} disabled={step === 0}
                  style={{
                    height: 36,
                    padding: "0 14px",
                    background: "transparent",
                    color: step === 0 ? "rgba(255,255,255,0.30)" : "#fff",
                    fontSize: 11,
                    fontWeight: 500,
                    border: "0.5px solid rgba(255,255,255,0.30)",
                    borderRadius: 4,
                    cursor: step === 0 ? "not-allowed" : "pointer",
                    transition: "background 200ms, border-color 200ms"
                  }}
                  onMouseEnter={e => { if (step > 0) e.currentTarget.style.background = "var(--surface-2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                  ← Back
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.40)" }}>
                    Step {step + 1} of {STEPS.length}
                  </span>
                  <button type="button" onClick={next} disabled={!canGo}
                    className={`btn btn-primary ${step === STEPS.length - 1 && canGo ? "btn-pulse" : ""}`}
                    style={{ height: 44 }}>
                    {step === STEPS.length - 1 ? "Send quote request" : "Continue"}
                    <IconArrowRight size={14} className="arrow" />
                  </button>
                </div>
              </div>
            </>
          )}
        </section>

        <aside style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          position: "sticky",
          top: 124
        }}>
          <HelpCard />
          <WhyUsCard />
          <TestimonialCard />
        </aside>
      </main>

      <div className="container">
        <FAQ />
      </div>

      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<QuoteApp />);
