import axios from 'axios';
<<<<<<< HEAD
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
=======
// import getToken from '../hooks/useGetToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Alert } from 'react-native';

const axiosWithToken = async () => {
  const axiosInstance = axios.create({
    baseURL: 'http://10.0.2.2:3000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const token = await AsyncStorage.getItem('@token');
  axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

  return axiosInstance;
>>>>>>> d24de10a10e81e3ce1d1eba2acdb4f77716c7ce9
};

export default axiosWithToken;
