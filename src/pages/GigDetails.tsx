
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Calendar, Clock, MapPin, Star, Users, Brain, Sparkles, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AIRecommendationEngine from "@/components/ai/AIRecommendationEngine";

// Sample gig data (in a real app, this would come from an API)
const gigsData = [
  {
    id: 1,
    title: "Math Foundations for K-2",
    category: "Mathematics",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    description: "Build strong number sense and early math skills through interactive lessons designed specifically for K-2 students. This program uses gamification to make learning fun while establishing a solid foundation in mathematics.",
    longDescription: "Our Math Foundations for K-2 program is designed to build essential numeracy skills in young learners. Through a combination of interactive games, visual models, and guided practice, students develop a deep understanding of numbers, counting, addition, subtraction, and basic geometry.\n\nEach lesson adapts to the student's progress, ensuring they're always working at the right level of challenge. The program aligns with common core standards while making math fun and engaging.",
    categoryColor: "blue",
    level: "Beginner",
    duration: "8 weeks",
    format: "Online + Interactive",
    students: 1245,
    rating: 4.8,
    reviews: 186,
    instructor: "Sarah Johnson",
    instructorTitle: "Math Education Specialist",
    instructorImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&q=80",
    topics: ["Counting & Numbers", "Addition & Subtraction", "Shapes & Patterns", "Measurement", "Problem Solving"],
    prerequisites: ["No prior knowledge required", "Basic computer navigation skills helpful but not required"],
    tools: ["DreamBox learning platform (provided)", "Basic school supplies (paper, pencil)"],
    aiMatchScore: 92,
    aiRecommendations: [
      "Focus on pattern recognition in early lessons",
      "Spend extra time on visual representations of numbers",
      "Practice counting in different contexts to reinforce concepts"
    ],
    sessions: [
      {
        title: "Numbers & Counting",
        duration: "45 min",
        description: "Introduction to numbers 1-20 and counting objects"
      },
      {
        title: "Comparing Numbers",
        duration: "45 min",
        description: "Greater than, less than, and equal to concepts"
      },
      {
        title: "Addition Basics",
        duration: "45 min",
        description: "Introduction to combining numbers and objects"
      },
      {
        title: "Subtraction Basics",
        duration: "45 min",
        description: "Introduction to taking away numbers and objects"
      },
    ]
  },
  {
    id: 2,
    title: "Intro to Coding for Kids",
    category: "Coding",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    description: "Learn programming concepts through fun activities",
    longDescription: "This introductory coding course is specifically designed for young learners. Through block-based programming and fun, interactive projects, students will develop computational thinking skills and learn fundamental coding concepts.\n\nThe course progresses from simple algorithms to creating basic games and animations, all while building problem-solving abilities and creative thinking.",
    categoryColor: "purple",
    level: "Beginner",
    duration: "6 weeks",
    format: "Online Interactive",
    students: 934,
    rating: 4.7,
    reviews: 145,
    instructor: "Jason Lee",
    instructorTitle: "Computer Science Educator",
    instructorImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=150&q=80",
    topics: ["Block Coding", "Algorithms", "Sequences", "Loops", "Conditionals"],
    prerequisites: ["No prior coding experience needed", "Basic reading skills"],
    tools: ["Scratch (free online platform)", "Computer with internet access"],
    aiMatchScore: 87,
    aiRecommendations: [
      "Start with unplugged activities to understand logic",
      "Use visual storytelling to explain coding concepts",
      "Break down projects into smaller, manageable steps"
    ],
    sessions: [
      {
        title: "Introduction to Algorithms",
        duration: "60 min",
        description: "Understanding step-by-step instructions"
      },
      {
        title: "Block Coding Basics",
        duration: "60 min",
        description: "Moving characters with code blocks"
      },
      {
        title: "Loops and Repetition",
        duration: "60 min",
        description: "Making code more efficient with loops"
      },
      {
        title: "Creating Simple Games",
        duration: "60 min",
        description: "Applying concepts to build interactive games"
      },
    ]
  },
  {
    id: 3,
    title: "Robotics Basics",
    category: "Robotics",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    description: "Discover how robots work and build simple machines",
    longDescription: "This hands-on robotics course introduces students to the exciting world of robotics and engineering. Students will learn about mechanical systems, electronics basics, and simple programming to control robots.\n\nThrough building and programming progressively more complex robots, students develop problem-solving skills, spatial reasoning, and a deeper understanding of technology.",
    categoryColor: "orange",
    level: "Intermediate",
    duration: "10 weeks",
    format: "Blended Learning",
    students: 768,
    rating: 4.9,
    reviews: 132,
    instructor: "Michael Chang",
    instructorTitle: "Robotics Engineer",
    instructorImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=150&q=80",
    topics: ["Robot Design", "Sensors & Motors", "Programming Logic", "Engineering Process", "Problem Solving"],
    prerequisites: ["Basic math skills", "Interest in building and technology"],
    tools: ["Robotics kit (additional purchase or rental required)", "Computer for programming"],
    aiMatchScore: 78,
    aiRecommendations: [
      "Start with simpler mechanical concepts before electronics",
      "Use analogies to everyday machines to explain concepts",
      "Provide extra time for hands-on building activities"
    ],
    sessions: [
      {
        title: "Introduction to Robotics",
        duration: "90 min",
        description: "Understanding what robots are and how they work"
      },
      {
        title: "Building Your First Robot",
        duration: "90 min",
        description: "Assembling basic components and structures"
      },
      {
        title: "Sensors and Inputs",
        duration: "90 min",
        description: "Learning how robots sense their environment"
      },
      {
        title: "Programming Robot Behaviors",
        duration: "90 min",
        description: "Creating instructions for autonomous operation"
      },
    ]
  },
];

const GigDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [gig, setGig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call to fetch gig details
    setLoading(true);
    setTimeout(() => {
      const foundGig = gigsData.find((g) => g.id === Number(id));
      setGig(foundGig);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleEnroll = () => {
    toast({
      title: "Enrollment Successful!",
      description: "You've been enrolled in this learning gig.",
      duration: 3000,
    });
  };

  const toggleAIPanel = () => {
    setShowAIPanel(!showAIPanel);
    if (!showAIPanel) {
      toast({
        title: "AI Recommendation Engine",
        description: "Analyzing your learning patterns for personalized recommendations...",
        duration: 2000,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="space-y-4 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-dreambox-blue border-t-transparent rounded-full mx-auto"></div>
              <p>Loading gig details...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Gig Not Found</h2>
            <p className="mb-8">Sorry, we couldn't find the gig you're looking for.</p>
            <Link
              to="/gigs"
              className="inline-flex items-center text-dreambox-blue hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gigs
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get color class based on category
  const getCategoryColorClass = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-dreambox-light-blue",
          text: "text-dreambox-blue",
          button: "bg-dreambox-blue hover:bg-dreambox-blue/90",
          border: "border-dreambox-blue",
        };
      case "purple":
        return {
          bg: "bg-dreambox-light-purple",
          text: "text-dreambox-purple",
          button: "bg-dreambox-purple hover:bg-dreambox-purple/90",
          border: "border-dreambox-purple",
        };
      case "orange":
        return {
          bg: "bg-dreambox-light-orange",
          text: "text-dreambox-orange",
          button: "bg-dreambox-orange hover:bg-dreambox-orange/90",
          border: "border-dreambox-orange",
        };
      case "green":
        return {
          bg: "bg-dreambox-light-green",
          text: "text-dreambox-green",
          button: "bg-dreambox-green hover:bg-dreambox-green/90",
          border: "border-dreambox-green",
        };
      default:
        return {
          bg: "bg-dreambox-light-blue",
          text: "text-dreambox-blue",
          button: "bg-dreambox-blue hover:bg-dreambox-blue/90",
          border: "border-dreambox-blue",
        };
    }
  };

  const colorClass = getCategoryColorClass(gig.categoryColor);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Gig Header */}
        <div className={`${colorClass.bg} py-8`}>
          <div className="container">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <Link
                  to="/gigs"
                  className="inline-flex items-center text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Gigs
                </Link>
                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{gig.title}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge className={`${colorClass.bg} ${colorClass.text}`}>
                    {gig.category}
                  </Badge>
                  <Badge variant="outline" className="border-gray-300">
                    {gig.level}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{gig.rating}</span>
                    <span>({gig.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className={`rounded-full ${colorClass.border} ${colorClass.text} hover:bg-white`}
                  onClick={toggleAIPanel}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  <span>{showAIPanel ? "Hide AI" : "AI Recommendations"}</span>
                </Button>
                <Button 
                  className={`rounded-full ${colorClass.button}`}
                  onClick={handleEnroll}
                >
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Panel (conditionally rendered) */}
        {showAIPanel && (
          <div className="border-b bg-white shadow-sm">
            <div className="container py-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-dreambox-purple" />
                <h3 className="font-semibold text-dreambox-purple">AI Learning Recommendations</h3>
              </div>
              <AIRecommendationEngine 
                gigId={gig.id} 
                matchScore={gig.aiMatchScore} 
                recommendations={gig.aiRecommendations} 
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="container py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Gig Details */}
            <div className="lg:col-span-2">
              <div className="mb-8 overflow-hidden rounded-lg">
                <img
                  src={gig.image}
                  alt={gig.title}
                  className="h-auto w-full object-cover"
                />
              </div>

              <Tabs defaultValue="overview">
                <TabsList className="mb-4 grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="sessions">Sessions</TabsTrigger>
                  <TabsTrigger value="prerequisites">Prerequisites</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h2 className="mb-4 text-2xl font-semibold">About This Gig</h2>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-line text-muted-foreground">{gig.longDescription}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-4 text-xl font-semibold">What You'll Learn</h3>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {gig.topics.map((topic: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className={`flex h-6 w-6 items-center justify-center rounded-full ${colorClass.bg} ${colorClass.text}`}>
                            ✓
                          </div>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="sessions" className="space-y-6">
                  <div>
                    <h2 className="mb-4 text-2xl font-semibold">Course Sessions</h2>
                    <div className="space-y-4">
                      {gig.sessions.map((session: any, index: number) => (
                        <div key={index} className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${colorClass.bg} ${colorClass.text} font-semibold`}>
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="font-semibold">{session.title}</h4>
                                <p className="text-sm text-muted-foreground">{session.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{session.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="prerequisites" className="space-y-6">
                  <div>
                    <h2 className="mb-4 text-2xl font-semibold">Prerequisites</h2>
                    <ul className="space-y-2">
                      {gig.prerequisites.map((prerequisite: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className={`flex h-6 w-6 items-center justify-center rounded-full ${colorClass.bg} ${colorClass.text}`}>
                            ✓
                          </div>
                          <span>{prerequisite}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-4 text-xl font-semibold">Tools & Materials</h3>
                    <ul className="space-y-2">
                      {gig.tools.map((tool: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className={`flex h-6 w-6 items-center justify-center rounded-full ${colorClass.bg} ${colorClass.text}`}>
                            ✓
                          </div>
                          <span>{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Info Card */}
            <div>
              <div className="sticky top-20">
                <Card className="border shadow-md">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={gig.instructorImage}
                            alt={gig.instructor}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">{gig.instructor}</h3>
                            <p className="text-sm text-muted-foreground">{gig.instructorTitle}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{gig.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>{gig.format}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{gig.students} students enrolled</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Starts anytime</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>Online</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Completion Rate</span>
                        <span className="text-sm">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-2 rounded-md bg-yellow-50 p-2">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="mt-0.5 h-4 w-4 text-yellow-500" />
                          <p className="text-sm text-yellow-800">
                            Limited spots available for the upcoming session.
                          </p>
                        </div>
                      </div>
                      <Button 
                        className={`w-full rounded-full ${colorClass.button}`}
                        onClick={handleEnroll}
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GigDetailsPage;
