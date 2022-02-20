import { MoveDirection, Point } from '~application/models/Game';

export const canGoDirection = (newHead: Point, snake: Point[]): boolean => {
  const cellAfterHead = snake[1];
  return !(newHead.x === cellAfterHead.x && newHead.y === cellAfterHead.y);
};

const getNewHead = ({ x, y }: Point, direction: MoveDirection) => {
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
  return newHead;
};

export const getCurrentDirection = (snake: Point[]): MoveDirection => {
  const diff = { x: snake[1].x - snake[0].x, y: snake[1].y - snake[0].y };

  if (diff.x === -1 && diff.y === 0) {
    return 'RIGHT';
  }
  if (diff.x === 1 && diff.y === 0) {
    return 'LEFT';
  }

  if (diff.x === 0 && diff.y === -1) {
    return 'DOWN';
  }

  if (diff.x === 0 && diff.y === 1) {
    return 'UP';
  }

  throw new Error(
    `snake has cells that are not sequential, getCurrentDirection: ${JSON.stringify(
      snake,
      null,
      2,
    )}`,
  );
};

export const moveSnake = (snake: Point[], direction: MoveDirection) => {
  if (!direction) {
    return snake;
  }

  let newHead = getNewHead(snake[0], direction);

  if (!canGoDirection(newHead, snake)) {
    const currentDirection = getCurrentDirection(snake);
    newHead = getNewHead(snake[0], currentDirection);
  }

  const copy = [...snake];
  copy.pop();
  const newSnake = [newHead, ...copy];
  return newSnake;
};
