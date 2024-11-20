import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import styles from './addItemModal.styles';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  primaryButtonText: string;
  onPrimaryButtonPress: () => void;
  secondaryButtonText?: string;
  onSecondaryButtonPress?: () => void;
}

export default function addItemModal(modalProps: ModalProps) {
  const {
    isVisible,
    onClose,
    title,
    primaryButtonText,
    onPrimaryButtonPress,
    secondaryButtonText,
    onSecondaryButtonPress,
  } = modalProps;

  const [text, setText] = useState('');

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <TouchableOpacity
        testID="modal-background"
        style={styles.modalBackground}
        onPress={onClose}
      >
        <View testID="modal-view" style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <TextInput
            value={text}
            style={styles.addItemInput}
            onChangeText={setText}
            placeholder="Ex: Carteira"
            placeholderTextColor="#888"
          />
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
