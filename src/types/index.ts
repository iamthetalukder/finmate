export type Plan = "free" | "pro";

export type TransactionType = "income" | "expense";

export type Category =
  | "food"
  | "transport"
  | "shopping"
  | "housing"
  | "health"
  | "entertainment"
  | "income"
  | "other";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  plan: Plan;
  currency: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  type: TransactionType;
  category: Category;
  amount: number;
  currency: string;
  note?: string;
  date: string;
  created_at: string;
}

export interface Insight {
  id: string;
  user_id: string;
  insight_text: string;
  tip_text: string;
  created_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  deadline?: string;
  created_at: string;
}
