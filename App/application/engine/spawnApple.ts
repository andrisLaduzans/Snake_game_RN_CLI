import { Point } from '~application/models/Game';

export const getAvailableCells = (snake: Point[], matrixSize: number) => {
  const range = [];

  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      const point = { x: i, y: j };

      const isSnakeCell =
        snake.findIndex(cell => cell.x === point.x && cell.y === point.y) !==
        -1;

      if (!isSnakeCell) {
        range.push(point);
      }
    }
  }
  return range;
};

export const spawnApple = (
  snake: Point[],
  matrixSize: number,
): Point | undefined => {
  const cells = getAvailableCells(snake, matrixSize);

  const randomIndex = Math.floor(Math.random() * cells.length);
  const apple = cells[randomIndex];

  return apple;
};
