import React from 'react';
import { Text } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import styles from './listItem.styles';

export default function listItem(listItemProps: ListItem) {
  const { item, onRemove } = listItemProps;

  const translateX = useSharedValue(0);

  const gestureHandler = (event: PanGestureHandlerGestureEvent) => {
    translateX.value = event.nativeEvent.translationX;

    if (event.nativeEvent.translationX < -200) {
      onRemove(item.id);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: 1 + translateX.value / 200,
  }));

  const resetPosition = () => {
    translateX.value = withSpring(0);
  };

  return (
    <PanGestureHandler onGestureEvent={gestureHandler} onEnded={resetPosition}>
      <Animated.View style={[styles.item, animatedStyle]}>
        <Text style={styles.itemText}>{item.name}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
}
