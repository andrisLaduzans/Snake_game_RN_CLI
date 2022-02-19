import React, { FC } from 'react';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { MoveDirection } from '~application/models/Game';

interface Props {
  onDoubleTap: () => void;
  onFling: (direction: MoveDirection) => void;
}

export const Controller: FC<Props> = ({ children, onDoubleTap, onFling }) => {
  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      runOnJS(onFling)('RIGHT');
    });

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      runOnJS(onFling)('LEFT');
    });

  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onEnd(() => {
      runOnJS(onFling)('UP');
    });

  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onEnd(() => {
      runOnJS(onFling)('DOWN');
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(250)
    .onStart(() => {
      runOnJS(onDoubleTap)();
    });

  const composedGestures = Gesture.Exclusive(
    doubleTap,
    flingRight,
    flingLeft,
    flingUp,
    flingDown,
  );

  return (
    <GestureDetector gesture={composedGestures}>{children}</GestureDetector>
  );
};
