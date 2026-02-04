import MazeGame from "@/components/games/MazeGame";
import CrosswordGame from "@/components/games/CrosswordGame";
import { Sparkles } from "lucide-react";

const GamesSection = () => {
  return (
    <section id="games" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Kids Zone</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display text-foreground mb-4">
            Fun & Games! 🎮
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            While waiting for your yummy food, challenge yourself with our exciting games! 
            Can you solve them all?
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <MazeGame />
          <CrosswordGame />
        </div>

        {/* Fun Facts */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-display text-primary mb-6">Did You Know? 🤔</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "🍔 Americans eat 50 billion burgers a year!",
              "🍕 Pizza was invented over 1000 years ago!",
              "🍦 The average American eats 23 lbs of ice cream per year!",
            ].map((fact, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl px-6 py-4 shadow-soft border border-border max-w-sm"
              >
                <p className="text-muted-foreground">{fact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
