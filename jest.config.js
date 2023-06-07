module.exports = {
    preset: 'react-native',
    testEnvironment: 'node',
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@react-native-community|@unimodules|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-clone-referenced-element|sentry-expo|native-base)'
    ],
  };
  