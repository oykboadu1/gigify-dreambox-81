
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Brain, Lightbulb, Sparkles } from "lucide-react";

interface AIRecommendationEngineProps {
  gigId: number;
  matchScore: number;
  recommendations: string[];
}

const AIRecommendationEngine = ({
  gigId,
  matchScore,
  recommendations,
}: AIRecommendationEngineProps) => {
  const [analyzing, setAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Simulate AI analysis with progress
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (analyzing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setAnalyzing(false);
            setTimeout(() => setShowRecommendations(true), 500);
            return 100;
          }
          return prev + 5;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [analyzing]);

  // Get color class based on match score
  const getMatchScoreColor = () => {
    if (matchScore >= 90) return "text-green-600";
    if (matchScore >= 75) return "text-yellow-600";
    return "text-orange-500";
  };

  return (
    <div className="mt-3 rounded-lg border p-4">
      {analyzing ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 animate-pulse text-dreambox-purple" />
            <p className="font-medium">Analyzing your learning profile...</p>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      ) : (
        <div className="space-y-4">
          {!showRecommendations ? (
            <div className="flex h-24 items-center justify-center">
              <div className="animate-pulse text-center">
                <Sparkles className="mx-auto h-6 w-6 text-dreambox-purple" />
                <p className="mt-2">Generating personalized recommendations...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-dreambox-purple" />
                  <p className="font-medium">AI Learning Match</p>
                </div>
                <div className={`text-lg font-bold ${getMatchScoreColor()}`}>
                  {matchScore}%
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-dreambox-blue" />
                  <p className="font-medium">Personalized Recommendations</p>
                </div>
                <ul className="ml-7 space-y-2 list-disc">
                  {recommendations.map((recommendation, index) => (
                    <li key={index} className="text-sm">
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="rounded-md bg-dreambox-light-purple p-3">
                <p className="text-sm">
                  <span className="font-semibold">AI Insight:</span> Based on your previous learning patterns, 
                  this gig aligns well with your learning style and knowledge gaps. The interactive format should
                  match your preference for hands-on learning.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AIRecommendationEngine;
