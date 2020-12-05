import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipeList from '../components/RecipeList';
import BottomMenu from '../components/BottomMenu';
import TopMenu from '../components/TopMenu';
import axiosWithToken from '../api/axiosWithToken';
import { clearSavedRecipes } from '../actions/savedRecipes';
import ProfileModal from '../components/ProfileModal';

const { width, height } = Dimensions.get('window');

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');

  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);
  const [heart, setHeart] = useState(false);
  const [proflileModalVisible, setProfileModalVisible] = useState(false);

  useEffect(() => {
    const receiveRecipes = async () => {
      setLoading(true);
      const axiosInstance = await axiosWithToken();
      const response = await axiosInstance.get('/home');
      setResults(response.data);
      setLoading(false);
    };
    receiveRecipes();
    dispatch(clearSavedRecipes());
  }, []);
  const displayList = (type) => {
    if (results) {
      switch (type) {
        case 'Recent':
          return results.recent_recipes.length > 0;
        case 'Can Make':
          return results.possible_recipes.length > 0;
        default:
          return false;
      }
    }
  };
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
    <SafeAreaView style={styles.container}>
      <TopMenu profileIcon title="Home" onProfilePress={setProfileModalVisible} />
      <View style={styles.marginTop}>
        {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        {proflileModalVisible === true ? <ProfileModal isVisible={setProfileModalVisible} /> : null}
        <ScrollView>
          <RecipeList title="Welcome Back!" results={filterResults('')} />
          {displayList('Recent') ? (
            <RecipeList title="Continue where you left off!" results={filterResults('Recent')} />
          ) : null}
          {displayList('Can Make') ? (
            <RecipeList title="What you can make right now!" results={filterResults('Can Make')} />
          ) : null}
          <RecipeList title="Popular!" results={filterResults('Popular')} />
        </ScrollView>
      </View>
      <View style={styles.bottomMenu}>
        <BottomMenu />
      </View>
    </SafeAreaView>
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
