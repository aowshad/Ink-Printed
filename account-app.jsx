// Account Dashboard

const { useState, useEffect } = React;

// Extra icons
const IconHome = (p) => (<Icon {...p}><path d="M3 11 12 4l9 7" /><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" /></Icon>);
const IconBox = (p) => (<Icon {...p}><path d="M3 7 12 3l9 4-9 4-9-4Z" /><path d="M3 7v10l9 4 9-4V7" /><path d="M12 11v10" /></Icon>);
const IconFolder = (p) => (<Icon {...p}><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /></Icon>);
const IconHeartLine = (p) => (<Icon {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" /></Icon>);
const IconHeartFill = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1.5" strokeLinejoin="round">
    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
  </svg>
);
const IconMapPin = (p) => (<Icon {...p}><path d="M12 22s7-7.4 7-13a7 7 0 1 0-14 0c0 5.6 7 13 7 13Z" /><circle cx="12" cy="9" r="2.5" /></Icon>);
const IconCard = (p) => (<Icon {...p}><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /><path d="M7 15h3" /></Icon>);
const IconSettings = (p) => (<Icon {...p}><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.8a7 7 0 0 0-2.1-1.2L14 3h-4l-.5 2.4a7 7 0 0 0-2.1 1.2L5.1 5.9l-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.8c.6.5 1.4.9 2.1 1.2L10 21h4l.5-2.4a7 7 0 0 0 2.1-1.2l2.3.8 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z" /></Icon>);
const IconPlusSm = ({ size = 14 }) => (<Icon size={size}><path d="M12 5v14" /><path d="M5 12h14" /></Icon>);

// User
const USER = {
  first: "Sarah",
  initials: "SP",
  memberSince: "Mar 2023",
  ordersCount: 14,
  totalSpent: 412.40,
  bulkSaved: 64.20,
  lastDeliveredOn: "12 May"
};

// Last order
const LAST_ORDER = {
  product: "Heavyweight Hoodie",
  designName: "Studio Crew Logo",
  units: 6,
  colour: "Black",
  method: "Embroidered, left chest",
  delivered: "12 May 2026",
  status: "delivered",   // delivered | production | issue
  productKind: "hoodie",
  hasMore: true
};

const RECENT_ORDERS = [
  { id: "IP-20438", date: "12 May", product: "Heavyweight Hoodie", count: 6, kind: "hoodie", status: "delivered", price: 198.00, action: "Reorder" },
  { id: "IP-20307", date: "28 Apr", product: "Standard tee",       count: 12, kind: "tee", status: "production", price: 96.40, action: "Track →" },
  { id: "IP-20214", date: "12 Apr", product: "Two-colour mug",      count: 3, kind: "mug", status: "delivered", price: 28.50, action: "Reorder" },
  { id: "IP-20088", date: "01 Mar", product: "Heritage polo ×4",    count: 4, kind: "polo", status: "issue", price: 72.00, action: "Contact us →" }
];

const SAVED_DESIGNS = [
  { name: "Hen Do Crops",    saved: "8 May",   kind: "tee", draft: false },
  { name: "Office Polos v3", saved: "3 May",   kind: "polo", draft: true },
  { name: "Studio Logo Tote",saved: "29 Apr",  kind: "tote", draft: false }
];

const WISHLIST = [
  { name: "Heavyweight tee",   from: 12.00, kind: "tee" },
  { name: "Two-tone hoodie",   from: 36.00, kind: "hoodie" },
  { name: "Embroidered cap",   from: 16.00, kind: "cap" },
  { name: "Canvas tote",       from: 8.50,  kind: "tote" },
  { name: "Long sleeve tee",   from: 12.50, kind: "tee" }
];

// Status indicator
const STATUS_MAP = {
  delivered:  { dot: "var(--accent)", label: "Delivered" },
  production: { dot: "#fff",          label: "In production" },
  issue:      { dot: "#F4B400",       label: "Issue" },
  cancelled:  { dot: "rgba(255,255,255,0.30)", label: "Cancelled" }
};

// ── Account header
const AccountHeader = ({ user }) => (
  <section style={{
    background: "var(--bg)",
    paddingTop: 28,
    paddingBottom: 28
  }}>
    <div className="container" style={{
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 24
    }}>
      <div>
        <div className="label-up" style={{ color: "rgba(255,255,255,0.40)" }}>Your account</div>
        <h1 style={{
          fontSize: 28, lineHeight: "36px", fontWeight: 500,
          letterSpacing: "-0.02em",
          margin: 0, marginTop: 6
        }}>
          Welcome back, {user.first}.
        </h1>
        <div style={{
          fontSize: 12, color: "rgba(255,255,255,0.65)",
          marginTop: 6
        }}>
          Member since {user.memberSince} · {user.ordersCount} orders placed · £{user.totalSpent.toFixed(2)} spent
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <a href="Account.html" className="acct-outline" style={{ display: "inline-flex", alignItems: "center" }}>Account settings</a>
        <a href="Login.html" className="acct-outline" style={{ display: "inline-flex", alignItems: "center" }}>Log out</a>
      </div>
    </div>
    <style>{`
      .acct-outline {
        height: 36px;
        padding: 0 14px;
        background: transparent;
        color: rgba(255,255,255,0.85);
        font-size: 12px;
        font-weight: 500;
        border: 0.5px solid rgba(255,255,255,0.25);
        border-radius: 4px;
        white-space: nowrap;
        transition: background 200ms ease-out, border-color 200ms ease-out;
      }
      .acct-outline:hover { background: var(--surface-2); border-color: rgba(255,255,255,0.45); }
    `}</style>
  </section>
);

// ── Sidebar
const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: IconHome },
  { key: "orders",    label: "Orders",    icon: IconBox,    count: 14 },
  { key: "saved",     label: "Saved designs", icon: IconFolder, count: 3 },
  { key: "wishlist",  label: "Wishlist",  icon: IconHeartLine, count: 5 },
  { key: "addresses", label: "Addresses", icon: IconMapPin },
  { key: "payment",   label: "Payment methods", icon: IconCard },
  { key: "settings",  label: "Settings",  icon: IconSettings }
];

const Sidebar = ({ active }) => (
  <aside style={{
    width: 240,
    flexShrink: 0,
    background: "var(--surface)",
    borderRadius: 6,
    padding: 16,
    position: "sticky",
    top: 124,
    alignSelf: "flex-start"
  }}>
    <div className="label-up" style={{
      color: "rgba(255,255,255,0.60)",
      marginBottom: 14
    }}>Navigate</div>

    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {NAV_ITEMS.map(item => {
        const isActive = item.key === active;
        const Icon = item.icon;
        return (
          <a key={item.key} href="#"
            style={{
              height: 40,
              padding: "0 12px",
              borderRadius: 4,
              background: isActive ? "var(--surface-2)" : "transparent",
              color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 12,
              fontWeight: isActive ? 500 : 400,
              borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent",
              transition: "background 200ms, color 200ms"
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}>
            <Icon size={16} strokeWidth={1.5} />
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.count != null && (
              <span style={{
                height: 18,
                padding: "0 6px",
                background: "var(--surface-2)",
                borderRadius: 9,
                fontSize: 9,
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                color: "rgba(255,255,255,0.85)"
              }}>{item.count}</span>
            )}
          </a>
        );
      })}
    </div>

    <div style={{
      marginTop: 24,
      paddingTop: 16,
      borderTop: "0.5px solid rgba(255,255,255,0.10)"
    }}>
      <div className="label-up" style={{ color: "rgba(255,255,255,0.60)", marginBottom: 10 }}>Need help?</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <a href="Quote.html" style={helpLink}>Contact support</a>
        <a href="Quote.html#faq" style={helpLink}>FAQs</a>
        <a href="Account.html" style={helpLink}>Order tracking</a>
      </div>
    </div>
  </aside>
);
const helpLink = { fontSize: 12, color: "rgba(255,255,255,0.65)", transition: "color 200ms" };

// ── Hero reorder card
const ReorderHero = ({ order }) => {
  const inProduction = order.status === "production";
  const ctaHref = inProduction ? "Account.html" : "Cart.html";
  return (
    <div style={{
      background: "var(--surface)",
      borderRadius: 6,
      border: "0.5px solid var(--accent)",
      padding: 20,
      display: "grid",
      gridTemplateColumns: "100px 1fr auto",
      gap: 16,
      alignItems: "center"
    }}>
      <div style={{
        width: 100, height: 100,
        borderRadius: 6, overflow: "hidden",
        background: "var(--bg)",
        position: "relative"
      }}>
        <Silhouette kind={order.productKind} />
        <div style={{
          position: "absolute",
          left: "50%", top: "48%",
          transform: "translate(-50%, -50%)",
          width: 44, height: 44,
          borderRadius: 3,
          border: "1px solid rgba(170,204,0,0.4)",
          background: "rgba(170,204,0,0.08)",
          display: "grid", placeItems: "center"
        }}>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 6,
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.06em"
          }}>Logo</span>
        </div>
      </div>

      <div>
        <div className="label-up" style={{ color: "var(--accent)" }}>
          {inProduction ? "Your order in production" : "Your last order"}
        </div>
        <div style={{ fontSize: 16, fontWeight: 500, marginTop: 6, letterSpacing: "-0.01em" }}>
          {order.product} · "{order.designName}"
          {order.hasMore && <span style={{ color: "rgba(255,255,255,0.50)", fontWeight: 400 }}> +2 more</span>}
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 4 }}>
          {order.units} units · {order.colour} · {order.method} · {inProduction ? "Dispatching this week" : `Delivered ${order.delivered}`}
        </div>
        {order.hasMore && (
          <a href="#" style={{
            fontSize: 11, color: "rgba(255,255,255,0.65)",
            marginTop: 6, display: "inline-flex", alignItems: "center", gap: 4,
            textDecoration: "underline", textUnderlineOffset: 3
          }}>View full order</a>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <a href={ctaHref} className="btn btn-primary" style={{ height: 36, fontSize: 13 }}>
          {inProduction ? "Track order" : "Reorder"} <IconArrowRight size={14} className="arrow" />
        </a>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.60)" }}>
          {inProduction ? "See where your kit is" : "Same design, new order"}
        </span>
      </div>
    </div>
  );
};

