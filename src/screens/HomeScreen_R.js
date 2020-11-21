import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { bezier } from 'react-native/Libraries/Animated/src/Easing';
import SearchBar from '../components/SearchBar';
import useRecipes2 from '../hooks/useRecipes2';
import RecipeList from '../components/RecipeList';
import BottomMenu from '../components/BottomMenu2';
import TopMenu from '../components/TopMenu';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage] = useRecipes2();

  const filterResults = (type) => {
    return results.filter((result) => {
      switch (type) {
        case 'veryPopular':
          return result.veryPopular === true;
          break;
        case 'veryHealthy':
          return result.veryHealthy === true;
          break;
        case 'vegan':
          return result.vegan === true;
          break;
        default:
          return result;
      }
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
