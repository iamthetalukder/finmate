"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CURRENCIES = [
  { code: "BDT", flag: "🇧🇩", name: "Bangladeshi Taka" },
  { code: "USD", flag: "🇺🇸", name: "US Dollar" },
  { code: "EUR", flag: "🇪🇺", name: "Euro" },
  { code: "GBP", flag: "🇬🇧", name: "British Pound" },
  { code: "INR", flag: "🇮🇳", name: "Indian Rupee" },
  { code: "AED", flag: "🇦🇪", name: "UAE Dirham" },
  { code: "SAR", flag: "🇸🇦", name: "Saudi Riyal" },
  { code: "MYR", flag: "🇲🇾", name: "Malaysian Ringgit" },
  { code: "SGD", flag: "🇸🇬", name: "Singapore Dollar" },
  { code: "CAD", flag: "🇨🇦", name: "Canadian Dollar" },
  { code: "AUD", flag: "🇦🇺", name: "Australian Dollar" },
  { code: "JPY", flag: "🇯🇵", name: "Japanese Yen" },
  { code: "PKR", flag: "🇵🇰", name: "Pakistani Rupee" },
  { code: "TRY", flag: "🇹🇷", name: "Turkish Lira" },
  { code: "NGN", flag: "🇳🇬", name: "Nigerian Naira" },
];

