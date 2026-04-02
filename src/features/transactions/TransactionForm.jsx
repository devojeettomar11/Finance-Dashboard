// ─────────────────────────────────────────────────────────────
//  TransactionForm.jsx  —  Add / Edit modal (Admin only)
//  Tailwind CSS — validated form with error states
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { useFinance } from "../../context/FinanceContext";
import { CATEGORIES } from "../../data/mockData";

const EMPTY = {
  description: "",
  amount:      "",
  category:    "Food & Dining",
  type:        "expense",
  date:        new Date().toISOString().split("T")[0],
};

export default function TransactionForm({ editTxn, onClose }) {
  const { addTransaction, updateTransaction } = useFinance();
  const [form,   setForm]   = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editTxn) {
      setForm({
        description: editTxn.description,
        amount:      String(editTxn.amount),
        category:    editTxn.category,
        type:        editTxn.type,
        date:        editTxn.date,
      });
    }
  }, [editTxn]);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.description.trim())        errs.description = "Required";
    if (!form.amount || +form.amount <= 0) errs.amount    = "Enter valid amount";
    if (!form.date)                       errs.date       = "Required";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const payload = { ...form, amount: parseFloat(form.amount) };
    editTxn ? updateTransaction(editTxn.id, payload) : addTransaction(payload);
    onClose();
  };

  const inputClass = (field) =>
    `w-full bg-gray-50 dark:bg-dark-700 border rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none transition-all
    ${errors[field]
      ? "border-rose-400 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-900"
      : "border-gray-200 dark:border-dark-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 dark:focus:ring-cyan-900"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 w-full max-w-md shadow-2xl animate-[slideUp_0.2s_ease]"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideUp 0.2s ease" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-dark-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            {editTxn ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg transition-colors">✕</button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 flex flex-col gap-4">
          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">
              Description
            </label>
            <input className={inputClass("description")} name="description"
              value={form.description} onChange={handleChange} placeholder="e.g. Netflix Subscription" />
            {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description}</p>}
          </div>

          {/* Amount + Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">
                Amount (₹)
              </label>
              <input className={inputClass("amount")} name="amount" type="number" min="1"
                value={form.amount} onChange={handleChange} placeholder="0" />
              {errors.amount && <p className="text-xs text-rose-500 mt-1">{errors.amount}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">
                Type
              </label>
              <select className={inputClass("type")} name="type" value={form.type} onChange={handleChange}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          {/* Category + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">
                Category
              </label>
              <select className={inputClass("category")} name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">
                Date
              </label>
              <input className={inputClass("date")} name="date" type="date"
                value={form.date} onChange={handleChange} />
              {errors.date && <p className="text-xs text-rose-500 mt-1">{errors.date}</p>}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-5 py-4 border-t border-gray-100 dark:border-dark-700">
          <button onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit}
            className="px-4 py-2 text-sm font-semibold text-white bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors shadow-sm">
            {editTxn ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}
