
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BarChart3, Book, Brain, GraduationCap, LineChart, User, Wallet, PieChart, Target, CreditCard } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import MathAssistant from "@/components/ai/MathAssistant";

const HomePage = () => {
  const { toast } = useToast();
  const [mathAssistantOpen, setMathAssistantOpen] = useState(false);
  
  const showAIToast = () => {
    setMathAssistantOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Math Assistant Dialog */}
        <MathAssistant 
          open={mathAssistantOpen} 
          onOpenChange={setMathAssistantOpen} 
        />

        {/* Hero Section */}
        <section className="hero-gradient py-16 lg:py-24">
          <div className="container grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block text-dreambox-blue">Smart Learning</span>
                <span className="block">for Every Student</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Adaptive learning platform that personalizes education for K-8 students, making math engaging and effective.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="rounded-full bg-dreambox-blue hover:bg-dreambox-blue/90"
                  onClick={showAIToast}
                >
                  Try AI Learning Assistant
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-dreambox-blue text-dreambox-blue hover:bg-dreambox-blue/10"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80"
                  alt="Student using laptop"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 hidden h-24 w-24 animate-float rounded-xl bg-dreambox-light-purple p-4 shadow-lg md:flex md:items-center md:justify-center">
                <Brain size={40} className="text-dreambox-purple" />
              </div>
              <div className="absolute -right-4 -top-4 hidden h-24 w-24 animate-float rounded-xl bg-dreambox-light-blue p-4 shadow-lg md:flex md:items-center md:justify-center">
                <GraduationCap size={40} className="text-dreambox-blue" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Why Choose Obiri?
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Our adaptive learning platform meets every student where they are and helps them progress at their own pace.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-dreambox-light-blue">
                    <Brain className="h-6 w-6 text-dreambox-blue" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Adaptive Learning</h3>
                  <p className="text-muted-foreground">
                    Our platform adjusts in real-time to each student's responses and learning patterns.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-dreambox-light-purple">
                    <LineChart className="h-6 w-6 text-dreambox-purple" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Progress Tracking</h3>
                  <p className="text-muted-foreground">
                    Detailed analytics help teachers and parents monitor student growth and identify areas for improvement.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-dreambox-light-orange">
                    <GraduationCap className="h-6 w-6 text-dreambox-orange" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Engaging Content</h3>
                  <p className="text-muted-foreground">
                    Interactive lessons and games make learning fun and keep students motivated.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-dreambox-light-purple">
                    <User className="h-6 w-6 text-dreambox-purple" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Personalized Learning</h3>
                  <p className="text-muted-foreground">
                    Each student gets a customized learning path based on their unique needs and abilities.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-dreambox-light-blue">
                    <Book className="h-6 w-6 text-dreambox-blue" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Comprehensive Curriculum</h3>
                  <p className="text-muted-foreground">
                    Aligned with educational standards and covers all key mathematical concepts.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-dreambox-light-green">
                    <BarChart3 className="h-6 w-6 text-dreambox-green" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">AI-Powered Insights</h3>
                  <p className="text-muted-foreground">
                    Our AI engine analyzes learning patterns to provide tailored recommendations and insights.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* New Section: Finance Dashboard */}
        <section className="py-16 bg-muted">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Take Control of Your Finances
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Our comprehensive financial dashboard gives you powerful tools to track, plan, and optimize your personal finances.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-dreambox-light-blue">
                    <Wallet className="h-6 w-6 text-dreambox-blue" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Track Income & Expenses</h3>
                  <p className="text-muted-foreground">
                    Get a complete view of your finances with easy transaction tracking and visualization.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-dreambox-light-purple">
                    <PieChart className="h-6 w-6 text-dreambox-purple" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Plan Your Budget</h3>
                  <p className="text-muted-foreground">
                    Create and manage budgets to control spending and increase savings.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-dreambox-light-orange">
                    <Target className="h-6 w-6 text-dreambox-orange" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Set Financial Goals</h3>
                  <p className="text-muted-foreground">
                    Define and track progress toward important financial goals and milestones.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-dreambox-light-green">
                    <CreditCard className="h-6 w-6 text-dreambox-green" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Smart Insights</h3>
                  <p className="text-muted-foreground">
                    Get personalized recommendations to improve your financial health.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-10 text-center">
              <Button 
                asChild
                size="lg"
                className="rounded-full bg-dreambox-blue hover:bg-dreambox-blue/90"
              >
                <Link to="/dashboard">
                  <Wallet className="mr-2 h-5 w-5" />
                  Try Finance Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Gigs */}
        <section className="py-16">
          <div className="container">
            <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Featured Gigs
                </h2>
                <p className="text-muted-foreground">
                  Discover our most popular learning experiences
                </p>
              </div>
              <Link
                to="/gigs"
                className="rounded-full border border-dreambox-blue px-6 py-2 text-dreambox-blue transition-colors hover:bg-dreambox-blue/10"
              >
                View All Gigs
              </Link>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Link to="/gigs/1" className="gig-card group">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                    alt="Math foundations"
                    className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <span className="inline-block rounded-full bg-dreambox-light-blue px-3 py-1 text-xs font-medium text-dreambox-blue">
                    Mathematics
                  </span>
                  <h3 className="mt-2 text-xl font-semibold group-hover:text-dreambox-blue">
                    Math Foundations for K-2
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Build strong number sense and early math skills
                  </p>
                </div>
              </Link>
              <Link to="/gigs/2" className="gig-card group">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
                    alt="Coding for kids"
                    className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <span className="inline-block rounded-full bg-dreambox-light-purple px-3 py-1 text-xs font-medium text-dreambox-purple">
                    Coding
                  </span>
                  <h3 className="mt-2 text-xl font-semibold group-hover:text-dreambox-purple">
                    Intro to Coding for Kids
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Learn programming concepts through fun activities
                  </p>
                </div>
              </Link>
              <Link to="/gigs/3" className="gig-card group">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
                    alt="Robotics basics"
                    className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <span className="inline-block rounded-full bg-dreambox-light-orange px-3 py-1 text-xs font-medium text-dreambox-orange">
                    Robotics
                  </span>
                  <h3 className="mt-2 text-xl font-semibold group-hover:text-dreambox-orange">
                    Robotics Basics
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Discover how robots work and build simple machines
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* AI Feature Spotlight */}
        <section className="py-16">
          <div className="container grid gap-8 md:grid-cols-2 md:items-center">
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"
                  alt="AI Learning Assistant"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 right-4 h-32 w-32 rounded-xl bg-white/90 p-4 backdrop-blur-sm md:flex md:items-center md:justify-center">
                <div className="flex flex-col items-center justify-center space-y-1 text-center">
                  <div className="text-3xl font-bold text-dreambox-blue">AI</div>
                  <div className="text-xs font-medium">Powered Learning</div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="block text-dreambox-purple">AI Learning Assistant</span>
                <span className="block">Personalized for You</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Our AI engine analyzes your learning patterns, preferences, and performance to create a truly personalized educational experience.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dreambox-light-blue text-dreambox-blue">
                    ✓
                  </div>
                  <span>Adaptive difficulty based on your performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dreambox-light-blue text-dreambox-blue">
                    ✓
                  </div>
                  <span>Smart recommendations for new lessons and content</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dreambox-light-blue text-dreambox-blue">
                    ✓
                  </div>
                  <span>Detailed insights about learning styles and preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dreambox-light-blue text-dreambox-blue">
                    ✓
                  </div>
                  <span>Personalized feedback and improvement suggestions</span>
                </li>
              </ul>
              <Button 
                className="rounded-full bg-dreambox-purple hover:bg-dreambox-purple/90"
                onClick={showAIToast}
              >
                Explore AI Features
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-dreambox-blue to-dreambox-purple py-16 text-white">
          <div className="container text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Ready to Transform Learning?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
              Join thousands of students, parents, and educators who are already using Obiri to enhance their learning experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full text-dreambox-purple hover:bg-white"
              >
                Get Started Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-white text-white hover:bg-white/20"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
