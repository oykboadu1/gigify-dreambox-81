
import { faker } from "@faker-js/faker";

// Types
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string;
  type: "income" | "expense";
}

export interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
  spent: number;
  color: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  color: string;
}

// Helper functions
const generateRandomTransaction = (): Transaction => {
  const type = faker.helpers.arrayElement(["income", "expense"]) as "income" | "expense";
  
  const incomeCategories = ["Salary", "Freelance", "Investment", "Gift", "Other Income"];
  const expenseCategories = ["Food", "Transportation", "Housing", "Entertainment", "Shopping", "Utilities", "Healthcare"];
  
  const category = type === "income" 
    ? faker.helpers.arrayElement(incomeCategories)
    : faker.helpers.arrayElement(expenseCategories);
  
  const amount = type === "income"
    ? faker.number.int({ min: 100, max: 5000 })
    : faker.number.int({ min: 10, max: 500 });
  
  return {
    id: faker.string.uuid(),
    date: faker.date.recent({ days: 60 }).toISOString(),
    amount: type === "income" ? amount : -amount,
    description: type === "income" 
      ? `${category} payment` 
      : `${category} expense`,
    category,
    type
  };
};

// Generate initial data
const generateTransactions = (count: number): Transaction[] => {
  return Array.from({ length: count }, generateRandomTransaction)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const generateBudgetCategories = (): BudgetCategory[] => {
  const categories = [
    { name: "Food", color: "#FF6B6B" },
    { name: "Transportation", color: "#4ECDC4" },
    { name: "Housing", color: "#FFE66D" },
    { name: "Entertainment", color: "#1A535C" },
    { name: "Shopping", color: "#F86624" },
    { name: "Utilities", color: "#662E9B" },
    { name: "Healthcare", color: "#43BCCD" }
  ];
  
  return categories.map(cat => ({
    id: faker.string.uuid(),
    name: cat.name,
    amount: faker.number.int({ min: 100, max: 1000 }),
    spent: faker.number.int({ min: 0, max: 1000 }),
    color: cat.color
  }));
};

const generateGoals = (): Goal[] => {
  const goalTypes = [
    { name: "Emergency Fund", color: "#FF6B6B" },
    { name: "Vacation", color: "#4ECDC4" },
    { name: "New Car", color: "#FFE66D" },
    { name: "Down Payment", color: "#1A535C" },
    { name: "Education", color: "#F86624" }
  ];
  
  return goalTypes.map(goal => {
    const targetAmount = faker.number.int({ min: 1000, max: 20000 });
    return {
      id: faker.string.uuid(),
      name: goal.name,
      targetAmount,
      currentAmount: faker.number.int({ min: 0, max: targetAmount }),
      targetDate: faker.date.future().toISOString(),
      color: goal.color
    };
  });
};

// Mock data
const transactions = generateTransactions(50);
const budgetCategories = generateBudgetCategories();
const goals = generateGoals();

// Service functions
export const getTransactions = () => {
  return [...transactions];
};

export const getBudgetCategories = () => {
  return [...budgetCategories];
};

export const getGoals = () => {
  return [...goals];
};

export const addTransaction = (transaction: Omit<Transaction, "id">) => {
  const newTransaction = {
    ...transaction,
    id: faker.string.uuid()
  };
  
  transactions.unshift(newTransaction);
  return newTransaction;
};

export const updateBudgetCategory = (id: string, updates: Partial<BudgetCategory>) => {
  const index = budgetCategories.findIndex(cat => cat.id === id);
  if (index === -1) return null;
  
  budgetCategories[index] = {
    ...budgetCategories[index],
    ...updates
  };
  
  return budgetCategories[index];
};

export const updateGoal = (id: string, updates: Partial<Goal>) => {
  const index = goals.findIndex(goal => goal.id === id);
  if (index === -1) return null;
  
  goals[index] = {
    ...goals[index],
    ...updates
  };
  
  return goals[index];
};

// Dashboard summary data
export const getAccountSummary = () => {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  return {
    balance: income - expenses,
    income,
    expenses,
    transactionCount: transactions.length
  };
};

export const getSpendingByCategory = () => {
  const categories = new Map<string, number>();
  
  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      const current = categories.get(t.category) || 0;
      categories.set(t.category, current + Math.abs(t.amount));
    });
    
  return Array.from(categories.entries()).map(([name, amount]) => ({
    name,
    amount
  }));
};

export const getIncomeVsExpensesByMonth = () => {
  const monthData = new Map<string, { name: string, income: number, expenses: number }>();
  
  // Get last 6 months
  const today = new Date();
  for (let i = 0; i < 6; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    monthData.set(monthYear, { name: monthYear, income: 0, expenses: 0 });
  }
  
  transactions.forEach(t => {
    const date = new Date(t.date);
    const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    if (monthData.has(monthYear)) {
      const data = monthData.get(monthYear)!;
      if (t.type === "income") {
        data.income += Math.abs(t.amount);
      } else {
        data.expenses += Math.abs(t.amount);
      }
    }
  });
  
  return Array.from(monthData.values())
    .sort((a, b) => {
      const dateA = new Date(a.name);
      const dateB = new Date(b.name);
      return dateA.getTime() - dateB.getTime();
    });
};

export const getBudgetProgress = () => {
  return budgetCategories.map(cat => ({
    name: cat.name,
    budget: cat.amount,
    spent: cat.spent,
    remaining: cat.amount - cat.spent,
    percentage: Math.round((cat.spent / cat.amount) * 100),
    color: cat.color
  }));
};

export const getGoalProgress = () => {
  return goals.map(goal => ({
    name: goal.name,
    current: goal.currentAmount,
    target: goal.targetAmount,
    remaining: goal.targetAmount - goal.currentAmount,
    percentage: Math.round((goal.currentAmount / goal.targetAmount) * 100),
    targetDate: new Date(goal.targetDate).toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    }),
    color: goal.color
  }));
};

// Initialize with faker
faker.seed(123); // For consistent data generation
