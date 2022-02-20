import { Point } from '~application/models/Game';

import { getCurrentDirection, moveSnake } from './moveSnake';

const upwardFacingSnake: Point[] = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
];

describe('move snake', () => {
  it('snake can move from facing up, to left', () => {
    const newSnake = moveSnake(upwardFacingSnake, 'LEFT');
    expect(newSnake).toEqual([
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ]);
  });

  it('snake can move from facing left, to down', () => {
    const snake = [
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ];
    const newSnake = moveSnake(snake, 'DOWN');

    expect(newSnake).toEqual([
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
    ]);
  });

  it('snake can move from facing down, to right', () => {
    const snake = [
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
    ];

    const newSnake = moveSnake(snake, 'RIGHT');

    expect(newSnake).toEqual([
      { x: 0, y: 1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
    ]);
  });

  it('snake can move from facing right to up', () => {
    const snake = [
      { x: 0, y: 1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
    ];

    const newSnake = moveSnake(snake, 'UP');

    expect(newSnake).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
    ]);
  });

  it('snake cannot go back, if invalid direction is passed, snake should keep goind in its direction', () => {
    const snake = [
      { x: 0, y: 1 },
      { x: 0, y: 0 },
    ];
    const newSnake = moveSnake(snake, 'UP');
    expect(newSnake).toEqual([
      { x: 0, y: 2 },
      { x: 0, y: 1 },
    ]);
  });
});

describe('get current direction', () => {
  it('snake is going left', () => {
    const snake = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ];
    const direction = getCurrentDirection(snake);
    expect(direction).toBe('LEFT');
  });

  it('snake is going right', () => {
    const snake = [
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ];
    const direction = getCurrentDirection(snake);
    expect(direction).toBe('RIGHT');
  });

  it('snake is going up', () => {
    const snake = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ];
    const direction = getCurrentDirection(snake);
    expect(direction).toBe('UP');
  });

  it('snake is going down', () => {
    const snake = [
      { x: 0, y: 1 },
      { x: 0, y: 0 },
    ];
    expect(getCurrentDirection(snake)).toBe('DOWN');
  });
});
