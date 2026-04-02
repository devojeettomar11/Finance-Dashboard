// ─────────────────────────────────────────────────────────────
//  App.jsx  —  Root component
//
//  Responsibilities:
//    • Wraps app in RoleProvider + FinanceProvider
//    • Controls active page (state-based routing)
//    • Controls dark mode — persisted in localStorage
//    • Renders Navbar + active page
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { RoleProvider } from "./context/RoleContext";
import { FinanceProvider } from "./context/FinanceContext";
import Navbar from "./components/layout/Navbar";
import DashboardPage from "./features/dashboard/DashboardPage";
import TransactionList from "./features/transactions/TransactionList";
import InsightsPage from "./features/insights/InsightsPage";

const PAGES = {
  dashboard:    DashboardPage,
  transactions: TransactionList,
  insights:     InsightsPage,
};

function AppContent() {
  const [activePage, setActivePage] = useState("dashboard");

  // Dark mode — persisted in localStorage
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("finflow_dark") === "true"
  );

  useEffect(() => {
    localStorage.setItem("finflow_dark", darkMode);
    // Tailwind dark mode via class on <html>
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Apply dark class on first render too
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
  }, []);

  const ActivePage = PAGES[activePage] || DashboardPage;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
      <Navbar
        activePage={activePage}
        onNavigate={setActivePage}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((d) => !d)}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <ActivePage darkMode={darkMode} onNavigate={setActivePage} />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <RoleProvider>
      <FinanceProvider>
        <AppContent />
      </FinanceProvider>
    </RoleProvider>
  );
}
