import { useState } from "react";
import MazeGame from "@/components/games/MazeGame";
import CrosswordGame from "@/components/games/CrosswordGame";
import MemoryGame from "@/components/games/MemoryGame";
import WordSearchGame from "@/components/games/WordSearchGame";
import TicTacToeGame from "@/components/games/TicTacToeGame";
import SpotDifferenceGame from "@/components/games/SpotDifferenceGame";
import { ArrowLeft, Gamepad2 } from "lucide-react";

import imgMaze from "@/assets/game-maze.jpg";
import imgCrossword from "@/assets/game-crossword.jpg";
import imgMemory from "@/assets/game-memory.jpg";
import imgWordsearch from "@/assets/game-wordsearch.jpg";
import imgTictactoe from "@/assets/game-tictactoe.jpg";
import imgSpotdiff from "@/assets/game-spotdiff.jpg";

const games = [
  { id: "maze", label: "Maze Runner", desc: "Navigate the maze!", image: imgMaze, component: MazeGame },
  { id: "crossword", label: "Crossword", desc: "Food word puzzle", image: imgCrossword, component: CrosswordGame },
  { id: "memory", label: "Memory Match", desc: "Find the pairs!", image: imgMemory, component: MemoryGame },
  { id: "wordsearch", label: "Word Search", desc: "Hidden words", image: imgWordsearch, component: WordSearchGame },
  { id: "tictactoe", label: "Tic-Tac-Toe", desc: "Beat the AI!", image: imgTictactoe, component: TicTacToeGame },
  { id: "spotdiff", label: "Spot the Diff", desc: "Find differences", image: imgSpotdiff, component: SpotDifferenceGame },
];

const GamesSection = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const activeEntry = activeGame ? games.find((g) => g.id === activeGame) : null;

  return (
    <section id="games" className="py-20 md:py-28 bg-background relative">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground rounded-full px-5 py-2 mb-5">
            <Gamepad2 className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wide">Kids Zone</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black text-foreground mb-4 tracking-tight">
            Fun & Games
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            While waiting for your meal, jump into our exciting games!
          </p>
        </div>

        {activeEntry ? (
          /* Active Game View */
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setActiveGame(null)}
              className="group flex items-center gap-2 mb-6 px-4 py-2.5 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 transition-all text-sm font-semibold"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Games
            </button>
            <activeEntry.component />
          </div>
        ) : (
          /* Game Grid with Thumbnails */
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5 max-w-3xl mx-auto">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className="group relative flex flex-col rounded-2xl overflow-hidden border border-border bg-card hover:shadow-glow hover:scale-[1.03] hover:border-primary/40 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Label */}
                <div className="p-3 text-left">
                  <span className="font-display font-bold text-sm md:text-base text-foreground block">
                    {game.label}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {game.desc}
                  </span>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
          </div>
        )}

        {/* Fun Facts */}
        <div className="mt-20 text-center">
          <h3 className="text-lg font-display font-bold text-foreground mb-6">Did You Know? 🤔</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "🍔 Americans eat 50 billion burgers a year!",
              "🍗 Fried chicken was popularized in the American South!",
              "🍦 The average American eats 23 lbs of ice cream per year!",
            ].map((fact, index) => (
              <div key={index} className="bg-card rounded-xl px-5 py-3.5 shadow-soft border border-border max-w-xs">
                <p className="text-sm text-muted-foreground">{fact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
