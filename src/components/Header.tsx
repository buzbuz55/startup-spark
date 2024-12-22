import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCircle, LogIn, UserPlus, MessageSquare, Info, FileText, ArrowUpRight, User } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  // TODO: Replace with actual auth state
  const isLoggedIn = false;
  const userProfile = {
    name: "John Doe",
    role: "Venture Capitalist",
    avatar: "/placeholder.svg"
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-purple-600">
            Startup Nation ✨
          </Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Info className="w-4 h-4 mr-2" />
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link to="/about" className="block p-2 hover:bg-slate-100 rounded-md">
                      <div className="font-medium mb-1">About Us</div>
                      <p className="text-sm text-muted-foreground">Learn about our mission and vision</p>
                    </Link>
                    <Link to="/about-startup-squad" className="block p-2 hover:bg-slate-100 rounded-md">
                      <div className="font-medium mb-1">About Startup Squad</div>
                      <p className="text-sm text-muted-foreground">Discover our startup community</p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <User className="w-4 h-4 mr-2" />
                  People
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link to="/talent-pool" className="block p-2 hover:bg-slate-100 rounded-md">
                      <div className="font-medium mb-1">Talent Pool</div>
                      <p className="text-sm text-muted-foreground">Browse our talented community</p>
                    </Link>
                    <Link to="/vc-dashboard" className="block p-2 hover:bg-slate-100 rounded-md">
                      <div className="font-medium mb-1">VC Network</div>
                      <p className="text-sm text-muted-foreground">Connect with venture capitalists</p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <FileText className="w-4 h-4 mr-2" />
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link to="/blog" className="block p-2 hover:bg-slate-100 rounded-md">
                      <div className="font-medium mb-1">Startup Blog</div>
                      <p className="text-sm text-muted-foreground">Latest startup insights and news</p>
                    </Link>
                    <Link to="/faq" className="block p-2 hover:bg-slate-100 rounded-md">
                      <div className="font-medium mb-1">FAQ</div>
                      <p className="text-sm text-muted-foreground">Common questions answered</p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/submit-idea">
                  <Button variant="default" className="gap-2">
                    <ArrowUpRight className="w-4 h-4" />
                    Apply
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <nav className="flex items-center gap-4">
            <Link to="/messages">
              <Button variant="ghost">
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </Button>
            </Link>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <UserCircle className="w-5 h-5" />
                    {userProfile.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                  <DropdownMenuItem>Portfolio</DropdownMenuItem>
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" className="gap-2">
                    <LogIn className="w-4 h-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default" className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;