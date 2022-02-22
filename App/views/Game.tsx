import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import { useDevMode } from '~application/context';
import {
  declineDirection,
  eat,
  initMatrix,
  moveSnake,
  spawnApple,
  useSetInterval,
  // useSetInterval,
} from '~application/engine';
import { grow } from '~application/engine/grow';
import { isSnakeDead } from '~application/engine/isSnakeDead';
import { GameStatus, MoveDirection, Point } from '~application/models/Game';
import { theme } from '~theme';

import { Controller, StatusIndicator, Grid } from '../components';

const initialGameSpeed = 400;

const matrixSize = 18;

if (matrixSize % 2 !== 0) {
  throw new Error('matrix size has to be even number');
}

const initialHead: Point = {
  x: Math.floor(matrixSize / 2) - 1,
  y: Math.floor(matrixSize / 2) - 1,
};

const matrix = initMatrix(matrixSize);

const initialSnake: Point[] = [
  initialHead,
  {
    x: initialHead.x,
    y: initialHead.y + 1,
  },
  {
    x: initialHead.x + 1,
    y: initialHead.y + 1,
  },
];

export const Game = () => {
  const {
    state: { isDevMode },
  } = useDevMode();

  const [game, setGame] = useState<GameStatus>('paused');

  const [snake, setSnake] = useState<Point[]>(initialSnake);

  const [apple, setApple] = useState<Point | undefined>(
    spawnApple(snake, matrixSize),
  );

  const [direction, setDirection] = useState<MoveDirection>('UP');

  const [declinedDirection, setDeclinedDirection] = useState<
    MoveDirection | undefined
  >();

  const resetGame = () => {
    setGame('paused');
    setSnake(initialSnake);
    setApple(spawnApple(initialSnake, matrixSize));
    setDirection('UP');
    setDeclinedDirection(undefined);
  };

  const endGame = () => {
    setGame('paused');
    setDirection('UP');
    setDeclinedDirection(undefined);
    Alert.alert('Game Over!', undefined, [
      { text: 'Start again', onPress: resetGame },
    ]);
  };

  const tick = () => {
    if (!direction || game === 'paused') {
      return;
    }

    let newSnake = moveSnake(snake, direction);

    const isDead = isSnakeDead(newSnake, matrixSize);
    if (isDead) {
      endGame();
      return;
    }

    const isAppleEaten = eat(newSnake, apple);

    if (isAppleEaten) {
      newSnake = grow(newSnake, snake);

      const newApple = spawnApple(newSnake, matrixSize);
      setApple(newApple);
    }

    setSnake(newSnake);
  };

  const setPause = () => {
    setGame(g => (g === 'paused' ? 'running' : 'paused'));
  };

  const handleSetDirection = (input: MoveDirection) => {
    if (game === 'paused') {
      return;
    }

    const isDeclined = declineDirection(input, snake);

    if (isDeclined) {
      setDeclinedDirection(input);
      return;
    }

    setDeclinedDirection(undefined);
    setDirection(input);
  };

  useSetInterval({
    onTick: tick,
    duration: initialGameSpeed,
    isDisabled: isDevMode,
  });

  return (
    <Animated.View style={styles.container} collapsable={false}>
      <StatusIndicator
        direction={direction}
        declinedDirection={declinedDirection}
        paused={game === 'paused'}
        style={styles.vSpacing}
      />

      <Grid
        matrix={matrix}
        snake={snake}
        apple={apple}
        style={styles.vSpacing}
      />

      <Controller
        onDirection={handleSetDirection}
        onPause={setPause}
        style={styles.vSpacing}
        isPaused={game === 'paused'}
        isDevMode={isDevMode}
        manualMove={tick}
        resetGame={resetGame}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.gray[4],
    flex: 1,
  },

  vSpacing: { marginTop: theme.outerPadding },

  debugButtonContainer: {
    backgroundColor: 'skyblue',
    marginTop: 40,
  },
});
