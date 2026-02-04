import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, RotateCcw, Lightbulb } from "lucide-react";

interface Clue {
  number: number;
  clue: string;
  answer: string;
  row: number;
  col: number;
  direction: "across" | "down";
}

const clues: Clue[] = [
  { number: 1, clue: "A yellow fruit monkeys love", answer: "BANANA", row: 0, col: 0, direction: "across" },
  { number: 2, clue: "Red sauce on pasta", answer: "TOMATO", row: 0, col: 0, direction: "down" },
  { number: 3, clue: "Round food with cheese on top", answer: "PIZZA", row: 2, col: 1, direction: "across" },
  { number: 4, clue: "Cold dessert on a cone", answer: "ICECREAM", row: 0, col: 5, direction: "down" },
  { number: 5, clue: "Bread with meat inside", answer: "SANDWICH", row: 4, col: 0, direction: "across" },
];

const GRID_ROWS = 8;
const GRID_COLS = 8;

type CellData = {
  letter: string;
  userInput: string;
  isActive: boolean;
  clueNumber?: number;
};

const createEmptyGrid = (): CellData[][] => {
  const grid: CellData[][] = Array(GRID_ROWS)
    .fill(null)
    .map(() =>
      Array(GRID_COLS)
        .fill(null)
        .map(() => ({
          letter: "",
          userInput: "",
          isActive: false,
        }))
    );

  // Fill in the grid based on clues
  clues.forEach((clue) => {
    for (let i = 0; i < clue.answer.length; i++) {
      const row = clue.direction === "across" ? clue.row : clue.row + i;
      const col = clue.direction === "across" ? clue.col + i : clue.col;
      
      if (row < GRID_ROWS && col < GRID_COLS) {
        grid[row][col].letter = clue.answer[i];
        grid[row][col].isActive = true;
        if (i === 0) {
          grid[row][col].clueNumber = clue.number;
        }
      }
    }
  });

  return grid;
};

const CrosswordGame = () => {
  const [grid, setGrid] = useState<CellData[][]>(createEmptyGrid);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleCellInput = (row: number, col: number, value: string) => {
    const newGrid = [...grid.map((r) => [...r.map((c) => ({ ...c }))])];
    newGrid[row][col].userInput = value.toUpperCase().slice(-1);
    setGrid(newGrid);

    // Auto-move to next cell
    moveToNextCell(row, col);
  };

  const moveToNextCell = (row: number, col: number) => {
    // Try moving right first
    if (col + 1 < GRID_COLS && grid[row][col + 1].isActive) {
      setSelectedCell({ row, col: col + 1 });
      return;
    }
    // Then try moving down
    if (row + 1 < GRID_ROWS && grid[row + 1][col].isActive) {
      setSelectedCell({ row: row + 1, col });
    }
  };

  const checkAnswers = () => {
    let correct = 0;
    let total = 0;

    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.isActive) {
          total++;
          if (cell.userInput === cell.letter) {
            correct++;
          }
        }
      });
    });

    return { correct, total, isComplete: correct === total };
  };

  const resetGame = () => {
    setGrid(createEmptyGrid());
    setSelectedCell(null);
    setShowHint(false);
  };

  const revealHint = () => {
    if (!selectedCell) return;
    
    const newGrid = [...grid.map((r) => [...r.map((c) => ({ ...c }))])];
    const cell = newGrid[selectedCell.row][selectedCell.col];
    if (cell.isActive) {
      cell.userInput = cell.letter;
    }
    setGrid(newGrid);
  };

  const result = checkAnswers();

  return (
    <div className="game-card">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-display text-primary mb-2">
          📝 Food Crossword! 🍕
        </h3>
        <p className="text-muted-foreground">
          Fill in the puzzle with yummy food words!
        </p>
      </div>

      {result.isComplete && (
        <div className="bg-pickle/10 border-2 border-pickle rounded-xl p-4 mb-6 text-center animate-celebrate">
          <CheckCircle2 className="w-12 h-12 text-pickle mx-auto mb-2" />
          <p className="text-xl font-display text-pickle">
            🎉 Amazing! You solved it! 🎉
          </p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
        {/* Crossword Grid */}
        <div className="flex-shrink-0">
          <div
            className="grid gap-0.5 bg-border p-1 rounded-xl shadow-game"
            style={{
              gridTemplateColumns: `repeat(${GRID_COLS}, 36px)`,
            }}
          >
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`relative w-9 h-9 ${
                    cell.isActive
                      ? selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                        ? "bg-primary/20"
                        : "bg-cream"
                      : "bg-primary/80"
                  } ${cell.isActive ? "cursor-pointer" : ""}`}
                  onClick={() => cell.isActive && setSelectedCell({ row: rowIndex, col: colIndex })}
                >
                  {cell.clueNumber && (
                    <span className="absolute top-0.5 left-1 text-[10px] font-bold text-primary">
                      {cell.clueNumber}
                    </span>
                  )}
                  {cell.isActive && (
                    <input
                      type="text"
                      maxLength={1}
                      value={cell.userInput}
                      onChange={(e) => handleCellInput(rowIndex, colIndex, e.target.value)}
                      className={`w-full h-full text-center font-display text-lg uppercase bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 rounded ${
                        cell.userInput && cell.userInput !== cell.letter
                          ? "text-ketchup"
                          : cell.userInput === cell.letter
                          ? "text-pickle"
                          : "text-foreground"
                      }`}
                      style={{ caretColor: "transparent" }}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Clues */}
        <div className="flex-1 min-w-[250px]">
          <div className="space-y-4">
            <div>
              <h4 className="font-display text-primary mb-2">Across →</h4>
              <ul className="space-y-1 text-sm">
                {clues
                  .filter((c) => c.direction === "across")
                  .map((clue) => (
                    <li key={clue.number} className="text-muted-foreground">
                      <span className="font-bold text-foreground">{clue.number}.</span> {clue.clue}
                      {showHint && (
                        <span className="text-primary ml-2">({clue.answer.length} letters)</span>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-primary mb-2">Down ↓</h4>
              <ul className="space-y-1 text-sm">
                {clues
                  .filter((c) => c.direction === "down")
                  .map((clue) => (
                    <li key={clue.number} className="text-muted-foreground">
                      <span className="font-bold text-foreground">{clue.number}.</span> {clue.clue}
                      {showHint && (
                        <span className="text-primary ml-2">({clue.answer.length} letters)</span>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Stats & Controls */}
          <div className="mt-6 space-y-3">
            <div className="bg-secondary/50 rounded-xl px-4 py-2 text-center">
              <p className="text-sm text-muted-foreground">Progress</p>
              <p className="text-xl font-display text-primary">
                {result.correct}/{result.total}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setShowHint(!showHint)}
                variant="outline"
                size="sm"
                className="gap-1"
              >
                <Lightbulb className="w-4 h-4" />
                {showHint ? "Hide" : "Show"} Hints
              </Button>
              <Button
                onClick={revealHint}
                variant="outline"
                size="sm"
                disabled={!selectedCell}
              >
                Reveal Letter
              </Button>
              <Button onClick={resetGame} variant="secondary" size="sm" className="gap-1">
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrosswordGame;
