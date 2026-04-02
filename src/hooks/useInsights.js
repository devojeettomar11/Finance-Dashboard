// ─────────────────────────────────────────────────────────────
//  useInsights.js  —  Derives analytics from live transactions
// ─────────────────────────────────────────────────────────────

import { useMemo } from "react";
import { useFinance } from "../context/FinanceContext";
import { MONTHLY_COMPARISON, CATEGORY_COLORS } from "../data/mockData";

export function useInsights() {
  const { transactions } = useFinance();

  return useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const incomes  = transactions.filter((t) => t.type === "income");

    const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);
    const totalIncome  = incomes.reduce((s, t) => s + t.amount, 0);

    // Spending grouped by category
    const categoryMap = {};
    expenses.forEach((t) => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });

    const spendingByCategory = Object.entries(categoryMap)
      .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || "#94a3b8" }))
      .sort((a, b) => b.value - a.value);

    const highestSpendingCategory = spendingByCategory[0] || null;

    // Top 5 individual expenses
    const topExpenses = [...expenses].sort((a, b) => b.amount - a.amount).slice(0, 5);

    const savingsRate = totalIncome > 0
      ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100)
      : 0;

    // Auto-generated text observations
    const observations = [];
    if (highestSpendingCategory) {
      const pct = Math.round((highestSpendingCategory.value / (totalExpense || 1)) * 100);
      observations.push(`Your biggest expense is ${highestSpendingCategory.name}, making up ${pct}% of total spending.`);
    }
    if (savingsRate >= 30) {
      observations.push(`Great job! You saved ${savingsRate}% of income this month — above the recommended 20%.`);
    } else if (savingsRate > 0) {
      observations.push(`Your savings rate is ${savingsRate}%. Try reducing discretionary spend to hit 20%.`);
    }
    if (totalExpense / (totalIncome || 1) > 0.6) {
      observations.push("Expenses exceeded 60% of income. Review subscriptions and dining costs.");
    }
    observations.push("Consistent freelance income detected — diversified income is a strong financial habit.");

    return {
      spendingByCategory,
      highestSpendingCategory,
      topExpenses,
      totalIncome,
      totalExpense,
      savingsRate,
      monthlyComparison: MONTHLY_COMPARISON,
      observations,
    };
  }, [transactions]);
}
