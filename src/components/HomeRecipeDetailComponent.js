import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import heartIcon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import axiosWithToken from '../api/axiosWithToken';
import { addSavedRecipe, removeSavedRecipe } from '../actions/actionSavedRecipes';

const { width, height } = Dimensions.get('window');

const RecipeDetail = ({ result }) => {
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(result.saved);
  const reducerList = useSelector((state) => state.savedRecipeReducer.savedRecipeList);
  const AnimatedHeart = Animatable.createAnimatableComponent(heartIcon);
  let smallAnimatedIcon = AnimatedHeart;
  const exists = reducerList.some((r) => r.id === result.recipe._id);
  const handleSmallAnimatedIconRef = (ref) => {
    smallAnimatedIcon = ref;
  };

  // When component mounts, store the saved recipe
  useEffect(() => {
    if (result.saved) {
      dispatch(addSavedRecipe(result.recipe));
    }
  }, []);

  // Whever the reducer saved list updates, update 'heart' prop and re-render
  useEffect(() => {
    if (exists) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [reducerList]);

  // Sends a post request to save/remove recipe when user toggles the heart
  // also changes the heart color by updating 'heart' prop
  const youClickedMe = async () => {
    // console.log(result.recipe.title);
    if (!saved) {
      setSaved(!saved);
      dispatch(addSavedRecipe(result.recipe));
      const axiosInstance = await axiosWithToken();
      const response = await axiosInstance.post('/savedRecipes', {
        recipe: result.recipe._id,
        add: true,
      });
      console.log(response.data.message, result.recipe.title);
    } else {
      setSaved(!saved);
      dispatch(removeSavedRecipe(result.recipe._id));
      const axiosInstance = await axiosWithToken();
      const response = await axiosInstance.post('/savedRecipes', {
        recipe: result.recipe._id,
        add: false,
      });
      console.log(response.data.message, result.recipe.title);
    }
    // setSaved(!saved);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: result.recipe.image }} />
      <View style={styles.recipeDescription}>
        <Text style={styles.name}>{result.recipe.title}</Text>
        <TouchableOpacity activeOpacity={1} onPress={youClickedMe}>
          <AnimatedHeart
            ref={handleSmallAnimatedIconRef}
            name={saved ? 'heart' : 'hearto'}
            color={saved ? colors.heartColor : colors.black}
            size={25}
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
const styles = StyleSheet.create({
  image: {
    width: width * 0.53,
    height: height * 0.25,
    resizeMode: 'stretch',
    borderRadius: 4,
    marginBottom: 5,
  },
  recipeDescription: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: width * 0.55,
    marginRight: '3%',
  },
  icon: {
    marginLeft: 10,
  },
  name: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
    fontSize: 17,
    flexShrink: 1,
  },
  container: {
    margin: 15,
    borderBottomWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    flexGrow: 1,
    width: width * 0.55,
  },
});

export default RecipeDetail;
