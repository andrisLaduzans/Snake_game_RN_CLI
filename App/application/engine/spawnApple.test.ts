import { Point } from '~application/models/Game';

import { spawnApple } from './spawnApple';
import { getAvailableCells } from './spawnApple';

describe('get available cells', () => {
  it('should return all matrix if there is no snake', () => {
    const snake: Point[] = [];
    const availableCells = getAvailableCells(snake, 2);
    expect(availableCells).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ]);
  });

  it('should return half matrix if other half is snake', () => {
    const snake = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ];
    const availableCells = getAvailableCells(snake, 2);
    expect(availableCells).toEqual([
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ]);
  });

  it('should return available cells around snake, if it is in middle', () => {
    const snake = [{ x: 1, y: 1 }];
    const availableCells = getAvailableCells(snake, 3);
    expect(availableCells).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },

      { x: 1, y: 0 },
      { x: 1, y: 2 },

      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ]);
  });
});

describe('spawn apple', () => {
  it('in 100 tries random apple should not spawn in snake', () => {
    const snake = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ];

    let isAppleSpawnedInSnake = false;
    for (let i = 0; i < 100; i++) {
      const apple = spawnApple(snake, 3);
      if (apple) {
        const isSnakeCell =
          snake.findIndex(cell => cell.x === apple.x && cell.y === apple.y) !==
          -1;
        if (isSnakeCell) {
          isAppleSpawnedInSnake = true;
          break;
        }
      } else {
        break;
      }
    }
    expect(isAppleSpawnedInSnake).toBe(false);
  });

  it('there cannot be an apple if snake is grown fo tull matrix', () => {
    const snake = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ];
    const apple = spawnApple(snake, 2);
    expect(apple).toBe(undefined);
  });
});
