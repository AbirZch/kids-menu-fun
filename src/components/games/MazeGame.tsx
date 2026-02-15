import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { mazeConfigs, type Difficulty } from "./mazeConfigs";
import DifficultySelector from "./DifficultySelector";
import foodChicken from "@/assets/food-chicken-fries.jpg";
import foodTenders from "@/assets/food-tenders-fries.jpg";

type Position = { x: number; y: number };

const goalImages: Record<Difficulty, string> = {
  easy: foodChicken,
  medium: foodTenders,
  hard: foodChicken,
  expert: foodTenders,
};

const MazeGame = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const [hasWon, setHasWon] = useState(false);
  const [moves, setMoves] = useState(0);

  const config = mazeConfigs[difficulty];
  const { cols, rows, cellSize, wallThickness, cells } = config;

  const resetGame = useCallback(() => {
    // Find start position
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (cells[r][c].isStart) {
          setPlayerPos({ x: c, y: r });
          break;
        }
      }
    }
    setHasWon(false);
    setMoves(0);
  }, [rows, cols, cells]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
  };

  const movePlayer = useCallback((dx: number, dy: number) => {
    if (hasWon) return;

    setPlayerPos((prev) => {
      const newX = prev.x + dx;
      const newY = prev.y + dy;

      if (newX < 0 || newX >= cols || newY < 0 || newY >= rows) return prev;

      // Check wall between current cell and target cell
      const current = cells[prev.y][prev.x];
      if (dx === 1 && current.right) return prev;
      if (dx === -1 && current.left) return prev;
      if (dy === 1 && current.bottom) return prev;
      if (dy === -1 && current.top) return prev;

      setMoves((m) => m + 1);

      if (cells[newY][newX].isGoal) {
        setHasWon(true);
      }

      return { x: newX, y: newY };
    });
  }, [hasWon, cols, rows, cells]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp": movePlayer(0, -1); break;
        case "ArrowDown": movePlayer(0, 1); break;
        case "ArrowLeft": movePlayer(-1, 0); break;
        case "ArrowRight": movePlayer(1, 0); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [movePlayer]);

  const totalW = cols * cellSize + wallThickness;
  const totalH = rows * cellSize + wallThickness;

  return (
    <div className="game-card">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-display text-primary mb-2">
          🏃 Maze Adventure! {config.goalEmoji}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          Help the hungry kid find the delicious meal!
        </p>
        <DifficultySelector currentDifficulty={difficulty} onSelect={handleDifficultyChange} configs={mazeConfigs} />
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
        {/* Maze with thin walls */}
        <div className="flex justify-center overflow-auto max-w-full">
          <svg
            width={totalW}
            height={totalH}
            className="rounded-xl shadow-game"
            style={{ background: "hsl(var(--cream))" }}
          >
            {/* Draw cells background and goal */}
            {cells.map((row, r) =>
              row.map((cell, c) => (
                <g key={`${r}-${c}`}>
                  {cell.isGoal && (
                    <>
                      <rect
                        x={c * cellSize + wallThickness / 2}
                        y={r * cellSize + wallThickness / 2}
                        width={cellSize}
                        height={cellSize}
                        fill="hsl(var(--pickle) / 0.1)"
                      />
                      <image
                        href={goalImages[difficulty]}
                        x={c * cellSize + wallThickness / 2 + 4}
                        y={r * cellSize + wallThickness / 2 + 4}
                        width={cellSize - 8}
                        height={cellSize - 8}
                        preserveAspectRatio="xMidYMid slice"
                        clipPath={`inset(0 round 4px)`}
                      />
                    </>
                  )}
                </g>
              ))
            )}

            {/* Draw walls */}
            {cells.map((row, r) =>
              row.map((cell, c) => {
                const x = c * cellSize + wallThickness / 2;
                const y = r * cellSize + wallThickness / 2;
                const lines: JSX.Element[] = [];

                if (cell.top) {
                  lines.push(
                    <line key={`${r}-${c}-t`} x1={x} y1={y} x2={x + cellSize} y2={y}
                      stroke="hsl(var(--primary))" strokeWidth={wallThickness} strokeLinecap="round" />
                  );
                }
                if (cell.left) {
                  lines.push(
                    <line key={`${r}-${c}-l`} x1={x} y1={y} x2={x} y2={y + cellSize}
                      stroke="hsl(var(--primary))" strokeWidth={wallThickness} strokeLinecap="round" />
                  );
                }
                if (cell.right) {
                  lines.push(
                    <line key={`${r}-${c}-r`} x1={x + cellSize} y1={y} x2={x + cellSize} y2={y + cellSize}
                      stroke="hsl(var(--primary))" strokeWidth={wallThickness} strokeLinecap="round" />
                  );
                }
                if (cell.bottom) {
                  lines.push(
                    <line key={`${r}-${c}-b`} x1={x} y1={y + cellSize} x2={x + cellSize} y2={y + cellSize}
                      stroke="hsl(var(--primary))" strokeWidth={wallThickness} strokeLinecap="round" />
                  );
                }
                return lines;
              })
            )}

            {/* Player */}
            <text
              x={playerPos.x * cellSize + wallThickness / 2 + cellSize / 2}
              y={playerPos.y * cellSize + wallThickness / 2 + cellSize / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={cellSize * 0.55}
              className={hasWon ? "animate-celebrate" : ""}
              style={{ transition: "all 0.15s ease-out" }}
            >
              🧒
            </text>
          </svg>
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
          <Button variant="outline" size="icon" onClick={() => movePlayer(0, -1)} disabled={hasWon} className="w-10 h-10 rounded-xl">
            <ArrowUp className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => movePlayer(-1, 0)} disabled={hasWon} className="w-10 h-10 rounded-xl">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => movePlayer(0, 1)} disabled={hasWon} className="w-10 h-10 rounded-xl">
              <ArrowDown className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => movePlayer(1, 0)} disabled={hasWon} className="w-10 h-10 rounded-xl">
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
