// ─────────────────────────────────────────────────────────────
//  MonthlyComparisonChart.jsx  —  Income vs Expense bar chart
// ─────────────────────────────────────────────────────────────

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MONTHLY_COMPARISON } from "../../data/mockData";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-sm font-semibold" style={{ color: p.fill }}>
          {p.name}: ₹{p.value.toLocaleString("en-IN")}
        </p>
      ))}
    </div>
  );
}

export default function MonthlyComparisonChart({ darkMode }) {
  const axisColor = darkMode ? "#64748b" : "#94a3b8";
  const gridColor = darkMode ? "#1e293b" : "#f1f5f9";

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5 shadow-sm col-span-2">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Income vs Expense</h3>
        <span className="text-xs font-medium bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded-full">
          6 months
        </span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={MONTHLY_COMPARISON} margin={{ top: 5, right: 10, left: 0, bottom: 0 }} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: axisColor, fontSize: 10 }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
          <Bar dataKey="income"  name="Income"  fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name="Expense" fill="#f43f5e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
