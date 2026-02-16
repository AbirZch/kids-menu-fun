import { Gamepad2, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="hero-section relative overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }} />

      {/* Floating food emojis */}
      <div className="absolute top-16 left-[10%] text-5xl opacity-20 animate-bounce-gentle select-none">🍔</div>
      <div className="absolute bottom-20 right-[10%] text-5xl opacity-20 animate-bounce-gentle select-none" style={{ animationDelay: "0.7s" }}>🍟</div>
      <div className="absolute top-1/3 right-[5%] text-4xl opacity-10 hidden lg:block select-none" style={{ animationDelay: "1.2s" }}>🍗</div>
      <div className="absolute bottom-1/3 left-[5%] text-4xl opacity-10 hidden lg:block select-none" style={{ animationDelay: "0.3s" }}>🥤</div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-8">
            <Star className="w-4 h-4 text-primary" fill="currentColor" />
            <span className="text-primary text-sm font-semibold tracking-wide">
              #1 Family Restaurant in Austin
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-[1.1] tracking-tight">
            Good Food,{" "}
            <span className="text-primary relative inline-block">
              Great Fun
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M2 6C50 1 150 1 198 6" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
              </svg>
            </span>
            <br />
            <span className="text-white/90">for the Whole Family!</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
            Enjoy delicious homestyle meals while the kids explore our exciting game zone.
            Creating happy memories, one meal at a time!
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              size="lg"
              className="btn-primary-bold rounded-xl text-base px-8 h-12 gap-2"
              onClick={() => document.getElementById("games")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Gamepad2 className="w-5 h-5" />
              Play Games
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl text-base px-8 h-12 border-white/15 text-white/80 hover:bg-white/5 hover:text-white"
            >
              View Menu
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10 mt-16">
            {[
              { value: "50+", label: "Menu Items" },
              { value: "10K+", label: "Happy Families" },
              { value: "4.9", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-black text-primary">{stat.value}</div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/40 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce-gentle">
        <ChevronDown className="w-5 h-5 text-white/20" />
      </div>
    </section>
  );
};

export default HeroSection;
