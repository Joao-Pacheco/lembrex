import '@testing-library/jest-native/extend-expect';

jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: jest.fn((props) => {
    return <div testID={props.name + '-icon'}> (Mocked Icon)</div>;
  }),
}));

jest.mock('react-native-gesture-handler', () => {
  const actual = jest.requireActual('react-native-gesture-handler');
  return {
    ...actual,
    PanGestureHandler: ({ children }) => children,
  };
});

jest.mock('react-native-reanimated', () => {
  const Reanimated = jest.requireActual('react-native-reanimated/mock');

  Reanimated.useSharedValue = jest.fn((initialValue) => ({
    value: initialValue,
  }));
  Reanimated.useAnimatedStyle = jest.fn((callback) => callback());

  return Reanimated;
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));
