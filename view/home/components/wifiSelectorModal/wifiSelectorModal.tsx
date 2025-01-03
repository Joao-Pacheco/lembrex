import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import styles from './wifiSelectorModal.styles';
import { handlePress } from '../../../../helpers/commons/handlePress';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  primaryButtonText: string;
  onPrimaryButtonPress?: () => void;
  wifiTitle: string;
  secondaryButtonText?: string;
  onSecondaryButtonPress?: () => void;
}

export default function WifiSelectorModal(modalProps: ModalProps) {
  const {
    isVisible,
    onClose,
    title,
    message,
    primaryButtonText,
    onPrimaryButtonPress,
    wifiTitle,
    secondaryButtonText,
    onSecondaryButtonPress,
  } = modalProps;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable
        testID="modal-background"
        style={styles.modalBackground}
        onPress={onClose}
      >
        <View
          testID="modal-view"
          style={styles.modalView}
          onStartShouldSetResponder={(e) => true}
          {...(Platform.OS === 'web' ? { onMouseDown: handlePress } : {})}
        >
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalTitleWifi}>{wifiTitle}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <View style={styles.buttonContainer}>
            {secondaryButtonText && (
              <TouchableOpacity
                style={[styles.secondaryButton]}
                onPress={onSecondaryButtonPress}
              >
                <Text style={styles.secondaryButtonText}>
                  {secondaryButtonText}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={onPrimaryButtonPress}
            >
              <Text style={styles.primaryButtonText}>{primaryButtonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
