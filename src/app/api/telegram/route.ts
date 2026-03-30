import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

async function sendMessage(chat_id: number, text: string) {
  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id, text, parse_mode: "HTML" }),
  });
}

async function parseTransaction(message: string) {
  const lower = message.toLowerCase();

  const categories: Record<string, string[]> = {
    food: [
      "food",
      "eat",
      "lunch",
      "dinner",
      "breakfast",
      "coffee",
      "tea",
      "restaurant",
      "চা",
      "খাবার",
      "ভাত",
      "rice",
      "snack",
      "burger",
      "pizza",
    ],
    transport: [
      "transport",
      "bus",
      "rickshaw",
      "uber",
      "taxi",
      "ride",
      "রিকশা",
      "বাস",
      "train",
      "metro",
      "fuel",
      "petrol",
      "cng",
    ],
    shopping: [
      "shopping",
      "clothes",
      "shirt",
      "shoes",
      "buy",
      "কেনা",
      "dress",
      "amazon",
      "mall",
      "market",
    ],
    health: [
      "medicine",
      "doctor",
      "hospital",
      "pharmacy",
      "ওষুধ",
      "clinic",
      "gym",
      "health",
    ],
    entertainment: [
      "netflix",
      "movie",
      "game",
      "cinema",
      "spotify",
      "youtube",
      "subscription",
      "ticket",
    ],
    housing: [
      "rent",
      "electricity",
      "water",
      "bill",
      "internet",
      "wifi",
      "gas",
      "house",
      "বাড়ি",
    ],
    income: [
      "salary",
      "income",
      "received",
      "earned",
      "payment",
      "বেতন",
      "পেলাম",
      "freelance",
      "got paid",
      "invoice",
      "paid me",
    ],
  };

  const currencyMap: Record<string, string[]> = {
    BDT: ["taka", "টাকা", "৳", "bdt", "tk"],
    USD: ["usd", "dollar", "dollars", "$"],
    EUR: ["eur", "euro", "€", "euros"],
    GBP: ["gbp", "pound", "£", "pounds"],
    INR: ["inr", "rupee", "₹", "rupees", "rs"],
    PKR: ["pkr", "pakistani rupee"],
    AED: ["aed", "dirham", "dirhams"],
    SAR: ["sar", "riyal", "riyals"],
    MYR: ["myr", "ringgit", "rm"],
    SGD: ["sgd", "singapore dollar"],
    CAD: ["cad", "canadian dollar"],
    AUD: ["aud", "australian dollar"],
    JPY: ["jpy", "yen", "¥"],
    CNY: ["cny", "yuan", "rmb"],
    TRY: ["try", "lira", "turkish lira"],
    IDR: ["idr", "rupiah"],
    PHP: ["php", "peso", "pesos"],
    THB: ["thb", "baht"],
    NGN: ["ngn", "naira"],
    KES: ["kes", "shilling"],
  };

  const currencySymbols: Record<string, string> = {
    BDT: "৳",
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    PKR: "₨",
    AED: "د.إ",
    SAR: "﷼",
    MYR: "RM",
    SGD: "S$",
    CAD: "C$",
    AUD: "A$",
    JPY: "¥",
    CNY: "¥",
    TRY: "₺",
    IDR: "Rp",
    PHP: "₱",
    THB: "฿",
    NGN: "₦",
    KES: "KSh",
  };

  const isIncome = [
    "received",
    "earned",
    "salary",
    "income",
    "got paid",
    "পেলাম",
    "বেতন",
    "freelance paid",
    "paid me",
  ].some((w) => lower.includes(w));

  const numbers = message.match(/\d+(\.\d+)?/g);
  const amount = numbers ? parseFloat(numbers[0]) : 0;

  if (amount === 0) return { is_transaction: false };

  let detectedCurrency = "USD";
  for (const [currency, keywords] of Object.entries(currencyMap)) {
    if (keywords.some((k) => lower.includes(k))) {
      detectedCurrency = currency;
      break;
    }
  }

  if (detectedCurrency === "USD" && amount > 500) {
    detectedCurrency = "BDT";
  }

  let category = "other";
  for (const [cat, keywords] of Object.entries(categories)) {
    if (keywords.some((k) => lower.includes(k))) {
      category = cat;
      break;
    }
  }

  return {
    is_transaction: true,
    type: isIncome ? "income" : "expense",
    amount,
    category: isIncome ? "income" : category,
    note: message,
    currency: detectedCurrency,
    symbol: currencySymbols[detectedCurrency] || detectedCurrency,
  };
}

