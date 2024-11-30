import React, { useState, useEffect, useRef } from 'react';
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './home.styles';
import AddItemModal from './components/addItemModal/addItemModal';
import WifiSelectorModal from './components/wifiSelectorModal/wifiSelectorModal';
import useListStore from '../../view_model/listStore';
import ListItem from './components/listItem/listItem';

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
        modalTitleWifi="Ronaldo 5G"
        message="O app avisa quando você sai de casa, lembrando dos itens essenciais cadastrados, ao desconectar do Wi-Fi."
        primaryButtonText="ESSE MESMO"
        onPrimaryButtonPress={() => console.log('Lembrar pressionado')}
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
    </View>
  );
}
