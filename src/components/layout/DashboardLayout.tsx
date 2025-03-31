
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  BarChart3, 
  CreditCard, 
  DollarSign, 
  Home, 
  PieChart, 
  Plus, 
  Target, 
  Wallet, 
  X, 
  Menu 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
      current: location.pathname === "/dashboard",
    },
    {
      name: "Transactions",
      href: "/transactions",
      icon: CreditCard,
      current: location.pathname === "/transactions",
    },
    {
      name: "Budget",
      href: "/budget",
      icon: PieChart,
      current: location.pathname === "/budget",
    },
    {
      name: "Goals",
      href: "/goals",
      icon: Target,
      current: location.pathname === "/goals",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 mt-16 hidden w-64 transform border-r bg-background transition-transform duration-300 md:block",
            !sidebarOpen && isMobile && "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col overflow-y-auto">
            <div className="p-4">
              <div className="mb-6 flex items-center gap-2 text-lg font-semibold">
                <Wallet className="h-6 w-6 text-dreambox-blue" />
                <span>Finance Tracker</span>
              </div>
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                      item.current
                        ? "bg-dreambox-light-blue text-dreambox-blue"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-auto p-4">
              <Button
                variant="outline"
                className="flex w-full items-center gap-2 border-dreambox-blue text-dreambox-blue hover:bg-dreambox-blue/10"
                asChild
              >
                <Link to="/">
                  <Home className="h-4 w-4" />
                  <span>Back to Home</span>
                </Link>
              </Button>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 mt-16 w-64 transform border-r bg-background transition-transform duration-300 md:hidden",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col overflow-y-auto">
            <div className="flex justify-end p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4">
              <div className="mb-6 flex items-center gap-2 text-lg font-semibold">
                <Wallet className="h-6 w-6 text-dreambox-blue" />
                <span>Finance Tracker</span>
              </div>
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                      item.current
                        ? "bg-dreambox-light-blue text-dreambox-blue"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-auto p-4">
              <Button
                variant="outline"
                className="flex w-full items-center gap-2 border-dreambox-blue text-dreambox-blue hover:bg-dreambox-blue/10"
                asChild
                onClick={() => setSidebarOpen(false)}
              >
                <Link to="/">
                  <Home className="h-4 w-4" />
                  <span>Back to Home</span>
                </Link>
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main
          className={cn(
            "flex-1 overflow-auto transition-all duration-300",
            !isMobile && "md:ml-64"
          )}
        >
          <div className="container py-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={toggleSidebar}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <Button className="rounded-full bg-dreambox-blue hover:bg-dreambox-blue/90">
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Add Transaction</span>
                </Button>
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
