
// Data types for finance tracking
export interface Transaction {
  id: number;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

export interface BudgetCategory {
  id: number;
  name: string;
  budgeted: number;
  spent: number;
  icon: string;
  color: string;
}

export interface FinancialGoal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  icon: string;
  color: string;
}

// Mock data for transactions
export const transactions: Transaction[] = [
  {
    id: 1,
    amount: 1500,
    description: "Salary",
    category: "Income",
    date: "2023-06-01",
    type: "income",
  },
  {
    id: 2,
    amount: 500,
    description: "Rent",
    category: "Housing",
    date: "2023-06-02",
    type: "expense",
  },
  {
    id: 3,
    amount: 120,
    description: "Grocery shopping",
    category: "Food",
    date: "2023-06-03",
    type: "expense",
  },
  {
    id: 4,
    amount: 45,
    description: "Internet bill",
    category: "Utilities",
    date: "2023-06-05",
    type: "expense",
  },
  {
    id: 5,
    amount: 35,
    description: "Movie tickets",
    category: "Entertainment",
    date: "2023-06-07",
    type: "expense",
  },
  {
    id: 6,
    amount: 200,
    description: "Freelance work",
    category: "Income",
    date: "2023-06-10",
    type: "income",
  },
  {
    id: 7,
    amount: 80,
    description: "Dining out",
    category: "Food",
    date: "2023-06-12",
    type: "expense",
  },
  {
    id: 8,
    amount: 25,
    description: "Transportation",
    category: "Transport",
    date: "2023-06-15",
    type: "expense",
  },
  {
    id: 9,
    amount: 300,
    description: "Part-time work",
    category: "Income",
    date: "2023-06-20",
    type: "income",
  },
  {
    id: 10,
    amount: 60,
    description: "Mobile phone bill",
    category: "Utilities",
    date: "2023-06-22",
    type: "expense",
  },
];

// Mock data for budget categories
export const budgetCategories: BudgetCategory[] = [
  {
    id: 1,
    name: "Housing",
    budgeted: 800,
    spent: 500,
    icon: "home",
    color: "blue",
  },
  {
    id: 2,
    name: "Food",
    budgeted: 400,
    spent: 200,
    icon: "utensils",
    color: "green",
  },
  {
    id: 3,
    name: "Transport",
    budgeted: 150,
    spent: 25,
    icon: "car",
    color: "orange",
  },
  {
    id: 4,
    name: "Entertainment",
    budgeted: 200,
    spent: 35,
    icon: "film",
    color: "purple",
  },
  {
    id: 5,
    name: "Utilities",
    budgeted: 300,
    spent: 105,
    icon: "zap",
    color: "yellow",
  }
];

// Mock data for financial goals
export const financialGoals: FinancialGoal[] = [
  {
    id: 1,
    name: "Emergency Fund",
    targetAmount: 5000,
    currentAmount: 2500,
    deadline: "2023-12-31",
    icon: "shield",
    color: "blue",
  },
  {
    id: 2,
    name: "New Laptop",
    targetAmount: 1500,
    currentAmount: 750,
    deadline: "2023-09-30",
    icon: "laptop",
    color: "purple",
  },
  {
    id: 3,
    name: "Vacation",
    targetAmount: 2000,
    currentAmount: 500,
    deadline: "2023-11-15",
    icon: "palm-tree",
    color: "green",
  },
  {
    id: 4,
    name: "Down Payment",
    targetAmount: 20000,
    currentAmount: 5000,
    deadline: "2024-06-30",
    icon: "home",
    color: "orange",
  }
];

// Finance utility functions
export const getTotalIncome = (): number => {
  return transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

export const getTotalExpenses = (): number => {
  return transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

export const getBalance = (): number => {
  return getTotalIncome() - getTotalExpenses();
};

export const getExpensesByCategory = (): { name: string; value: number }[] => {
  const expensesByCategory: { [key: string]: number } = {};
  
  transactions
    .filter((transaction) => transaction.type === "expense")
    .forEach((transaction) => {
      if (expensesByCategory[transaction.category]) {
        expensesByCategory[transaction.category] += transaction.amount;
      } else {
        expensesByCategory[transaction.category] = transaction.amount;
      }
    });
  
  return Object.keys(expensesByCategory).map((category) => ({
    name: category,
    value: expensesByCategory[category],
  }));
};

export const getMonthlyData = (): { name: string; income: number; expenses: number }[] => {
  const monthlyData: { [key: string]: { income: number; expenses: number } } = {};
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  // Initialize the last 6 months
  const today = new Date();
  for (let i = 5; i >= 0; i--) {
    const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthKey = `${month.getFullYear()}-${month.getMonth()}`;
    const monthName = monthNames[month.getMonth()];
    monthlyData[monthKey] = { 
      name: monthName, 
      income: 0, 
      expenses: 0 
    };
  }
  
  // Add transaction data
  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    
    if (monthlyData[monthKey]) {
      if (transaction.type === "income") {
        monthlyData[monthKey].income += transaction.amount;
      } else {
        monthlyData[monthKey].expenses += transaction.amount;
      }
    }
  });
  
  return Object.values(monthlyData);
};

// Get total progress towards all goals
export const getTotalGoalsProgress = (): number => {
  const totalTarget = financialGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrent = financialGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  
  return totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;
};
