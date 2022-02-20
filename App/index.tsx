import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { DevModeProvider, useDevMode } from '~application/context';
import { Navigation } from '~navigation';

export const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  useDevMode();

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={[styles.container]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <DevModeProvider>
          <Navigation />
        </DevModeProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
