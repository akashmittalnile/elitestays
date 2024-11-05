module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          '.png'
        ],
        alias: {
          'screens': './src/screens',
          'components': './src/components',
          'assets': './src/assets',
          'utils': './src/utils'
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
