"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  "food",
  "transport",
  "shopping",
  "housing",
  "health",
  "entertainment",
  "income",
  "other",
];

export default function AddTransaction() {
  const router = useRouter();
  const [type, setType] = useState<"expense" | "income">("expense");
  const [category, setCategory] = useState("food");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const primary = "#6C63FF";
  const green = "#1D9E75";
  const red = "#E24B4A";

  async function handleSubmit() {
    if (!amount) return;
    setLoading(true);

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "00000000-0000-0000-0000-000000000001",
          type,
          category,
          amount: parseFloat(amount),
          note,
          date,
          currency: "USD",
        }),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        alert("Error: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert("Network error — check console");
    }

    setLoading(false);
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F7FA",
        fontFamily: "system-ui,sans-serif",
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div
            onClick={() => router.push("/dashboard")}
            style={{ cursor: "pointer", color: primary, fontSize: 13 }}
          >
            ← Back
          </div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Add transaction</div>
        </div>

        <div
          style={{
            background: "#fff",
            border: "0.5px solid #E4E2F5",
            borderRadius: 14,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Type toggle */}
          <div style={{ display: "flex", gap: 8 }}>
            {(["expense", "income"] as const).map((t) => (
              <div
                key={t}
                onClick={() => setType(t)}
                style={{
                  flex: 1,
                  padding: 10,
                  textAlign: "center",
                  borderRadius: 10,
                  border: `2px solid ${type === t ? (t === "expense" ? red : green) : "#E4E2F5"}`,
                  background:
                    type === t
                      ? t === "expense"
                        ? "#FCEBEB"
                        : "#E1F5EE"
                      : "#fff",
                  color:
                    type === t
                      ? t === "expense"
                        ? "#791F1F"
                        : "#085041"
                      : "#9896B8",
                  fontWeight: 500,
                  fontSize: 13,
                  cursor: "pointer",
                  transition: "all .15s",
                  textTransform: "capitalize" as const,
                }}
              >
                {t}
              </div>
            ))}
          </div>

          {/* Amount */}
          <div>
            <label
              style={{
                fontSize: 12,
                color: "#9896B8",
                display: "block",
                marginBottom: 6,
              }}
            >
              Amount
            </label>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: "100%",
                fontSize: 28,
                fontWeight: 600,
                border: "none",
                borderBottom: `2px solid ${primary}`,
                outline: "none",
                padding: "4px 0",
                background: "transparent",
                color: "#1A1A2E",
              }}
            />
          </div>

          {/* Category */}
          <div>
            <label
              style={{
                fontSize: 12,
                color: "#9896B8",
                display: "block",
                marginBottom: 6,
              }}
            >
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "0.5px solid #E4E2F5",
                borderRadius: 8,
                fontSize: 13,
                background: "#F7F7FA",
                color: "#1A1A2E",
                outline: "none",
              }}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Note */}
          <div>
            <label
              style={{
                fontSize: 12,
                color: "#9896B8",
                display: "block",
                marginBottom: 6,
              }}
            >
              Note (optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Lunch with team"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "0.5px solid #E4E2F5",
                borderRadius: 8,
                fontSize: 13,
                background: "#F7F7FA",
                color: "#1A1A2E",
                outline: "none",
              }}
            />
          </div>

          {/* Date */}
          <div>
            <label
              style={{
                fontSize: 12,
                color: "#9896B8",
                display: "block",
                marginBottom: 6,
              }}
            >
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "0.5px solid #E4E2F5",
                borderRadius: 8,
                fontSize: 13,
                background: "#F7F7FA",
                color: "#1A1A2E",
                outline: "none",
              }}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading || !amount}
            style={{
              width: "100%",
              padding: 14,
              background: success ? green : primary,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "all .2s",
            }}
          >
            {success
              ? "✓ Saved! Redirecting..."
              : loading
                ? "Saving..."
                : "Save transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}
