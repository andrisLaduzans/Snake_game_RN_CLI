import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { CellType } from '~application/models/Cell';
import { theme } from '~theme';

import { Cell } from './Cell';

const { width } = Dimensions.get('window');

interface Props {
  matrix: { id: string; item: CellType }[][];
}

export const Grid = ({ matrix }: Props) => {
  return (
    <View style={styles.container}>
      {matrix.map(row => (
        <View>
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
