import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../home';

describe('Home', () => {
  it('should render all elements correctly', () => {
    const { getByTestId, getByText } = render(<Home />);

    const backgroundImage = getByTestId('background-image');
    const girlImage = getByTestId('image-center');

    expect(backgroundImage).toBeTruthy();
    expect(girlImage).toBeTruthy();

    const materialIcon = getByTestId('home-icon');
    expect(materialIcon).toBeTruthy();

    const titleText = getByText('Tudo pronto para sair?');
    expect(titleText).toBeTruthy();

    const item1Text = getByText('Carteira');
    const item2Text = getByText('Cartão de memória');
    expect(item1Text).toBeTruthy();
    expect(item2Text).toBeTruthy();

    const remindButton = getByTestId('reminder-button');
    expect(remindButton).toBeTruthy();
  });

  it('should trigger an event when the "LEMBRAR" button is pressed', () => {
    const { getByTestId } = render(<Home />);

    const remindButton = getByTestId('reminder-button');
    expect(remindButton).toBeTruthy();

    fireEvent.press(remindButton);
  });
});
