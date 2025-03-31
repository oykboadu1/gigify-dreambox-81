
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  Edit, 
  Edit2, 
  Home, 
  Laptop, 
  Plus, 
  Shield, 
  Trash2, 
  Trophy
} from "lucide-react";
import { cn } from "@/lib/utils";
import { financialGoals } from "@/services/financeData";

const Goals = () => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Get icon based on category name
  const getGoalIcon = (iconName: string) => {
    switch (iconName) {
      case "shield":
        return <Shield className="h-5 w-5" />;
      case "laptop":
        return <Laptop className="h-5 w-5" />;
      case "palm-tree":
        return <Calendar className="h-5 w-5" />;
      case "home":
        return <Home className="h-5 w-5" />;
      default:
        return <Trophy className="h-5 w-5" />;
    }
  };

  // Get background color based on goal color
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
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Calculate days remaining until deadline
  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 ? daysDiff : 0;
  };

  // Sort goals by progress (lowest to highest)
  const sortedGoals = [...financialGoals].sort(
    (a, b) => (a.currentAmount / a.targetAmount) - (b.currentAmount / b.targetAmount)
  );

  return (
    <DashboardLayout title="Financial Goals">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Active Goals */}
        <div className="col-span-full md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Active Goals</CardTitle>
              <Button className="rounded-full">
                <Plus className="mr-2 h-4 w-4" />
                New Goal
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedGoals.map((goal) => (
                  <div key={goal.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", getBgColor(goal.color))}>
                          {getGoalIcon(goal.icon)}
                        </div>
                        <div>
                          <h3 className="font-medium">{goal.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>
                              {getDaysRemaining(goal.deadline)} days left
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {Math.round((goal.currentAmount / goal.targetAmount) * 100)}% complete
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <Progress
                        value={(goal.currentAmount / goal.targetAmount) * 100}
                        className="h-2 flex-1"
                      />
                      <div className="ml-4 flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Goal Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Goal Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-4 items-start border rounded-lg p-4">
                  <div className="bg-dreambox-light-blue p-2 rounded-full">
                    <Shield className="h-5 w-5 text-dreambox-blue" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Emergency Fund</h3>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-3.5 w-3.5" />
                        Add Goal
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      We recommend saving 3-6 months of essential expenses for emergencies.
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-4 items-start border rounded-lg p-4">
                  <div className="bg-dreambox-light-green p-2 rounded-full">
                    <Home className="h-5 w-5 text-dreambox-green" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Home Down Payment</h3>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-3.5 w-3.5" />
                        Add Goal
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Save at least 20% of your target home price for a down payment.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goal Insights */}
        <div className="col-span-full md:col-span-2 lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Goal Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg bg-dreambox-light-blue p-4 text-dreambox-blue">
                  <h3 className="font-semibold mb-2">Goal Progress</h3>
                  <p className="text-sm">
                    You're making great progress! Continue your current savings rate to meet your goals on time.
                  </p>
                </div>
                
                <div className="rounded-lg bg-dreambox-light-purple p-4 text-dreambox-purple">
                  <h3 className="font-semibold mb-2">Achievement Pace</h3>
                  <p className="text-sm">
                    Based on your current pace, you'll reach your "New Laptop" goal 2 weeks ahead of schedule.
                  </p>
                </div>
                
                <div className="rounded-lg bg-dreambox-light-orange p-4 text-dreambox-orange">
                  <h3 className="font-semibold mb-2">Optimization Opportunity</h3>
                  <p className="text-sm">
                    Consider increasing monthly contributions to your Emergency Fund to reach your target faster.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Achieving Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-dreambox-light-blue text-dreambox-blue">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Automate Your Savings</h4>
                    <p className="text-sm text-muted-foreground">
                      Set up automatic transfers to your savings accounts right after payday.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-dreambox-light-blue text-dreambox-blue">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Focus on One Goal at a Time</h4>
                    <p className="text-sm text-muted-foreground">
                      Prioritize your most important goals to make faster progress.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-dreambox-light-blue text-dreambox-blue">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Review and Adjust</h4>
                    <p className="text-sm text-muted-foreground">
                      Regularly review your goals and adjust your savings plan as needed.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Goals;
