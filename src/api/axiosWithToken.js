import axios from 'axios';
// import getToken from '../hooks/useGetToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Alert } from 'react-native';

const axiosWithToken = async () => {
  console.log('In axiosWithToken hook');
  const axiosInstance = axios.create({
    baseURL: 'http://10.0.2.2:3000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const token = await AsyncStorage.getItem('@token');
  axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

  return axiosInstance;
};

export default axiosWithToken;
