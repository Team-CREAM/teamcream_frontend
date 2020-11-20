import { useEffect, useState } from 'react';
import axiosWithToken2 from '../api/axiosWithToken_Spoon';

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
      setResults(response.data.recipes);
      console.log(response.data.recipes);
    } catch (err) {
      setErrorMessage('Something went wrong');
      console.log('ERROR');
    }
  };

  useEffect(() => {
    DisplayApi('random');
  }, []);

  // return [searchApi, results, errorMessage];
  return [DisplayApi, results, errorMessage];
};
