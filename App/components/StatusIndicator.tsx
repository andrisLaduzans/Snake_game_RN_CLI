import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { MoveDirection } from '~application/models/Game';
import { ArrowSvg, ForbiddenSvg, PauseSvg } from '~assets/svgR';
import { theme } from '~theme';

const size = 40;

interface Props {
  direction: MoveDirection;
  declinedDirection: MoveDirection | undefined;
  paused?: boolean;
  style?: StyleProp<ViewStyle>;
  points: number;
}

export const StatusIndicator = ({
  direction,
  paused,
  style,
  declinedDirection,
  points,
}: Props) => {
  return (
    <View style={[styles.wrap, style]}>
      <View style={styles.row}>
        <View style={styles.spacer} />

        <Animated.View style={[styles.container]} entering={FadeIn}>
          {paused ? (
            <PauseSvg width={size} height={size} fill={theme.palette.gray[0]} />
          ) : (
            <ArrowSvg
              width={size}
              height={size}
              viewBox={`0 0 24 24`}
              fill={theme.palette.gray[0]}
              style={rotation[direction]}
            />
          )}
        </Animated.View>

        {declinedDirection ? (
          <View style={styles.declinedContainer}>
            <View style={[styles.container, styles.declinedBox]}>
              <ArrowSvg
                width={size}
                height={size}
                viewBox={`0 0 24 24`}
                fill={theme.palette.gray[0]}
                style={rotation[direction]}
              />

              <View style={styles.layer}>
                <ForbiddenSvg
                  width={size * 1.25}
                  height={size * 1.25}
                  fill={theme.palette.red[3]}
                />
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsText}>Points:</Text>

            <Text style={[styles.pointsText, styles.pointsCounter]}>
              {points}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  spacer: {
    flex: 1,
  },

  container: {
    backgroundColor: theme.palette.gray[3],
    borderRadius: theme.borderRadius[5],
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: theme.palette.text.onDark,
    marginHorizontal: theme.spacing[1],
  },

  declinedContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },

  declinedBox: {
    marginHorizontal: 0,
    borderWidth: 2,
    borderColor: theme.palette.gray[3],
  },

  layer: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pointsContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },

  pointsText: {
    textAlign: 'right',
    color: theme.palette.gray[0],
    marginRight: theme.spacing['1'],
  },

  pointsCounter: {
    color: theme.palette.gray[0],
    fontSize: 18,
  },
});

const rotation = StyleSheet.create({
  RIGHT: { transform: [{ rotate: '0deg' }] },

  UP: { transform: [{ rotate: '-90deg' }] },

  LEFT: { transform: [{ rotate: '-180deg' }] },

  DOWN: { transform: [{ rotate: '90deg' }] },
});
