import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosWithToken = async () => {
  const axiosInstance = axios.create({
    baseURL: 'https://powerful-taiga-83278.herokuapp.com/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const token = await AsyncStorage.getItem('@token');
  axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

  return axiosInstance;
};

export default axiosWithToken;
