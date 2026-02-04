import { Gamepad2, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="hero-section py-16 md:py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce-gentle">🍔</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-bounce-gentle" style={{ animationDelay: "0.5s" }}>🍟</div>
      <div className="absolute top-1/2 right-20 text-4xl opacity-15 hidden lg:block">🥤</div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/20 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-sunshine" fill="currentColor" />
            <span className="text-primary-foreground text-sm font-medium">
              #1 Family Restaurant in Austin
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-display text-primary-foreground mb-6 leading-tight">
            Good Food,{" "}
            <span className="relative">
              Great Fun
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 10C50 2 150 2 198 10" stroke="hsl(var(--sunshine))" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
            <br />for the Whole Family!
          </h1>

          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Enjoy delicious homestyle meals while the kids explore our exciting game zone. 
            Creating happy memories, one meal at a time!
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="font-display text-lg shadow-button"
              onClick={() => document.getElementById("games")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Gamepad2 className="w-5 h-5 mr-2" />
              Play Games
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-display text-lg border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              View Menu
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[
              { icon: "🍔", value: "50+", label: "Menu Items" },
              { icon: "👨‍👩‍👧‍👦", value: "10K+", label: "Happy Families" },
              { icon: "⭐", value: "4.9", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-display text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
