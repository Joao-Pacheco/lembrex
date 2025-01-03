import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import * as Location from 'expo-location';
import styles from './home.styles';
import AddItemModal from './components/addItemModal/addItemModal';
import WifiSelectorModal from './components/wifiSelectorModal/wifiSelectorModal';
import useListStore from '../../view_model/listStore';
import ListItem from './components/listItem/listItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useWifiStore from '../../view_model/useWifiStore';
import Toast from 'react-native-toast-message';
import PushNotification from 'react-native-push-notification';

interface Item {
  id: number;
  name: string;
}

export default function Home() {
  const [isWifiSelectorModalVisible, setWifiSelectorModalVisible] =
    useState(false);
  const [isAddItemModalVisible, setAddItemModalVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const { list, addItem, removeItem } = useListStore();
  const [ssid, setSsid] = useState<string | null>(null);
  const { saveSsid, savedSsid } = useWifiStore();

  const addNewItem = (newItemName: string) => {
    if (newItemName.trim()) {
      const newItem: Item = {
        id: list.length + 1,
        name: newItemName,
      };
      addItem(newItem);
      setAddItemModalVisible(false);
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [list]);

  type WifiDetails = {
    ssid?: string;
  } & NetInfoState['details'];

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      console.log('location', location);
    }
  };

  const showToast = (type: string, text1: string, text2: string) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  const handleSaveSsid = async () => {
    if (ssid) {
      try {
        await AsyncStorage.setItem('savedWifiSsid', ssid);
        saveSsid(ssid);
        showToast('success', 'Wifi salvo com sucesso', 'Wifi: ' + ssid);
        setWifiSelectorModalVisible(false);
      } catch (error) {
        console.error('Erro ao salvar Wifi:', error);
      }
    } else {
      showToast('error', 'Nenhum Wifi conectado', 'Wifi nulo');
    }
  };

  // Listener para alterações na conexão
  const unsubscribe = NetInfo.addEventListener((state) => {
    if (ssid !== savedSsid) {
      if (state.isConnected && state.type === 'wifi') {
        /* PushNotification.localNotification({
          channelId: 'default-channel-id',
          title: 'Olá, João!',
          message: 'Esta é uma notificação local.',
          bigText: 'Mensagem detalhada que aparece ao expandir a notificação.',
        }); */
      } else {
        // trocou de wifi para um outro wif
      }
    }
  });

  useEffect(() => {
    getLocation();

    NetInfo.configure({
      shouldFetchWiFiSSID: true,
    });

    NetInfo.fetch().then((state) => {
      const details = state.details as WifiDetails;
      setSsid(details?.ssid || 'Wi-Fi não disponível');
    });

    unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        testID="background-image"
        style={styles.background}
        source={require('../../assets/images/background.png')}
      />
      <TouchableOpacity
        onPress={() => setWifiSelectorModalVisible(true)}
        style={styles.wifiSelectorBtn}
      >
        <MaterialIcons
          testID="home-icon"
          name="home"
          size={30}
          color="#FF725E"
        />
      </TouchableOpacity>
      <View style={styles.containerImage}>
        <Image
          testID="image-center"
          style={styles.imageCenter}
          source={require('../../assets/images/girl.png')}
        />
      </View>
      <View style={styles.containerList}>
        <Text style={styles.title}>Tudo pronto para sair?</Text>
        <ScrollView
          contentContainerStyle={styles.itemsList}
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
        >
          {list.length === 0 ? (
            <Text style={styles.emptyListText}>
              Clique em LEMBRAR, e adicione itens
            </Text>
          ) : (
            list.map((item: Item) => (
              <ListItem key={item.id} item={item} onRemove={removeItem} />
            ))
          )}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setAddItemModalVisible(true)}
      >
        <Text style={styles.addBtnText} testID="reminder-button">
          LEMBRAR
        </Text>
      </TouchableOpacity>

      <WifiSelectorModal
        isVisible={isWifiSelectorModalVisible}
        onClose={() => setWifiSelectorModalVisible(false)}
        title="Essa é a rede Wi-Fi que você usa em casa?"
        message="O app avisa quando você sai de casa, lembrando dos itens essenciais cadastrados, ao desconectar do Wi-Fi."
        wifiTitle={ssid || 'Wi-Fi desconectado'}
        primaryButtonText="ESSE MESMO"
        onPrimaryButtonPress={() => handleSaveSsid()}
        secondaryButtonText="Cancelar"
        onSecondaryButtonPress={() => setWifiSelectorModalVisible(false)}
      />

      <AddItemModal
        isVisible={isAddItemModalVisible}
        onClose={() => setAddItemModalVisible(false)}
        title="O que você precisa levar com você?"
        primaryButtonText="LEMBRAR"
        onPrimaryButtonPress={(item) => addNewItem(item)}
        secondaryButtonText="Cancelar"
        onSecondaryButtonPress={() => setAddItemModalVisible(false)}
      />
      <Toast />
    </View>
  );
}
