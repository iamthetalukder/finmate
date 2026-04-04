"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const transactions = [
  {
    id: 1,
    name: "Grocery store",
    category: "Food",
    date: "Today",
    amount: -48,
    type: "expense",
  },
  {
    id: 2,
    name: "Freelance payment",
    category: "Income",
    date: "Yesterday",
    amount: 800,
    type: "income",
  },
  {
    id: 3,
    name: "Transport",
    category: "Travel",
    date: "2 days ago",
    amount: -12,
    type: "expense",
  },
  {
    id: 4,
    name: "Coffee shop",
    category: "Food",
    date: "2 days ago",
    amount: -6,
    type: "expense",
  },
  {
    id: 5,
    name: "Netflix",
    category: "Entertainment",
    date: "3 days ago",
    amount: -15,
    type: "expense",
  },
];

const navItems = [
  { label: "Dashboard", icon: "🏠" },
  { label: "Transactions", icon: "📋" },
  { label: "AI Advisor", icon: "🤖" },
  { label: "Reports", icon: "📊" },
  { label: "Goals", icon: "🎯" },
];

export default function Dashboard() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [dark, setDark] = useState(false);

  const theme = {
    bg: dark ? "#0A0A0A" : "#FAFAFA",
    surface: dark ? "#141414" : "#FFFFFF",
    surface2: dark ? "#1A1A1A" : "#F5F5F5",
    border: dark ? "#2A2A2A" : "#EBEBEB",
    text: dark ? "#F5F5F5" : "#0A0A0A",
    text2: dark ? "#888888" : "#555555",
    text3: dark ? "#555555" : "#999999",
    accent: "#4AE090",
    accentLight: dark ? "#0A2A1A" : "#E8FFF4",
    accentDark: dark ? "#4AE090" : "#0A5C34",
    red: dark ? "#FF6B6B" : "#E24B4A",
    redLight: dark ? "#2A0A0A" : "#FFF0F0",
    green: dark ? "#4AE090" : "#1D9E75",
    greenLight: dark ? "#0A2A1A" : "#E8FFF4",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bg,
        fontFamily: "system-ui, sans-serif",
        transition: "all .2s",
      }}
    >
      {/* Top navbar */}
      <nav
        style={{
          background: theme.surface,
          borderBottom: `0.5px solid ${theme.border}`,
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700, color: theme.text }}>
          Fin<span style={{ color: theme.accent }}>Mate</span>
        </div>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: "none", gap: 4 }}>
          {navItems.map((item) => (
            <div
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: activeNav === item.label ? 600 : 400,
                color: activeNav === item.label ? theme.text : theme.text2,
                background:
                  activeNav === item.label ? theme.surface2 : "transparent",
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {item.label}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Dark mode toggle */}
          <div
            onClick={() => setDark(!dark)}
            style={{
              width: 40,
              height: 22,
              borderRadius: 11,
              background: dark ? theme.accent : theme.border,
              cursor: "pointer",
              position: "relative",
              transition: "background .25s",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 3,
                left: dark ? 21 : 3,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#fff",
                transition: "left .25s",
                boxShadow: "0 1px 3px rgba(0,0,0,.2)",
              }}
            />
          </div>

          {/* Add expense button */}
          <button
            onClick={() => router.push("/add")}
            style={{
              background: theme.accent,
              color: "#0A0A0A",
              border: "none",
              borderRadius: 9,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            + Add
          </button>

          {/* Avatar */}
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: theme.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
              color: "#0A0A0A",
            }}
          >
            AR
          </div>
        </div>
      </nav>

      <div style={{ display: "flex" }}>
        {/* Sidebar — desktop only */}
        <div
          className="sidebar"
          style={{
            display: "none",
            width: 220,
            minHeight: "calc(100vh - 53px)",
            background: theme.surface,
            borderRight: `0.5px solid ${theme.border}`,
            padding: "20px 12px",
            flexDirection: "column",
            gap: 2,
            position: "sticky",
            top: 53,
            height: "calc(100vh - 53px)",
          }}
        >
          {navItems.map((item) => (
            <div
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: activeNav === item.label ? 600 : 400,
                color: activeNav === item.label ? theme.text : theme.text2,
                background:
                  activeNav === item.label ? theme.surface2 : "transparent",
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </div>
          ))}

          <div style={{ flex: 1 }} />

          {/* Free plan box */}
          <div
            style={{
              background: theme.surface2,
              borderRadius: 12,
              padding: 14,
              border: `0.5px solid ${theme.border}`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: theme.text,
                marginBottom: 4,
              }}
            >
              Free plan
            </div>
            <div style={{ fontSize: 11, color: theme.text3, marginBottom: 8 }}>
              18 of 30 transactions
            </div>
            <div
              style={{
                height: 3,
                background: theme.border,
                borderRadius: 2,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: "60%",
                  height: "100%",
                  background: theme.accent,
                  borderRadius: 2,
                }}
              />
            </div>
            <button
              style={{
                width: "100%",
                padding: "8px",
                background: theme.accent,
                color: "#0A0A0A",
                border: "none",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Upgrade to Pro
            </button>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "24px 20px", maxWidth: "100%" }}>
          {/* Greeting */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: theme.text }}>
              Good morning, Alex 👋
            </div>
            <div style={{ fontSize: 13, color: theme.text3, marginTop: 3 }}>
              April 2026 · Here's your financial summary
            </div>
          </div>

          {/* Hero balance card */}
          <div
            style={{
              background: theme.text,
              borderRadius: 20,
              padding: "24px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#666",
                letterSpacing: ".08em",
                textTransform: "uppercase" as const,
                marginBottom: 6,
              }}
            >
              Net savings this month
            </div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-1px",
                marginBottom: 4,
              }}
            >
              $1,370
            </div>
            <div
              style={{ fontSize: 12, color: theme.accent, marginBottom: 16 }}
            >
              ↑ +$210 from last month · 42% savings rate
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => router.push("/add")}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: theme.accent,
                  color: "#0A0A0A",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                + Add expense
              </button>
              <button
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "rgba(255,255,255,.1)",
                  color: "#fff",
                  border: "0.5px solid rgba(255,255,255,.15)",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                View reports
              </button>
            </div>
          </div>

          {/* Metric cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 12,
              marginBottom: 16,
            }}
          >
            {[
              {
                label: "Income",
                value: "$3,240",
                change: "+8%",
                positive: true,
              },
              {
                label: "Expenses",
                value: "$1,870",
                change: "+14%",
                positive: false,
              },
              {
                label: "Savings rate",
                value: "42%",
                change: "+6%",
                positive: true,
              },
            ].map((card) => (
              <div
                key={card.label}
                style={{
                  background: theme.surface,
                  border: `0.5px solid ${theme.border}`,
                  borderRadius: 14,
                  padding: "14px 16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    marginBottom: 8,
                    background: card.positive
                      ? theme.greenLight
                      : theme.redLight,
                  }}
                >
                  <span style={{ fontSize: 14 }}>
                    {card.positive ? "↑" : "↓"}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: theme.text3,
                    textTransform: "uppercase" as const,
                    letterSpacing: ".06em",
                    marginBottom: 4,
                  }}
                >
                  {card.label}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: theme.text,
                    marginBottom: 4,
                  }}
                >
                  {card.value}
                </div>
                <div
                  style={{
                    display: "inline-block",
                    fontSize: 10,
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: 20,
                    background: card.positive
                      ? theme.greenLight
                      : theme.redLight,
                    color: card.positive ? theme.green : theme.red,
                  }}
                >
                  {card.change} vs last month
                </div>
              </div>
            ))}
          </div>

          {/* Two column grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
              marginBottom: 16,
            }}
          >
            {/* Chart */}
            <div
              style={{
                background: theme.surface,
                border: `0.5px solid ${theme.border}`,
                borderRadius: 14,
                padding: 16,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: theme.text2,
                  textTransform: "uppercase" as const,
                  letterSpacing: ".06em",
                  marginBottom: 14,
                }}
              >
                6-month overview
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 6,
                  height: 80,
                }}
              >
                {[
                  { inc: 42, exp: 30, label: "Oct" },
                  { inc: 38, exp: 34, label: "Nov" },
                  { inc: 52, exp: 42, label: "Dec" },
                  { inc: 46, exp: 36, label: "Jan" },
                  { inc: 50, exp: 38, label: "Feb" },
                  { inc: 62, exp: 52, label: "Mar" },
                ].map((b) => (
                  <div
                    key={b.label}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: b.inc,
                        background: theme.greenLight,
                        border: `0.5px solid ${theme.green}`,
                        borderRadius: "3px 3px 0 0",
                      }}
                    />
                    <div
                      style={{
                        width: "100%",
                        height: b.exp,
                        background: theme.redLight,
                        border: `0.5px solid ${theme.red}`,
                        borderRadius: "3px 3px 0 0",
                      }}
                    />
                    <div style={{ fontSize: 9, color: theme.text3 }}>
                      {b.label}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
                {[
                  { c: theme.greenLight, b: theme.green, l: "Income" },
                  { c: theme.redLight, b: theme.red, l: "Spending" },
                ].map((l) => (
                  <div
                    key={l.l}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 10,
                      color: theme.text2,
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        background: l.c,
                        border: `0.5px solid ${l.b}`,
                      }}
                    />
                    {l.l}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent transactions */}
            <div
              style={{
                background: theme.surface,
                border: `0.5px solid ${theme.border}`,
                borderRadius: 14,
                padding: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: theme.text2,
                    textTransform: "uppercase" as const,
                    letterSpacing: ".06em",
                  }}
                >
                  Recent
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: theme.accent,
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  See all →
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  background: theme.border,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                {transactions.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 12px",
                      background: theme.surface,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 9,
                        background:
                          t.type === "income"
                            ? theme.greenLight
                            : theme.redLight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                    >
                      {t.type === "income"
                        ? "💼"
                        : t.category === "Food"
                          ? "🍔"
                          : t.category === "Travel"
                            ? "🚌"
                            : "📦"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: theme.text,
                          whiteSpace: "nowrap" as const,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {t.name}
                      </div>
                      <div style={{ fontSize: 10, color: theme.text3 }}>
                        {t.category} · {t.date}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: t.amount > 0 ? theme.green : theme.red,
                        whiteSpace: "nowrap" as const,
                      }}
                    >
                      {t.amount > 0 ? "+" : ""}${Math.abs(t.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insight card */}
          <div
            style={{
              background: theme.text,
              borderRadius: 14,
              padding: 18,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: "inline-block",
                fontSize: 10,
                fontWeight: 600,
                background: theme.accent,
                color: "#0A0A0A",
                padding: "2px 10px",
                borderRadius: 20,
                marginBottom: 10,
                letterSpacing: ".04em",
              }}
            >
              AI INSIGHT · TODAY
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#fff",
                lineHeight: 1.6,
                marginBottom: 12,
              }}
            >
              You spent 20% more on food this week — mostly dining out. Your 4
              coffee visits totalled $24 this week alone.
            </div>
            <div
              style={{
                background: "rgba(255,255,255,.08)",
                borderRadius: 10,
                padding: "12px 14px",
                borderLeft: `3px solid ${theme.accent}`,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: theme.accent,
                  fontWeight: 600,
                  marginBottom: 4,
                  textTransform: "uppercase" as const,
                  letterSpacing: ".04em",
                }}
              >
                Daily tip
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,.8)",
                  lineHeight: 1.5,
                }}
              >
                Brewing coffee at home 3 days/week saves ~$72/month — enough for
                a small emergency fund.
              </div>
            </div>
            <button
              onClick={() => router.push("/chat")}
              style={{
                marginTop: 14,
                padding: "9px 18px",
                background: theme.accent,
                color: "#0A0A0A",
                border: "none",
                borderRadius: 9,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Chat with AI advisor →
            </button>
          </div>

          {/* Savings goal */}
          <div
            style={{
              background: theme.surface,
              border: `0.5px solid ${theme.border}`,
              borderRadius: 14,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 10,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: theme.text2,
                    textTransform: "uppercase" as const,
                    letterSpacing: ".06em",
                    marginBottom: 4,
                  }}
                >
                  Monthly savings goal
                </div>
                <div
                  style={{ fontSize: 24, fontWeight: 700, color: theme.text }}
                >
                  $1,370
                </div>
              </div>
              <div style={{ fontSize: 13, color: theme.text3 }}>
                of $1,500 goal
              </div>
            </div>
            <div
              style={{
                height: 6,
                background: theme.border,
                borderRadius: 3,
                overflow: "hidden",
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: "91%",
                  height: "100%",
                  background: theme.accent,
                  borderRadius: 3,
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: theme.text3,
              }}
            >
              <span>$0</span>
              <span style={{ color: theme.accent, fontWeight: 600 }}>
                91% complete
              </span>
              <span>$1,500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div
        className="mobile-nav"
        style={{
          display: "none",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: theme.text,
          padding: "10px 16px 20px",
          justifyContent: "space-around",
          borderTop: `0.5px solid ${theme.border}`,
          zIndex: 100,
        }}
      >
        {navItems.slice(0, 5).map((item) => (
          <div
            key={item.label}
            onClick={() => setActiveNav(item.label)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              fontSize: 9,
              cursor: "pointer",
              color: activeNav === item.label ? theme.accent : "#555",
              fontWeight: activeNav === item.label ? 600 : 400,
            }}
          >
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
      <style>{`
        @media (min-width: 768px) {
          .sidebar { display: flex !important; }
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 767px) {
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
