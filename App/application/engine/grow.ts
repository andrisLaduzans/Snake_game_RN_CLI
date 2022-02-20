import { Point } from '~application/models/Game';

export const grow = (
  updatedSnake: Point[],
  previousSnake: Point[],
): Point[] => {
  const newTail = previousSnake[previousSnake.length - 1];

  const copy = [...updatedSnake];
  copy.push(newTail);
  return copy;
};
