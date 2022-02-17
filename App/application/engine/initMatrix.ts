import { CellItem } from '~application/models/Game';

export const initMatrix = (gridSize: number) =>
  new Array(gridSize).fill(0).map((_, rowIndex) =>
    new Array(gridSize).fill(0).map(
      (__, cellIndex): CellItem => ({
        id: `y:${rowIndex};x:${cellIndex}`,
        coordinates: { x: rowIndex, y: cellIndex },
        item: '.',
      }),
    ),
  );
