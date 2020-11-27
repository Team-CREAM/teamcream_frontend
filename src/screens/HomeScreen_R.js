import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import SearchBar from '../components/SearchBar';
import useRecipes2 from '../hooks/useRecipes2';
import RecipeList from '../components/RecipeList';
import BottomMenu from '../components/BottomMenu2';
import TopMenu from '../components/TopMenu';
import axiosWithToken from '../api/axiosWithToken';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState('');

  useEffect(() => {
    // const data = async () => receiveRecipe().then(setResults(data));
    console.log('In effect');

    const receiveRecipes = async () => {
      console.log('In RetrieveRecipes');
      // const response = await axiosInstance.get('/home');
      const axiosInstance = await axiosWithToken();
      const response = await axiosInstance.get('/home');
      console.log('In away axiosWithToken');
      // setLoading(false);
      // response.data;
      setResults(response.data['popular recipes']);
    };
    receiveRecipes();
  }, []);

  const filterResults = (type) => {
    if (results) {
      return results.filter((result) => {
        switch (type) {
          case 'veryPopular':
            return result.veryPopular === true;
          case 'veryHealthy':
            return result.veryHealthy === true;
          case 'vegan':
            return result.vegan === true;
          default:
            return result;
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <TopMenu
        // title="Home"
        searchbar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        // onTermSubmit={() => searchApi(term)}
      />
      <View style={styles.marginTop}>
        <ScrollView>
          <RecipeList title="Welcome Back!" results={filterResults('vegan')} />
          <RecipeList title="Continue where you left off!" results={filterResults('veryHealthy')} />
          <RecipeList title="What you can make right now!" results={filterResults('vegan')} />
          <RecipeList title="Popular!" results={filterResults('veryPopular')} />
        </ScrollView>
      </View>
      <View style={styles.bottomMenu}>
        <BottomMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF4D1',
    paddingBottom: height * 0.17,
  },
  marginTop: {
    marginTop: 10,
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
  },
});

export default HomeScreen;
