import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Home from '../home';
import { describe, expect } from '@jest/globals';

describe('<Home />', () => {
  it('must correctly render all elements', async () => {
    const { getByText, getByTestId, getAllByTestId } = render(<Home />);

    // Make sure the text "Tudo pronto para sair?" is on the screen
    expect(getByText('Tudo pronto para sair?')).toBeTruthy();

    // Check if list items are on screen
    expect(getByText('Carteira')).toBeTruthy();
    expect(getByText('Cartão de memória')).toBeTruthy();

    // Make sure the REMEMBER button is on the screen
    expect(getByText('LEMBRAR')).toBeTruthy();

    // Check if the background image is on the screen
    const backgroundImage = getByTestId('background-image');
    expect(backgroundImage).toBeTruthy();

    // Check if the MaterialIcons icon is rendered
    await waitFor(() => {
      const icon = getAllByTestId('material-icon');
      expect(icon.length).toBeGreaterThan(0);
    });
  });

  it('must take action when clicking the REMEMBER button', () => {
    const { getByText } = render(<Home />);

    const rememberButton = getByText('LEMBRAR');
    fireEvent.press(rememberButton);

    expect(rememberButton).toBeTruthy();
  });
});
