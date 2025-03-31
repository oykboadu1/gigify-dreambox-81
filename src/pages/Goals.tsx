import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PiggyBank, Trash2, Edit, Plus, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { getGoals } from "@/services/financeData";

const Goals = () => {
  const [goals, setGoals] = useState(getGoals());
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
  // Get color classes based on progress
  const getProgressColorClass = (percentage: number) => {
    if (percentage < 25) return "bg-red-500";
    if (percentage < 50) return "bg-yellow-500";
    if (percentage < 75) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <DashboardLayout title="Goals">
      <div className="grid gap-6">
        <Card className="col-span-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Your Financial Goals</CardTitle>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Goal
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dreambox-light-blue text-dreambox-blue">
                        <PiggyBank className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{goal.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-4 font-medium">
                        {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
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
                    value={Math.round((goal.currentAmount / goal.targetAmount) * 100)}
                    className={cn("h-2 mt-3", getProgressColorClass(Math.round((goal.currentAmount / goal.targetAmount) * 100)))}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Goals;
