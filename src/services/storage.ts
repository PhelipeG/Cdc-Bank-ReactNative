import AsyncStorage from '@react-native-async-storage/async-storage';

// segui essa doc https://react-native-async-storage.github.io/async-storage/docs/usage
export const storage = {
  async getData<T>(key: string): Promise<T | null> {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  async setData<T>(key: string, value: T) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  async removeData(key: string) {
    await AsyncStorage.removeItem(key);
  },
};
