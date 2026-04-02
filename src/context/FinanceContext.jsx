// ─────────────────────────────────────────────────────────────
//  FinanceContext.jsx  —  Central state for all financial data
//
//  ✅ Transactions are persisted in localStorage — survive refresh
//  ✅ Filters state managed centrally
//  ✅ All CRUD operations (add / edit / delete) handled here
// ─────────────────────────────────────────────────────────────

import { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";
import { INITIAL_TRANSACTIONS } from "../data/mockData";

const FinanceContext = createContext(null);

// ── localStorage helpers ───────────────────────────────────────
const LS_KEY = "finflow_transactions";

function loadTransactions() {
  try {
    const saved = localStorage.getItem(LS_KEY);
    // If user has saved data use it, else fall back to mock data
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  } catch {
    return INITIAL_TRANSACTIONS;
  }
}

function saveTransactions(txns) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(txns));
  } catch {
    console.warn("Could not save transactions to localStorage");
  }
}

export function FinanceProvider({ children }) {
  // ── Transactions — loaded from localStorage on first render ──
  const [transactions, setTransactions] = useState(loadTransactions);

  // ── Persist to localStorage whenever transactions change ─────
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  // ── Filter State ──────────────────────────────────────────────
  const [filters, setFilters] = useState({
    search:   "",
    type:     "all",      // "all" | "income" | "expense"
    category: "all",
    sortBy:   "date",     // "date" | "amount"
    sortDir:  "desc",     // "asc"  | "desc"
  });

  // ── Derived filtered + sorted list ───────────────────────────
  const filteredTransactions = useMemo(() => {
    let list = [...transactions];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      list = list.filter((t) => t.description.toLowerCase().includes(q));
    }
    if (filters.type !== "all")     list = list.filter((t) => t.type === filters.type);
    if (filters.category !== "all") list = list.filter((t) => t.category === filters.category);

    list.sort((a, b) => {
      const dir = filters.sortDir === "asc" ? 1 : -1;
      if (filters.sortBy === "amount") return (a.amount - b.amount) * dir;
      return a.date.localeCompare(b.date) * dir;
    });

    return list;
  }, [transactions, filters]);

  // ── CRUD Actions ──────────────────────────────────────────────

  const addTransaction = useCallback((txn) => {
    setTransactions((prev) => [{ ...txn, id: Date.now() }, ...prev]);
  }, []);

  const updateTransaction = useCallback((id, updates) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Filter helpers ─────────────────────────────────────────────

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ search: "", type: "all", category: "all", sortBy: "date", sortDir: "desc" });
  }, []);

  // ── Reset data back to mock (useful for demo) ─────────────────
  const resetToMockData = useCallback(() => {
    setTransactions(INITIAL_TRANSACTIONS);
  }, []);

  return (
    <FinanceContext.Provider value={{
      transactions,
      filteredTransactions,
      filters,
      updateFilter,
      resetFilters,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      resetToMockData,
    }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used inside <FinanceProvider>");
  return ctx;
}
