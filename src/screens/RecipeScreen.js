import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import BottomMenu from '../components/BottomMenu2';

const { width, height } = Dimensions.get('window');

const RecipeScreen = () => {
  //   const [results, errorMessage] = retrieveRecipes();
  const [results, errorMessage] = [];
  const default_recipe = {
    title: 'How to Make OREO Turkeys for Thanksgiving',
    image: 'https://spoonacular.com/recipeImages/715449-312x231.jpg',
  };
  const returned_results = results === undefined ? default_recipe : results[5];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Area for title */}
        <View style={styles.topBar}>
          <Text style={styles.title}> {returned_results.title} </Text>
        </View>
        {/* The recipe image */}
        <Image style={styles.image} source={{ uri: returned_results.image }} />
        {/* Area for the ingredients */}
        <View style={styles.ingredients}>
          <Text>Ingredients here</Text>
        </View>
        {/* Area for the instructions */}
        <View style={styles.instructions}>
          <Text style={{ fontSize: 26 }}> Instructions here</Text>
        </View>
        {/* Area for comments */}
        <View style={styles.comments}>
          <Text>comments here</Text>
        </View>
      </ScrollView>
      {/* Bottom Nav bar */}
      <View style={styles.bottomMenu}>
        <BottomMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    marginHorizontal: '5%',
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: '20%',
  },
  topBar: {
    marginTop: '5%',
  },
  title: {
    fontSize: 25,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    borderRadius: 4,
    marginBottom: 5,
  },
  ingredients: {},
  instructions: {},
  comments: {},
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
  },
});

export default RecipeScreen;
