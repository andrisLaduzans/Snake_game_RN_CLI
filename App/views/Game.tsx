import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { GameStatus, MoveDirection, Point } from '~application/models/Game';
import { theme } from '~theme';

import { Controller, Grid } from '../components';

const matrixSize = 19;

const initialHead: Point = {
  x: Math.floor(matrixSize / 2),
  y: Math.floor(matrixSize / 2),
};

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

export const moveSnake = (snake: Point[]) => {
  const { x, y } = snake[0];
  const newHead = { x, y: y - 1 };
  snake.pop();
  const newSnake = [newHead, ...snake];
  return newSnake;
};

export const Game = () => {
  const [game, setGame] = useState<GameStatus>('paused');

  const [ticks, setTicks] = useState(0);
  const [snake, setSnake] = useState<Point[]>(initialSnake);

  const [apple] = useState<Point>({
    x: Math.floor(Math.random() * matrixSize),
    y: Math.floor(Math.random() * matrixSize),
  });

  const [, setDirection] = useState<MoveDirection>();

  const tick = useCallback(
    (count: number) => {
      if (game === 'paused') {
        return;
      }

      setTicks(count + 1);
      setSnake(s => moveSnake(s));
    },
    [game],
  );

  const setPause = () => {
    const newGame = game === 'paused' ? 'running' : 'paused';
    setGame(newGame);

    if (ticks === 0) {
      setTicks(t => t + 1);
      setSnake(s => moveSnake(s));
    }
  };

  const handleSetDirection = (input: MoveDirection) => {
    setDirection(input);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      tick(ticks);
    }, 900);

    return () => {
      clearTimeout(timeout);
    };
  }, [tick, ticks]);

  return (
    <Controller onTap={setPause} onFling={input => handleSetDirection(input)}>
      <Animated.View style={styles.container} collapsable={false}>
        <View style={styles.section}>
          <Text style={styles.heading}>{ticks}</Text>
          <Text style={styles.heading}>Game: {game}</Text>
        </View>

        <Grid matrixSize={matrixSize} snake={snake} apple={apple} />
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
});
