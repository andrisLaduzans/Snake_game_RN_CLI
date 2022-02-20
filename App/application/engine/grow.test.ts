import { moveSnake } from './moveSnake';
import { grow } from './grow';

describe('snake grow', () => {
  it('updated snake should copy tail position of previous move', () => {
    const previousSnake = [
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },

      { x: 0, y: 1 },
      { x: 0, y: 2 },

      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ];

    const updatedSnake = [{ x: 3, y: 0 }, ...previousSnake.slice(0, -1)];

    const newSnake = grow(updatedSnake, previousSnake);
    expect(newSnake).toEqual([...updatedSnake, { x: 2, y: 2 }]);
  });

  it('should grow tail around the corner if it just made a turn before growing', () => {
    const previousSnake = [
      { x: 1, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ];
    const updatedSnake = moveSnake(previousSnake, 'RIGHT');
    const grownSnake = grow(updatedSnake, previousSnake);
    expect(grownSnake).toEqual([...updatedSnake, { x: 0, y: 1 }]);
  });
});