// ── Recent orders list
const RecentOrders = () => (
  <div style={{
    background: "var(--surface)",
    borderRadius: 6,
    padding: 18,
    display: "flex",
    flexDirection: "column"
  }}>
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8
    }}>
      <h3 style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>Recent orders</h3>
      <a href="#" style={seeAllLink}>See all <IconArrowRight size={11} /></a>
    </div>

    {RECENT_ORDERS.map((o, i) => (
      <OrderRow key={o.id} order={o} last={i === RECENT_ORDERS.length - 1} />
    ))}
  </div>
);
const seeAllLink = {
  fontSize: 11, color: "var(--accent)", fontWeight: 500,
  display: "inline-flex", alignItems: "center", gap: 4
};

const OrderRow = ({ order, last }) => {
  const status = STATUS_MAP[order.status];
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "48px 1fr auto",
      gap: 10,
      padding: "10px 0",
      borderBottom: last ? "none" : "0.5px solid rgba(255,255,255,0.10)",
      alignItems: "center"
    }}>
      <div style={{
        width: 48, height: 48,
        background: "var(--bg)",
        borderRadius: 4,
        overflow: "hidden"
      }}>
        <Silhouette kind={order.kind} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{order.product} ×{order.count}</div>
        <div style={{
          fontSize: 10,
          color: "rgba(255,255,255,0.65)",
          marginTop: 2,
          display: "inline-flex",
          alignItems: "center",
          gap: 6
        }}>
          <span style={{ fontFamily: '"JetBrains Mono", monospace' }}>#{order.id}</span>
          <span>· {order.date} ·</span>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: status.dot,
            display: "inline-block"
          }} />
          <span>{status.label}</span>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 13, fontWeight: 500 }}>£{order.price.toFixed(2)}</div>
        <a href={order.status === "production" ? "Account.html" : "Cart.html"} style={{
          fontSize: 10, color: "var(--accent)", fontWeight: 500
        }}>{order.action}</a>
      </div>
    </div>
  );
};

