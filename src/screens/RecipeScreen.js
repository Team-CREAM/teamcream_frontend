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
import HTML from 'react-native-render-html';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import BottomMenu from '../components/BottomMenu2';

import retrieveRecipes from '../hooks/retrieveRecipes';

const { width, height } = Dimensions.get('window');

const RecipeScreen = () => {
  //   const [results, errorMessage] = retrieveRecipes();
  const [results, errorMessage] = [];
  const default_recipe = {
    title: 'Oreo Turkeys',
    image: 'https://spoonacular.com/recipeImages/715449-312x231.jpg',
    instructions:
      '<b>1.</b> In a microwave-safe bowl, add white chocolate, coconut oil, and a few drops food coloring. Heat in microwave in 30 - second intervals until melted. Transfer melted chocolate to a small zip- loc bag or pastry bag and snip a small hole on the end. <br/> <br/> <b>2.</b> Dot the back of candy eyes with melted chocolate and place two on each Oreo. Dot the back of butterscotch chips and place one each Oreo to create a beak. <br/> <br/> <b>3.</b> Pipe a red line beside the beak to create a gobbler. Create feathers by stuffing four candy corns into the filling of the Oreo, point side down. ',
    extendedIngredients: [
      '1/2 c. white chocolate chips',
      '1 tbsp. coconut oil',
      'Red food coloring',
      '40 candy eyes',
      '20 Oreos',
      '20 butterscotch chips',
      '1 c.candy corns',
    ],
    aggregateLikes: 255,
    servings: 20,
    readyinMinutes: 20,
  };
  const returned_results = results === undefined ? default_recipe : results[5];
  const ingredientsArray = returned_results.extendedIngredients;
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Area for title */}
        <View style={styles.topBar}>
          {/* Title Goes Here */}
          <Text style={styles.title}> {returned_results.title} </Text>
          {/* Prep Time, Servings, and Likes Go Here */}
          <View style={styles.titleDescription}>
            <Text>Prep Time: </Text>
            <Text>{returned_results.readyinMinutes}</Text>
            <Text> Minutes </Text>
            <FontAwesome name="circle" size={10} color="black" />
            <Text> Servings: </Text>
            <Text>{returned_results.servings} </Text>
            <FontAwesome name="circle" size={10} color="black" />
            <Text> Likes: </Text>
            <Text>{returned_results.aggregateLikes}</Text>
          </View>
          {/* Dividing Line Goes Here */}
          <View style={styles.lineContainer}>
            <View style={styles.lineStyle} />
          </View>
        </View>

        {/* The recipe image */}
        <View style={{ alignItems: 'center' }}>
          <Image style={styles.image} source={{ uri: returned_results.image }} />
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.lineContainer}>
            <View style={styles.lineStyle} />
          </View>
        </View>
        {/* Area for the ingredients */}
        <View style={styles.parentInstructions}>
          <View style={styles.ingredients}>
            <ScrollView
              bounces={false}
              // style={{ marginVertical: height * 0.01, marginHorizontal: width * 0.07 }}
              contentContainerStyle={{ flex: 1, flexDirection: 'column', flexWrap: 'wrap' }}>
              {ingredientsArray.map((item, key) => (
                <View key={key} style={{ flexDirection: 'row' }}>
                  <Text>{'\u25AA'}</Text>
                  <Text>
                    {item}
                    {'\n'}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
          {/* Area for the instructions */}
          <View style={styles.instructions}>
            <HTML
              html={returned_results.instructions}
              imagesMaxWidth={Dimensions.get('window').width}
            />
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.lineContainer}>
            <View style={styles.lineStyle} />
          </View>
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
    backgroundColor: '#FEF4D1',
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
    marginTop: height * 0.05,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    justifyContent: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.3,
    borderRadius: 4,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'black',
    resizeMode: 'stretch',
  },
  parentInstructions: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
    width: width * 0.9,
  },
  ingredients: {
    width: '50%',
    alignItems: 'flex-start',
  },
  instructions: {
    width: '50%',
  },
  comments: {
    alignItems: 'center',
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.025,
    marginBottom: height * 0.025,
  },
  lineStyle: {
    height: height * 0.003,
    width: width * 0.9,
    backgroundColor: 'black',
  },
  titleDescription: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
});

export default RecipeScreen;
