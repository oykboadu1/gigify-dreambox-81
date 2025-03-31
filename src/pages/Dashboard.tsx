
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, BarChart, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { 
  ArrowDown, 
  ArrowUp, 
  Banknote, 
  CreditCard, 
  DollarSign, 
  Target, 
  TrendingUp 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  getBalance, 
  getExpensesByCategory, 
  getMonthlyData, 
  getTotalExpenses, 
  getTotalGoalsProgress, 
  getTotalIncome, 
  getAllTransactions
} from "@/services/financeData";

const Dashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");
  
  const balance = getBalance();
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const goalsProgress = getTotalGoalsProgress();
  const monthlyData = getMonthlyData();
  const expensesByCategory = getExpensesByCategory();
  const transactions = getAllTransactions();

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Custom colors for pie chart
  const COLORS = ["#0EA5E9", "#8B5CF6", "#F97316", "#10B981", "#EF4444"];

  return (
    <DashboardLayout title="Financial Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
            <p className="text-xs text-muted-foreground">
              Available to spend
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <ArrowUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div>
            <p className="text-xs text-muted-foreground">
              Total income received
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <ArrowDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
            <p className="text-xs text-muted-foreground">
              Total money spent
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Goals Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goalsProgress.toFixed(0)}%</div>
            <Progress value={goalsProgress} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Income vs Expenses</CardTitle>
              <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="quarter">Quarter</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <AreaChart
                data={monthlyData}
                width={800}
                height={300}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#0EA5E9"
                  fillOpacity={1}
                  fill="url(#colorIncome)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#EF4444"
                  fillOpacity={1}
                  fill="url(#colorExpenses)"
                />
              </AreaChart>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PieChart width={400} height={300}>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expensesByCategory.map((entry, index) => (
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
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full",
                        transaction.type === "income"
                          ? "bg-dreambox-light-green text-dreambox-green"
                          : "bg-dreambox-light-orange text-dreambox-orange"
                      )}
                    >
                      {transaction.type === "income" ? (
                        <TrendingUp className="h-5 w-5" />
                      ) : (
                        <CreditCard className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "font-medium",
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    )}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
