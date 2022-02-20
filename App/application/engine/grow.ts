import { MoveDirection, Point } from '~application/models/Game';

const directionDiffs: { [key in MoveDirection]: Point } = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export const grow = (snake: Point[], apple?: Point): Point[] | null => {
  if (!apple) {
    return null;
  }

  const last = snake.length - 1;

  const diff = {
    x: snake[last - 1].x - snake[last].x,
    y: snake[last - 1].y - snake[last].y,
  };

  let newTail;

  if (diff.x === directionDiffs.UP.x && diff.y === directionDiffs.UP.y) {
    newTail = { ...snake[last], y: snake[last].y + 1 };
  } else if (
    diff.x === directionDiffs.DOWN.x &&
    diff.y === directionDiffs.DOWN.y
  ) {
    newTail = { ...snake[last], y: snake[last].y - 1 };
  } else if (
    diff.x === directionDiffs.LEFT.x &&
    diff.y === directionDiffs.LEFT.y
  ) {
    newTail = { ...snake[last], x: snake[last].x + 1 };
  } else {
    newTail = { ...snake[last], x: snake[last].x - 1 };
  }

  if (newTail.x !== apple.x && newTail.y !== apple.y) {
    return null;
  }

  const copy = [...snake];
  copy.push(newTail);

  return copy;
};
