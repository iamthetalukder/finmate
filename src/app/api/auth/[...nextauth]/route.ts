import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const OPENAI_KEY = process.env.OPENAI_API_KEY!;

async function sendMessage(chat_id: number, text: string) {
  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id, text, parse_mode: "HTML" }),
  });
}

async function parseTransaction(message: string) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `Parse this message into a financial transaction. Message: "${message}"
        
Respond in JSON only:
{
  "type": "expense" or "income",
  "amount": number,
  "category": one of [food, transport, shopping, housing, health, entertainment, income, other],
  "note": "short description",
  "currency": "BDT" or "USD",
  "is_transaction": true or false
}

If the message is not about money/spending, set is_transaction to false.
Support Bengali and English. Examples:
- "spent 200 on food" → expense, 200, food
- "চা ১৫ টাকা" → expense, 15, food, BDT
- "received 5000 salary" → income, 5000, income
- "hello" → is_transaction: false`,
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 150,
    }),
  });
  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

async function getOrCreateUser(telegram_id: number, username: string) {
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

I can help you track your finances by just sending me a message.

<b>Examples:</b>
- "spent 200 on food"
- "চা ১৫ টাকা"
- "received 5000 salary"
- "transport 50"

<b>Commands:</b>
/balance - See your monthly summary
/connect - Link to your FinMate account
/help - Show this message

To get started, connect your FinMate account with /connect`,
    );
    return NextResponse.json({ ok: true });
  }

  if (text === "/help") {
    await sendMessage(
      chat_id,
      `<b>FinMate Bot Commands:</b>

💰 Log expense: "spent 200 on food"
💵 Log income: "received 5000 salary"  
🇧🇩 Bengali: "চা ১৫ টাকা"
📊 /balance - Monthly summary
🔗 /connect - Link FinMate account
❓ /help - Show commands`,
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

Once connected, I'll automatically log your transactions!`,
    );
    return NextResponse.json({ ok: true });
  }

  if (text === "/balance") {
    const user = await getOrCreateUser(chat_id, username);
    if (!user) {
      await sendMessage(
        chat_id,
        "❌ Please connect your FinMate account first. Send /connect for instructions.",
      );
      return NextResponse.json({ ok: true });
    }

    const { data: transactions } = await supabaseAdmin
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
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

    await sendMessage(
      chat_id,
      `📊 <b>Your Monthly Summary</b>

💚 Income:  $${income.toFixed(2)}
❤️ Expenses: $${expense.toFixed(2)}
💙 Savings:  $${(income - expense).toFixed(2)}

Total transactions: ${transactions?.length || 0}`,
    );
    return NextResponse.json({ ok: true });
  }

  const parsed = await parseTransaction(text);

  if (!parsed.is_transaction) {
    await sendMessage(
      chat_id,
      `I didn't understand that as a transaction. Try something like:
- "spent 200 on food"
- "received 5000 salary"
- "চা ১৫ টাকা"

Send /help for more examples.`,
    );
    return NextResponse.json({ ok: true });
  }

  const user = await getOrCreateUser(chat_id, username);

  if (!user) {
    const { data: saved } = await supabaseAdmin
      .from("transactions")
      .insert([
        {
          user_id: "00000000-0000-0000-0000-000000000001",
          type: parsed.type,
          category: parsed.category,
          amount: parsed.amount,
          currency: parsed.currency || "USD",
          note: parsed.note || text,
          date: new Date().toISOString().split("T")[0],
        },
      ])
      .select();

    const emoji = parsed.type === "expense" ? "❤️" : "💚";
    const sign = parsed.type === "expense" ? "-" : "+";
    await sendMessage(
      chat_id,
      `${emoji} <b>Transaction logged!</b>

${sign}${parsed.currency === "BDT" ? "৳" : "$"}${parsed.amount} — ${parsed.note}
Category: ${parsed.category}

<i>Connect your FinMate account with /connect to sync across all devices.</i>`,
    );
    return NextResponse.json({ ok: true });
  }

  await sendMessage(
    chat_id,
    `✅ Logged: ${parsed.type} of $${parsed.amount} for ${parsed.category}`,
  );
  return NextResponse.json({ ok: true });
}
