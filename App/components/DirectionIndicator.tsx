import React from 'react';
import { StyleSheet, View } from 'react-native';

import { MoveDirection } from '~application/models/Game';
import { ArrowSvg } from '~assets/svgR';
import { theme } from '~theme';

const size = 40;

interface Props {
  direction: MoveDirection;
}

export const DirectionIndicator = ({ direction }: Props) => {
  return (
    <View style={[styles.container, rotation[direction]]}>
      <ArrowSvg
        width={size}
        height={size}
        viewBox={`0 0 24 24`}
        fill={'white'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.gray[3],
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: theme.palette.text.onDark,
  },
});

const rotation = StyleSheet.create({
  RIGHT: { transform: [{ rotate: '0deg' }] },

  UP: { transform: [{ rotate: '-90deg' }] },

  LEFT: { transform: [{ rotate: '-180deg' }] },

  DOWN: { transform: [{ rotate: '90deg' }] },
});
