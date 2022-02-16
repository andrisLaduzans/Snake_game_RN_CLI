import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native-inappbrowser-reborn|@react-native/polyfills|react-native|@react-native-firebase|@react-navigation)/)',
  ],
  setupFiles: ['./jest.setup.js'],
};
export default config;
