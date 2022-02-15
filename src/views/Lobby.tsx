import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {RootStackNavProps} from '../navigation';

export const Lobby = ({navigation}: RootStackNavProps<'Lobby'>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>hello Lobby</Text>
      <Button title="Go To Game" onPress={() => navigation.navigate('Game')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    color: 'black',
  },
});
