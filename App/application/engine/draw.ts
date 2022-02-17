import { Point } from '~application/models/Game';

import { initMatrix } from './initMatrix';

export const draw = (matrixSize: number, snake: Point[], apple: Point) => {
  const matrix = initMatrix(matrixSize);

  const ax = apple.x;
  const ay = apple.y;
  matrix[ax][ay] = {
    ...matrix[ax][ay],
    item: 'apple',
  };

  for (let i = 0; i < snake.length; i++) {
    const { x, y } = snake[i];
    matrix[x][y] = {
      ...matrix[x][y],
      item: i === 0 ? 'head' : 'snake',
    };
  }

  return [...matrix];
};
