// ─────────────────────────────────────────────────────────────
//  SummaryCards.jsx  —  4 KPI cards (Tailwind CSS)
//  Values computed live from transactions in context.
// ─────────────────────────────────────────────────────────────

import { useFinance } from "../../context/FinanceContext";

const fmt = (n) => "₹" + n.toLocaleString("en-IN");

export default function SummaryCards() {
  const { transactions } = useFinance();

  const income  = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;
  const savings = income > 0 ? Math.round(((income - expense) / income) * 100) : 0;

  const CARDS = [
    { label: "Total Balance",  value: fmt(balance), sub: "Current month",    icon: "◈", color: "text-cyan-500",   bg: "bg-cyan-50 dark:bg-cyan-900/20",   border: "border-cyan-200 dark:border-cyan-800" },
    { label: "Total Income",   value: fmt(income),  sub: "April 2026",       icon: "↑", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20", border: "border-emerald-200 dark:border-emerald-800" },
    { label: "Total Expense",  value: fmt(expense), sub: "April 2026",       icon: "↓", color: "text-rose-500",   bg: "bg-rose-50 dark:bg-rose-900/20",   border: "border-rose-200 dark:border-rose-800" },
    { label: "Savings Rate",   value: savings + "%",sub: "of income saved",  icon: "◎", color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-900/20", border: "border-violet-200 dark:border-violet-800" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {CARDS.map((card) => (
        <div
          key={card.label}
          className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3"
        >
          {/* Icon */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.bg} ${card.border} border`}>
            <span className={`text-lg font-bold ${card.color}`}>{card.icon}</span>
          </div>

          {/* Values */}
          <div className="min-w-0">
            <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide font-medium">{card.label}</p>
            <p className={`text-lg font-bold mt-0.5 truncate ${card.color}`}>{card.value}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
