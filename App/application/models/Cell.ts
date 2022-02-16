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
