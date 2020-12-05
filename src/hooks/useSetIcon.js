import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {
  const storeIcon = async (value) => {
    try {
      await AsyncStorage.setItem('@icon', value);
    } catch (e) {
      console.log('store data error', e);
      // saving error
    }
  };

  return [storeIcon];
};
