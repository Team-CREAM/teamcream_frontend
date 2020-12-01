import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, ActivityIndicator, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import RecipeList from '../components/RecipeList';
import BottomMenu from '../components/BottomMenu';
import TopMenu from '../components/TopMenu';
import axiosWithToken from '../api/axiosWithToken';

const { width, height } = Dimensions.get('window');

const HomeScreen = (props) => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);
  // const isFocused = navigation.useIsFocused();

  useEffect(() => {
    const receiveRecipes = async () => {
      setLoading(true);
      const axiosInstance = await axiosWithToken();
      const response = await axiosInstance.get('/home');
      setResults(response.data);
      setLoading(false);
    };
    receiveRecipes();
  }, []);

  const filterResults = (type) => {
    if (results) {
      switch (type) {
        case 'Popular':
          return results.popular_recipes;
        case 'Recent':
          return results.recent_recipes;
        case 'Can Make':
          return results.possible_recipes;
        default:
          return results.random_recipes;
      }
    }
  };

  return (
    <View style={styles.container}>
      <TopMenu
        title="Home"
        // searchbar
        // term={term}
        // onTermChange={(newTerm) => setTerm(newTerm)}
        // onTermSubmit={() => searchApi(term)}
      />
      <View style={styles.marginTop}>
        {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}

        <ScrollView>
          <RecipeList title="Welcome Back!" results={filterResults('')} />
          {results.size > 0 ? (
            <RecipeList title="Continue where you left off!" results={filterResults('Recent')} />
          ) : null}
          {results.size > 0 ? (
            <RecipeList title="What you can make right now!" results={filterResults('Can Make')} />
          ) : null}
          <RecipeList title="Popular!" results={filterResults('Popular')} />
        </ScrollView>
      <View style={{ height: 400 }}>
        <BottomMenu />
      </View>
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
