
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
  
  const calculateWithSteps = (expr: string) => {
    // Basic calculation with steps for common operations
    const sanitizedExpr = expr.replace(/\s+/g, '');
    
    // Handle addition
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
    
    // Handle subtraction
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
    
    // Handle multiplication
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
    
    // Handle division
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
            I can help you solve simple math problems and explain the steps.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          <div className="flex gap-2">
            <Input
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="Enter a math problem (e.g., 5 + 3)"
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
