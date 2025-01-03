import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Item } from '../model/itemModel';

interface WifiStore {
  savedSsid: null | String;
  saveSsid: (savedSsid: String) => void;
}

const useWifiStore = create<WifiStore>()(
  persist(
    (set) => ({
      savedSsid: '',
      saveSsid: (ssid: null | String) =>
        set((state) => ({
          savedSsid: ssid,
        })),
    }),
    {
      name: 'wifi-storage',
      storage: {
        getItem: async (name) => {
          const raw = await AsyncStorage.getItem(name);
          return raw ? JSON.parse(raw) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: AsyncStorage.removeItem,
      },
    },
  ),
);

export default useWifiStore;
