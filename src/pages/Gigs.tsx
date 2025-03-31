
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { RefreshCw, Search } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Sample gig data
const gigsData = [
  {
    id: 1,
    title: "Math Foundations for K-2",
    category: "Mathematics",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    description: "Build strong number sense and early math skills",
    categoryColor: "blue",
  },
  {
    id: 2,
    title: "Intro to Coding for Kids",
    category: "Coding",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    description: "Learn programming concepts through fun activities",
    categoryColor: "purple",
  },
  {
    id: 3,
    title: "Robotics Basics",
    category: "Robotics",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    description: "Discover how robots work and build simple machines",
    categoryColor: "orange",
  },
  {
    id: 4,
    title: "Advanced Mathematics",
    category: "Mathematics",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    description: "Algebra, geometry, and advanced mathematical concepts",
    categoryColor: "blue",
  },
  {
    id: 5,
    title: "Science Adventures",
    category: "Science",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    description: "Explore the wonders of science through experiments",
    categoryColor: "green",
  },
  {
    id: 6,
    title: "Creative Writing Workshop",
    category: "Language Arts",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    description: "Develop storytelling skills and creative expression",
    categoryColor: "purple",
  },
  {
    id: 7,
    title: "Web Development for Teens",
    category: "Coding",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    description: "Learn HTML, CSS, and JavaScript basics",
    categoryColor: "purple",
  },
  {
    id: 8,
    title: "Digital Art Fundamentals",
    category: "Art",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    description: "Create digital masterpieces using modern tools",
    categoryColor: "orange",
  },
  {
    id: 9,
    title: "Public Speaking for Kids",
    category: "Communication",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
    description: "Build confidence and communication skills",
    categoryColor: "green",
  },
];

const GigsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Filter gigs based on search term and category
  const filteredGigs = gigsData.filter((gig) => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         gig.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || gig.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for the filter dropdown
  const categories = ["all", ...new Set(gigsData.map((gig) => gig.category.toLowerCase()))];

  // Simulate AI recommendations refresh
  const refreshRecommendations = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "AI Recommendations Updated",
        description: "We've analyzed your profile and refreshed your personalized recommendations!",
        duration: 3000,
      });
    }, 1500);
  };

  // Get color class based on category
  const getCategoryColorClass = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-dreambox-light-blue",
          text: "text-dreambox-blue",
        };
      case "purple":
        return {
          bg: "bg-dreambox-light-purple",
          text: "text-dreambox-purple",
        };
      case "orange":
        return {
          bg: "bg-dreambox-light-orange",
          text: "text-dreambox-orange",
        };
      case "green":
        return {
          bg: "bg-dreambox-light-green",
          text: "text-dreambox-green",
        };
      default:
        return {
          bg: "bg-dreambox-light-blue",
          text: "text-dreambox-blue",
        };
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-dreambox-light-blue to-dreambox-light-purple py-12">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
                Discover Learning Gigs
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Explore our collection of interactive learning experiences designed to engage and educate.
              </p>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for gigs..."
                  className="pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </section>

        {/* Gigs Listing */}
        <section className="py-12">
          <div className="container">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={refreshRecommendations}
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                  <span>AI Recommendations</span>
                </Button>
                <div className="text-sm text-muted-foreground">
                  Showing {filteredGigs.length} results
                </div>
              </div>
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <div className="text-sm">Filter by:</div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGigs.map((gig) => {
                const colorClass = getCategoryColorClass(gig.categoryColor);
                return (
                  <Link key={gig.id} to={`/gigs/${gig.id}`} className="gig-card group">
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={gig.image}
                        alt={gig.title}
                        className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4">
                      <span className={`inline-block rounded-full ${colorClass.bg} px-3 py-1 text-xs font-medium ${colorClass.text}`}>
                        {gig.category}
                      </span>
                      <h3 className="mt-2 text-xl font-semibold group-hover:text-dreambox-blue">
                        {gig.title}
                      </h3>
                      <p className="mt-1 text-muted-foreground">
                        {gig.description}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>

            {filteredGigs.length === 0 && (
              <div className="mt-12 text-center">
                <h3 className="mb-2 text-xl font-semibold">No gigs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GigsPage;
