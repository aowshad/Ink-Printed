// Login / Signup / Forgot password flow

const { useState, useEffect, useRef } = React;

const IconEye = (p) => (
  <Icon {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></Icon>
);
const IconEyeOff = (p) => (
  <Icon {...p}><path d="M3 3l18 18" /><path d="M9.5 5.2A9.4 9.4 0 0 1 12 5c6.5 0 10 7 10 7-.7 1.3-1.6 2.6-2.7 3.7" /><path d="M14.5 14.5A3 3 0 0 1 9.5 9.5" /><path d="M6.5 7.5C3.7 9.2 2 12 2 12s3.5 7 10 7c1.3 0 2.5-.2 3.5-.6" /></Icon>
);
const IconCheckSm = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m4 12 5 5L20 7" />
  </svg>
);

// Minimal nav for login page
const LoginNav = () => (
  <div className="container" style={{ paddingTop: 16 }}>
    <div style={{
      height: 64,
      background: "var(--surface)",
      borderRadius: 6,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px"
    }}>
      <a href="Homepage.html" aria-label="InkPrinted">
        <Wordmark size={16} />
      </a>
      <a href="Homepage.html" style={{
        fontSize: 12,
        color: "rgba(255,255,255,0.60)",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        transition: "color 200ms"
      }}
      onMouseEnter={e => e.currentTarget.style.color = "#fff"}
      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.60)"}>
        <span style={{ color: "var(--accent)" }}>←</span> Back to shopping
      </a>
    </div>
  </div>
);

// Field group — label + input
const Field = ({ label, rightLabel, children }) => (
  <div>
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 6
    }}>
      <span className="label-up" style={{ color: "rgba(255,255,255,0.60)" }}>{label}</span>
      {rightLabel}
    </div>
    {children}
  </div>
);

// Password input with show/hide
const PasswordInput = ({ value, onChange, placeholder = "••••••••" }) => {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="fld"
        style={{ paddingRight: 40 }}
      />
      <button
        type="button"
        onClick={() => setShow(s => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        style={{
          position: "absolute",
          right: 8, top: "50%",
          transform: "translateY(-50%)",
          width: 28, height: 28,
          display: "inline-grid",
          placeItems: "center",
          color: "rgba(255,255,255,0.60)",
          transition: "color 200ms"
        }}
        onMouseEnter={e => e.currentTarget.style.color = "#fff"}
        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.60)"}>
        {show ? <IconEyeOff size={16} /> : <IconEye size={16} />}
      </button>
    </div>
  );
};

// Password strength — 4 bars
const passwordStrength = (pw) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s; // 0–4
};

const StrengthMeter = ({ pw }) => {
  const s = passwordStrength(pw);
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", gap: 4 }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{
            flex: 1,
            height: 3,
            borderRadius: 2,
            background: i <= s ? "var(--accent)" : "rgba(255,255,255,0.10)",
            transition: "background 200ms"
          }} />
        ))}
      </div>
      {pw && (
        <div style={{
          fontSize: 11,
          color: s >= 3 ? "var(--accent)" : "rgba(255,255,255,0.55)",
          marginTop: 6
        }}>{labels[s] || "Too short"}</div>
      )}
    </div>
  );
};

// Custom checkbox
const Checkbox = ({ checked, onChange, children }) => (
  <label style={{
    display: "flex", alignItems: "flex-start",
    gap: 10, cursor: "pointer",
    fontSize: 12,
    color: "rgba(255,255,255,0.65)",
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
      {checked && <IconCheckSm size={10} />}
    </span>
    <input type="checkbox" checked={checked} onChange={onChange}
           style={{ position: "absolute", opacity: 0, pointerEvents: "none" }} />
    <span>{children}</span>
  </label>
);

// Segmented mode toggle (Log in / Create account)
const ModeToggle = ({ mode, setMode }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    background: "var(--surface-2)",
    borderRadius: 4,
    padding: 4,
    gap: 4
  }}>
    {[["login", "Log in"], ["signup", "Create account"]].map(([key, label]) => {
      const active = mode === key;
      return (
        <button key={key} onClick={() => setMode(key)}
          style={{
            height: 36,
            borderRadius: 3,
            background: active ? "#fff" : "transparent",
            color: active ? "#0A0A0A" : "rgba(255,255,255,0.60)",
            fontSize: 13,
            fontWeight: 500,
            transition: "background 200ms, color 200ms"
          }}>{label}</button>
      );
    })}
  </div>
);

