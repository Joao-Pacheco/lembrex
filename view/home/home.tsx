import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styles from './home.styles';
import { MaterialIcons } from '@expo/vector-icons';
import AddItemModal from './components/addItemModal/addItemModal';

export default function home() {
  return (
    <View style={styles.container}>
      <Image
        testID="background-image"
        style={styles.background}
        source={require('../../assets/images/background.png')}
      />
      <View style={styles.wifiSelectorBtn}>
        <MaterialIcons
          testID="home-icon"
          name="home"
          size={30}
          color="#FF725E"
        />
      </View>
      <View style={styles.containerImage}>
        <Image
          testID="image-center"
          style={styles.imageCenter}
          source={require('../../assets/images/girl.png')}
        />
      </View>
      <View style={styles.containerList}>
        <Text style={styles.title}>Tudo pronto para sair?</Text>
        <View style={styles.itemsList}>
          <View style={styles.item}>
            <Text style={styles.itemText}>Carteira</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Cartão de memória</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addBtnText} testID="reminder-button">
          LEMBRAR
        </Text>
      </TouchableOpacity>
      {/* <WifiSelectorModal
        isVisible={true}
        onClose={() => {}}
        title="Essa é a rede Wi-Fi que você usa em casa?"
        modalTitleWifi="Ronaldo 5G"
        message="O app avisa quando você sai de casa, lembrando dos itens essenciais cadastrados, ao desconectar do Wi-Fi."
        primaryButtonText="ESSE MESMO"
        onPrimaryButtonPress={() => console.log('Lembrar pressionado')}
        secondaryButtonText="Cancelar"
        onSecondaryButtonPress={() => {}}
      /> */}
      <AddItemModal
        isVisible={true}
        onClose={() => {}}
        title="O que você precisa levar com você?"
        primaryButtonText="LEMBRAR"
        onPrimaryButtonPress={() => console.log('Lembrar pressionado')}
        secondaryButtonText="Cancelar"
        onSecondaryButtonPress={() => {}}
      />
    </View>
  );
}
