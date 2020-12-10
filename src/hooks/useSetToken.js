import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {
  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem('@token', value);
    } catch (e) {
      console.log('store data error', e);
    }
  };

  return [storeToken];
};
