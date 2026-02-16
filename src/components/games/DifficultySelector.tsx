import type { Difficulty } from "./mazeConfigs";

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
  configs: Record<Difficulty, { name: string; emoji: string }>;
}

const difficulties: Difficulty[] = ["easy", "medium", "hard", "expert"];

const DifficultySelector = ({ currentDifficulty, onSelect, configs }: DifficultySelectorProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-1.5 mb-4 bg-secondary/60 p-1 rounded-xl w-fit mx-auto">
      {difficulties.map((diff) => (
        <button
          key={diff}
          onClick={() => onSelect(diff)}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            currentDifficulty === diff
              ? "bg-accent text-accent-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-background/60"
          }`}
        >
          <span>{configs[diff].emoji}</span>
          <span>{configs[diff].name}</span>
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;
