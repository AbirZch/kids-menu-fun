import { useState } from "react";
import MazeGame from "@/components/games/MazeGame";
import CrosswordGame from "@/components/games/CrosswordGame";
import MemoryGame from "@/components/games/MemoryGame";
import WordSearchGame from "@/components/games/WordSearchGame";
import TicTacToeGame from "@/components/games/TicTacToeGame";
import SpotDifferenceGame from "@/components/games/SpotDifferenceGame";
import { Sparkles } from "lucide-react";

const games = [
  { id: "maze", label: "Maze", icon: "🏃", component: MazeGame },
  { id: "crossword", label: "Crossword", icon: "📝", component: CrosswordGame },
  { id: "memory", label: "Memory", icon: "🃏", component: MemoryGame },
  { id: "wordsearch", label: "Word Search", icon: "🔍", component: WordSearchGame },
  { id: "tictactoe", label: "Tic-Tac-Toe", icon: "⭕", component: TicTacToeGame },
  { id: "spotdiff", label: "Spot Diff", icon: "👀", component: SpotDifferenceGame },
];

const GamesSection = () => {
  const [activeGame, setActiveGame] = useState("maze");
  const ActiveComponent = games.find((g) => g.id === activeGame)!.component;

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
          </p>
        </div>

        {/* Game Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-3xl mx-auto">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => setActiveGame(game.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeGame === game.id
                  ? "bg-primary text-primary-foreground shadow-button scale-105"
                  : "bg-card text-foreground border border-border hover:bg-secondary hover:scale-102"
              }`}
            >
              <span className="text-lg">{game.icon}</span>
              <span className="hidden sm:inline">{game.label}</span>
            </button>
          ))}
        </div>

        {/* Active Game */}
        <div className="max-w-2xl mx-auto">
          <ActiveComponent />
        </div>

        {/* Fun Facts */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-display text-primary mb-6">Did You Know? 🤔</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "🍔 Americans eat 50 billion burgers a year!",
              "🍗 Fried chicken was popularized in the American South!",
              "🍦 The average American eats 23 lbs of ice cream per year!",
            ].map((fact, index) => (
              <div key={index} className="bg-card rounded-2xl px-6 py-4 shadow-soft border border-border max-w-sm">
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
