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
      { number: 1, clue: "A red fruit", answer: "APPLE", row: 0, col: 0, direction: "across" },
      { number: 2, clue: "White drink from cows", answer: "MILK", row: 0, col: 0, direction: "down" },
      { number: 3, clue: "Yellow fruit monkeys love", answer: "BANANA", row: 2, col: 0, direction: "across" },
    ],
  },
  medium: {
    name: "Medium",
    emoji: "⭐",
    gridRows: 8,
    gridCols: 8,
    clues: [
      { number: 1, clue: "A yellow fruit monkeys love", answer: "BANANA", row: 0, col: 0, direction: "across" },
      { number: 2, clue: "Red sauce on pasta", answer: "TOMATO", row: 0, col: 0, direction: "down" },
      { number: 3, clue: "Round food with cheese on top", answer: "PIZZA", row: 2, col: 1, direction: "across" },
      { number: 4, clue: "Cold dessert on a cone", answer: "ICECREAM", row: 0, col: 5, direction: "down" },
      { number: 5, clue: "Bread with meat inside", answer: "SANDWICH", row: 4, col: 0, direction: "across" },
    ],
  },
  hard: {
    name: "Hard",
    emoji: "🔥",
    gridRows: 10,
    gridCols: 10,
    clues: [
      { number: 1, clue: "Italian pasta dish", answer: "SPAGHETTI", row: 0, col: 0, direction: "across" },
      { number: 2, clue: "Morning meal", answer: "BREAKFAST", row: 0, col: 0, direction: "down" },
      { number: 3, clue: "Round bread with a hole", answer: "DONUT", row: 2, col: 3, direction: "across" },
      { number: 4, clue: "Green vegetable Popeye loves", answer: "SPINACH", row: 4, col: 1, direction: "across" },
      { number: 5, clue: "Sweet treat after dinner", answer: "DESSERT", row: 1, col: 7, direction: "down" },
      { number: 6, clue: "Grilled meat on a bun", answer: "BURGER", row: 6, col: 2, direction: "across" },
    ],
  },
  expert: {
    name: "Expert",
    emoji: "💎",
    gridRows: 12,
    gridCols: 12,
    clues: [
      { number: 1, clue: "Japanese raw fish dish", answer: "SUSHI", row: 0, col: 0, direction: "across" },
      { number: 2, clue: "Spicy Mexican food", answer: "TACO", row: 0, col: 0, direction: "down" },
      { number: 3, clue: "French breakfast pastry", answer: "CROISSANT", row: 2, col: 0, direction: "across" },
      { number: 4, clue: "Sweet syrup on pancakes", answer: "MAPLE", row: 0, col: 6, direction: "down" },
      { number: 5, clue: "Thanksgiving bird", answer: "TURKEY", row: 4, col: 2, direction: "across" },
      { number: 6, clue: "Italian cheese pizza topping", answer: "MOZZARELLA", row: 1, col: 10, direction: "down" },
      { number: 7, clue: "Crispy potato snack", answer: "CHIPS", row: 6, col: 0, direction: "across" },
      { number: 8, clue: "Creamy pasta sauce", answer: "ALFREDO", row: 8, col: 3, direction: "across" },
    ],
  },
};
