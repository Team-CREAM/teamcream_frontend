import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosWithToken = async () => {
  const axiosInstance = axios.create({
    baseURL: 'http://10.0.2.2:80',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const token = await AsyncStorage.getItem('@token');
  axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

  return axiosInstance;
};

export default axiosWithToken;
