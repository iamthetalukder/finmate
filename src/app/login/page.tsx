"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1500);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top nav */}
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
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>
          Fin<span style={{ color: "var(--accent)" }}>Mate</span>
        </div>
        <button
          onClick={() => router.push("/register")}
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
          Create account
        </button>
      </nav>

      {/* Main content */}
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
            gridTemplateColumns: "clamp(280px, 45%, 480px)",
            gap: 48,
            width: "100%",
            maxWidth: 960,
            alignItems: "center",
          }}
          className="auth-grid"
        >
          {/* Left — branding (hidden on mobile) */}
          <div className="auth-brand" style={{ display: "none" }}>
            <div
              style={{
                background: "var(--primary)",
                borderRadius: "var(--radius-lg)",
                padding: 32,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 6,
                }}
              >
                Track smarter.
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "var(--accent)",
                }}
              >
                Save better.
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#666",
                  marginTop: 12,
                  lineHeight: 1.7,
                }}
              >
                AI-powered finance for professionals. 20 currencies. Real-time
                insights.
              </div>
            </div>
            {[
              "AI spending insights & daily tips",
              "Telegram bot — log by chat",
              "20 currencies including BDT & INR",
              "Free plan — no credit card needed",
            ].map((f) => (
              <div
                key={f}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 13,
                  color: "var(--text2)",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "var(--accent-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    color: "var(--accent-dark)",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </div>
                {f}
              </div>
            ))}
          </div>

          {/* Right — form */}
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
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: 4,
              }}
            >
              Welcome back
            </div>
            <div
              style={{ fontSize: 13, color: "var(--text3)", marginBottom: 24 }}
            >
              Sign in to your FinMate account
            </div>

            {/* Google button */}
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
              Continue with Google
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
              or sign in with email
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
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  border: "0.5px solid var(--border)",
                  borderRadius: 10,
                  fontSize: 14,
                  color: "var(--text)",
                  background: "var(--bg)",
                  outline: "none",
                  transition: "border-color .15s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 8 }}>
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
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  border: "0.5px solid var(--border)",
                  borderRadius: 10,
                  fontSize: 14,
                  color: "var(--text)",
                  background: "var(--bg)",
                  outline: "none",
                  transition: "border-color .15s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            {/* Forgot */}
            <div
              style={{
                textAlign: "right",
                fontSize: 12,
                color: "var(--text3)",
                marginBottom: 20,
                cursor: "pointer",
              }}
            >
              Forgot password?
            </div>

            {/* Submit */}
            <button
              onClick={handleLogin}
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
                marginBottom: 16,
              }}
            >
              {loading ? "Signing in..." : "Sign in →"}
            </button>

            <div
              style={{
                textAlign: "center",
                fontSize: 13,
                color: "var(--text3)",
              }}
            >
              No account?{" "}
              <span
                onClick={() => router.push("/register")}
                style={{
                  color: "var(--text)",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Create one free →
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 700px) {
          .auth-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .auth-brand {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
