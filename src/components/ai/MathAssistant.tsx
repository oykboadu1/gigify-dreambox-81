
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, Brain, Check, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface MathAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MathAssistant = ({ open, onOpenChange }: MathAssistantProps) => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCalculate = () => {
    if (!expression.trim()) return;
    
    setIsCalculating(true);
    setProgress(0);
    
    // Clear previous results
    setResult(null);
    setSteps([]);
    
    // Simulate AI thinking with progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);
    
    // Process the calculation after a short delay
    setTimeout(() => {
      try {
        // Parse and evaluate the expression
        calculateWithSteps(expression);
        clearInterval(interval);
        setProgress(100);
        
        setTimeout(() => {
          setIsCalculating(false);
        }, 500);
      } catch (error) {
        clearInterval(interval);
        setProgress(100);
        setResult("Error: I couldn't understand that expression");
        setSteps(["Please try a simpler calculation like '5 + 3' or '12 * 4'"]);
        
        setTimeout(() => {
          setIsCalculating(false);
        }, 500);
      }
    }, 1500);
  };
  
  // Function to evaluate BODMAS expressions safely using Function constructor
  const evaluateExpression = (expr: string): number => {
    // Replace × and x with * for multiplication
    const sanitizedExpr = expr
      .replace(/×/g, '*')
      .replace(/x/g, '*')
      .replace(/÷/g, '/');
    
    // Potentially dangerous but limited to mathematical operations
    // eslint-disable-next-line no-new-func
    return Function(`'use strict'; return (${sanitizedExpr})`)();
  };

  // Function to solve equations like "2x + 3 = 7"
  const solveEquation = (equation: string): { result: string, steps: string[] } => {
    // Check if it's an equation (contains = sign)
    if (!equation.includes('=')) {
      throw new Error('Not an equation');
    }

    const [leftSide, rightSide] = equation.split('=').map(side => side.trim());
    
    // Currently handle simple equations of the form: ax + b = c
    // This is a simplified approach for basic linear equations only
    if (leftSide.includes('x') || rightSide.includes('x')) {
      try {
        const steps: string[] = [];
        steps.push(`I'll solve the equation: ${equation}`);

        // For simplicity, we'll handle the case where x is on the left side
        // Example: "2x + 3 = 7" or "x - 5 = 10"
        let xCoefficient = 1;
        let constant = 0;
        let rightValue = 0;

        try {
          rightValue = evaluateExpression(rightSide);
          steps.push(`First, I evaluate the right side: ${rightSide} = ${rightValue}`);
        } catch (e) {
          // If right side also has variables, this simple solver can't handle it
          throw new Error('Complex equation');
        }

        if (leftSide.includes('x')) {
          // Handle different forms of x coefficient: x, 1x, -x, -1x, 2x, etc.
          const xTerms = leftSide.match(/[+-]?\s*\d*\.?\d*\s*x/g) || [];
          const constantTerms = leftSide.replace(/[+-]?\s*\d*\.?\d*\s*x/g, '').trim();
          
          steps.push(`I identify the terms with x: ${xTerms.join(', ')}`);
          if (constantTerms) {
            steps.push(`And the constant terms: ${constantTerms}`);
          }

          if (xTerms.length > 0) {
            xTerms.forEach(term => {
              // Extract coefficient of x
              if (term === 'x') {
                xCoefficient = 1;
              } else if (term === '-x') {
                xCoefficient = -1;
              } else {
                const coefficient = parseFloat(term.replace('x', ''));
                if (!isNaN(coefficient)) {
                  xCoefficient = coefficient;
                }
              }
            });
          }

          // Get the constant part
          if (constantTerms) {
            try {
              constant = evaluateExpression(constantTerms);
            } catch (e) {
              // If we can't evaluate, assume it's 0
              constant = 0;
            }
          }

          steps.push(`The coefficient of x is ${xCoefficient}`);
          if (constant !== 0) {
            steps.push(`The constant term is ${constant}`);
          }

          // Move constant to the right side
          if (constant !== 0) {
            rightValue = rightValue - constant;
            steps.push(`I move the constant to the right side: ${rightValue} = ${rightValue}`);
          }

          // Divide by coefficient of x
          const solution = rightValue / xCoefficient;
          steps.push(`Finally, I divide by ${xCoefficient} to isolate x`);
          steps.push(`x = ${solution}`);

          return {
            result: `x = ${solution}`,
            steps
          };
        } else {
          throw new Error('Complex equation');
        }
      } catch (error) {
        throw new Error('Unable to solve this equation');
      }
    } else {
      throw new Error('No variable found in the equation');
    }
  };
  
  const calculateWithSteps = (expr: string) => {
    // Check if it's an equation
    if (expr.includes('=')) {
      try {
        const { result, steps } = solveEquation(expr);
        setResult(result);
        setSteps(steps);
        return;
      } catch (error) {
        // If equation solving fails, try treating it as a standard expression
        console.log("Equation solving failed, trying as expression");
      }
    }
    
    // Clean the expression
    const sanitizedExpr = expr.replace(/\s+/g, '');
    
    // Handle basic operations first
    try {
      if (sanitizedExpr.includes('+') || 
          sanitizedExpr.includes('-') || 
          sanitizedExpr.includes('*') || sanitizedExpr.includes('×') || sanitizedExpr.includes('x') ||
          sanitizedExpr.includes('/') || sanitizedExpr.includes('÷')) {
        
        // Handle BODMAS expressions
        const bodmasSteps: string[] = [];
        bodmasSteps.push(`The expression is: ${expr}`);
        
        // Explain BODMAS rule
        bodmasSteps.push("I'll use the BODMAS rule to solve this:");
        bodmasSteps.push("B - Brackets, O - Orders (powers/roots), D - Division, M - Multiplication, A - Addition, S - Subtraction");
        
        try {
          // Evaluate the expression
          const answer = evaluateExpression(sanitizedExpr);
          
          // Add evaluation steps
          if (sanitizedExpr.includes('(') || sanitizedExpr.includes(')')) {
            bodmasSteps.push("First, I'll evaluate the expressions within brackets");
          }
          
          if (sanitizedExpr.includes('*') || sanitizedExpr.includes('×') || sanitizedExpr.includes('x') || 
              sanitizedExpr.includes('/') || sanitizedExpr.includes('÷')) {
            bodmasSteps.push("Next, I'll perform the multiplication and division operations from left to right");
          }
          
          if (sanitizedExpr.includes('+') || sanitizedExpr.includes('-')) {
            bodmasSteps.push("Finally, I'll perform the addition and subtraction operations from left to right");
          }
          
          bodmasSteps.push(`The result is: ${answer}`);
          
          setResult(answer.toString());
          setSteps(bodmasSteps);
          return;
        } catch (error) {
          throw new Error("Invalid BODMAS expression");
        }
      }
    } catch (error) {
      // Fall back to simpler calculations
    }
    
    // Handle addition (fallback)
    if (sanitizedExpr.includes('+')) {
      const [a, b] = sanitizedExpr.split('+').map(Number);
      if (!isNaN(a) && !isNaN(b)) {
        const sum = a + b;
        setResult(sum.toString());
        setSteps([
          `First, I identify that this is an addition problem: ${a} + ${b}`,
          `To add these numbers, I need to combine their values`,
          `${a} + ${b} = ${sum}`
        ]);
        return;
      }
    }
    
    // Handle subtraction (fallback)
    if (sanitizedExpr.includes('-')) {
      const [a, b] = sanitizedExpr.split('-').map(Number);
      if (!isNaN(a) && !isNaN(b)) {
        const difference = a - b;
        setResult(difference.toString());
        setSteps([
          `First, I identify that this is a subtraction problem: ${a} - ${b}`,
          `To subtract, I need to find the difference between the numbers`,
          `${a} - ${b} = ${difference}`
        ]);
        return;
      }
    }
    
    // Handle multiplication (fallback)
    if (sanitizedExpr.includes('*') || sanitizedExpr.includes('×') || sanitizedExpr.includes('x')) {
      const parts = sanitizedExpr.split(/[\*×x]/);
      const [a, b] = parts.map(Number);
      if (!isNaN(a) && !isNaN(b)) {
        const product = a * b;
        setResult(product.toString());
        setSteps([
          `First, I identify that this is a multiplication problem: ${a} × ${b}`,
          `To multiply, I calculate the product of the two numbers`,
          `${a} × ${b} = ${product}`
        ]);
        return;
      }
    }
    
    // Handle division (fallback)
    if (sanitizedExpr.includes('/') || sanitizedExpr.includes('÷')) {
      const parts = sanitizedExpr.split(/[\/÷]/);
      const [a, b] = parts.map(Number);
      if (!isNaN(a) && !isNaN(b)) {
        if (b === 0) {
          setResult("Error: Division by zero");
          setSteps([
            `I notice this is a division problem: ${a} ÷ ${b}`,
            `However, division by zero is undefined in mathematics`,
            `Therefore, ${a} ÷ 0 cannot be calculated`
          ]);
          return;
        }
        
        const quotient = a / b;
        setResult(quotient.toString());
        setSteps([
          `First, I identify that this is a division problem: ${a} ÷ ${b}`,
          `To divide, I find how many times ${b} goes into ${a}`,
          `${a} ÷ ${b} = ${quotient}`
        ]);
        return;
      }
    }
    
    // If we get here, we couldn't parse the expression
    throw new Error("Couldn't parse the expression");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-dreambox-purple" />
            Math Learning Assistant
          </DialogTitle>
          <DialogDescription>
            I can help you solve math problems, BODMAS expressions, and simple equations. Type your question below.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          <div className="flex gap-2">
            <Input
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="Enter a math problem (e.g., 5 + 3 or 2x + 3 = 7)"
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCalculate();
                }
              }}
            />
            <Button 
              onClick={handleCalculate} 
              disabled={isCalculating || !expression.trim()}
              className="bg-dreambox-blue hover:bg-dreambox-blue/90"
            >
              <Calculator className="h-4 w-4 mr-1" />
              Solve
            </Button>
          </div>
          
          {isCalculating && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 animate-pulse text-dreambox-purple" />
                <p className="text-sm">Analyzing your problem...</p>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          {result !== null && !isCalculating && (
            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Result:</p>
                <div className="bg-dreambox-light-blue px-3 py-1 rounded-full text-dreambox-blue font-semibold">
                  {result}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Step-by-step solution:</p>
                <ul className="space-y-1">
                  {steps.map((step, index) => (
                    <li key={index} className="text-sm flex gap-2">
                      <span className="text-dreambox-blue">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-0">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-dreambox-blue text-dreambox-blue hover:bg-dreambox-blue/10"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MathAssistant;