// ── Saved designs card (2x2)
const SavedDesigns = () => (
  <div style={{
    background: "var(--surface)",
    borderRadius: 6,
    padding: 18
  }}>
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14
    }}>
      <h3 style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>Saved designs</h3>
      <a href="#" style={seeAllLink}>See all <IconArrowRight size={11} /></a>
    </div>

    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8
    }}>
      {SAVED_DESIGNS.map(d => <SavedDesignTile key={d.name} design={d} />)}
      <NewDesignTile />
    </div>
  </div>
);

const SavedDesignTile = ({ design }) => (
  <a href="#" style={{ display: "block" }}>
    <div style={{
      aspectRatio: "1 / 1",
      background: "var(--surface-2)",
      borderRadius: 4,
      position: "relative",
      overflow: "hidden"
    }}>
      <Silhouette kind={design.kind} />
      {design.draft && (
        <span style={{
          position: "absolute",
          right: 6, bottom: 6,
          fontSize: 8,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontWeight: 500,
          padding: "3px 5px",
          borderRadius: 2,
          background: "rgba(10,10,10,0.85)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.20)"
        }}>Draft</span>
      )}
    </div>
    <div style={{ marginTop: 6 }}>
      <div style={{ fontSize: 12, fontWeight: 500 }}>{design.name}</div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)" }}>Saved {design.saved}</div>
    </div>
  </a>
);

