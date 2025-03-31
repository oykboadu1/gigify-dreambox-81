
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowDownUp, 
  ChevronDown, 
  CreditCard, 
  Filter, 
  MoreHorizontal, 
  Search, 
  TrendingUp 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Transaction, transactions as allTransactions } from "@/services/financeData";

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Get unique categories from transactions
  const categories = ["all", ...new Set(allTransactions.map((t) => t.category))];

  // Filter and sort transactions
  const filteredTransactions = allTransactions
    .filter((transaction) => {
      // Search filter
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Type filter
      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;

      // Category filter
      const matchesCategory =
        categoryFilter === "all" ||
        transaction.category.toLowerCase() === categoryFilter.toLowerCase();

      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => {
      // Sorting
      if (sortField === "date") {
        return sortDirection === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortField === "amount") {
        return sortDirection === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
      return 0;
    });

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Toggle sort direction
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <DashboardLayout title="Transactions">
      <Card>
        <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle>Transaction History</CardTitle>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Filters:</span>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-8 w-[130px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-8 w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category === "all"
                      ? "All Categories"
                      : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto flex items-center gap-1"
              onClick={() => toggleSort("date")}
            >
              <ArrowDownUp className="h-3.5 w-3.5" />
              <span>
                {sortField === "date"
                  ? `Date: ${sortDirection === "asc" ? "Oldest" : "Newest"}`
                  : "Sort by Date"}
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => toggleSort("amount")}
            >
              <ArrowDownUp className="h-3.5 w-3.5" />
              <span>
                {sortField === "amount"
                  ? `Amount: ${sortDirection === "asc" ? "Low to High" : "High to Low"}`
                  : "Sort by Amount"}
              </span>
            </Button>
          </div>

          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b bg-muted px-4 py-2 text-sm font-medium">
              <div className="col-span-6 lg:col-span-5">Description</div>
              <div className="col-span-2 text-right lg:col-span-2">Amount</div>
              <div className="col-span-3 hidden lg:block">Category</div>
              <div className="col-span-3 text-right lg:col-span-1">Date</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            <div className="divide-y">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                    formatCurrency={formatCurrency}
                  />
                ))
              ) : (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No transactions match your filters
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

// Transaction Row Component
interface TransactionRowProps {
  transaction: Transaction;
  formatCurrency: (amount: number) => string;
}

const TransactionRow = ({ transaction, formatCurrency }: TransactionRowProps) => {
  return (
    <div className="grid grid-cols-12 items-center px-4 py-3 text-sm">
      <div className="col-span-6 flex items-center gap-3 lg:col-span-5">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            transaction.type === "income"
              ? "bg-dreambox-light-green text-dreambox-green"
              : "bg-dreambox-light-orange text-dreambox-orange"
          )}
        >
          {transaction.type === "income" ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <CreditCard className="h-4 w-4" />
          )}
        </div>
        <div className="truncate">{transaction.description}</div>
      </div>
      <div
        className={cn(
          "col-span-2 text-right font-medium lg:col-span-2",
          transaction.type === "income" ? "text-green-600" : "text-red-600"
        )}
      >
        {transaction.type === "income" ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </div>
      <div className="col-span-3 hidden truncate text-muted-foreground lg:block">
        {transaction.category}
      </div>
      <div className="col-span-3 text-right text-muted-foreground lg:col-span-1">
        {new Date(transaction.date).toLocaleDateString()}
      </div>
      <div className="col-span-1 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Transactions;
