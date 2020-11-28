import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import heartIcon from 'react-native-vector-icons/AntDesign';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const RecipeDetail = ({ result, savedRecipeList, boolean, refresh, hi }) => {
  const [liked, toggleLike] = useState(!boolean);
  const [props, setProps] = useState([]);
  const AnimatedHeart = Animatable.createAnimatableComponent(heartIcon);
  let smallAnimatedIcon = AnimatedHeart;

  const handleSmallAnimatedIconRef = (ref) => {
    smallAnimatedIcon = ref;
  };

  const handleOnPressLike = () => {
    smallAnimatedIcon.bounceIn();
    if (liked === true) {
      const index = savedRecipeList.indexOf(result);
      if (index > -1) {
        savedRecipeList.splice(index, 1);
        refresh(!hi);
      }
    } else {
      savedRecipeList.push(result);
    }
    toggleLike(!liked);
    console.log(liked);
  };

  const {
    vegetarian,
    vegan,
    glutenFree,
    dairyFree,
    veryHealthy,
    cheap,
    veryPopular,
    sustainable,
    weightWatcherSmartPoints,
    gaps,
    lowFodMap,
    aggregateLikes,
    spoonacularScore,
    healthScore,
    creditsText,
    license,
    sourceName,
    pricePerServing,
    extendedIngredients,
    id,
    title,
    readyInMinutes,
    servings,
    sourceUrl,
    image,
    imageType,
    summary,
    cuisines,
    dishTypes,
    diets,
    occasions,
    instructions,
    analyzedInstructions,
    originalId,
    spoonacularSourceUrl,
  } = result;

  return (
    <View style={boolean ? styles.container : difStyles.container}>
      <Image style={boolean ? styles.image : difStyles.image} source={{ uri: image }} />
      <View style={boolean ? styles.recipeDescription : difStyles.recipeDescription}>
        <Text style={boolean ? styles.name : difStyles.name}>{title}</Text>
        <TouchableOpacity activeOpacity={1} onPress={handleOnPressLike}>
          <AnimatedHeart
            ref={handleSmallAnimatedIconRef}
            name={liked ? 'heart' : 'hearto'}
            color={liked ? colors.heartColor : colors.black}
            size={18}
            style={styles.icon}
          />
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
