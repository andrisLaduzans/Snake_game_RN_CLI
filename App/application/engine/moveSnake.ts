import { MoveDirection, Point } from '~application/models/Game';

export const canGoDirection = (newHead: Point, snake: Point[]): boolean => {
  const cellAfterHead = snake[1];
  return !(newHead.x === cellAfterHead.x && newHead.y === cellAfterHead.y);
};

export const moveSnake = (snake: Point[], direction: MoveDirection) => {
  if (!direction) {
    return snake;
  }
  const { x, y } = snake[0];

  let newHead = { x, y };

  if (direction === 'UP') {
    newHead = { x, y: y - 1 };
  } else if (direction === 'DOWN') {
    newHead = { x, y: y + 1 };
  } else if (direction === 'LEFT') {
    newHead = { x: x - 1, y };
  } else if (direction === 'RIGHT') {
    newHead = { x: x + 1, y };
  }

  if (!canGoDirection(newHead, snake)) {
    return snake;
  }
  const copy = [...snake];
  copy.pop();
  const newSnake = [newHead, ...copy];
  return newSnake;
};
