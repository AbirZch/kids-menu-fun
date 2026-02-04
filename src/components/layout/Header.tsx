import { UtensilsCrossed, Gamepad2, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl hero-section flex items-center justify-center shadow-button">
              <UtensilsCrossed className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-display text-primary">Sunny's Kitchen</h1>
              <p className="text-xs text-muted-foreground">Family Restaurant</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Menu
            </a>
            <a href="#games" className="flex items-center gap-1.5 text-primary font-medium">
              <Gamepad2 className="w-4 h-4" />
              Kids Zone
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              About
            </a>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-muted-foreground">Find Us</span>
            </Button>
            <Button className="shadow-button gap-2">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Order Now</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
