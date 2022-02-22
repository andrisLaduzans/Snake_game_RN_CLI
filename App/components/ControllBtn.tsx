import React, { ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { MoveDirection } from '~application/models/Game';
import { ArrowSvg } from '~assets/svgR';
import { theme } from '~theme';

interface Props {
  btnSize: number;
  direction?: MoveDirection;
  style: StyleProp<ViewStyle>;
  onPress: () => void;
  Icon?: (props: SvgProps) => ReactNode;
}

export const ControlBtn = ({
  btnSize,
  direction,
  style,
  onPress,
  Icon,
}: Props) => {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      {Icon ? (
        Icon({
          fill: theme.palette.gray[3],
          height: btnSize * 0.75,
          width: btnSize * 0.75,
        })
      ) : (
        <ArrowSvg
          fill={theme.palette.gray[3]}
          height={btnSize * 0.75}
          width={btnSize * 0.75}
          style={[direction ? rotationSx[direction] : undefined]}
        />
      )}
    </Pressable>
  );
};

const rotationSx = StyleSheet.create({
  UP: { transform: [{ rotate: '-90deg' }] },
  DOWN: { transform: [{ rotate: '90deg' }] },
  LEFT: { transform: [{ rotate: '180deg' }] },
  RIGHT: {},
});

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.palette.gray[1],
    borderRadius: theme.borderRadius[5],
    ...theme.shadow[12],
    justifyContent: 'center',
    alignItems: 'center',
  },
});
