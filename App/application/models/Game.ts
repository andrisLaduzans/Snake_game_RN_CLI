export type Point = {
  x: number;
  y: number;
};

export const cellTypes = ['head', 'snake', 'apple', '.'] as const;

export type CellType = typeof cellTypes[number];

export type CellItem = {
  id: string;
  coordinates: Point;
  item: CellType;
};

export type GameStatus = 'running' | 'paused';

export const moveDirections = ['UP', 'DOWN', 'LEFT', 'RIGHT'] as const;
export type MoveDirection = typeof moveDirections[number];
