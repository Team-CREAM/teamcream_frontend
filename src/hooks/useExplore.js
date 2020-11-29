import { useEffect, useState } from 'react';
import axiosWithToken from '../api/axiosWithToken';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const exploreSearch = async (
    searchTerm,
    veryHealthy,
    veryPopular,
    sustainable,
    inventory,
    cheap,
  ) => {
    try {
      setLoading(true);
      const axiosInstance = await axiosWithToken();
      const response = await axiosInstance
        .get('/home', {
          params: {
            searchTerm,
            veryHealthy,
            veryPopular,
            sustainable,
            inventory,
            cheap,
          },
        })
        .then(({ data }) => {
          setResults(data.popular_recipes);
        });
      setLoading(false);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    exploreSearch();
  }, []);

  return [exploreSearch, results, errorMessage, loading];
};
