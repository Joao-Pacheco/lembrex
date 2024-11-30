import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import ListItem from '../listItem';

describe('ListItem Component', () => {
  const mockRemoveItem = jest.fn();
  const testItem = { id: 1, name: 'Test Item' };

  it('should render the item name correctly', () => {
    const { getByText } = render(
      <ListItem item={testItem} onRemove={mockRemoveItem} />,
    );

    expect(getByText('Test Item')).toBeTruthy();
  });

  it('should call onRemove when swiped left beyond the threshold', () => {
    const { getByText } = render(
      <ListItem item={testItem} onRemove={mockRemoveItem} />,
    );

    const item = getByText('Test Item');

    fireEvent(item, 'onGestureEvent', {
      nativeEvent: { translationX: -250 },
    });

    expect(mockRemoveItem).toHaveBeenCalledTimes(1);
    expect(mockRemoveItem).toHaveBeenCalledWith(testItem.id);
  });

  it('should reset position when gesture ends without threshold', async () => {
    const { getByText } = render(
      <ListItem item={testItem} onRemove={mockRemoveItem} />,
    );

    const item = getByText('Test Item');

    fireEvent(item, 'onGestureEvent', {
      nativeEvent: { translationX: -100 },
    });

    await act(async () => {
      fireEvent(item, 'onEnded');
    });

    expect(getByText('Test Item')).toBeTruthy();
  });
});
