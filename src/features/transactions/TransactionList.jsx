// ─────────────────────────────────────────────────────────────
//  TransactionList.jsx  —  Full transactions page (Tailwind)
//
//  Features:
//     Search, type filter, category filter, sort
//     Admin: Add / Edit / Delete
//     Viewer: read-only badge
//     CSV + JSON export (bonus)
//     Empty state
//     Transactions persisted in localStorage via context
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { useFinance } from "../../context/FinanceContext";
import { useRole } from "../../context/RoleContext";
import { CATEGORIES, CATEGORY_COLORS } from "../../data/mockData";
import TransactionForm from "./TransactionForm";

// ── Export helpers ─────────────────────────────────────────────
function exportCSV(txns) {
  const rows = txns.map((t) => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`);
  const csv  = ["Date,Description,Category,Type,Amount", ...rows].join("\n");
  download(new Blob([csv], { type: "text/csv" }), "transactions.csv");
}

function exportJSON(txns) {
  download(new Blob([JSON.stringify(txns, null, 2)], { type: "application/json" }), "transactions.json");
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a   = Object.assign(document.createElement("a"), { href: url, download: filename });
  a.click();
  URL.revokeObjectURL(url);
}

export default function TransactionList() {
  const { filteredTransactions, filters, updateFilter, resetFilters, deleteTransaction, resetToMockData } = useFinance();
  const { isAdmin } = useRole();

  const [showForm,  setShowForm]  = useState(false);
  const [editTxn,   setEditTxn]   = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const handleDelete = (id) => {
    if (confirmId === id) { deleteTransaction(id); setConfirmId(null); }
    else setConfirmId(id);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
            {filteredTransactions.length} records found
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Export CSV */}
          <button onClick={() => exportCSV(filteredTransactions)}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-600 dark:text-gray-300 hover:border-cyan-400 hover:text-cyan-500 transition-all">
            ↓ CSV
          </button>
          {/* Export JSON */}
          <button onClick={() => exportJSON(filteredTransactions)}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-600 dark:text-gray-300 hover:border-cyan-400 hover:text-cyan-500 transition-all">
            ↓ JSON
          </button>

          {isAdmin ? (
            <>
              <button onClick={resetToMockData}
                className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 transition-all">
                Reset Data
              </button>
              <button onClick={() => { setEditTxn(null); setShowForm(true); }}
                className="text-sm font-semibold px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white transition-colors shadow-sm">
                + Add Transaction
              </button>
            </>
          ) : (
            <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-500 border border-violet-200 dark:border-violet-800">
              👁 View-only mode
            </span>
          )}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-3 flex flex-wrap gap-2 shadow-sm">
        <input
          className="flex-1 min-w-40 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-cyan-400 transition-colors"
          placeholder="🔍 Search transactions..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
        />
        <select
          className="bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-cyan-400 transition-colors"
          value={filters.type} onChange={(e) => updateFilter("type", e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          className="bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-cyan-400 transition-colors"
          value={filters.category} onChange={(e) => updateFilter("category", e.target.value)}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          className="bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-cyan-400 transition-colors"
          value={`${filters.sortBy}_${filters.sortDir}`}
          onChange={(e) => {
            const [by, dir] = e.target.value.split("_");
            updateFilter("sortBy", by);
            updateFilter("sortDir", dir);
          }}
        >
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
          <option value="amount_desc">Highest Amount</option>
          <option value="amount_asc">Lowest Amount</option>
        </select>
        <button onClick={resetFilters}
          className="text-sm font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 px-2 transition-colors">
          Reset
        </button>
      </div>

      {/* Table or Empty State */}
      {filteredTransactions.length === 0 ? (
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-12 text-center shadow-sm">
          <p className="text-3xl mb-3">◈</p>
          <p className="text-base font-semibold text-gray-700 dark:text-gray-300">No transactions found</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 mb-4">Try adjusting your filters</p>
          <button onClick={resetFilters}
            className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-gray-300 hover:border-cyan-400 hover:text-cyan-500 transition-all">
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-dark-700">
                <tr>
                  {["Date", "Description", "Category", "Type", "Amount", ...(isAdmin ? ["Actions"] : [])].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-dark-700">
                {filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">{txn.date}</td>
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200 max-w-48 truncate">{txn.description}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                        style={{
                          background: (CATEGORY_COLORS[txn.category] || "#94a3b8") + "22",
                          color: CATEGORY_COLORS[txn.category] || "#94a3b8",
                        }}>
                        {txn.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                        txn.type === "income"
                          ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                          : "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400"
                      }`}>
                        {txn.type === "income" ? "↑ Income" : "↓ Expense"}
                      </span>
                    </td>
                    <td className={`px-4 py-3 font-semibold whitespace-nowrap ${
                      txn.type === "income" ? "text-emerald-500" : "text-rose-500"
                    }`}>
                      {txn.type === "income" ? "+" : "-"}₹{txn.amount.toLocaleString("en-IN")}
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => { setEditTxn(txn); setShowForm(true); }}
                            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 dark:border-dark-600 text-gray-400 hover:border-cyan-400 hover:text-cyan-500 transition-all text-sm"
                          >✎</button>
                          <button
                            onClick={() => handleDelete(txn.id)}
                            className={`h-7 flex items-center justify-center rounded-lg border text-xs font-medium transition-all px-1.5 ${
                              confirmId === txn.id
                                ? "border-rose-400 text-rose-500 bg-rose-50 dark:bg-rose-900/20 min-w-14"
                                : "w-7 border-gray-200 dark:border-dark-600 text-gray-400 hover:border-rose-400 hover:text-rose-500"
                            }`}
                          >
                            {confirmId === txn.id ? "Sure?" : "✕"}
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <TransactionForm
          editTxn={editTxn}
          onClose={() => { setShowForm(false); setEditTxn(null); }}
        />
      )}
    </div>
  );
}