// Forgot password sub-state
const ForgotForm = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [resendIn, setResendIn] = useState(60);

  useEffect(() => {
    if (!submitted || resendIn <= 0) return;
    const t = setInterval(() => setResendIn(r => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, [submitted, resendIn]);

  if (submitted) {
    return (
      <div>
        <div style={{
          width: 40, height: 40,
          borderRadius: "50%",
          background: "var(--accent)",
          display: "grid", placeItems: "center",
          color: "#0A0A0A",
          margin: "0 auto 16px"
        }}>
          <IconCheckSm size={20} />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 500, margin: 0, textAlign: "center", letterSpacing: "-0.01em" }}>
          Check your inbox
        </h2>
        <p style={{
          fontSize: 13, color: "rgba(255,255,255,0.60)",
          textAlign: "center",
          margin: "8px 0 0"
        }}>
          We sent a reset link to <span style={{ color: "#fff" }}>{email || "your email"}</span>.
        </p>
        <div style={{ marginTop: 24, textAlign: "center" }}>
          {resendIn > 0 ? (
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.50)" }}>
              Resend in {resendIn}s
            </span>
          ) : (
            <button onClick={() => { setResendIn(60); }}
              style={{ fontSize: 12, color: "var(--accent)", fontWeight: 500 }}>
              Resend email
            </button>
          )}
        </div>
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <button onClick={onBack} style={{
            fontSize: 12, color: "var(--accent)", fontWeight: 500
          }}>← Back to login</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={e => { e.preventDefault(); if (email) setSubmitted(true); }}>
      <h2 style={{ fontSize: 24, fontWeight: 500, margin: 0, letterSpacing: "-0.01em" }}>
        Reset your password
      </h2>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.60)", margin: "6px 0 0" }}>
        Pop your email in and we'll send you a link.
      </p>
      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Email">
          <input className="fld" type="email" autoFocus
            value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com" />
        </Field>
        <button type="submit" className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>
          Send reset link <IconArrowRight size={16} className="arrow" />
        </button>
      </div>
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <button type="button" onClick={onBack} style={{
          fontSize: 12, color: "var(--accent)", fontWeight: 500
        }}>← Back to login</button>
      </div>
    </form>
  );
};

// Login form
const LoginForm = ({ setForgot, fromCheckout }) => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [remember, setRemember] = useState(true);
  return (
    <form onSubmit={e => e.preventDefault()}>
      <h2 style={{ fontSize: 24, fontWeight: 500, margin: 0, letterSpacing: "-0.01em" }}>
        Welcome back.
      </h2>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.60)", margin: "6px 0 0", lineHeight: 1.5 }}>
        Log in to track orders, view saved designs and reorder in one click.
      </p>

      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Email">
          <input className="fld" type="email" autoFocus
            value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com" />
        </Field>
        <Field
          label="Password"
          rightLabel={
            <button type="button" onClick={() => setForgot(true)}
              style={{ fontSize: 11, color: "var(--accent)", fontWeight: 500 }}>
              Forgot?
            </button>
          }>
          <PasswordInput value={pw} onChange={setPw} />
        </Field>
      </div>

      <div style={{ marginTop: 14 }}>
        <Checkbox checked={remember} onChange={() => setRemember(r => !r)}>
          Keep me signed in for 30 days
        </Checkbox>
      </div>

      <button type="submit" className="btn btn-primary"
        style={{ width: "100%", justifyContent: "center", marginTop: 16 }}>
        Log in <IconArrowRight size={16} className="arrow" />
      </button>
    </form>
  );
};

