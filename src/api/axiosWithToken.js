import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

const axiosWithToken = async () => {
  const [token, setToken] = useState('');
  try {
    const value = await AsyncStorage.getItem('@token');
    setToken(value);
    console.log(token);
  } catch (e) {
    // error reading value
    console.log('error getting value');
  }

  return axios.create({
    baseURL: 'http://10.0.2.2:3000',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export default axiosWithToken;
