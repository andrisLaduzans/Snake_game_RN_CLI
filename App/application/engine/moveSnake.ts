import { Point } from '~application/models/Game';

export const moveSnake = (snake: Point[]) => {
  const { x, y } = snake[0];
  const newHead = { x, y: y - 1 };
  snake.pop();
  const newSnake = [newHead, ...snake];
  return newSnake;
};
