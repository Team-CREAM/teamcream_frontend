import { useEffect, useState } from 'react';

const axios = require('axios');

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async () => {
    console.log('calling');
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        headers: { 'Content-Type': 'application/json' },
        params: { apiKey: '0a3c80f574c04ff4bccd3dcddff35391', sort: 'popularity', number: 20 },
      });
      setResults(response.data.results);
      console.log(response.data.result);
    } catch (err) {
      setErrorMessage('ERROR');
    }
  };
  useEffect(() => {
    searchApi();
  }, []);

  return [searchApi, results, errorMessage];
};
