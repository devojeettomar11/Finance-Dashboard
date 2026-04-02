// ─────────────────────────────────────────────────────────────
//  InsightsPage.jsx  —  Analytics page (Tailwind CSS)
// ─────────────────────────────────────────────────────────────

import { useInsights } from "../../hooks/useInsights";
import MonthlyComparisonChart from "../../components/charts/MonthlyComparisonChart";

export default function InsightsPage({ darkMode }) {
  const {
    spendingByCategory, highestSpendingCategory,
    topExpenses, savingsRate, totalIncome, totalExpense, observations,
  } = useInsights();

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Insights</h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">April 2026 · Smart financial analysis</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Savings Rate",  value: `${savingsRate}%`, sub: "of income saved",   color: "text-violet-500", border: "border-l-violet-500" },
          { label: "Top Spending",  value: highestSpendingCategory?.name || "—", sub: `₹${highestSpendingCategory?.value?.toLocaleString("en-IN")} spent`, color: "text-rose-500", border: "border-l-rose-500" },
          { label: "Net Savings",   value: `₹${(totalIncome - totalExpense).toLocaleString("en-IN")}`, sub: "Income − Expense", color: "text-emerald-500", border: "border-l-emerald-500" },
        ].map((card) => (
          <div key={card.label} className={`bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 border-l-4 ${card.border} p-4 shadow-sm hover:-translate-y-0.5 transition-transform`}>
            <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide font-medium">{card.label}</p>
            <p className={`text-2xl font-bold mt-1 ${card.color}`}>{card.value}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Monthly Comparison Chart */}
      <div className="grid grid-cols-1">
        <MonthlyComparisonChart darkMode={darkMode} />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Top 5 Expenses */}
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">Top 5 Expenses</h3>
          <div className="flex flex-col divide-y divide-gray-100 dark:divide-dark-700">
            {topExpenses.map((txn, i) => (
              <div key={txn.id} className="flex items-center gap-3 py-2.5">
                <span className="text-xs font-bold text-gray-300 dark:text-gray-600 w-5">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{txn.description}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{txn.date} · {txn.category}</p>
                </div>
                <span className="text-sm font-semibold text-rose-500 whitespace-nowrap">
                  ₹{txn.amount.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown with progress bars */}
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">Category Breakdown</h3>
          <div className="flex flex-col gap-3">
            {spendingByCategory.slice(0, 6).map((cat) => {
              const pct = Math.round((cat.value / (totalExpense || 1)) * 100);
              return (
                <div key={cat.name}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium" style={{ color: cat.color }}>{cat.name}</span>
                    <span className="text-gray-400 dark:text-gray-500">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-dark-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: cat.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Smart Observations */}
      <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">💡 Smart Observations</h3>
        <ul className="flex flex-col gap-2.5">
          {observations.map((obs, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-cyan-500 text-xs mt-0.5 flex-shrink-0">◈</span>
              {obs}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
