import { Point } from '~application/models/Game';

import { grow } from './grow';

const snake: Point[] = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
];

describe('snake grow', () => {
  it('tail should grow only when it was on position of eaten apple', () => {
    const eatenApple = { x: 0, y: 3 };
    const newSnake = grow(snake, eatenApple);
    expect(newSnake).toEqual([...snake, eatenApple]);
  });

  it('tail should grow right', () => {
    const lSnake = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ];
    const eatenApple = { x: 3, y: 0 };
    const newSnake = grow(lSnake, eatenApple);
    expect(newSnake).toEqual([...lSnake, { x: 3, y: 0 }]);
  });

  it('should grow left', () => {
    const rSnake = [
      { x: 3, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 0 },
    ];
    const eatenApple = { x: 0, y: 0 };
    const newSnake = grow(rSnake, eatenApple);
    expect(newSnake).toEqual([...rSnake, { x: 0, y: 0 }]);
  });

  it('should grow up', () => {
    const dSnake = [
      { x: 0, y: 3 },
      { x: 0, y: 2 },
      { x: 0, y: 1 },
    ];
    const eatenApple = { x: 0, y: 0 };
    const newSnake = grow(dSnake, eatenApple);
    expect(newSnake).toEqual([...dSnake, { x: 0, y: 0 }]);
  });

  it('tail should grow in opposite direction if snake is making a "U" turn', () => {
    const uSnake = [
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },

      { x: 0, y: 1 },
      { x: 0, y: 2 },

      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ];
    const eatenApple = { x: 3, y: 2 };
    const newSnake = grow(uSnake, eatenApple);
    expect(newSnake).toEqual([...uSnake, { x: 3, y: 2 }]);
  });

  it('should be null if snake has not eaten apple', () => {
    const eatenApple = undefined;
    const newSnake = grow(snake, eatenApple);
    expect(newSnake).toBe(null);
  });
});
