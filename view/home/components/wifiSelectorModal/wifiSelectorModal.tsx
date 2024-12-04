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
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import * as Location from 'expo-location';

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
    message,
    primaryButtonText,
    onPrimaryButtonPress,
    secondaryButtonText,
    onSecondaryButtonPress,
  } = modalProps;

  // Estado para armazenar o SSID
  const [ssid, setSsid] = useState<string | null>(null);

  // Extensão do tipo para incluir BSSID e SSID
  type WifiDetails = {
    bssid?: string;
    ssid?: string;
  } & NetInfoState['details'];

  // Função para solicitar permissão de localização
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      console.log('location', location);
    }
  };

  // Busca o SSID quando o modal estiver visível
  useEffect(() => {
    getLocation();

    if (isVisible) {
      NetInfo.configure({
        shouldFetchWiFiSSID: true,
      });

      NetInfo.fetch().then((state) => {
        const details = state.details as WifiDetails;
        console.log('BSSID', details?.bssid);
        console.log('SSID', details?.ssid);
        console.log('details', details);

        // Atualiza o estado com o SSID
        setSsid(details?.ssid || 'SSID não disponível');
      });
    }
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
          <Text style={styles.modalTitleWifi}>
            {/* Exibe o SSID no lugar de modalTitleWifi */}
            {ssid || 'Carregando Wi-Fi...'}
          </Text>
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
