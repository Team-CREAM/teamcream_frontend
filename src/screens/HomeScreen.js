import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../components/SearchBar';
import useRecipes from '../hooks/useRecipes';
import RecipeList from '../components/RecipeList';
import BottomMenu from '../components/BottomMenu2';
import TopMenu from '../components/TopMenu';
import useGetToken from '../hooks/useGetToken';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage] = useRecipes();
  const [token, setToken] = useState('');

  // const token = useGetToken();
  // console.log(token);
  // console.log(token);
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@token');
        setToken(value);
        if (value !== null) {
          // value previously stored
        }
        return value;
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, []);

  const filterResultsByPrice = (price) => {
    // price === $ $$ $$$
    return results.filter((result) => {
      return result.price === price;
    });
  };
  return (
    <View style={styles.container}>
      <TopMenu
        // title="Home"
        searchbar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => searchApi(term)}
      />
      {token ? <Text>{token}</Text> : null}
      <View style={styles.marginTop}>
        <ScrollView>
          <RecipeList title="Welcome Back!" results={filterResultsByPrice('$')} />
          <RecipeList title="Continue where you left off!" results={filterResultsByPrice('$$')} />
          <RecipeList title="What you can make right now!" results={filterResultsByPrice('$$$')} />
          <RecipeList title="Popular!" results={filterResultsByPrice('$$$')} />
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
