import { useEffect, useState } from 'react';
import axiosWithToken2 from '../api/axiosWithToken_Spoon';

const axios = require('axios');

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // const searchApi = async (searchTerm) => {
  //   try {
  //     const response = await axiosWithToken2.get('/complexSearch', {
  //       params: {
  //         number: 10,
  //         type: searchTerm,
  //       },
  //     });
  //     setResults(response.data.recipes);
  //   } catch (err) {
  //     setErrorMessage('Something went wrong');
  //   }
  // };
  const DisplayApi = async (searchTerm) => {
    try {
      const response = await axiosWithToken2.get('/complexSearch', {
        params: {
          apiKey: '18a0b5f666f44a3694c8a43303d699ff',
          number: 10,
          sort: searchTerm,
        },
      });
      // const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      //   headers: { 'Content-Type': 'application/json' },
      //   params: { apiKey: '18a0b5f666f44a3694c8a43303d699ff', number: 2, sort: 'healthiness' },
      // });
      setResults(response.data.results);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    DisplayApi('random');
  }, []);

  // return [searchApi, results, errorMessage];
  return [DisplayApi, results, errorMessage];
};
