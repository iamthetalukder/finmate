"use client";
import { useState } from "react";

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

export default function Dashboard() {
  const [dark, setDark] = useState(false);
  const bg = dark ? "#0F0E1A" : "#F7F7FA";
  const surface = dark ? "#1A1928" : "#FFFFFF";
  const surface2 = dark ? "#232236" : "#F0EFF8";
  const border = dark ? "#2E2C4A" : "#E4E2F5";
  const text = dark ? "#EEEDF8" : "#1A1A2E";
  const muted = dark ? "#9896C8" : "#5A5880";
  const hint = dark ? "#5F5D88" : "#9896B8";
  const primary = dark ? "#7F77FF" : "#6C63FF";
  const primaryLight = dark ? "#2A2848" : "#EEEDFE";
  const green = dark ? "#2DBE8E" : "#1D9E75";
  const greenLight = dark ? "#0D2B22" : "#E1F5EE";
  const greenDark = dark ? "#9FE1CB" : "#085041";
  const red = dark ? "#F06B6A" : "#E24B4A";
  const redLight = dark ? "#2B1515" : "#FCEBEB";
  const redDark = dark ? "#F7C1C1" : "#791F1F";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bg,
        transition: "all .3s",
        fontFamily: "system-ui,sans-serif",
      }}
    >
      <div
        style={{
          background: surface,
          borderBottom: `0.5px solid ${border}`,
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 600, color: primary }}>
          FinMate{" "}
          <span
            style={{
              color: muted,
              fontWeight: 400,
              fontSize: 12,
              marginLeft: 6,
            }}
          >
            AI Finance
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, color: muted }}>
            {dark ? "Dark" : "Light"} mode
          </span>
          <div
            onClick={() => setDark(!dark)}
            style={{
              width: 44,
              height: 24,
              borderRadius: 12,
              background: dark ? primary : border,
              cursor: "pointer",
              position: "relative",
              transition: "background .25s",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 3,
                left: dark ? 23 : 3,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#fff",
                transition: "left .25s",
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div
          style={{
            width: 200,
            minHeight: "calc(100vh - 53px)",
            background: surface,
            borderRight: `0.5px solid ${border}`,
            padding: "16px 0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {["Dashboard", "Transactions", "AI Advisor", "Reports", "Goals"].map(
            (item, i) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  fontSize: 13,
                  color: i === 0 ? primary : muted,
                  background: i === 0 ? primaryLight : "transparent",
                  fontWeight: i === 0 ? 500 : 400,
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "currentColor",
                    opacity: i === 0 ? 1 : 0.5,
                  }}
                />
                {item}
              </div>
            ),
          )}
          <div style={{ flex: 1 }} />
          <div
            style={{
              margin: "0 10px",
              background: primaryLight,
              borderRadius: 10,
              padding: 10,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: primary,
                marginBottom: 2,
              }}
            >
              Free plan
            </div>
            <div style={{ fontSize: 10, color: muted, marginBottom: 7 }}>
              18 of 30 transactions
            </div>
            <div
              style={{
                height: 3,
                background: border,
                borderRadius: 2,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: "60%",
                  height: "100%",
                  background: primary,
                  borderRadius: 2,
                }}
              />
            </div>
            <div
              style={{
                background: primary,
                color: "#fff",
                borderRadius: 6,
                padding: "6px",
                fontSize: 11,
                fontWeight: 500,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              Upgrade to Pro
            </div>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, color: text }}>
                Good morning, Alex
              </div>
              <div style={{ fontSize: 12, color: muted, marginTop: 2 }}>
                March 2026 · 3 days left this month
              </div>
            </div>
            <div
              style={{
                background: primary,
                color: "#fff",
                padding: "9px 18px",
                borderRadius: 9,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              + Add expense
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 12,
            }}
          >
            {[
              {
                label: "Total income",
                value: "$3,240",
                change: "+8% vs last month",
                positive: true,
              },
              {
                label: "Total spent",
                value: "$1,870",
                change: "+14% vs last month",
                positive: false,
              },
              {
                label: "Net savings",
                value: "$1,370",
                change: "+$210 saved",
                positive: true,
              },
            ].map((card) => (
              <div
                key={card.label}
                style={{
                  background: surface,
                  border: `0.5px solid ${border}`,
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: hint,
                    marginBottom: 6,
                    textTransform: "uppercase" as const,
                    letterSpacing: ".04em",
                    fontWeight: 500,
                  }}
                >
                  {card.label}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color:
                      card.label === "Total income"
                        ? green
                        : card.label === "Total spent"
                          ? red
                          : text,
                  }}
                >
                  {card.value}
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    fontSize: 11,
                    padding: "2px 8px",
                    borderRadius: 20,
                    marginTop: 6,
                    fontWeight: 500,
                    background: card.positive ? greenLight : redLight,
                    color: card.positive ? greenDark : redDark,
                  }}
                >
                  {card.change}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: 16,
            }}
          >
            <div
              style={{
                background: surface,
                border: `0.5px solid ${border}`,
                borderRadius: 12,
                padding: 16,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: muted,
                  textTransform: "uppercase" as const,
                  letterSpacing: ".04em",
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
                        background: greenLight,
                        border: `0.5px solid ${green}`,
                        borderRadius: "3px 3px 0 0",
                      }}
                    />
                    <div
                      style={{
                        width: "100%",
                        height: b.exp,
                        background: redLight,
                        border: `0.5px solid ${red}`,
                        borderRadius: "3px 3px 0 0",
                      }}
                    />
                    <div style={{ fontSize: 9, color: hint }}>{b.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
                {[
                  { c: greenLight, b: green, l: "Income" },
                  { c: redLight, b: red, l: "Spending" },
                ].map((l) => (
                  <div
                    key={l.l}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 10,
                      color: muted,
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

            <div
              style={{
                background: surface,
                border: `0.5px solid ${border}`,
                borderRadius: 12,
                padding: 16,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: muted,
                  textTransform: "uppercase" as const,
                  letterSpacing: ".04em",
                  marginBottom: 12,
                }}
              >
                Recent
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {transactions.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                      padding: 8,
                      background: surface2,
                      borderRadius: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        background:
                          t.type === "income" ? primaryLight : redLight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
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
                          color: text,
                          whiteSpace: "nowrap" as const,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {t.name}
                      </div>
                      <div style={{ fontSize: 10, color: hint }}>
                        {t.category} · {t.date}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: t.amount > 0 ? green : red,
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

          <div style={{ background: primary, borderRadius: 12, padding: 16 }}>
            <div
              style={{
                fontSize: 10,
                background: "rgba(255,255,255,.2)",
                color: "#fff",
                padding: "2px 10px",
                borderRadius: 20,
                display: "inline-block",
                marginBottom: 8,
                fontWeight: 500,
              }}
            >
              AI insight · today
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#fff",
                lineHeight: 1.55,
                marginBottom: 10,
              }}
            >
              You spent 20% more on food this week — mostly dining out. Your 4
              coffee visits totalled $24 this week alone.
            </div>
            <div
              style={{
                background: "rgba(255,255,255,.12)",
                borderRadius: 8,
                padding: "9px 12px",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  color: "rgba(255,255,255,.6)",
                  textTransform: "uppercase" as const,
                  letterSpacing: ".05em",
                  marginBottom: 3,
                }}
              >
                Daily savings tip
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,.9)",
                  lineHeight: 1.5,
                }}
              >
                Brewing coffee at home 3 days/week saves ~$72/month — enough for
                a small emergency fund.
              </div>
            </div>
          </div>

          <div
            style={{
              background: surface,
              border: `0.5px solid ${border}`,
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 8,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 600, color: text }}>
                $1,370
              </div>
              <div style={{ fontSize: 12, color: hint }}>
                91% of $1,500 goal
              </div>
            </div>
            <div
              style={{
                height: 6,
                background: border,
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "91%",
                  height: "100%",
                  background: primary,
                  borderRadius: 3,
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 10,
                color: hint,
                marginTop: 4,
              }}
            >
              <span>$0</span>
              <span style={{ color: primary, fontWeight: 500 }}>91%</span>
              <span>$1,500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
