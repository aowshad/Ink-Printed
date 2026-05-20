// Cart — App composition

const CartApp = () => {
  const [items, setItems] = useState(INITIAL_CART);
  const [savedItems, setSavedItems] = useState(SAVED_ITEMS);
  const [promoCode, setPromoCode] = useState("");
  const [appliedCode, setAppliedCode] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const units = cartUnits(items);

  const setItem = (id, next) => {
    setItems(items.map(i => i.id === id ? next : i));
  };
  const requestRemove = (id) => {
    if (window.confirm("Remove this item? Your design will be saved to your account if you're logged in.")) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  // Demo: clear "isRecent" highlight after 5s
  useEffect(() => {
    const t = setTimeout(() => {
      setItems(curr => curr.map(i => ({ ...i, isRecent: false })));
    }, 5500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <UtilityBar />
      <Nav />

      <main className="container" style={{ paddingTop: 24, paddingBottom: 64 }}>
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <CartPageHeader items={items} />

            {units > 0 && (
              <div style={{ marginTop: 16 }}>
                <DiscountProgressBar units={units} />
              </div>
            )}

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 360px",
              gap: 32,
              marginTop: 24,
              alignItems: "flex-start"
            }}>
              {/* Left — items */}
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {items.map(i => (
                    <CartLineItem key={i.id} item={i}
                      setItem={(next) => setItem(i.id, next)}
                      requestRemove={() => requestRemove(i.id)} />
                  ))}
                </div>
                <SavedForLater items={savedItems} />
              </div>

              {/* Right — summary, sticky */}
              <aside style={{
                position: "sticky",
                top: 124,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                alignSelf: "flex-start"
              }}>
                <OrderSummary
                  items={items}
                  promoCode={promoCode}
                  setPromoCode={setPromoCode}
                  appliedCode={appliedCode}
                  setAppliedCode={setAppliedCode} />
                <ExpressCheckout />
                <TrustStripCard />
              </aside>
            </div>

            <CartCrossSell items={items} />
          </>
        )}
      </main>

      <Footer />

      {/* Drawer demo trigger — discoverable but unobtrusive */}
      <DrawerDemoTrigger onClick={() => setDrawerOpen(true)} />

      <AddToBasketDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        item={items[0] || INITIAL_CART[0]}
        items={items.length ? items : INITIAL_CART}
      />
    </>
  );
};

// Top of page header with continue-shopping link, title, sub-line, steps
const CartPageHeader = ({ items }) => {
  const units = cartUnits(items);
  return (
    <header>
      <a href="Listing.html" style={{
        fontSize: 12,
        color: "rgba(255,255,255,0.60)",
        display: "inline-flex",
        alignItems: "center",
        gap: 6
      }}>
        <span style={{ color: "var(--accent)" }}>←</span> Continue shopping
      </a>
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginTop: 8,
        gap: 24
      }}>
        <div>
          <h1 style={{
            fontSize: 28, fontWeight: 500, margin: 0,
            letterSpacing: "-0.02em"
          }}>Your basket</h1>
          <div style={{
            fontSize: 12, color: "rgba(255,255,255,0.60)",
            marginTop: 4
          }}>
            {items.length} item{items.length === 1 ? "" : "s"} · {units} unit{units === 1 ? "" : "s"} · Reserved for 60 minutes
          </div>
        </div>
        <StepIndicator />
      </div>
    </header>
  );
};

const StepIndicator = () => (
  <div style={{
    display: "flex",
    gap: 8,
    fontSize: 11,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    fontWeight: 500,
    whiteSpace: "nowrap",
    alignItems: "center"
  }}>
    <span style={{ color: "rgba(255,255,255,0.40)" }}>Step 1 of 3 ·</span>
    <span style={{ color: "rgba(255,255,255,0.80)" }}>Basket</span>
    <span style={{ color: "rgba(255,255,255,0.30)" }}>→</span>
    <span style={{ color: "rgba(255,255,255,0.30)" }}>Shipping</span>
    <span style={{ color: "rgba(255,255,255,0.30)" }}>→</span>
    <span style={{ color: "rgba(255,255,255,0.30)" }}>Pay</span>
  </div>
);

// Discoverable demo trigger — opens the add-to-basket drawer for review
const DrawerDemoTrigger = ({ onClick }) => (
  <button onClick={onClick} style={{
    position: "fixed",
    left: 20, bottom: 20,
    height: 36,
    padding: "0 12px",
    background: "var(--surface)",
    border: "1px solid var(--text-15)",
    borderRadius: 18,
    fontSize: 11,
    color: "rgba(255,255,255,0.70)",
    fontWeight: 500,
    letterSpacing: "0.04em",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    zIndex: 50,
    transition: "background 200ms, color 200ms"
  }}
  onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#0A0A0A"; }}
  onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.color = "rgba(255,255,255,0.70)"; }}>
    <IconBag size={14} strokeWidth={1.5} />
    Preview "Added to basket" drawer
  </button>
);

ReactDOM.createRoot(document.getElementById("root")).render(<CartApp />);
