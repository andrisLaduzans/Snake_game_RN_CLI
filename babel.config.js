module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.ios.tsx',
          '.android.ts',
          '.android.tsx',
          '.js',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          App: ['./App'],
          '~navigation': './App/navigation',
          '~views': './App/views',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
