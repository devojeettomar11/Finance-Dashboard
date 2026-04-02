# FinFlow — Finance Dashboard UI

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🏗️ Tech Stack

| Tool | Purpose |
|------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS v3** | Styling — utility-first CSS |
| **Recharts** | Charts (Area, Bar, Pie) |
| **Context API** | State management |
| **localStorage** | Data persistence |

---

## 📁 Folder Structure

```
finance-dashboard/
│
├── index.html
├── vite.config.js
├── tailwind.config.js          # Tailwind v3 config — darkMode: 'class'
├── postcss.config.js
├── package.json
├── README.md
│
└── src/
    ├── main.jsx                # Entry point
    ├── App.jsx                 # Root — routing, dark mode, providers
    ├── index.css               # Tailwind directives + custom utilities
    │
    ├── data/
    │   └── mockData.js         # 30 transactions, chart data, category colors
    │
    ├── context/
    │   ├── RoleContext.jsx     # Admin/Viewer RBAC — role persisted in localStorage
    │   └── FinanceContext.jsx  # Transactions (localStorage), filters, CRUD
    │
    ├── hooks/
    │   └── useInsights.js      # Derived analytics from live transactions
    │
    ├── components/
    │   ├── layout/
    │   │   └── Navbar.jsx      # Nav, role switcher, dark mode, mobile drawer
    │   └── charts/
    │       ├── BalanceTrendChart.jsx       # 6-month area chart
    │       ├── SpendingPieChart.jsx        # Category donut chart
    │       └── MonthlyComparisonChart.jsx  # Income vs Expense bar chart
    │
    └── features/
        ├── dashboard/
        │   ├── DashboardPage.jsx   # Overview: KPIs + charts + recent transactions
        │   └── SummaryCards.jsx    # 4 KPI cards
        ├── transactions/
        │   ├── TransactionList.jsx # Table, search, filter, sort, export
        │   └── TransactionForm.jsx # Add/Edit modal (Admin only)
        └── insights/
            └── InsightsPage.jsx    # Analytics, category bars, observations
```

---

## ✨ Features

### Core Requirements ✅

| Feature | Details |
|---------|---------|
| Dashboard Overview | 4 KPI cards + balance trend chart + spending donut |
| Time-based Visualization | 6-month area chart (balance trend) |
| Categorical Visualization | Spending by category — donut + progress bars |
| Transactions Section | Full table with date, amount, category, type |
| Filtering | By type, category, free-text search |
| Sorting | By date or amount, ascending/descending |
| Role-Based UI | Admin: add/edit/delete · Viewer: read-only |
| Insights Section | Top spend, monthly comparison, smart observations |
| State Management | React Context + useMemo derived state |
| Responsive Design | Mobile drawer nav, responsive grids |
| Empty State | No-results UI with reset option |

### Bonus Features ✅

| Bonus | Implementation |
|-------|---------------|
| Dark Mode | Tailwind `class` strategy, persisted in localStorage |
| Data Persistence | Transactions saved to localStorage — survive refresh |
| CSV Export | Export visible/filtered rows as `.csv` |
| JSON Export | Export visible/filtered rows as `.json` |
| Animations | Modal slide-up, card hover lift, bar fill transitions |
| Smart Observations | Auto-generated financial insights from live data |
| Advanced Filtering | Search + type + category + sort combined |
| Reset to Mock Data | One-click restore to original 30 transactions |

---

## 🎭 Role-Based Access Control

Switch roles via the **Switch** button in the navbar.

| Feature | Admin 🔑 | Viewer 👁 |
|---------|----------|---------|
| View all pages | ✅ | ✅ |
| Add transaction | ✅ | ❌ |
| Edit transaction | ✅ | ❌ |
| Delete transaction | ✅ | ❌ |
| Export CSV / JSON | ✅ | ✅ |

> Role is simulated on the frontend — no backend or auth needed. Persisted in localStorage.

---

## 📊 State Management Approach

Two React Context providers:

1. **`RoleContext`** — active role (`admin` | `viewer`), `isAdmin` boolean, persisted in localStorage
2. **`FinanceContext`** — transactions array (persisted in localStorage), filter state, CRUD actions

Filter logic uses `useMemo` for derived state — no manual re-computation.
Chose **Context API** over Redux/Zustand — sufficient for this scope, keeps it simple and readable.

---

## 💾 localStorage Persistence

| Key | Value |
|-----|-------|
| `finflow_transactions` | Full transactions array (JSON) |
| `finflow_role` | Active role string |
| `finflow_dark` | Dark mode boolean |

All three survive page refresh. Transactions can be reset to mock data via the **Reset Data** button.

---

## 🛠️ Setup

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build
```

---

## 📝 Assumptions

- All data is in INR (₹), Indian number formatting used throughout
- April 2026 is the "current month" for all dashboard data
- No real authentication — role switching is a frontend-only demo
- Recharts used over Chart.js for better React/responsive integration
- Tailwind v3 used with `darkMode: 'class'` strategy

---

*Built with by Devojeet Tomar for Zorvyn Frontend Developer Intern Assessment*
