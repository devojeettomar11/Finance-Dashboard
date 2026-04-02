// ─────────────────────────────────────────────────────────────
//  Navbar.jsx  —  Top navigation bar (Tailwind CSS)
//
//  Features:
//    • Brand logo + name
//    • Desktop nav links with active state
//    • Role switcher (Admin ↔ Viewer) — RBAC demo
//    • Dark mode toggle
//    • Mobile hamburger drawer
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { useRole } from "../../context/RoleContext";

const NAV_ITEMS = [
  { id: "dashboard",    label: "Dashboard",    icon: "▣" },
  { id: "transactions", label: "Transactions", icon: "⇄" },
  { id: "insights",     label: "Insights",     icon: "◈" },
];

export default function Navbar({ activePage, onNavigate, darkMode, onToggleDark }) {
  const { isAdmin, setRole } = useRole();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-14 gap-6">

          {/* ── Brand ── */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-cyan-500 text-xl font-bold">◈</span>
            <span className="font-bold text-gray-900 dark:text-white text-lg tracking-tight">FinFlow</span>
            <span className="hidden sm:inline text-xs text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-dark-600 rounded px-1.5 py-0.5">
              by Zorvyn
            </span>
          </div>

          {/* ── Desktop Nav ── */}
          <ul className="hidden md:flex items-center gap-1 flex-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150
                    ${activePage === item.id
                      ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 hover:text-gray-900 dark:hover:text-white"
                    }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-2 ml-auto">

            {/* Role switcher — RBAC demo */}
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 dark:bg-dark-700 rounded-lg px-2 py-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                isAdmin
                  ? "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400"
                  : "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400"
              }`}>
                {isAdmin ? "🔑 Admin" : "👁 Viewer"}
              </span>
              <button
                onClick={() => setRole(isAdmin ? "viewer" : "admin")}
                className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-cyan-500 border border-gray-300 dark:border-dark-600 rounded-md px-2 py-0.5 bg-white dark:bg-dark-800 transition-colors"
              >
                Switch
              </button>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={onToggleDark}
              title={darkMode ? "Light mode" : "Dark mode"}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-500 dark:text-gray-400 hover:text-cyan-500 hover:border-cyan-400 transition-all text-base"
            >
              {darkMode ? "☀" : "◑"}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-500 dark:text-gray-400 text-lg"
            >
              {mobileOpen ? "✕" : "≡"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Dropdown ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 px-4 py-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-left transition-all
                ${activePage === item.id
                  ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700"
                }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
          {/* Role switcher in mobile */}
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100 dark:border-dark-700">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
              isAdmin ? "bg-cyan-100 text-cyan-600" : "bg-purple-100 text-purple-600"
            }`}>
              {isAdmin ? "🔑 Admin" : "👁 Viewer"}
            </span>
            <button
              onClick={() => setRole(isAdmin ? "viewer" : "admin")}
              className="text-xs font-medium text-gray-500 border border-gray-300 dark:border-dark-600 rounded px-2 py-0.5"
            >
              Switch Role
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
