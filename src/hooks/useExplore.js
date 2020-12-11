import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosWithToken from '../api/axiosWithToken';
import { setExploreRecipes } from '../actions/actionExplore';

export default () => {
  const dispatch = useDispatch();
  // const recipes = useSelector((state) => state.exploreReducer.recipes);
  const [results, setResults] = useState(useSelector((state) => state.exploreReducer.recipes));
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const exploreSearch = async (
    search = '',
    healthy = false,
    popular = false,
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
          console.log(data);
          setResults(data);
          dispatch(setExploreRecipes(data));
        });
      setLoading(false);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    if (results.length === 0) {
      console.log('useffect');
      exploreSearch('', false, false, false, false, false);
    }
  }, []);

  return [exploreSearch, results, errorMessage, loading];
};
