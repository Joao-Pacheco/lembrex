import '@testing-library/jest-native/extend-expect';

jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: jest.fn((props) => {
    return <div testID={props.name + '-icon'}> (Mocked Icon)</div>;
  }),
}));
