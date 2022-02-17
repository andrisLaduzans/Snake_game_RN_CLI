import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { draw } from '~application/engine/draw';
import { CellItem, Point } from '~application/models/Game';
import { theme } from '~theme';

import { Cell } from './Cell';

const { width } = Dimensions.get('window');

interface Props {
  matrixSize: number;
  snake: Point[];
  apple: Point;
}

export const Grid = ({ matrixSize, snake, apple }: Props) => {
  const [display, setDisplay] = useState<CellItem[][]>(
    draw(matrixSize, snake, apple),
  );

  useEffect(() => {
    setDisplay(d => draw(d[0].length, snake, apple));
  }, [apple, snake]);

  return (
    <View style={styles.container}>
      {display.map(row => (
        <View key={`row-${row[0].id}`}>
          {row.map(cell => (
            <Cell
              key={cell.id}
              size={(width - theme.outerPadding * 2) / row.length}
              type={cell.item}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: theme.outerPadding,
  },
});