function getStrength(p: string) {
  if (p.length === 0) return 0;
  if (p.length < 6) return 1;
  if (p.length < 8) return 2;
  if (/[A-Z]/.test(p) && /[0-9]/.test(p)) return 4;
  return 3;
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currency, setCurrency] = useState("BDT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const strength = getStrength(password);
  const strengthColors = [
    "#EBEBEB",
    "#E24B4A",
    "#F59E0B",
    "#4AE090",
    "#4AE090",
  ];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

  async function handleRegister() {
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1500);
  }

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    border: "0.5px solid var(--border)",
    borderRadius: 10,
    fontSize: 14,
    color: "var(--text)",
    background: "var(--bg)",
    outline: "none",
    transition: "border-color .15s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Nav */}
      <nav
        style={{
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--surface)",
          borderBottom: "0.5px solid var(--border)",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700 }}>
          Fin<span style={{ color: "var(--accent)" }}>Mate</span>
        </div>
        <button
          onClick={() => router.push("/login")}
          style={{
            background: "transparent",
            border: "0.5px solid var(--border2)",
            borderRadius: 8,
            padding: "7px 16px",
            fontSize: 13,
            color: "var(--text)",
            cursor: "pointer",
          }}
        >
          Sign in
        </button>
      </nav>

      {/* Main */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: 48,
            width: "100%",
            maxWidth: 960,
            alignItems: "center",
          }}
          className="auth-grid"
        >
          {/* Left branding */}
          <div className="auth-brand" style={{ display: "none" }}>
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: 8,
                lineHeight: 1.3,
              }}
            >
              Join thousands of
              <br />
              <span style={{ color: "var(--accent)" }}>smart savers.</span>
            </div>
            <div
              style={{
                fontSize: 13,
                color: "var(--text2)",
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              Start tracking your finances today. Free forever with AI-powered
              insights that actually help you save.
            </div>
            <div
              style={{
                background: "var(--primary)",
                borderRadius: "var(--radius-lg)",
                padding: 20,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--accent)",
                  marginBottom: 10,
                  letterSpacing: ".04em",
                  textTransform: "uppercase" as const,
                }}
              >
                Free plan includes
              </div>
              {[
                "30 transactions per month",
                "1 AI insight per week",
                "5 AI chat messages per day",
                "Telegram bot access",
                "Dashboard + charts",
              ].map((f) => (
                <div
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 12,
                    color: "#999",
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "#1A1A1A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 9,
                      color: "var(--accent)",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </div>
                  {f}
                </div>
              ))}
            </div>
            <div
              style={{
                background: "var(--accent-light)",
                borderRadius: "var(--radius)",
                padding: "12px 16px",
                fontSize: 12,
                color: "var(--accent-dark)",
                fontWeight: 500,
              }}
            >
              Upgrade to Pro anytime from $3/month
            </div>
          </div>

          {/* Form */}
          <div
            style={{
              background: "var(--surface)",
              borderRadius: "var(--radius-lg)",
              border: "0.5px solid var(--border)",
              padding: "32px 28px",
              boxShadow: "var(--shadow)",
              width: "100%",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
              Create free account
            </div>
            <div
              style={{ fontSize: 13, color: "var(--text3)", marginBottom: 24 }}
            >
              No credit card needed · Cancel anytime
            </div>

            {/* Google */}
            <button
              style={{
                width: "100%",
                padding: "12px",
                background: "var(--primary)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--radius)",
                fontSize: 13,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#EA4335",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                G
              </div>
              Sign up with Google
            </button>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
                fontSize: 12,
                color: "var(--text3)",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "0.5px",
                  background: "var(--border)",
                }}
              />
              or use email
              <div
                style={{
                  flex: 1,
                  height: "0.5px",
                  background: "var(--border)",
                }}
              />
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  background: "var(--red-light)",
                  color: "var(--red)",
                  fontSize: 12,
                  padding: "10px 14px",
                  borderRadius: 10,
                  marginBottom: 14,
                }}
              >
                {error}
              </div>
            )}

            {/* Name */}
            <div style={{ marginBottom: 12 }}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--text2)",
                  display: "block",
                  marginBottom: 5,
                }}
              >
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Rahman"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: 12 }}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--text2)",
                  display: "block",
                  marginBottom: 5,
                }}
              >
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 6 }}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--text2)",
                  display: "block",
                  marginBottom: 5,
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            {/* Strength bar */}
            {password.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: 3,
                        borderRadius: 2,
                        background:
                          i <= strength
                            ? strengthColors[strength]
                            : "var(--border)",
                        transition: "background .3s",
                      }}
                    />
                  ))}
                </div>
                <div style={{ fontSize: 10, color: strengthColors[strength] }}>
                  {strengthLabels[strength]}
                </div>
              </div>
            )}

            {/* Currency */}
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--text2)",
                  display: "block",
                  marginBottom: 5,
                }}
              >
                Preferred currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} — {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              onClick={handleRegister}
              disabled={loading}
              style={{
                width: "100%",
                padding: "13px",
                background: "var(--accent)",
                color: "var(--text)",
                border: "none",
                borderRadius: "var(--radius)",
                fontSize: 14,
                fontWeight: 700,
                opacity: loading ? 0.7 : 1,
                transition: "opacity .15s",
                marginBottom: 12,
              }}
            >
              {loading ? "Creating account..." : "Create free account →"}
            </button>

            <div
              style={{
                fontSize: 11,
                color: "var(--text3)",
                textAlign: "center",
                marginBottom: 14,
                lineHeight: 1.5,
              }}
            >
              By signing up you agree to our{" "}
              <span style={{ color: "var(--text)", cursor: "pointer" }}>
                Terms
              </span>{" "}
              and{" "}
              <span style={{ color: "var(--text)", cursor: "pointer" }}>
                Privacy Policy
              </span>
            </div>

            <div
              style={{
                textAlign: "center",
                fontSize: 13,
                color: "var(--text3)",
              }}
            >
              Already have an account?{" "}
              <span
                onClick={() => router.push("/login")}
                style={{
                  color: "var(--text)",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Sign in →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          padding: "16px 24px",
          textAlign: "center",
          borderTop: "0.5px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <div style={{ fontSize: 12, color: "var(--text3)" }}>
          © {new Date().getFullYear()} Developed by{" "}
          <span style={{ color: "var(--text)", fontWeight: 500 }}>
            FrictionLab
          </span>
        </div>
      </footer>

      <style>{`
        @media (min-width: 700px) {
          .auth-grid { grid-template-columns: 1fr 1fr !important; }
          .auth-brand { display: block !important; }
        }
      `}</style>
    </div>
  );
}
