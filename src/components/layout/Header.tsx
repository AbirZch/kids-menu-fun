import { Gamepad2, Phone, MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-accent border-b border-accent-foreground/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-button">
              <span className="text-primary-foreground font-display font-black text-lg">S</span>
            </div>
            <div>
              <h1 className="text-lg font-display font-extrabold text-accent-foreground tracking-tight">
                Sunny's Kitchen
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent-foreground/50 font-medium">
                Family Restaurant
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Menu", href: "#" },
              { label: "Kids Zone", href: "#games", icon: Gamepad2 },
              { label: "About", href: "#" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-accent-foreground/70 hover:text-primary hover:bg-accent-foreground/5 transition-all"
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex gap-2 text-accent-foreground/60 hover:text-primary">
              <MapPin className="w-4 h-4" />
              Find Us
            </Button>
            <Button className="btn-primary-bold rounded-lg gap-2 text-sm">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Order Now</span>
            </Button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-accent-foreground/70 hover:text-primary transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="md:hidden pt-4 pb-2 border-t border-accent-foreground/10 mt-3 flex flex-col gap-1">
            {["Menu", "Kids Zone", "About"].map((label) => (
              <a
                key={label}
                href={label === "Kids Zone" ? "#games" : "#"}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-accent-foreground/70 hover:text-primary hover:bg-accent-foreground/5 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