// Signup form
const SignupForm = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [agree, setAgree] = useState(false);
  const [updates, setUpdates] = useState(true);

  const mismatch = pw2 && pw && pw !== pw2;

  return (
    <form onSubmit={e => e.preventDefault()}>
      <h2 style={{ fontSize: 24, fontWeight: 500, margin: 0, letterSpacing: "-0.01em" }}>
        Create your account.
      </h2>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.60)", margin: "6px 0 0", lineHeight: 1.5 }}>
        Save designs, track orders, reorder in one click. <span style={{ color: "var(--accent)", fontWeight: 500 }}>10% off your first order.</span>
      </p>

      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="First name">
            <input className="fld" type="text" value={first} onChange={e => setFirst(e.target.value)} placeholder="Jane" />
          </Field>
          <Field label="Last name">
            <input className="fld" type="text" value={last} onChange={e => setLast(e.target.value)} placeholder="Smith" />
          </Field>
        </div>
        <Field label="Email">
          <input className="fld" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" />
        </Field>
        <Field label="Password">
          <PasswordInput value={pw} onChange={setPw} placeholder="At least 8 characters" />
          <StrengthMeter pw={pw} />
        </Field>
        <Field label="Confirm password">
          <PasswordInput value={pw2} onChange={setPw2} />
          {mismatch && (
            <div style={{ fontSize: 11, color: "rgba(255,180,180,0.95)", marginTop: 6 }}>
              Passwords don't match.
            </div>
          )}
        </Field>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
        <Checkbox checked={agree} onChange={() => setAgree(a => !a)}>
          I agree to the{" "}
          <a href="#" style={{ color: "#fff", textDecoration: "underline", textUnderlineOffset: 3 }}>terms</a>
          {" and "}
          <a href="#" style={{ color: "#fff", textDecoration: "underline", textUnderlineOffset: 3 }}>privacy policy</a>.
        </Checkbox>
        <Checkbox checked={updates} onChange={() => setUpdates(u => !u)}>
          Send me occasional updates about new products.
        </Checkbox>
      </div>

      <button type="submit" disabled={!agree}
        className="btn btn-primary"
        style={{
          width: "100%", justifyContent: "center", marginTop: 16,
          opacity: agree ? 1 : 0.5,
          cursor: agree ? "pointer" : "not-allowed"
        }}>
        Create account <IconArrowRight size={16} className="arrow" />
      </button>
    </form>
  );
};