async function getOrCreateUser(telegram_id: number) {
  const { data: existing } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("telegram_id", telegram_id)
    .single();

  if (existing) return existing;
  return null;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const message = body.message;

  if (!message) return NextResponse.json({ ok: true });

  const chat_id = message.chat.id;
  const text = message.text || "";
  const username = message.from?.username || "User";

  if (text === "/start") {
    await sendMessage(
      chat_id,
      `👋 Welcome to <b>FinMate AI</b>!

I can help you track your finances in any currency just by sending me a message.

<b>Examples:</b>
- "spent $50 on food"
- "paid £30 for transport"
- "চা ১৫ টাকা"
- "dinner ₹500"
- "rent 1200 dirham"
- "received salary 50000"

<b>Commands:</b>
/balance - Monthly summary
/connect - Link FinMate account
/help - Show examples`,
    );
    return NextResponse.json({ ok: true });
  }

  if (text === "/help") {
    await sendMessage(
      chat_id,
      `<b>FinMate Bot — Supported Currencies:</b>

🇧🇩 BDT — taka, টাকা, ৳
🇺🇸 USD — dollar, $
🇬🇧 GBP — pound, £
🇪🇺 EUR — euro, €
🇮🇳 INR — rupee, ₹
🇦🇪 AED — dirham
🇸🇦 SAR — riyal
🇲🇾 MYR — ringgit
🇸🇬 SGD — singapore dollar
🇯🇵 JPY — yen, ¥
🇨🇳 CNY — yuan
🇵🇰 PKR — pakistani rupee
🇨🇦 CAD — canadian dollar
🇦🇺 AUD — australian dollar
🇹🇷 TRY — lira
🇮🇩 IDR — rupiah
🇵🇭 PHP — peso
🇹🇭 THB — baht
🇳🇬 NGN — naira
🇰🇪 KES — shilling

<b>Just send a message in any language!</b>`,
    );
    return NextResponse.json({ ok: true });
  }

  if (text === "/connect") {
    await sendMessage(
      chat_id,
      `🔗 <b>Connect your FinMate account</b>

Visit your FinMate dashboard and go to:
Settings → Telegram → Enter this code:

<code>TG-${chat_id}</code>

Once connected, all transactions sync across devices!`,
    );
    return NextResponse.json({ ok: true });
  }

  if (text === "/balance") {
    const user = await getOrCreateUser(chat_id);
    const userId = user?.id || "00000000-0000-0000-0000-000000000001";

    const { data: transactions } = await supabaseAdmin
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .gte(
        "date",
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          .toISOString()
          .split("T")[0],
      );

    const income =
      transactions
        ?.filter((t) => t.type === "income")
        .reduce((s, t) => s + t.amount, 0) || 0;
    const expense =
      transactions
        ?.filter((t) => t.type === "expense")
        .reduce((s, t) => s + t.amount, 0) || 0;
    const count = transactions?.length || 0;

    await sendMessage(
      chat_id,
      `📊 <b>Your Monthly Summary</b>

💚 Income:   $${income.toFixed(2)}
❤️ Expenses: $${expense.toFixed(2)}
💙 Savings:  $${(income - expense).toFixed(2)}

📝 Total transactions: ${count}

<i>Visit finmate-theta.vercel.app for full dashboard</i>`,
    );
    return NextResponse.json({ ok: true });
  }

  const parsed = await parseTransaction(text);

  if (!parsed.is_transaction) {
    await sendMessage(
      chat_id,
      `I didn't understand that as a transaction.

<b>Try something like:</b>
- "spent $50 on food"
- "চা ১৫ টাকা"
- "received salary 50000"
- "transport £15"

Send /help to see all supported currencies.`,
    );
    return NextResponse.json({ ok: true });
  }

  await supabaseAdmin.from("transactions").insert([
    {
      user_id: "00000000-0000-0000-0000-000000000001",
      type: parsed.type,
      category: parsed.category,
      amount: parsed.amount,
      currency: parsed.currency,
      note: parsed.note || text,
      date: new Date().toISOString().split("T")[0],
    },
  ]);

  const emoji = parsed.type === "expense" ? "❤️" : "💚";
  const sign = parsed.type === "expense" ? "-" : "+";

  await sendMessage(
    chat_id,
    `${emoji} <b>Transaction logged!</b>

${sign}${parsed.symbol}${parsed.amount} (${parsed.currency})
📁 Category: ${parsed.category}
📝 Note: ${parsed.note}
📅 Date: ${new Date().toLocaleDateString()}

<i>Send /balance to see your monthly summary</i>`,
  );

  return NextResponse.json({ ok: true });
}
