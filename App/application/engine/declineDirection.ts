import { MoveDirection, Point } from '~application/models/Game';

import { getCurrentDirection } from './moveSnake';

export const declineDirection = (input: MoveDirection, snake: Point[]) => {
  const currentDirection = getCurrentDirection(snake);

  if (currentDirection === 'UP' && input === 'DOWN') {
    return true;
  }
  if (currentDirection === 'DOWN' && input === 'UP') {
    return true;
  }
  if (currentDirection === 'LEFT' && input === 'RIGHT') {
    return true;
  }

  if (currentDirection === 'RIGHT' && input === 'LEFT') {
    return true;
  }

  return false;
};
