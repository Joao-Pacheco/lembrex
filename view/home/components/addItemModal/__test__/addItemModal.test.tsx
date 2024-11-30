import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddItemModal from '../addItemModal';
import { describe, it, expect } from '@jest/globals';

describe('AddItemModal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnPrimaryButtonPress = jest.fn();
  const mockOnSecondaryButtonPress = jest.fn();

  const defaultProps = {
    isVisible: true,
    onClose: mockOnClose,
    title: 'O que você precisa levar com você?',
    primaryButtonText: 'ESSE MESMO',
    onPrimaryButtonPress: mockOnPrimaryButtonPress,
    secondaryButtonText: 'Cancelar',
    onSecondaryButtonPress: mockOnSecondaryButtonPress,
  };

  it('renders correctly when visible', () => {
    const { getByText, getByPlaceholderText } = render(
      <AddItemModal {...defaultProps} />,
    );

    expect(getByText('O que você precisa levar com você?')).toBeTruthy();
    expect(getByPlaceholderText('Ex: Carteira')).toBeTruthy();

    expect(getByText('Cancelar')).toBeTruthy();
    expect(getByText('ESSE MESMO')).toBeTruthy();
  });

  it('calls onClose when background is pressed', () => {
    const { getByTestId } = render(<AddItemModal {...defaultProps} />);

    fireEvent.press(getByTestId('modal-background'));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onPrimaryButtonPress when the primary button is pressed', () => {
    const { getByText } = render(<AddItemModal {...defaultProps} />);

    fireEvent.press(getByText('ESSE MESMO'));

    expect(mockOnPrimaryButtonPress).toHaveBeenCalled();
  });

  it('calls onSecondaryButtonPress when the secondary button is pressed', () => {
    const { getByText } = render(<AddItemModal {...defaultProps} />);

    fireEvent.press(getByText('Cancelar'));

    expect(mockOnSecondaryButtonPress).toHaveBeenCalled();
  });

  it('updates the input text when the user types', () => {
    const { getByPlaceholderText } = render(<AddItemModal {...defaultProps} />);

    const input = getByPlaceholderText('Ex: Carteira');
    fireEvent.changeText(input, 'Carteira');

    expect(input.props.value).toBe('Carteira');
  });

  it('does not render when `isVisible` is false', () => {
    const { queryByTestId } = render(
      <AddItemModal {...defaultProps} isVisible={false} />,
    );

    expect(queryByTestId('modal-view')).toBeNull();
  });
});
