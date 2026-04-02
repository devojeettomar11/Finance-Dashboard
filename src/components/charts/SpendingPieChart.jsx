// ─────────────────────────────────────────────────────────────
//  SpendingPieChart.jsx  —  Category donut chart (Recharts)
// ─────────────────────────────────────────────────────────────

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useInsights } from "../../hooks/useInsights";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{payload[0].name}</p>
      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        ₹{payload[0].value.toLocaleString("en-IN")}
      </p>
    </div>
  );
}

export default function SpendingPieChart() {
  const { spendingByCategory } = useInsights();
  const chartData = spendingByCategory.slice(0, 6);

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Spending by Category</h3>
        <span className="text-xs font-medium bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded-full">
          April
        </span>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
            paddingAngle={3} dataKey="value">
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-col gap-1.5 mt-2">
        {chartData.map((cat) => (
          <div key={cat.name} className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.color }} />
            <span className="text-gray-500 dark:text-gray-400 flex-1">{cat.name}</span>
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              ₹{(cat.value / 1000).toFixed(1)}k
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
