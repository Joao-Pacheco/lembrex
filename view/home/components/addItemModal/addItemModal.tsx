import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Pressable,
  Platform,
} from 'react-native';
import styles from './addItemModal.styles';
import { handlePress } from '../../../../helpers/commons/handlePress';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  primaryButtonText: string;
  onPrimaryButtonPress: (item: string) => void;
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

  const [item, setItem] = useState('');

  useEffect(() => {
    setItem('');
  }, [isVisible]);

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
          <TextInput
            value={item}
            style={styles.addItemInput}
            onChangeText={setItem}
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
              onPress={() => onPrimaryButtonPress(item)}
            >
              <Text style={styles.primaryButtonText}>{primaryButtonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
