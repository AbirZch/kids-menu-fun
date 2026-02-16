import { useState } from "react";
import MazeGame from "@/components/games/MazeGame";
import CrosswordGame from "@/components/games/CrosswordGame";
import MemoryGame from "@/components/games/MemoryGame";
import WordSearchGame from "@/components/games/WordSearchGame";
import TicTacToeGame from "@/components/games/TicTacToeGame";
import SpotDifferenceGame from "@/components/games/SpotDifferenceGame";
import { Sparkles, ArrowLeft } from "lucide-react";

import gameMaze from "@/assets/game-maze.jpg";
import gameCrossword from "@/assets/game-crossword.jpg";
import gameMemory from "@/assets/game-memory.jpg";
import gameWordsearch from "@/assets/game-wordsearch.jpg";
import gameTictactoe from "@/assets/game-tictactoe.jpg";
import gameSpotdiff from "@/assets/game-spotdiff.jpg";

const games = [
  { id: "maze", label: "Maze", image: gameMaze, component: MazeGame },
  { id: "crossword", label: "Crossword", image: gameCrossword, component: CrosswordGame },
  { id: "memory", label: "Memory", image: gameMemory, component: MemoryGame },
  { id: "wordsearch", label: "Word Search", image: gameWordsearch, component: WordSearchGame },
  { id: "tictactoe", label: "Tic-Tac-Toe", image: gameTictactoe, component: TicTacToeGame },
  { id: "spotdiff", label: "Spot Diff", image: gameSpotdiff, component: SpotDifferenceGame },
];

const GamesSection = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const activeEntry = activeGame ? games.find((g) => g.id === activeGame) : null;

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

        {activeEntry ? (
          /* Active Game View */
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setActiveGame(null)}
              className="flex items-center gap-2 mb-6 px-4 py-2 rounded-xl bg-card border border-border text-foreground hover:bg-secondary transition-all text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Games
            </button>
            <activeEntry.component />
          </div>
        ) : (
          /* Game Grid - Poki Style */
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-soft border border-border hover:shadow-lg hover:scale-[1.03] transition-all duration-200"
              >
                <img
                  src={game.image}
                  alt={game.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 text-white font-bold text-base md:text-lg drop-shadow-md text-left">
                  {game.label}
                </span>
              </button>
            ))}
          </div>
        )}

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
