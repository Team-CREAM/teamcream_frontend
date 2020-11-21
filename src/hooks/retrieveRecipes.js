import { useEffect, useState } from 'react';
import axios from 'axios';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async (cancel) => {
    console.log('calling');
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        headers: { 'Content-Type': 'application/json' },
        params: { apiKey: '2b0715ea3ed94024a9bc6afc798e46ba', sort: 'popularity', number: 20 },
      });
      if (cancel) {
        return;
      }
      setResults(response.data.results);
      console.log(results);
    } catch (err) {
      setErrorMessage('ERROR');
    }
  };
  useEffect(() => {
    let cancel = false;
    searchApi(cancel);
    return () => {
      cancel = true;
    };
  }, []);

  return [results, errorMessage];
};
