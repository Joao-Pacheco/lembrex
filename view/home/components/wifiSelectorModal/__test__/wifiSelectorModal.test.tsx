import React from 'react';
import { render } from '@testing-library/react-native';
import WifiSelectorModal from '../wifiSelectorModal'; // Seu componente wifiSelectorModal
import { describe, it, expect } from '@jest/globals';

describe('<WifiSelectorModal />', () => {
  const modalProps = {
    isVisible: true,
    onClose: jest.fn(),
    title: 'Título do Modal',
    modalTitleWifi: 'Wi-Fi 5G',
    message: 'Mensagem de exemplo do Wi-Fi.',
    primaryButtonText: 'Confirmar',
    onPrimaryButtonPress: jest.fn(),
    secondaryButtonText: 'Cancelar',
    onSecondaryButtonPress: jest.fn(),
  };

  it('should render the modal with the correct elements when visible', () => {
    const { getByText } = render(<WifiSelectorModal {...modalProps} />);

    const modalTitle = getByText(modalProps.title);
    expect(modalTitle).toBeTruthy();

    const modalTitleWifi = getByText(modalProps.modalTitleWifi);
    expect(modalTitleWifi).toBeTruthy();

    const message = getByText(modalProps.message);
    expect(message).toBeTruthy();

    const primaryButton = getByText(modalProps.primaryButtonText);
    expect(primaryButton).toBeTruthy();

    const secondaryButton = getByText(modalProps.secondaryButtonText);
    expect(secondaryButton).toBeTruthy();
  });

  it('should render the modal without secondary button if not provided', () => {
    const { queryByText } = render(
      <WifiSelectorModal {...modalProps} secondaryButtonText={undefined} />,
    );

    const secondaryButton = queryByText(modalProps.secondaryButtonText);
    expect(secondaryButton).toBeNull();
  });

  it('should render modal background and container view correctly', () => {
    const { getByTestId } = render(<WifiSelectorModal {...modalProps} />);

    const modalBackground = getByTestId('modal-background');
    expect(modalBackground).toBeTruthy();

    const modalView = getByTestId('modal-view');
    expect(modalView).toBeTruthy();
  });
});
