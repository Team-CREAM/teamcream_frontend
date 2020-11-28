import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default async () => {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      return value;
    } catch (e) {
      // error reading value
    }
  };
  return [getData];
};
