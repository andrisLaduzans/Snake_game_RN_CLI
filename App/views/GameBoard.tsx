import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useDevMode } from '~application/context';
import {
  declineDirection,
  eat,
  initMatrix,
  moveSnake,
  spawnApple,
  useSetInterval,
} from '~application/engine';
import { grow } from '~application/engine/grow';
import { isSnakeDead } from '~application/engine/isSnakeDead';
import { Game, MoveDirection, Point } from '~application/models/Game';
import { theme } from '~theme';

import { Controller, StatusIndicator, Grid } from '../components';

const matrixSize = 18;

const initialGame: Game = {
  status: 'paused',
  points: 0,
  speed: 400,
};

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

export const GameBoard = () => {
  const {
    state: { isDevMode },
  } = useDevMode();

  const [game, setGame] = useState<Game>(initialGame);

  const [snake, setSnake] = useState<Point[]>(initialSnake);

  const [apple, setApple] = useState<Point | undefined>(
    spawnApple(snake, matrixSize),
  );

  const [direction, setDirection] = useState<MoveDirection>('UP');

  const [declinedDirection, setDeclinedDirection] = useState<
    MoveDirection | undefined
  >();

  const resetGame = () => {
    setGame(initialGame);
    setSnake(initialSnake);
    setApple(spawnApple(initialSnake, matrixSize));
    setDirection('UP');
    setDeclinedDirection(undefined);
  };

  const endGame = () => {
    setGame(g => ({ ...initialGame, points: g.points }));
    Alert.alert('Game Over!', `You got ${game.points} points`, [
      { text: 'Start again', onPress: resetGame },
    ]);
  };

  const tick = () => {
    if (!direction || game.status === 'paused') {
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
      setGame(g => ({
        ...g,
        speed: g.speed - 10 <= 50 ? 50 : g.speed - 10,
        points: g.points + (initialGame.speed - (g.speed - 10)),
      }));
    }

    setSnake(newSnake);
  };

  const setPause = () => {
    setGame(g => ({
      ...g,
      status: g.status === 'paused' ? 'running' : 'paused',
    }));
  };

  const handleSetDirection = (input: MoveDirection) => {
    if (game.status === 'paused') {
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
    duration: game.speed,
    isDisabled: isDevMode,
  });

  return (
    <Animated.View style={styles.container} collapsable={false}>
      <View style={styles.top}>
        <StatusIndicator
          direction={direction}
          declinedDirection={declinedDirection}
          paused={game.status === 'paused'}
          style={styles.vSpacing}
          points={game.points}
        />

        <Grid
          matrix={matrix}
          snake={snake}
          apple={apple}
          style={styles.vSpacing}
        />
      </View>

      <Controller
        onDirection={handleSetDirection}
        onPause={setPause}
        style={styles.vSpacing}
        isPaused={game.status === 'paused'}
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
    borderWidth: 2,
  },

  top: {
    flex: 1.69,
    justifyContent: 'flex-end',
  },

  vSpacing: { marginTop: theme.outerPadding },

  debugButtonContainer: {
    backgroundColor: 'skyblue',
    marginTop: 40,
  },
});
