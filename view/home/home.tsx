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
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';

interface Item {
  id: number;
  name: string;
}

interface LocationType {
  latitude: number;
  longitude: number;
  radius: number;
}

interface CurrentLocationType {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export default function Home() {
  const [isWifiSelectorModalVisible, setWifiSelectorModalVisible] =
    useState(false);
  const [isAddItemModalVisible, setAddItemModalVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const { list, addItem, removeItem } = useListStore();
  const [savedLocation, setSavedLocation] = useState<LocationType | null>(null);
  const [currentLocation, setCurrentLocation] =
    useState<CurrentLocationType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isOutsideRadius, setIsOutsideRadius] = useState<boolean>(false);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;

    if (savedLocation) {
      // Inicia o monitoramento de localização
      const startWatching = async () => {
        try {
          locationSubscription = await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.High,
              timeInterval: 5000, // Atualiza a cada 5 segundos
              distanceInterval: 1, // Atualiza a cada metro percorrido
            },
            (location) => {
              setCurrentLocation(location);
              checkIfOutsideRadius(location);
            },
          );
        } catch (error) {
          console.error(error);
          Alert.alert('Erro ao monitorar localização.');
        }
      };

      startWatching();
    }

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [savedLocation]);

  const deg2rad = (deg: number): number => deg * (Math.PI / 180);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number => {
    const R = 6371000;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const saveCurrentLocationWithRadius = async (): Promise<void> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar localização foi negada.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setSavedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        radius: 60, // Raio em metros
      });
      showToast(
        'success',
        'Casa salva com sucesso',
        'Salvamos um raio de 50 metros da sua casa',
      );
      setWifiSelectorModalVisible(false);
    } catch (error) {
      console.error(error);
      showToast('error', 'Casa não salva', 'Não conseguimos salvar sua casa');
    }
  };

  const checkIfOutsideRadius = (location: CurrentLocationType): void => {
    if (!savedLocation) return;

    const distance = calculateDistance(
      location.coords.latitude,
      location.coords.longitude,
      savedLocation.latitude,
      savedLocation.longitude,
    );

    if (distance > savedLocation.radius) {
      if (!isOutsideRadius) {
        setIsOutsideRadius(true);
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'Lembrex',
            body: 'Veja os itens que você deve levar com vocé',
          },
          trigger: null,
        });
      }
    } else {
      if (isOutsideRadius) {
        setIsOutsideRadius(false);
        Alert.alert('Você voltou para dentro do raio salvo!');
      }
    }
  };

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
      /* console.log('location', location); */
    }
  };

  const showToast = (type: string, text1: string, text2: string) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  useEffect(() => {
    getLocation();
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
        wifiTitle={'Você está em casa?'}
        primaryButtonText="SIM"
        onPrimaryButtonPress={() => saveCurrentLocationWithRadius()}
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
