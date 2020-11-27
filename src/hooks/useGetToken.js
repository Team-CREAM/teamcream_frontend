import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default () => {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value !== null) {
        // value previously stored
      }
      return value;
    } catch (e) {
      // error reading value
    }
  };
  return [getData];
};
