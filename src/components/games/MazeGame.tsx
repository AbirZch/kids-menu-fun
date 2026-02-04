import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { mazeConfigs, type Difficulty } from "./mazeConfigs";
import DifficultySelector from "./DifficultySelector";

type Position = { x: number; y: number };

const MazeGame = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const [hasWon, setHasWon] = useState(false);
  const [moves, setMoves] = useState(0);

  const config = mazeConfigs[difficulty];
  const { size, cellSize, maze } = config;

  const resetGame = useCallback(() => {
    setPlayerPos({ x: 0, y: 0 });
    setHasWon(false);
    setMoves(0);
  }, []);

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    setPlayerPos({ x: 0, y: 0 });
    setHasWon(false);
    setMoves(0);
  };

  const movePlayer = useCallback((dx: number, dy: number) => {
    if (hasWon) return;

    setPlayerPos((prev) => {
      const newX = prev.x + dx;
      const newY = prev.y + dy;

      if (newX < 0 || newX >= size || newY < 0 || newY >= size) {
        return prev;
      }

      if (maze[newY][newX] === 1) {
        return prev;
      }

      setMoves((m) => m + 1);

      if (maze[newY][newX] === 3) {
        setHasWon(true);
      }

      return { x: newX, y: newY };
    });
  }, [hasWon, size, maze]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          movePlayer(0, -1);
          break;
        case "ArrowDown":
          movePlayer(0, 1);
          break;
        case "ArrowLeft":
          movePlayer(-1, 0);
          break;
        case "ArrowRight":
          movePlayer(1, 0);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [movePlayer]);

  return (
    <div className="game-card">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-display text-primary mb-2">
          🏃 Maze Adventure! 🍔
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          Help the hungry kid find the delicious chicken sandwich!
        </p>
        
        <DifficultySelector
          currentDifficulty={difficulty}
          onSelect={handleDifficultyChange}
          configs={mazeConfigs}
        />
      </div>

      {hasWon && (
        <div className="bg-pickle/10 border-2 border-pickle rounded-xl p-4 mb-4 text-center animate-celebrate">
          <Trophy className="w-10 h-10 text-mustard mx-auto mb-2" />
          <p className="text-lg font-display text-pickle">
            🎉 Yummy! You found it in {moves} moves! 🎉
          </p>
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        {/* Maze Grid */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-game border-4 border-bread"
          style={{
            width: size * cellSize,
            height: size * cellSize,
          }}
        >
          {maze.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`absolute transition-colors duration-200 ${
                  cell === 1
                    ? "bg-primary/80"
                    : cell === 3
                    ? "bg-pickle/20"
                    : "bg-cream"
                }`}
                style={{
                  left: x * cellSize,
                  top: y * cellSize,
                  width: cellSize,
                  height: cellSize,
                }}
              >
                {cell === 3 && (
                  <span className="absolute inset-0 flex items-center justify-center text-xl">
                    🍔
                  </span>
                )}
              </div>
            ))
          )}

          {/* Player */}
          <div
            className="absolute transition-all duration-200 ease-out flex items-center justify-center text-xl"
            style={{
              left: playerPos.x * cellSize,
              top: playerPos.y * cellSize,
              width: cellSize,
              height: cellSize,
            }}
          >
            <span className={hasWon ? "animate-celebrate" : "animate-bounce-gentle"}>
              🧒
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-center">
          <div className="bg-secondary/50 rounded-xl px-4 py-2">
            <p className="text-xs text-muted-foreground">Moves</p>
            <p className="text-xl font-display text-primary">{moves}</p>
          </div>
          <div className="bg-secondary/50 rounded-xl px-4 py-2">
            <p className="text-xs text-muted-foreground">Level</p>
            <p className="text-xl font-display text-primary">{config.emoji}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => movePlayer(0, -1)}
            disabled={hasWon}
            className="w-10 h-10 rounded-xl"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => movePlayer(-1, 0)}
              disabled={hasWon}
              className="w-10 h-10 rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => movePlayer(0, 1)}
              disabled={hasWon}
              className="w-10 h-10 rounded-xl"
            >
              <ArrowDown className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => movePlayer(1, 0)}
              disabled={hasWon}
              className="w-10 h-10 rounded-xl"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <Button onClick={resetGame} variant="secondary" size="sm" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Play Again
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Use arrow keys or buttons to move!
        </p>
      </div>
    </div>
  );
};

export default MazeGame;
