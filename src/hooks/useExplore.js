import { useEffect, useState } from 'react';
import axiosWithToken from '../api/axiosWithToken';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const exploreSearch = async (
    search = '',
    healthy = false,
    popular = false,
    // sustainable = false,
    inventory = false,
    cheap = false,
  ) => {
    try {
      setLoading(true);
      const axiosInstance = await axiosWithToken();
      const response = await axiosInstance
        .post('/explore', {
          search,
          filter: true,
          inventory,
          healthy,
          cheap,
          popular,
          sustainable: false,
        })
        .then(({ data }) => {
          setResults(data);
        });
      setLoading(false);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    exploreSearch('', false, false, false, false, false);
  }, []);

  return [exploreSearch, results, errorMessage, loading];
};
