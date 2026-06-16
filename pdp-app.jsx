// PDP — App composition + Sticky CTA

const PRODUCT = {
  name: "Crop top",
  noun: "crop top",
  price: "8.95",
  rating: 4.9,
  reviewCount: 12,
  categoryTrail: ["Clothing", "Vests & Crops"],
  breadcrumb: ["Clothing", "Vests & Crops", "Crop top"],
  specs: [
    ["Fabric", "95% cotton, 5% elastane"],
    ["Print method", "DTG · up to 6 colours"],
    ["Print area", "28 × 30 cm front"],
    ["Fit", "Slim · cropped"]
  ]
};

// Stock map: for the active colour, which sizes are oos
const OOS_BY_COLOUR = {
  White: new Set(["XS"]),
  Stone: new Set(["XL"])
};

const PDPApp = () => {
  const [colourIdx, setColourIdx] = useState(0);
  const [sizeIdx, setSizeIdx] = useState(1); // S default
  const [qty, setQty] = useState(1);
  const [multi, setMulti] = useState(false);
  const [sizeQtys, setSizeQtys] = useState({ XS:0, S:0, M:0, L:0, XL:0 });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const colour = COLOURS[colourIdx];
  const oosSizes = OOS_BY_COLOUR[colour.name] || new Set();

  const totalQty = multi
    ? Object.values(sizeQtys).reduce((a,b) => a + b, 0)
    : qty;

  // Sticky CTA visibility: track primary CTA's intersection (IO + scroll fallback)
  const [stickyVisible, setStickyVisible] = useState(false);
  useEffect(() => {
    const cta = document.querySelector('[data-pdp-cta="true"]');
    if (!cta) return;
    const check = () => {
      const r = cta.getBoundingClientRect();
      setStickyVisible(r.bottom < 0);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    let io;
    try {
      io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          setStickyVisible(!e.isIntersecting && e.boundingClientRect.top < 0);
        });
      }, { threshold: 0 });
      io.observe(cta);
    } catch (e) { /* noop — scroll listener handles it */ }

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      io && io.disconnect();
    };
  }, []);

  return (
    <>
      <UtilityBar />
      <Nav />

      <Breadcrumb trail={PRODUCT.breadcrumb} />

      {/* Two-column main */}
      <main className="container" style={{
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr",
        gap: 32,
        paddingTop: 8,
        paddingBottom: 80
      }}>
        <ImageGallery />

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <TitleCard product={PRODUCT} />

          <ColourSwatchRow colourIdx={colourIdx} setColourIdx={setColourIdx} />

          <QuantityCard
            qty={qty} setQty={setQty}
            sizeIdx={sizeIdx} setSizeIdx={setSizeIdx}
            multi={multi} setMulti={setMulti}
            sizeQtys={sizeQtys} setSizeQtys={setSizeQtys}
            oosSizes={oosSizes}
          />

          <SizeGuideRow />

          <PrimaryCTA productName={PRODUCT.noun} totalQty={totalQty} onClick={() => setDrawerOpen(true)} />

          <TrustMicroRow />

          {totalQty >= 10 && <BulkPrompt />}

          <QuickSpecsCard specs={PRODUCT.specs} />
        </div>
      </main>

      {/* Below the fold */}
      <div className="container" style={{
        display: "flex",
        flexDirection: "column",
        gap: 80,
        paddingBottom: 120
      }}>
        <DetailAccordion />
        <ReviewsSection />
        <CrossSellRail />
      </div>

      <Footer />

      {/* Sticky CTA bar */}
      <StickyCTABar
        visible={stickyVisible}
        productName={PRODUCT.name}
        colour={colour.name}
        size={SIZES[sizeIdx]}
        price={PRODUCT.price}
        multi={multi}
        totalQty={totalQty}
        onCustomise={() => setDrawerOpen(true)}
      />

      {/* Add-to-basket drawer (lives on PDP to show flow) */}
      <AddToBasketDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        item={{
          id: "demo",
          productName: PRODUCT.name,
          productKind: "tee",
          mode: "single",
          decoration: { method: "DTG print, front centre", colour: colour.name },
          size: SIZES[sizeIdx],
          qty: multi ? totalQty : qty,
          unitPrice: parseFloat(PRODUCT.price)
        }}
        items={[{
          id: "demo",
          productName: PRODUCT.name,
          productKind: "tee",
          mode: "single",
          decoration: { method: "DTG print, front centre", colour: colour.name },
          size: SIZES[sizeIdx],
          qty: multi ? totalQty : qty,
          unitPrice: parseFloat(PRODUCT.price)
        }]}
      />
    </>
  );
};

const StickyCTABar = ({ visible, productName, colour, size, price, multi, totalQty, onCustomise }) => (
  <div style={{
    position: "fixed",
    left: 0, right: 0,
    bottom: 0,
    background: "var(--bg)",
    borderTop: "1px solid var(--border)",
    height: 64,
    zIndex: 60,
    transform: visible ? "translateY(0)" : "translateY(100%)",
    transition: "transform 240ms ease-out"
  }}>
    <div className="container" style={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 4,
          background: "var(--surface)", flexShrink: 0,
          overflow: "hidden"
        }}>
          <Silhouette kind="tee" />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontSize: 13, color: "var(--text)",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
          }}>
            {productName}
            <span style={{ color: "var(--text-50)" }}>
              {" · "}{multi ? `${totalQty} items` : `${colour} · ${size}`}
            </span>
          </div>
          <div style={{ fontSize: 16, fontWeight: 500, color: "var(--text)", lineHeight: 1.1, marginTop: 2 }}>
            £{price}
          </div>
        </div>
      </div>
      <a href="#" onClick={(e) => { e.preventDefault(); onCustomise && onCustomise(); }} className="btn btn-primary" style={{ height: 44, fontSize: 14 }}>
        Customise <IconArrowRight size={14} className="arrow" />
      </a>
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(<PDPApp />);
