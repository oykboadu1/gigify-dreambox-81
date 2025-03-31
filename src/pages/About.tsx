
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Calculator, Function, Book, School } from "lucide-react";
import MathAssistant from "@/components/ai/MathAssistant";

const AboutPage = () => {
  const [mathAssistantOpen, setMathAssistantOpen] = useState(false);

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
        <section className="py-16 lg:py-24 bg-gradient-to-r from-dreambox-light-blue to-dreambox-light-purple">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                About Obiri Learning
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Our mission is to make mathematics accessible, understandable, and engaging for students of all ages.
              </p>
            </div>
          </div>
        </section>

        {/* About AI Learning Assistant */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">
                  <span className="text-dreambox-blue">AI-Powered</span> Math Learning Assistant
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our AI Learning Assistant is designed to help students understand and solve mathematical problems step-by-step.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dreambox-light-blue text-dreambox-blue">
                      <Calculator className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Basic Calculations</h3>
                      <p className="text-muted-foreground">
                        Addition, subtraction, multiplication, division, and more with detailed explanations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dreambox-light-purple text-dreambox-purple">
                      <Function className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">BODMAS Operations</h3>
                      <p className="text-muted-foreground">
                        Solve complex expressions following the order of operations: Brackets, Orders, Division, Multiplication, Addition, Subtraction.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dreambox-light-orange text-dreambox-orange">
                      <School className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Simple Equations</h3>
                      <p className="text-muted-foreground">
                        Solve basic algebraic equations like "2x + 3 = 7" with step-by-step explanations.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button 
                    size="lg" 
                    className="rounded-full bg-dreambox-blue hover:bg-dreambox-blue/90"
                    onClick={() => setMathAssistantOpen(true)}
                  >
                    <Brain className="mr-2 h-5 w-5" />
                    Try AI Learning Assistant
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-dreambox-light-blue via-dreambox-light-purple to-dreambox-light-orange p-1">
                  <div className="h-full w-full rounded-xl bg-white p-8">
                    <div className="flex flex-col h-full justify-center items-center text-center">
                      <Brain className="h-20 w-20 text-dreambox-purple mb-6" />
                      <h3 className="text-2xl font-bold mb-4">How It Works</h3>
                      <ol className="text-left space-y-3">
                        <li className="flex gap-2">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dreambox-light-blue text-dreambox-blue text-sm font-medium">1</span>
                          <span>Enter your math problem or equation</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dreambox-light-blue text-dreambox-blue text-sm font-medium">2</span>
                          <span>Our AI analyzes the question</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dreambox-light-blue text-dreambox-blue text-sm font-medium">3</span>
                          <span>Get step-by-step solutions</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dreambox-light-blue text-dreambox-blue text-sm font-medium">4</span>
                          <span>Learn from detailed explanations</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example Problems */}
        <section className="py-16 bg-muted">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Example Math Problems
              </h2>
              <p className="text-lg text-muted-foreground">
                Our AI Learning Assistant can handle a variety of mathematical problems, including:
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 text-dreambox-blue font-semibold">Basic Math</div>
                  <div className="space-y-2">
                    <div className="p-2 bg-dreambox-light-blue/20 rounded">
                      <code>5 + 3 × 4</code>
                    </div>
                    <div className="p-2 bg-dreambox-light-blue/20 rounded">
                      <code>64 ÷ 8 + 2</code>
                    </div>
                    <div className="p-2 bg-dreambox-light-blue/20 rounded">
                      <code>25 - 8 × 2</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 text-dreambox-purple font-semibold">BODMAS Expressions</div>
                  <div className="space-y-2">
                    <div className="p-2 bg-dreambox-light-purple/20 rounded">
                      <code>(2 + 3) × 4</code>
                    </div>
                    <div className="p-2 bg-dreambox-light-purple/20 rounded">
                      <code>8 ÷ 4 + 2 × 3</code>
                    </div>
                    <div className="p-2 bg-dreambox-light-purple/20 rounded">
                      <code>10 - (8 - 3)</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 text-dreambox-orange font-semibold">Simple Equations</div>
                  <div className="space-y-2">
                    <div className="p-2 bg-dreambox-light-orange/20 rounded">
                      <code>2x + 3 = 7</code>
                    </div>
                    <div className="p-2 bg-dreambox-light-orange/20 rounded">
                      <code>x - 5 = 10</code>
                    </div>
                    <div className="p-2 bg-dreambox-light-orange/20 rounded">
                      <code>3x = 15</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="max-w-xl mx-auto text-center mt-12">
              <Button 
                size="lg" 
                className="rounded-full bg-dreambox-blue hover:bg-dreambox-blue/90"
                onClick={() => setMathAssistantOpen(true)}
              >
                <Book className="mr-2 h-5 w-5" />
                Start Learning Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
