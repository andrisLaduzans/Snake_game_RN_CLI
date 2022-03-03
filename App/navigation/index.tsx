import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { GameBoard, Lobby } from '../views';

type RootStackParamList = {
  Lobby: undefined;
  GameBoard: undefined;
};

export type RootStackNavProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GameBoard">
        <Stack.Screen name="Lobby" component={Lobby} />

        <Stack.Screen
          name="GameBoard"
          component={GameBoard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
