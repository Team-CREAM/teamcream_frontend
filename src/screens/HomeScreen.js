import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import SearchBar from '../components/SearchBar';
import useRecipes from '../hooks/useRecipes';
import useRecipes2 from '../hooks/useRecipes2';
import RecipeList from '../components/RecipeList';
import BottomMenu from '../components/BottomMenu2';
import TopMenu from '../components/TopMenu';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [term, setTerm] = useState('');
  const [DisplayApi, results, errorMessage] = useRecipes2();

  const filterResults = (price) => {
    // price === $ $$ $$$
    // console.log(results);
    if (results) {
      return results.filter((result) => {
        return result.sort === price;
      });
    }
    return results;
  };
  return (
    <View style={styles.container}>
      <TopMenu
        // title="Home"
        searchbar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => DisplayApi(term)}
      />
      <View style={styles.marginTop}>
        <ScrollView>
          <RecipeList title="Welcome Back!" results={filterResults('random')} />
          <RecipeList title="Continue where you left off!" results={filterResults('healthiness')} />
          <RecipeList title="What you can make right now!" results={filterResults('random')} />
          <RecipeList title="Popular!" results={filterResults('popularity')} />
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
