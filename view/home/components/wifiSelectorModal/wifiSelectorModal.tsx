import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import styles from './wifiSelectorModal.styles';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  modalTitleWifi: string;
  message: string;
  primaryButtonText: string;
  onPrimaryButtonPress: () => void;
  secondaryButtonText?: string;
  onSecondaryButtonPress?: () => void;
}

export default function wifiSelectorModal(modalProps: ModalProps) {
  const {
    isVisible,
    onClose,
    title,
    modalTitleWifi,
    message,
    primaryButtonText,
    onPrimaryButtonPress,
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
      <TouchableOpacity
        testID="modal-background"
        style={styles.modalBackground}
        onPress={onClose}
      >
        <View testID="modal-view" style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalTitleWifi}>{modalTitleWifi}</Text>
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
      </TouchableOpacity>
    </Modal>
  );
}
