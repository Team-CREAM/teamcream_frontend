import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import heartIcon from 'react-native-vector-icons/AntDesign';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import axiosWithToken from '../api/axiosWithToken';

const { width, height } = Dimensions.get('window');

const RecipeDetail = ({ result, savedRecipes, recipes, boolean, refresh, hi }) => {
  const [liked, toggleLike] = useState(!boolean);
  const [recipe, setRecipe] = useState('');
  const AnimatedHeart = Animatable.createAnimatableComponent(heartIcon);
  let smallAnimatedIcon = AnimatedHeart;

  const handleSmallAnimatedIconRef = (ref) => {
    smallAnimatedIcon = ref;
  };

  useEffect(() => {
    const getRecipes = async () => {
      const axiosInstance = await axiosWithToken();
      const response = await axiosInstance.post('./recipeClicked', {
        recipe: result.recipe,
      });
      setRecipe(response.data.Recipe);
    };
    getRecipes();
  }, []);

  // const handleOnPressLike = () => {
  //   smallAnimatedIcon.bounceIn();
  //   if (liked === true) {
  //     const index = savedRecipeList.indexOf(result);
  //     if (index > -1) {
  //       savedRecipeList.splice(index, 1);
  //       refresh(!hi);
  //     }
  //   } else {
  //     savedRecipeList.push(result);
  //   }
  //   toggleLike(!liked);
  //   console.log(liked);
  // };

  const youClickedMe = async () => {
    console.log(recipe._id);
    const axiosInstance = await axiosWithToken();
    const response = await axiosInstance.post('./savedRecipes', {
      recipe: recipe._id,
      add: false,
    });
    console.log(response.data.message);
    console.log(response.data.result);
    // recipes(response.data.result);
    recipes([...savedRecipes.filter((sRecipes) => sRecipes._id != recipe._id)]);
    refresh(!hi);
  };

  // const {
  //   vegetarian,
  //   vegan,
  //   glutenFree,
  //   dairyFree,
  //   veryHealthy,
  //   cheap,
  //   veryPopular,
  //   sustainable,
  //   weightWatcherSmartPoints,
  //   gaps,
  //   lowFodMap,
  //   aggregateLikes,
  //   spoonacularScore,
  //   healthScore,
  //   creditsText,
  //   license,
  //   sourceName,
  //   pricePerServing,
  //   extendedIngredients,
  //   id,
  //   title,
  //   readyInMinutes,
  //   servings,
  //   sourceUrl,
  //   image,
  //   imageType,
  //   summary,
  //   cuisines,
  //   dishTypes,
  //   diets,
  //   occasions,
  //   instructions,
  //   analyzedInstructions,
  //   originalId,
  //   spoonacularSourceUrl,
  // } = result;
  return (
    <View style={boolean ? styles.container : difStyles.container}>
      {recipe.image ? (
        <Image style={boolean ? styles.image : difStyles.image} source={{ uri: recipe.image }} />
      ) : null}
      <View style={boolean ? styles.recipeDescription : difStyles.recipeDescription}>
        <Text style={boolean ? styles.name : difStyles.name}>{recipe.title}</Text>
        <TouchableOpacity onPress={() => youClickedMe()}>
          <AntDesign name="heart" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const colors = {
  transparent: 'transparent',
  white: '#fff',
  heartColor: '#e92f3c',
  textPrimary: '#515151',
  black: '#000',
};

const difStyles = StyleSheet.create({
  container: {
    margin: 15,
    borderBottomWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    flexGrow: 1,
    width: width * 0.8,
  },
  image: {
    width: width * 0.8,
    height: height * 0.2,
    resizeMode: 'stretch',
    borderRadius: 4,
    marginBottom: 5,
    borderColor: 'black',
    borderWidth: 2,
  },
  recipeDescription: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: width * 0.8,
    minHeight: height * 0.03,
  },
  name: {
    fontWeight: 'bold',
    textAlign: 'left',
    flexWrap: 'wrap',
    flex: 1,
  },
});

const styles = StyleSheet.create({
  image: {
    width: width * 0.62,
    height: height * 0.15,
    resizeMode: 'stretch',
    borderRadius: 4,
    marginBottom: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  recipeDescription: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: width * 0.62,
  },
  name: {
    fontWeight: 'bold',
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  container: {
    margin: 15,
    borderBottomWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    flexGrow: 1,
    width: width * 0.62,
  },
});

export default RecipeDetail;
