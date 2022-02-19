import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { CellType } from '~application/models/Game';
import { theme } from '~theme';

interface Props {
  size: number;
  type: CellType;
  style?: StyleProp<ViewStyle>;
}

export const Cell = ({ size, type, style }: Props) => {
  const backgroundColor = useMemo(() => {
    if (type === 'apple') {
      return theme.palette.red[3];
    } else if (type === 'snake') {
      return theme.palette.green[2];
    } else if (type === 'head') {
      return theme.palette.green[4];
    }
    return theme.palette.gray[2];
  }, [type]);

  return (
    <View
      style={[
        styles.container,
        style,
        { width: size, height: size, backgroundColor },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.palette.gray[4],
  },

  text: {
    color: 'black',
  },
});
