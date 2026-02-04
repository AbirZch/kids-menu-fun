import { Button } from "@/components/ui/button";
import type { Difficulty } from "./mazeConfigs";

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
  configs: Record<Difficulty, { name: string; emoji: string }>;
}

const difficulties: Difficulty[] = ["easy", "medium", "hard", "expert"];

const DifficultySelector = ({ currentDifficulty, onSelect, configs }: DifficultySelectorProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {difficulties.map((diff) => (
        <Button
          key={diff}
          variant={currentDifficulty === diff ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(diff)}
          className="gap-1 min-w-[90px]"
        >
          <span>{configs[diff].emoji}</span>
          <span>{configs[diff].name}</span>
        </Button>
      ))}
    </div>
  );
};

export default DifficultySelector;
