import React from 'react';
import { View } from 'react-native';

import { CellType } from '~application/models/Cell';

import { Grid } from '../components';

const gridSize = 18;

const initialMatrix: { id: string; item: CellType }[][] = new Array(gridSize)
  .fill(0)
  .map((_, rowIndex) =>
    new Array(gridSize).fill(0).map((__, cellIndex) => ({
      id: `y:${rowIndex};x:${cellIndex}`,
      item: '.',
    })),
  );

console.log('initialMatrix:', initialMatrix);

export const Game = () => {
  return (
    <View>
      <Grid matrix={initialMatrix} />
    </View>
  );
};
