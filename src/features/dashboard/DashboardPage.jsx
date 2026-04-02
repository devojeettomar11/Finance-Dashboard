// ─────────────────────────────────────────────────────────────
//  DashboardPage.jsx  —  Main overview (Tailwind CSS)
// ─────────────────────────────────────────────────────────────

import SummaryCards from "./SummaryCards";
import BalanceTrendChart from "../../components/charts/BalanceTrendChart";
import SpendingPieChart from "../../components/charts/SpendingPieChart";
import { useFinance } from "../../context/FinanceContext";
import { useRole } from "../../context/RoleContext";
import { CATEGORY_COLORS } from "../../data/mockData";

export default function DashboardPage({ darkMode, onNavigate }) {
  const { transactions } = useFinance();
  const { isAdmin } = useRole();

  // 5 most recent transactions for preview
  const recent = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Good day! 👋</h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">Financial overview for April 2026</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
          isAdmin
            ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800"
            : "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800"
        }`}>
          {isAdmin ? "🔑 Admin View" : "👁 Viewer Mode"}
        </span>
      </div>

      {/* KPI Cards */}
      <SummaryCards />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <BalanceTrendChart darkMode={darkMode} />
        </div>
        <div className="lg:col-span-2">
          <SpendingPieChart />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Recent Transactions</h2>
          <button
            onClick={() => onNavigate("transactions")}
            className="text-xs font-medium text-cyan-500 hover:text-cyan-600 transition-colors"
          >
            View All →
          </button>
        </div>

        <div className="flex flex-col divide-y divide-gray-100 dark:divide-dark-700">
          {recent.map((txn) => (
            <div key={txn.id} className="flex items-center gap-3 py-2.5">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: CATEGORY_COLORS[txn.category] || "#94a3b8" }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{txn.description}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{txn.date} · {txn.category}</p>
              </div>
              <span className={`text-sm font-semibold flex-shrink-0 ${
                txn.type === "income" ? "text-emerald-500" : "text-rose-500"
              }`}>
                {txn.type === "income" ? "+" : "-"}₹{txn.amount.toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
