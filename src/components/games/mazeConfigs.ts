// Thin-wall maze format:
// Each cell stores which walls are present: { top, right, bottom, left }
// 2 = start, 3 = goal

export type Difficulty = "easy" | "medium" | "hard" | "expert";

export interface MazeCell {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  isStart?: boolean;
  isGoal?: boolean;
}

export interface MazeConfig {
  cols: number;
  rows: number;
  cellSize: number;
  wallThickness: number;
  cells: MazeCell[][];
  name: string;
  emoji: string;
  goalEmoji: string;
}

// Helper to create a cell
const c = (walls: string, flags?: string): MazeCell => ({
  top: walls.includes("t"),
  right: walls.includes("r"),
  bottom: walls.includes("b"),
  left: walls.includes("l"),
  isStart: flags === "s",
  isGoal: flags === "g",
});

export const mazeConfigs: Record<Difficulty, MazeConfig> = {
  easy: {
    cols: 5,
    rows: 5,
    cellSize: 56,
    wallThickness: 3,
    name: "Easy",
    emoji: "🌟",
    goalEmoji: "🍗",
    cells: [
      [c("tl", "s"), c("t"),     c("tr"),    c("tl"),   c("tr")],
      [c("l"),       c("rb"),    c("l"),     c("rb"),   c("lr")],
      [c("l"),       c("tb"),    c("r"),     c("tl"),   c("lr")],
      [c("lb"),      c("t"),     c("rb"),    c("l"),    c("r")],
      [c("tl b"),    c("b"),     c("tb"),    c("b"),    c("rb", "g")],
    ],
  },
  medium: {
    cols: 7,
    rows: 7,
    cellSize: 48,
    wallThickness: 3,
    name: "Medium",
    emoji: "⭐",
    goalEmoji: "🍔",
    cells: [
      [c("tl", "s"), c("t"),    c("tr"),   c("tl"),   c("t"),    c("tr"),   c("tr")],
      [c("lb"),      c("r"),    c("l"),    c("r"),    c("lb"),   c("t"),    c("r")],
      [c("tl"),      c("rb"),   c("l"),    c("rb"),   c("tl"),   c("r"),    c("lr")],
      [c("l"),       c("t"),    c("rb"),   c("tl"),   c("r"),    c("lb"),   c("r")],
      [c("lb"),      c("rb"),   c("tl"),   c("r"),    c("lb"),   c("t"),    c("r")],
      [c("tl"),      c("t"),    c("r"),    c("lb"),   c("t"),    c("rb"),   c("lr")],
      [c("lb"),      c("b"),    c("b"),    c("tb"),   c("b"),    c("tb"),   c("rb", "g")],
    ],
  },
  hard: {
    cols: 9,
    rows: 9,
    cellSize: 42,
    wallThickness: 2,
    name: "Hard",
    emoji: "🔥",
    goalEmoji: "🍟",
    cells: [
      [c("tl", "s"), c("t"),   c("tr"),  c("tl"),  c("t"),   c("tr"),  c("tl"),  c("t"),   c("tr")],
      [c("lb"),      c("r"),   c("l"),   c("rb"),  c("lb"),  c("t"),   c("r"),   c("lb"),  c("r")],
      [c("tl"),      c("rb"),  c("l"),   c("t"),   c("tr"),  c("lb"),  c("r"),   c("tl"),  c("r")],
      [c("l"),       c("t"),   c("rb"),  c("lb"),  c("t"),   c("t"),   c("rb"),  c("l"),   c("r")],
      [c("lb"),      c("rb"),  c("tl"),  c("t"),   c("rb"),  c("lb"),  c("t"),   c("r"),   c("lr")],
      [c("tl"),      c("t"),   c("r"),   c("lb"),  c("t"),   c("t"),   c("rb"),  c("l"),   c("r")],
      [c("l"),       c("rb"),  c("lb"),  c("t"),   c("rb"),  c("lb"),  c("t"),   c("r"),   c("lr")],
      [c("lb"),      c("t"),   c("t"),   c("rb"),  c("tl"),  c("t"),   c("r"),   c("lb"),  c("r")],
      [c("tl b"),    c("b"),   c("b"),   c("tb"),  c("b"),   c("b"),   c("b"),   c("tb"),  c("rb", "g")],
    ],
  },
  expert: {
    cols: 13,
    rows: 13,
    cellSize: 32,
    wallThickness: 2,
    name: "Expert",
    emoji: "💎",
    goalEmoji: "🥪",
    cells: [
      [c("tl","s"),c("t"),  c("tr"), c("tl"), c("t"),  c("tr"), c("tl"), c("t"),  c("tr"), c("tl"), c("t"),  c("t"),  c("tr")],
      [c("lb"),    c("r"),  c("l"),  c("rb"), c("lb"), c("t"),  c("r"),  c("lb"), c("t"),  c("r"),  c("lb"), c("r"),  c("lr")],
      [c("tl"),    c("rb"), c("l"),  c("t"),  c("tr"), c("lb"), c("r"),  c("tl"), c("rb"), c("l"),  c("t"),  c("rb"), c("lr")],
      [c("l"),     c("t"),  c("rb"), c("lb"), c("t"),  c("t"),  c("rb"), c("l"),  c("t"),  c("rb"), c("lb"), c("t"),  c("r")],
      [c("lb"),    c("rb"), c("tl"), c("t"),  c("rb"), c("lb"), c("t"),  c("r"),  c("lb"), c("t"),  c("t"),  c("rb"), c("lr")],
      [c("tl"),    c("t"),  c("r"),  c("lb"), c("t"),  c("t"),  c("rb"), c("lb"), c("t"),  c("rb"), c("lb"), c("t"),  c("r")],
      [c("l"),     c("rb"), c("lb"), c("t"),  c("rb"), c("lb"), c("t"),  c("t"),  c("rb"), c("tl"), c("t"),  c("r"),  c("lr")],
      [c("lb"),    c("t"),  c("t"),  c("rb"), c("tl"), c("t"),  c("rb"), c("lb"), c("t"),  c("r"),  c("lb"), c("rb"), c("lr")],
      [c("tl"),    c("rb"), c("lb"), c("t"),  c("r"),  c("lb"), c("t"),  c("t"),  c("rb"), c("l"),  c("t"),  c("t"),  c("r")],
      [c("l"),     c("t"),  c("t"),  c("rb"), c("lb"), c("t"),  c("rb"), c("lb"), c("t"),  c("r"),  c("lb"), c("rb"), c("lr")],
      [c("lb"),    c("rb"), c("lb"), c("t"),  c("t"),  c("rb"), c("tl"), c("t"),  c("rb"), c("lb"), c("t"),  c("t"),  c("r")],
      [c("tl"),    c("t"),  c("t"),  c("rb"), c("lb"), c("t"),  c("r"),  c("lb"), c("t"),  c("t"),  c("rb"), c("lb"), c("r")],
      [c("lb"),    c("b"),  c("b"),  c("tb"), c("tb"), c("b"),  c("b"),  c("tb"), c("b"),  c("b"),  c("tb"), c("tb"), c("rb","g")],
    ],
  },
};
