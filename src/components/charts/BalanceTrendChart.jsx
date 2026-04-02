// ─────────────────────────────────────────────────────────────
//  BalanceTrendChart.jsx  —  6-month area chart (Recharts)
//  Note: <defs>, <linearGradient>, <stop> are SVG JSX elements,
//  NOT recharts exports — do not import them from recharts.
//
//  Fix: domain={[0, 'auto']} on YAxis forces the chart to start
//  from 0, removing the empty bottom gap Recharts adds by default.
// ─────────────────────────────────────────────────────────────

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { BALANCE_TREND } from "../../data/mockData";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        ₹{payload[0].value.toLocaleString("en-IN")}
      </p>
    </div>
  );
}

export default function BalanceTrendChart({ darkMode }) {
  const gridColor = darkMode ? "#1e293b" : "#f1f5f9";
  const axisColor = darkMode ? "#64748b" : "#94a3b8";

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Balance Trend</h3>
        <span className="text-xs font-medium bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded-full">
          6 months
        </span>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={BALANCE_TREND} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          {/* SVG gradient — plain JSX element, not a recharts export */}
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#06b6d4" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />

          <XAxis
            dataKey="month"
            tick={{ fill: axisColor, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          {/* domain={[0, 'auto']} — starts Y-axis at 0, fixes the empty bottom space */}
          <YAxis
            tick={{ fill: axisColor, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            domain={[0, "auto"]}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="balance"
            stroke="#06b6d4"
            strokeWidth={2}
            fill="url(#balanceGrad)"
            dot={{ fill: "#06b6d4", r: 3 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}