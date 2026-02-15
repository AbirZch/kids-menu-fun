export type Difficulty = "easy" | "medium" | "hard" | "expert";

export interface Clue {
  number: number;
  clue: string;
  answer: string;
  row: number;
  col: number;
  direction: "across" | "down";
}

export interface CrosswordConfig {
  name: string;
  emoji: string;
  gridRows: number;
  gridCols: number;
  clues: Clue[];
}

export const crosswordConfigs: Record<Difficulty, CrosswordConfig> = {
  easy: {
    name: "Easy",
    emoji: "🌟",
    gridRows: 6,
    gridCols: 6,
    clues: [
      { number: 1, clue: "Crispy potato sticks", answer: "FRIES", row: 0, col: 0, direction: "across" },
      { number: 2, clue: "White drink from cows", answer: "MILK", row: 0, col: 0, direction: "down" },
      { number: 3, clue: "Chicken between bread", answer: "SANDWICH", row: 2, col: 0, direction: "across" },
    ],
  },
  medium: {
    name: "Medium",
    emoji: "⭐",
    gridRows: 8,
    gridCols: 8,
    clues: [
      { number: 1, clue: "Meat patty on a bun", answer: "BURGER", row: 0, col: 0, direction: "across" },
      { number: 2, clue: "Fried chicken pieces", answer: "TENDERS", row: 0, col: 0, direction: "down" },
      { number: 3, clue: "Spicy chicken parts", answer: "WINGS", row: 2, col: 1, direction: "across" },
      { number: 4, clue: "Cold sweet drink", answer: "SODA", row: 0, col: 5, direction: "down" },
      { number: 5, clue: "Bread with filling inside", answer: "SANDWICH", row: 4, col: 0, direction: "across" },
    ],
  },
  hard: {
    name: "Hard",
    emoji: "🔥",
    gridRows: 10,
    gridCols: 10,
    clues: [
      { number: 1, clue: "Breaded fried chicken strips", answer: "TENDERS", row: 0, col: 0, direction: "across" },
      { number: 2, clue: "Morning meal", answer: "BREAKFAST", row: 0, col: 0, direction: "down" },
      { number: 3, clue: "Dipping liquid for chicken", answer: "SAUCE", row: 2, col: 3, direction: "across" },
      { number: 4, clue: "Spicy or mild chicken parts", answer: "WINGS", row: 4, col: 1, direction: "across" },
      { number: 5, clue: "Frozen treat after dinner", answer: "ICECREAM", row: 1, col: 2, direction: "down" },
      { number: 6, clue: "Grilled meat on a bun", answer: "BURGER", row: 6, col: 2, direction: "across" },
    ],
  },
  expert: {
    name: "Expert",
    emoji: "💎",
    gridRows: 12,
    gridCols: 12,
    clues: [
      { number: 1, clue: "Crispy fried potato sticks", answer: "FRIES", row: 0, col: 0, direction: "across" },
      { number: 2, clue: "Spicy or mild chicken parts", answer: "WINGS", row: 0, col: 0, direction: "down" },
      { number: 3, clue: "Chicken between two buns", answer: "SANDWICH", row: 2, col: 0, direction: "across" },
      { number: 4, clue: "Sweet syrup on pancakes", answer: "MAPLE", row: 0, col: 6, direction: "down" },
      { number: 5, clue: "Thanksgiving bird meat", answer: "TURKEY", row: 4, col: 2, direction: "across" },
      { number: 6, clue: "Breaded chicken strips", answer: "TENDERS", row: 1, col: 10, direction: "down" },
      { number: 7, clue: "Crunchy potato snack", answer: "CHIPS", row: 6, col: 0, direction: "across" },
      { number: 8, clue: "Creamy dipping sauce", answer: "RANCH", row: 8, col: 3, direction: "across" },
    ],
  },
};
