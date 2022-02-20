import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useDevMode } from '~application/context';
import {
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

import { Controller, DirectionIndicator, Grid } from '../components';

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

  const [direction, setDirection] = useState<MoveDirection>();

  const resetGame = () => {
    setGame('paused');
    setSnake(initialSnake);
    setApple(spawnApple(initialSnake, matrixSize));
    setDirection(undefined);
  };

  const endGame = () => {
    setGame('paused');
    setDirection(undefined);
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
    setDirection(input);
    if (game === 'paused') {
      setGame('running');
    }
  };

  useSetInterval({ onTick: tick, duration: initialGameSpeed });

  return (
    <Controller
      onDoubleTap={setPause}
      onFling={input => handleSetDirection(input)}>
      <Animated.View style={styles.container} collapsable={false}>
        <View style={styles.section}>
          <Text style={styles.heading}>Game: {game}</Text>
        </View>

        <Grid matrix={matrix} snake={snake} apple={apple} />

        <View style={styles.directionIndicatorContainer}>
          {direction ? <DirectionIndicator direction={direction} /> : null}
        </View>

        {isDevMode ? (
          <View style={[styles.section, styles.debugButtonContainer]}>
            <Button title="move" onPress={tick} />

            <Button title="reset-game" onPress={resetGame} />
          </View>
        ) : null}
      </Animated.View>
    </Controller>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.gray[4],
    flex: 1,
  },

  section: {
    marginHorizontal: theme.outerPadding,
  },

  heading: {
    color: theme.palette.text.onDark,
    fontSize: 16,
    fontWeight: 'bold',
  },

  directionIndicatorContainer: {
    alignItems: 'center',
    minHeight: 40,
  },

  debugButtonContainer: {
    backgroundColor: 'skyblue',
    marginTop: 40,
  },
});
