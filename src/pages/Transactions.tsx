import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard, Filter, Plus, Search, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  getAllTransactions,
  Transaction,
  addTransaction
} from "@/services/financeData";

const TransactionsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(getAllTransactions());
  
  // New transaction form state
  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().slice(0, 10),
    amount: "",
    description: "",
    category: "",
    type: "expense" as "income" | "expense"
  });
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Filter transactions
  const filteredTransactions = transactions
    .filter(t => filterType ? t.type === filterType : true)
    .filter(t => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query) ||
        formatCurrency(t.amount).includes(query)
      );
    });
  
  // Add new transaction
  const handleAddTransaction = () => {
    // Simple validation
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.category) {
      return;
    }
    
    const transactionToAdd = {
      date: newTransaction.date,
      amount: newTransaction.type === "income" 
        ? Math.abs(Number(newTransaction.amount)) 
        : -Math.abs(Number(newTransaction.amount)),
      description: newTransaction.description,
      category: newTransaction.category,
      type: newTransaction.type
    };
    
    const addedTransaction = addTransaction(transactionToAdd);
    setTransactions([addedTransaction, ...transactions]);
    
    // Reset form
    setNewTransaction({
      date: new Date().toISOString().slice(0, 10),
      amount: "",
      description: "",
      category: "",
      type: "expense" as "income" | "expense"
    });
  };

  return (
    <DashboardLayout title="Transactions">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Input
                type="search"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-center space-x-4">
              <Select onValueChange={(value) => setFilterType(value === "all" ? null : value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Filter Transactions</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {/* Add filter options here */}
                  </div>
                  <DialogFooter>
                    <Button type="submit">Apply Filters</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn(
                          transaction.type === "income"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        )}
                      >
                        {transaction.type}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right text-sm font-medium leading-none text-right">
                Date
              </label>
              <Input 
                type="date" 
                id="date" 
                className="col-span-3" 
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right text-sm font-medium leading-none text-right">
                Description
              </label>
              <Input 
                type="text" 
                id="description" 
                className="col-span-3" 
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right text-sm font-medium leading-none text-right">
                Category
              </label>
              <Input 
                type="text" 
                id="category" 
                className="col-span-3" 
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="amount" className="text-right text-sm font-medium leading-none text-right">
                Amount
              </label>
              <Input 
                type="number" 
                id="amount" 
                className="col-span-3" 
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="type" className="text-right text-sm font-medium leading-none text-right">
                Type
              </label>
              <Select onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value as "income" | "expense" })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddTransaction}>Add Transaction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default TransactionsPage;
