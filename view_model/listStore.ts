import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Item } from '../model/itemModel';

interface ListStore {
  list: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: number) => void;
}

const useListStore = create<ListStore>()(
  persist(
    (set) => ({
      list: [],
      addItem: (item: Item) =>
        set((state) => ({
          list: [...state.list, { id: item.id, name: item.name }],
        })),
      removeItem: (id) =>
        set((state) => ({
          list: state.list.filter((item) => item.id !== id),
        })),
    }),
    {
      name: 'list-storage',
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

export default useListStore;
