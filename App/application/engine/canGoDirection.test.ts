import { canGoDirection } from './moveSnake';

const downwardFacingSnake = [
  { x: 0, y: 2 },
  { x: 0, y: 1 },
];

describe('snake can go to desired direction', () => {
  it('should not go up if snake is facing down', () => {
    const newHead = { x: 0, y: 1 };
    const directionAllowed = canGoDirection(newHead, downwardFacingSnake);
    expect(directionAllowed).toBe(false);
  });

  it('should go down if snake is facing down', () => {
    const newHead = { x: 0, y: 3 };
    const directionAllowed = canGoDirection(newHead, downwardFacingSnake);
    expect(directionAllowed).toBe(true);
  });
});
