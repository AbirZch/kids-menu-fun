import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Trophy } from "lucide-react";

const MAZE_SIZE = 9;
const CELL_SIZE = 40;

// 0 = path, 1 = wall, 2 = start, 3 = goal (sandwich)
const initialMaze = [
  [2, 0, 1, 1, 0, 0, 0, 1, 1],
  [1, 0, 0, 1, 0, 1, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 0],
  [1, 0, 0, 0, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 0, 3],
];

type Position = { x: number; y: number };

const MazeGame = () => {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const [hasWon, setHasWon] = useState(false);
  const [moves, setMoves] = useState(0);

  const resetGame = () => {
    setPlayerPos({ x: 0, y: 0 });
    setHasWon(false);
    setMoves(0);
  };

  const movePlayer = useCallback((dx: number, dy: number) => {
    if (hasWon) return;

    setPlayerPos((prev) => {
      const newX = prev.x + dx;
      const newY = prev.y + dy;

      // Check bounds
      if (newX < 0 || newX >= MAZE_SIZE || newY < 0 || newY >= MAZE_SIZE) {
        return prev;
      }

      // Check wall
      if (initialMaze[newY][newX] === 1) {
        return prev;
      }

      setMoves((m) => m + 1);

      // Check win
      if (initialMaze[newY][newX] === 3) {
        setHasWon(true);
      }

      return { x: newX, y: newY };
    });
  }, [hasWon]);

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
      <div className="text-center mb-6">
        <h3 className="text-2xl font-display text-primary mb-2">
          🏃 Maze Adventure! 🍔
        </h3>
        <p className="text-muted-foreground">
          Help the hungry kid find the delicious chicken sandwich!
        </p>
      </div>

      {hasWon && (
        <div className="bg-pickle/10 border-2 border-pickle rounded-xl p-4 mb-6 text-center animate-celebrate">
          <Trophy className="w-12 h-12 text-mustard mx-auto mb-2" />
          <p className="text-xl font-display text-pickle">
            🎉 Yummy! You found it in {moves} moves! 🎉
          </p>
        </div>
      )}

      <div className="flex flex-col items-center gap-6">
        {/* Maze Grid */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-game border-4 border-bread"
          style={{
            width: MAZE_SIZE * CELL_SIZE,
            height: MAZE_SIZE * CELL_SIZE,
          }}
        >
          {initialMaze.map((row, y) =>
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
                  left: x * CELL_SIZE,
                  top: y * CELL_SIZE,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                }}
              >
                {cell === 3 && (
                  <span className="absolute inset-0 flex items-center justify-center text-2xl">
                    🍔
                  </span>
                )}
              </div>
            ))
          )}

          {/* Player */}
          <div
            className="absolute transition-all duration-200 ease-out flex items-center justify-center text-2xl"
            style={{
              left: playerPos.x * CELL_SIZE,
              top: playerPos.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
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
            <p className="text-sm text-muted-foreground">Moves</p>
            <p className="text-2xl font-display text-primary">{moves}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => movePlayer(0, -1)}
            disabled={hasWon}
            className="w-12 h-12 rounded-xl"
          >
            <ArrowUp className="w-6 h-6" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => movePlayer(-1, 0)}
              disabled={hasWon}
              className="w-12 h-12 rounded-xl"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => movePlayer(0, 1)}
              disabled={hasWon}
              className="w-12 h-12 rounded-xl"
            >
              <ArrowDown className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => movePlayer(1, 0)}
              disabled={hasWon}
              className="w-12 h-12 rounded-xl"
            >
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <Button onClick={resetGame} variant="secondary" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Play Again
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Use arrow keys or buttons to move!
        </p>
      </div>
    </div>
  );
};

export default MazeGame;
