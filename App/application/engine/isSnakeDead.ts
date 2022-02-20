import { Point } from '~application/models/Game';

export const isSnakeDead = (snake: Point[], matrixSize: number) => {
  if (snake.length === matrixSize * matrixSize) {
    return true;
  }

  const { x, y } = snake[0];
  if (x < 0 || x >= matrixSize || y < 0 || y >= matrixSize) {
    return true;
  }

  const head = snake[0];
  const isHeadInBody =
    snake.slice(1).findIndex(cell => cell.x === head.x && cell.y === head.y) !==
    -1;
  if (isHeadInBody) {
    return true;
  }

  return false;
};
