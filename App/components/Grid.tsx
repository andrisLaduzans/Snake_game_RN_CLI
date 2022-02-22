import React, { useRef } from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { CellItem, Point } from '~application/models/Game';
import { theme } from '~theme';

import { Cell } from './Cell';

const { width } = Dimensions.get('window');

interface Props {
  matrix: CellItem[][];
  snake: Point[];
  apple: Point | undefined;
  style?: StyleProp<ViewStyle>;
}

export const Grid = ({ matrix, snake, apple, style }: Props) => {
  const size = useRef((width - theme.outerPadding * 2) / matrix[0].length);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.gameBox}>
        {matrix.map(row => (
          <View key={`row-${row[0].id}`}>
            {row.map(cell => (
              <Cell key={cell.id} size={size.current} type={cell.item} />
            ))}
          </View>
        ))}

        {apple ? (
          <Cell
            type="apple"
            size={size.current}
            style={[
              styles.item,
              {
                left: size.current * apple.x,
                top: size.current * apple.y,
              },
            ]}
          />
        ) : null}

        {snake.map((snakeCell, index) => (
          <Cell
            key={`snake-${index}`}
            type={index === 0 ? 'head' : 'snake'}
            size={size.current}
            style={[
              styles.item,
              {
                left: size.current * snakeCell.x,
                top: size.current * snakeCell.y,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.outerPadding,
  },

  gameBox: {
    flexDirection: 'row',
  },

  item: {
    position: 'absolute',
  },
});