// Brand panel (right column)
const BrandPanel = () => (
  <aside style={{
    background: "#000",
    borderRadius: 6,
    padding: 48,
    minHeight: 540,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden"
  }}>
    <div className="grain" />
    <div className="label-up" style={{ color: "var(--accent)", position: "relative" }}>
      For the regulars
    </div>

    <div style={{ position: "relative", maxWidth: 420 }}>
      <h2 style={{
        fontSize: 36,
        lineHeight: 1.2,
        fontWeight: 500,
        letterSpacing: "-0.02em",
        margin: 0
      }}>
        Your designs, saved.<br/>
        <span style={{ color: "var(--accent)" }}>Reordering</span>, in one click.
      </h2>
      <p style={{
        fontSize: 14, color: "rgba(255,255,255,0.70)",
        margin: "14px 0 0", maxWidth: 320, lineHeight: 1.6
      }}>
        Logged-in customers can save designs, track orders, see past invoices and reorder favourites without redesigning.
      </p>

      <ul style={{
        listStyle: "none",
        padding: 0, margin: "32px 0 0",
        display: "flex", flexDirection: "column", gap: 14
      }}>
        {[
          "Track every order, every print",
          "Save designs, come back to finish later",
          "Reorder a past design without rebuilding",
          "10% off your first logged-in order"
        ].map(item => (
          <li key={item} style={{
            display: "flex", alignItems: "flex-start", gap: 12,
            fontSize: 13, color: "rgba(255,255,255,0.92)"
          }}>
            <span style={{
              width: 16, height: 16, borderRadius: "50%",
              background: "rgba(236,90,180,0.15)",
              color: "var(--accent)",
              display: "inline-grid", placeItems: "center",
              marginTop: 2, flexShrink: 0
            }}>
              <IconCheckSm size={10} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>

    <div style={{
      position: "relative",
      fontSize: 11,
      color: "rgba(255,255,255,0.50)"
    }}>
      Already ordered? Just use the email we shipped to.
    </div>
  </aside>
);

// Main login app
const LoginApp = () => {
  const [mode, setMode] = useState("login");      // "login" | "signup"
  const [forgot, setForgot] = useState(false);
  // Demo affordance — query param ?from=checkout to show guest checkout link
  const params = new URLSearchParams(window.location.search);
  const fromCheckout = params.get("from") === "checkout";

  return (
    <>
      <LoginNav />

      <main className="container" style={{
        paddingTop: 24,
        paddingBottom: 64
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          gap: 16,
          alignItems: "stretch"
        }}
        className="login-grid">

          {/* Form panel */}
          <section style={{
            background: "var(--surface)",
            borderRadius: 6,
            padding: "56px 24px",
            display: "flex",
            justifyContent: "center",
            minHeight: 540
          }}>
            <div style={{ width: "100%", maxWidth: 360 }}>
              {forgot ? (
                <ForgotForm onBack={() => setForgot(false)} />
              ) : (
                <>
                  <ModeToggle mode={mode} setMode={setMode} />
                  <div style={{ marginTop: 32 }}>
                    {mode === "login"
                      ? <LoginForm setForgot={setForgot} fromCheckout={fromCheckout} />
                      : <SignupForm />}
                  </div>

                  {/* Divider */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    margin: "24px 0"
                  }}>
                    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }} />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.40)", letterSpacing: "0.06em" }}>OR</span>
                    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }} />
                  </div>

                  {/* Guest checkout — only when from=checkout */}
                  {fromCheckout && (
                    <div style={{ textAlign: "center", marginBottom: 16 }}>
                      <a href="#" style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.65)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6
                      }}>
                        Continue as guest <span style={{ color: "var(--accent)" }}>→</span>
                      </a>
                    </div>
                  )}

                  {/* Toggle alt link */}
                  <div style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.65)" }}>
                    {mode === "login" ? (
                      <>New here?{" "}
                        <button onClick={() => setMode("signup")}
                          style={{ color: "var(--accent)", fontWeight: 500 }}>
                          Create an account
                        </button>
                      </>
                    ) : (
                      <>Already have an account?{" "}
                        <button onClick={() => setMode("login")}
                          style={{ color: "var(--accent)", fontWeight: 500 }}>
                          Log in
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </section>

          <BrandPanel />
        </div>

        {/* Tiny dev affordance: toggle "from checkout" demo */}
        <div style={{
          marginTop: 24,
          fontSize: 11,
          color: "rgba(255,255,255,0.30)",
          textAlign: "center"
        }}>
          {fromCheckout
            ? <>Showing checkout-flow variant · <a href="Login.html" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "underline" }}>view direct variant</a></>
            : <>Direct-link variant · <a href="Login.html?from=checkout" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "underline" }}>view checkout-flow variant</a> (adds guest checkout link)</>}
        </div>
      </main>

      <style>{`
        @media (max-width: 900px) {
          .login-grid {
            grid-template-columns: 1fr !important;
          }
          .login-grid > aside { order: -1; min-height: 0 !important; padding: 32px 24px !important; }
        }
      `}</style>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<LoginApp />);
