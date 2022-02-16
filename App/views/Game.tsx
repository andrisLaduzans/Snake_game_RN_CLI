import React, { useState } from 'react';
import { View } from 'react-native';

import { CellItem, Point } from '~application/models/Cell';

import { Grid } from '../components';

const gridSize = 19;

const initialMatrix: CellItem[][] = new Array(gridSize)
  .fill(0)
  .map((_, rowIndex) =>
    new Array(gridSize).fill(0).map(
      (__, cellIndex): CellItem => ({
        id: `y:${rowIndex};x:${cellIndex}`,
        coordinates: { x: rowIndex, y: cellIndex },
        item: '.',
      }),
    ),
  );

const initialHead: Point = {
  x: Math.floor(gridSize / 2),
  y: Math.floor(gridSize / 2),
};

const initialSnake: Point[] = [
  initialHead,
  {
    x: initialHead.x,
    y: initialHead.y + 1,
  },
  {
    x: initialHead.x + 1,
    y: initialHead.y + 1,
  },
];

const drawMatrix = (
  previousMatrix: CellItem[][],
  apple: Point,
  snake: Point[],
) => {
  const newMatrix = [...previousMatrix];

  for (let i = 0; i < snake.length; i++) {
    const { x, y } = snake[i];

    newMatrix[x][y] = {
      ...newMatrix[x][y],
      item: i === 0 ? 'head' : 'snake',
    };
  }

  const { x: ax, y: ay } = apple;
  newMatrix[ax][ay] = {
    ...newMatrix[ax][ay],
    item: 'apple',
  };

  return newMatrix;
};

export const moveSnake = (snake: Point[]) => {
  const { x, y } = snake[0];
  const newHead = { x, y: y - 1 };
  snake.pop();
  const newSnake = [newHead, ...snake];
  return newSnake;
};

export const Game = () => {
  const [snake] = useState<Point[]>(initialSnake);

  const [apple] = useState<Point>({
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  });

  const [matrix] = useState<CellItem[][]>(
    drawMatrix(initialMatrix, apple, snake),
  );

  return (
    <View>
      <Grid matrix={matrix} />
    </View>
  );
};
