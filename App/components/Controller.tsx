import React, { useState } from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { MoveDirection } from '~application/models/Game';
import { NextSvg } from '~assets/svgR/Next';
import { theme } from '~theme';

import { ControlBtn } from './ControllBtn';
import { UtilityBtn } from './UtilityButton';

const padding = theme.outerPadding;

interface Props {
  onPause(): void;
  onDirection(direction: MoveDirection): void;
  style?: StyleProp<ViewStyle>;
  isPaused: boolean;
  isDevMode: boolean;
  manualMove(): void;
  resetGame(): void;
}

export const Controller = ({
  onPause,
  onDirection,
  style,
  isPaused,
  isDevMode,
  manualMove,
  resetGame,
}: Props) => {
  const [size, setSize] = useState<number>();

  const [btnSize, setBtnSize] = useState<number>(0);

  const measure = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    const smaller = Math.min(width, height) - 2 * padding;

    setSize(smaller);
    setBtnSize(smaller / 3 - padding);
  };

  return (
    <View style={[styles.container, style]} onLayout={measure}>
      {size ? (
        <View style={[{ width: size, height: size }]}>
          <ControlBtn
            direction="UP"
            btnSize={btnSize}
            style={[
              styles.button,
              {
                height: btnSize,
                width: btnSize,
                transform: [{ translateX: size / 2 - btnSize / 2 }],
              },
            ]}
            onPress={() => onDirection('UP')}
          />

          <ControlBtn
            direction="LEFT"
            btnSize={btnSize}
            style={[
              styles.button,
              {
                height: btnSize,
                width: btnSize,
                transform: [{ translateY: size / 2 - btnSize / 2 }],
              },
            ]}
            onPress={() => onDirection('LEFT')}
          />

          <ControlBtn
            direction="RIGHT"
            btnSize={btnSize}
            style={[
              styles.button,
              {
                height: btnSize,
                width: btnSize,
                transform: [
                  { translateY: size / 2 - btnSize / 2 },
                  { translateX: size - btnSize },
                ],
              },
            ]}
            onPress={() => onDirection('RIGHT')}
          />

          <ControlBtn
            direction="DOWN"
            btnSize={btnSize}
            style={[
              styles.button,
              {
                height: btnSize,
                width: btnSize,
                transform: [
                  { translateY: size - btnSize },
                  { translateX: size / 2 - btnSize / 2 },
                ],
              },
            ]}
            onPress={() => onDirection('DOWN')}
          />

          {isDevMode ? (
            <ControlBtn
              onPress={manualMove}
              btnSize={btnSize}
              style={[
                styles.button,
                {
                  height: btnSize,
                  width: btnSize,
                  transform: [
                    { translateX: size / 2 - btnSize / 2 },
                    { translateY: size / 2 - btnSize / 2 },
                  ],
                },
                styles.devBtn,
              ]}
              Icon={props => (
                <NextSvg {...props} fill={theme.palette.text.onDark} />
              )}
            />
          ) : null}
        </View>
      ) : null}

      <UtilityBtn onPress={onPause} style={styles.pause} isPaused={isPaused} />

      {isDevMode && (
        <UtilityBtn onPress={resetGame} style={[styles.resetBtn]}>
          <Text style={styles.resetTxt}>Reset</Text>
        </UtilityBtn>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  button: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  devBtn: {
    backgroundColor: theme.palette.blue[3],
  },

  pause: {
    position: 'absolute',
    top: 0,
    right: 0,
  },

  resetBtn: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: theme.palette.blue[3],
  },

  resetTxt: {
    color: theme.palette.gray[0],
    fontSize: 18,
    fontWeight: 'bold',
  },
});
