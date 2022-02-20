import { Point } from '~application/models/Game';

export const eat = (snake: Point[], apple: Point | undefined) => {
  if (!apple) {
    return false;
  }

  const head = snake[0];
  return head.x === apple.x && head.y === apple.y;
};
