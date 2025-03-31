
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-dreambox-blue to-dreambox-purple"></div>
            <span className="hidden text-xl font-bold sm:inline-block">Obiri</span>
          </Link>
        </div>

        <div className="hidden lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-dreambox-light-purple to-dreambox-light-blue p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Obiri Learning
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Adaptive learning platform that adjusts to each student's skill level
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/gigs"
                        >
                          <div className="text-sm font-medium leading-none">Educators</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Tools for teachers and learning professionals
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/"
                        >
                          <div className="text-sm font-medium leading-none">Parents</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Resources for supporting learning at home
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/"
                        >
                          <div className="text-sm font-medium leading-none">Districts</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Comprehensive solutions for school districts
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/gigs" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Gigs
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/pricing" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Pricing
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  About
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="relative w-48">
            <Input
              type="text"
              placeholder="Search..."
              className="pr-8 rounded-full"
            />
          </div>
          <Button
            variant="outline"
            className="rounded-full border-dreambox-blue text-dreambox-blue hover:bg-dreambox-blue/10"
          >
            Login
          </Button>
          <Button className="rounded-full bg-dreambox-blue hover:bg-dreambox-blue/90">
            Get Started
          </Button>
        </div>

        <button
          className="flex items-center lg:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background lg:hidden",
          isMenuOpen ? "flex flex-col" : "hidden"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-dreambox-blue to-dreambox-purple"></div>
              <span className="text-xl font-bold">Obiri</span>
            </Link>
          </div>
          <button onClick={toggleMenu}>
            <X size={24} />
          </button>
        </div>
        <div className="container flex-1 space-y-4 overflow-auto py-8">
          <Link
            to="/"
            className="block py-2 text-lg font-medium"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/gigs"
            className="block py-2 text-lg font-medium"
            onClick={toggleMenu}
          >
            Gigs
          </Link>
          <Link
            to="/pricing"
            className="block py-2 text-lg font-medium"
            onClick={toggleMenu}
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className="block py-2 text-lg font-medium"
            onClick={toggleMenu}
          >
            About
          </Link>
          <div className="pt-4">
            <Button
              variant="outline"
              className="w-full justify-start rounded-full border-dreambox-blue text-dreambox-blue hover:bg-dreambox-blue/10"
            >
              Login
            </Button>
          </div>
          <div className="pt-2">
            <Button className="w-full justify-start rounded-full bg-dreambox-blue hover:bg-dreambox-blue/90">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
