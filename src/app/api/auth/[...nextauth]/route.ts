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
    ],
    shopping: ["shopping", "clothes", "shirt", "shoes", "buy", "কেনা"],
    health: ["medicine", "doctor", "hospital", "pharmacy", "ওষুধ"],
    entertainment: ["netflix", "movie", "game", "cinema"],
    income: [
      "salary",
      "income",
      "received",
      "earned",
      "payment",
      "বেতন",
      "পেলাম",
    ],
  };

  const isIncome = [
    "received",
    "earned",
    "salary",
    "income",
    "got",
    "পেলাম",
    "বেতন",
  ].some((w) => lower.includes(w));

  const numbers = message.match(/\d+(\.\d+)?/g);
  const amount = numbers ? parseFloat(numbers[0]) : 0;

  if (amount === 0) return { is_transaction: false };

  let category = "other";
  for (const [cat, keywords] of Object.entries(categories)) {
    if (keywords.some((k) => lower.includes(k))) {
      category = cat;
      break;
    }
  }

  const isBDT =
    lower.includes("taka") ||
    lower.includes("টাকা") ||
    lower.includes("৳") ||
    amount > 100;

  return {
    is_transaction: true,
    type: isIncome ? "income" : "expense",
    amount,
    category: isIncome ? "income" : category,
    note: message,
    currency: isBDT ? "BDT" : "USD",
  };
}
