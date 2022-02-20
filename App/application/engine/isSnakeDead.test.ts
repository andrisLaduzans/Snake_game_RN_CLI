import { moveSnake } from './moveSnake';
import { isSnakeDead } from './isSnakeDead';

const snake = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
];

const matrixSize = 3;

describe('kill snake', () => {
  it('snake should die if it hits west wall', () => {
    const newSnake = moveSnake(snake, 'LEFT');
    const isDead = isSnakeDead(newSnake, matrixSize);

    expect(isDead).toBe(true);
  });

  it('snake should die if it hits north wal', () => {
    const newSnake = moveSnake(snake, 'UP');
    const isDead = isSnakeDead(newSnake, matrixSize);
    expect(isDead).toBe(true);
  });

  it('snake should die if it hits east wall', () => {
    let newSnake = moveSnake(snake, 'RIGHT');
    newSnake = moveSnake(newSnake, 'RIGHT');
    newSnake = moveSnake(newSnake, 'RIGHT');

    let isDead = isSnakeDead(newSnake, matrixSize);
    expect(isDead).toBe(true);
  });

  it('snake should die if it hits south wall', () => {
    let newSnake = moveSnake(snake, 'RIGHT');
    newSnake = moveSnake(newSnake, 'DOWN');
    newSnake = moveSnake(newSnake, 'DOWN');
    newSnake = moveSnake(newSnake, 'DOWN');

    const isDead = isSnakeDead(newSnake, matrixSize);
    expect(isDead).toBe(true);
  });

  it('snake should die if it eats itself', () => {
    snake.push({ x: 0, y: 3 });
    snake.push({ x: 0, y: 4 });

    let newSnake = moveSnake(snake, 'RIGHT');
    newSnake = moveSnake(newSnake, 'DOWN');
    newSnake = moveSnake(newSnake, 'LEFT');

    const isDead = isSnakeDead(newSnake, matrixSize);
    expect(isDead).toBe(true);
  });

  it('snake should die if there are no more spaces left to grow or spawn an apple', () => {
    const xSnake = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];
    const isDead = isSnakeDead(xSnake, 2);
    expect(isDead).toBe(true);
  });
});
