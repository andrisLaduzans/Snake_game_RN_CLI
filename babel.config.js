module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'module:react-native-dotenv',
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
          '~components': './App/components',
          '~theme': './App/theme',
          '~application': './App/application',
          '~assets': './App/assets',
          '~utils': './App/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
