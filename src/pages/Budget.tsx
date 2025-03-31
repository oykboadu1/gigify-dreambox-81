
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { 
  Home, 
  Car, 
  ShoppingBag, 
  Film, 
  Zap, 
  Edit, 
  Trash2, 
  TrendingUp, 
  Plus 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getBudgetCategories } from "@/services/financeData";

// Sample budget data with icons
const budgetCategories = [
  {
    id: 1,
    name: "Housing",
    budgeted: 1200,
    spent: 1150,
    icon: "home",
    color: "blue"
  },
  {
    id: 2,
    name: "Transportation",
    budgeted: 400,
    spent: 350,
    icon: "car",
    color: "green"
  },
  {
    id: 3,
    name: "Food",
    budgeted: 600,
    spent: 580,
    icon: "utensils",
    color: "orange"
  },
  {
    id: 4,
    name: "Entertainment",
    budgeted: 200,
    spent: 180,
    icon: "film",
    color: "purple"
  },
  {
    id: 5,
    name: "Utilities",
    budgeted: 300,
    spent: 280,
    icon: "zap",
    color: "yellow"
  }
];

const Budget = () => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Get icon based on category name
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return <Home className="h-5 w-5" />;
      case "car":
        return <Car className="h-5 w-5" />;
      case "utensils":
        return <ShoppingBag className="h-5 w-5" />;
      case "film":
        return <Film className="h-5 w-5" />;
      case "zap":
        return <Zap className="h-5 w-5" />;
      default:
        return <ShoppingBag className="h-5 w-5" />;
    }
  };

  // Get color based on budget usage percentage
  const getColorBasedOnUsage = (spent: number, budgeted: number) => {
    const percentage = (spent / budgeted) * 100;
    if (percentage < 50) return "text-green-600";
    if (percentage < 80) return "text-yellow-600";
    return "text-red-600";
  };

  // Get background color based on category color
  const getBgColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-dreambox-light-blue text-dreambox-blue";
      case "green":
        return "bg-dreambox-light-green text-dreambox-green";
      case "orange":
        return "bg-dreambox-light-orange text-dreambox-orange";
      case "purple":
        return "bg-dreambox-light-purple text-dreambox-purple";
      case "yellow":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Calculate total budget and spending
  const totalBudgeted = budgetCategories.reduce(
    (sum, category) => sum + category.budgeted,
    0
  );
  
  const totalSpent = budgetCategories.reduce(
    (sum, category) => sum + category.spent,
    0
  );

  // Prepare data for pie chart
  const pieData = budgetCategories.map((category) => ({
    name: category.name,
    value: category.budgeted,
  }));

  // Custom colors for pie chart
  const COLORS = ["#0EA5E9", "#10B981", "#F97316", "#8B5CF6", "#EAB308"];

  return (
    <DashboardLayout title="Budget">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Monthly Budget Overview</CardTitle>
            <div className="text-sm text-muted-foreground">
              {formatCurrency(totalSpent)} of {formatCurrency(totalBudgeted)} budgeted
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-4 mb-6 overflow-hidden rounded-full">
              <div 
                className="h-full bg-dreambox-blue" 
                style={{ width: `${Math.min((totalSpent / totalBudgeted) * 100, 100)}%` }}
              />
            </div>
            
            <div className="space-y-4">
              {budgetCategories.map((category) => (
                <BudgetCategoryCard
                  key={category.id}
                  category={category}
                  formatCurrency={formatCurrency}
                  getCategoryIcon={getCategoryIcon}
                  getColorBasedOnUsage={getColorBasedOnUsage}
                  getBgColor={getBgColor}
                />
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Budget Category
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Budget Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PieChart width={400} height={300}>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Budget Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-4 items-start">
                <div className="bg-dreambox-light-blue p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-dreambox-blue" />
                </div>
                <div>
                  <h3 className="font-medium">Use the 50/30/20 Rule</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-4 items-start">
                <div className="bg-dreambox-light-green p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-dreambox-green" />
                </div>
                <div>
                  <h3 className="font-medium">Plan for Irregular Expenses</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Set aside money each month for irregular expenses like car maintenance or annual subscriptions.
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-4 items-start">
                <div className="bg-dreambox-light-purple p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-dreambox-purple" />
                </div>
                <div>
                  <h3 className="font-medium">Review and Adjust Regularly</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Review your budget monthly and make adjustments based on changes in income or expenses.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

// Budget Category Card Component
interface BudgetCategoryCardProps {
  category: {
    id: number;
    name: string;
    budgeted: number;
    spent: number;
    icon: string;
    color: string;
  };
  formatCurrency: (amount: number) => string;
  getCategoryIcon: (iconName: string) => JSX.Element;
  getColorBasedOnUsage: (spent: number, budgeted: number) => string;
  getBgColor: (color: string) => string;
}

const BudgetCategoryCard = ({
  category,
  formatCurrency,
  getCategoryIcon,
  getColorBasedOnUsage,
  getBgColor,
}: BudgetCategoryCardProps) => {
  const percentage = Math.min(
    Math.round((category.spent / category.budgeted) * 100),
    100
  );

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", getBgColor(category.color))}>
            {getCategoryIcon(category.icon)}
          </div>
          <div>
            <h3 className="font-medium">{category.name}</h3>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(category.spent)} of {formatCurrency(category.budgeted)}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <span className={cn("mr-4 font-medium", getColorBasedOnUsage(category.spent, category.budgeted))}>
            {percentage}%
          </span>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Progress 
        value={percentage} 
        className={cn("h-2 mt-3", 
          percentage > 80 ? "bg-red-500" : 
          percentage > 60 ? "bg-yellow-500" : 
          "bg-green-500"
        )} 
      />
    </div>
  );
};

export default Budget;
