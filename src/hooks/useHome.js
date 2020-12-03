import { useEffect, useState } from 'react';
import axiosWithToken from '../api/axiosWithToken';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(true);

  const receiveRecipes = async () => {
    try {
      setLoading(true);
      const axiosInstance = await axiosWithToken();
      const response = await axiosInstance.get('/home').then(({ data }) => {
        setResults(data);
      });
      //   setResults(response.data);
      setLoading(false);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    receiveRecipes();
  }, []);

  return [receiveRecipes, results, errorMessage, loading];
};
