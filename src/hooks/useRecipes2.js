import { setStatusBarTranslucent } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import axiosWithToken2 from '../api/axiosWithToken_Spoon';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const searchApi = async (searchTerm) => {
    if (searchTerm === undefined) {
      try {
        const response = await axiosWithToken2.get('/complexSearch', {
          params: {
            // apiKey: '2b0715ea3ed94024a9bc6afc798e46ba',
            apiKey: '0a3c80f574c04ff4bccd3dcddff35391',
            number: 50,
            sort: 'popularity, healthiness, random',
            addRecipeInformation: true,
            // fillIngredients: true,
            // ignorePantry: false,
          },
        });
        if (response.data !== undefined) {
          setResults(response.data.results);
        }
      } catch (err) {
        setErrorMessage('Something went wrong');
      }
    } else {
      try {
        const response = await axiosWithToken2.get('/complexSearch', {
          params: {
            apiKey: '2b0715ea3ed94024a9bc6afc798e46ba',
            number: 50,
            query: searchTerm,
          },
        });
        setResults(response.data.results);
        // console.log(response.data);
      } catch (err) {
        setErrorMessage('Something went wrong');
      }
    }
  };

  useEffect(() => {
    searchApi();
  }, []);

  return [searchApi, results, errorMessage];
};
