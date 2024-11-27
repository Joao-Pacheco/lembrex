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

    const remindButton = getByTestId('reminder-button');
    expect(remindButton).toBeTruthy();
  });

  it('should trigger an event when the "LEMBRAR" button is pressed', () => {
    const { getByTestId } = render(<Home />);

    const remindButton = getByTestId('reminder-button');
    expect(remindButton).toBeTruthy();

    fireEvent.press(remindButton);
  });

  it('should add items to the list correctly', () => {
    const { getByText, getByTestId, getByPlaceholderText } = render(<Home />);

    // Abrir o modal de adicionar item
    const lembrarButton = getByTestId('reminder-button');
    fireEvent.press(lembrarButton);

    // Verificar se o modal está visível
    const addItemModalTitle = getByText('O que você precisa levar com você?');
    expect(addItemModalTitle).toBeTruthy();

    // Adicionar um item
    const inputField = getByPlaceholderText('Ex: Carteira');
    fireEvent.changeText(inputField, 'Carteira');
    const addItemButton = getByTestId('add-item-button');
    fireEvent.press(addItemButton);

    // Verificar se o item foi adicionado à lista
    const addedItem = getByText('Carteira');
    expect(addedItem).toBeTruthy();
  });

  it('should display and hide the Wi-Fi modal correctly', () => {
    const { getByTestId, getByText, queryByText } = render(<Home />);

    // Abrir o modal de Wi-Fi
    const wifiButton = getByTestId('home-icon');
    fireEvent.press(wifiButton);

    // Verificar se o modal de Wi-Fi está visível
    const wifiModalTitle = getByText(
      'Essa é a rede Wi-Fi que você usa em casa?',
    );
    expect(wifiModalTitle).toBeTruthy();

    // Fechar o modal de Wi-Fi
    const cancelButton = getByText('Cancelar');
    fireEvent.press(cancelButton);

    // Verificar se o modal foi fechado
    expect(queryByText('Essa é a rede Wi-Fi que você usa em casa?')).toBeNull();
  });
});
