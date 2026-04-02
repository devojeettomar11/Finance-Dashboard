// ─────────────────────────────────────────────────────────────
//  mockData.js  —  Static financial data
//  All amounts in INR (₹). April 2026 is the "current" month.
// ─────────────────────────────────────────────────────────────

export const CATEGORIES = [
  "Food & Dining", "Shopping", "Transport", "Healthcare",
  "Entertainment", "Utilities", "Salary", "Freelance",
  "Investment", "Rent",
];

export const CATEGORY_COLORS = {
  "Food & Dining":  "#f97316",
  "Shopping":       "#8b5cf6",
  "Transport":      "#3b82f6",
  "Healthcare":     "#10b981",
  "Entertainment":  "#ec4899",
  "Utilities":      "#f59e0b",
  "Salary":         "#06b6d4",
  "Freelance":      "#84cc16",
  "Investment":     "#6366f1",
  "Rent":           "#ef4444",
};

// 6-month balance trend for area chart
export const BALANCE_TREND = [
  { month: "Nov", balance: 42000 },
  { month: "Dec", balance: 38500 },
  { month: "Jan", balance: 51000 },
  { month: "Feb", balance: 47200 },
  { month: "Mar", balance: 56800 },
  { month: "Apr", balance: 63450 },
];

// 6-month income vs expense for bar chart
export const MONTHLY_COMPARISON = [
  { month: "Nov", income: 75000, expense: 33000 },
  { month: "Dec", income: 75000, expense: 36500 },
  { month: "Jan", income: 80000, expense: 29000 },
  { month: "Feb", income: 80000, expense: 32800 },
  { month: "Mar", income: 85000, expense: 28200 },
  { month: "Apr", income: 85000, expense: 21550 },
];

// 30 mock transactions for April 2026
export const INITIAL_TRANSACTIONS = [
  { id: 1,  date: "2026-04-01", description: "April Salary",           amount: 85000,  category: "Salary",        type: "income"  },
  { id: 2,  date: "2026-04-01", description: "Zomato Order",           amount: 420,    category: "Food & Dining", type: "expense" },
  { id: 3,  date: "2026-04-02", description: "Uber Ride",              amount: 185,    category: "Transport",     type: "expense" },
  { id: 4,  date: "2026-04-02", description: "Freelance Project",      amount: 12000,  category: "Freelance",     type: "income"  },
  { id: 5,  date: "2026-04-03", description: "Amazon Shopping",        amount: 2349,   category: "Shopping",      type: "expense" },
  { id: 6,  date: "2026-04-03", description: "Netflix Subscription",   amount: 649,    category: "Entertainment", type: "expense" },
  { id: 7,  date: "2026-04-04", description: "Electricity Bill",       amount: 1200,   category: "Utilities",     type: "expense" },
  { id: 8,  date: "2026-04-04", description: "Mutual Fund SIP",        amount: 5000,   category: "Investment",    type: "expense" },
  { id: 9,  date: "2026-04-05", description: "Swiggy Dinner",          amount: 380,    category: "Food & Dining", type: "expense" },
  { id: 10, date: "2026-04-05", description: "House Rent",             amount: 12000,  category: "Rent",          type: "expense" },
  { id: 11, date: "2026-04-06", description: "Rapido Bike",            amount: 65,     category: "Transport",     type: "expense" },
  { id: 12, date: "2026-04-07", description: "Doctor Consultation",    amount: 500,    category: "Healthcare",    type: "expense" },
  { id: 13, date: "2026-04-07", description: "Pharmacy",               amount: 340,    category: "Healthcare",    type: "expense" },
  { id: 14, date: "2026-04-08", description: "Coffee Shop",            amount: 220,    category: "Food & Dining", type: "expense" },
  { id: 15, date: "2026-04-08", description: "Myntra Purchase",        amount: 1899,   category: "Shopping",      type: "expense" },
  { id: 16, date: "2026-04-09", description: "Spotify Premium",        amount: 119,    category: "Entertainment", type: "expense" },
  { id: 17, date: "2026-04-09", description: "Freelance Logo Work",    amount: 3500,   category: "Freelance",     type: "income"  },
  { id: 18, date: "2026-04-10", description: "Internet Bill",          amount: 799,    category: "Utilities",     type: "expense" },
  { id: 19, date: "2026-04-10", description: "Petrol Fill",            amount: 600,    category: "Transport",     type: "expense" },
  { id: 20, date: "2026-04-11", description: "Restaurant Dinner",      amount: 1450,   category: "Food & Dining", type: "expense" },
  { id: 21, date: "2026-04-11", description: "Dividend Income",        amount: 2200,   category: "Investment",    type: "income"  },
  { id: 22, date: "2026-04-12", description: "Gym Membership",         amount: 999,    category: "Healthcare",    type: "expense" },
  { id: 23, date: "2026-04-12", description: "Book Purchase",          amount: 450,    category: "Shopping",      type: "expense" },
  { id: 24, date: "2026-04-13", description: "Movie Tickets",          amount: 480,    category: "Entertainment", type: "expense" },
  { id: 25, date: "2026-04-13", description: "Ola Auto",               amount: 95,     category: "Transport",     type: "expense" },
  { id: 26, date: "2026-04-14", description: "Gas Cylinder",           amount: 920,    category: "Utilities",     type: "expense" },
  { id: 27, date: "2026-04-14", description: "Lunch at Office",        amount: 150,    category: "Food & Dining", type: "expense" },
  { id: 28, date: "2026-04-15", description: "Freelance Web Fix",      amount: 2000,   category: "Freelance",     type: "income"  },
  { id: 29, date: "2026-04-15", description: "Clothes Shopping",       amount: 2799,   category: "Shopping",      type: "expense" },
  { id: 30, date: "2026-04-16", description: "Snacks and Groceries",   amount: 870,    category: "Food & Dining", type: "expense" },
];