const NewDesignTile = () => (
  <a href="Listing.html" style={{ display: "block" }}>
    <div style={{
      aspectRatio: "1 / 1",
      background: "var(--surface-2)",
      borderRadius: 4,
      border: "1px dashed rgba(255,255,255,0.20)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      color: "rgba(255,255,255,0.65)",
      transition: "background 200ms, color 200ms"
    }}
    onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(170,204,0,0.06)"; }}
    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; e.currentTarget.style.background = "var(--surface-2)"; }}>
      <IconPlusSm size={20} />
      <span style={{ fontSize: 11, fontWeight: 500 }}>Start new design</span>
    </div>
    <div style={{ marginTop: 6 }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.65)" }}>New</div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.40)" }}>From a blank</div>
    </div>
  </a>
);

// ── Wishlist row
const Wishlist = () => (
  <div style={{
    background: "var(--surface)",
    borderRadius: 6,
    padding: 18
  }}>
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14
    }}>
      <h3 style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>
        Wishlist <span style={{ color: "rgba(255,255,255,0.50)", fontWeight: 400 }}>({WISHLIST.length})</span>
      </h3>
      <a href="Listing.html" style={seeAllLink}>See all <IconArrowRight size={11} /></a>
    </div>

    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: 8
    }}>
      {WISHLIST.map(w => <WishlistCard key={w.name} item={w} />)}
    </div>
  </div>
);

const WishlistCard = ({ item }) => (
  <a href="Product.html" style={{ display: "block" }}>
    <div style={{
      aspectRatio: "1 / 1",
      background: "var(--surface-2)",
      borderRadius: 4,
      position: "relative",
      overflow: "hidden"
    }}>
      <Silhouette kind={item.kind} />
      <button aria-label="Remove from wishlist"
        onClick={(e) => { e.preventDefault(); }}
        style={{
          position: "absolute",
          top: 6, right: 6,
          width: 22, height: 22,
          display: "inline-grid", placeItems: "center",
          color: "var(--accent)"
        }}>
        <IconHeartFill size={14} color="#AACC00" />
      </button>
    </div>
    <div style={{ marginTop: 6 }}>
      <div style={{ fontSize: 12, fontWeight: 500 }}>{item.name}</div>
      <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 500 }}>From £{item.from.toFixed(2)}</div>
    </div>
  </a>
);

// ── Stats row
const StatsRow = ({ user }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 12
  }}>
    <StatBlock value={user.ordersCount} label="Orders placed" />
    <StatBlock value={`£${user.bulkSaved.toFixed(2)}`} label="Saved with bulk discounts" accent />
    <StatBlock value={user.lastDeliveredOn} label="Last order delivered" />
  </div>
);

const StatBlock = ({ value, label, accent }) => (
  <div style={{
    background: "var(--surface)",
    borderRadius: 6,
    padding: 16
  }}>
    <div style={{
      fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em",
      color: accent ? "var(--accent)" : "#fff",
      lineHeight: 1
    }}>{value}</div>
    <div className="label-up" style={{
      color: "rgba(255,255,255,0.60)",
      marginTop: 8,
      fontSize: 10
    }}>{label}</div>
  </div>
);

// ── App
const AccountApp = () => (
  <>
    <UtilityBar />
    <Nav />
    <AccountHeader user={USER} />

    <main className="container" style={{
      display: "flex",
      gap: 16,
      paddingBottom: 64,
      alignItems: "flex-start"
    }}>
      <Sidebar active="dashboard" />

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        <ReorderHero order={LAST_ORDER} />

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12
        }}>
          <RecentOrders />
          <SavedDesigns />
        </div>

        <Wishlist />
        <StatsRow user={USER} />
      </div>
    </main>

    <Footer />
  </>
);

ReactDOM.createRoot(document.getElementById("root")).render(<AccountApp />);
