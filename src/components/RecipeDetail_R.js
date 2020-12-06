import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import heartIcon from 'react-native-vector-icons/AntDesign';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import axiosWithToken from '../api/axiosWithToken';
import { removeSavedRecipe } from '../actions/savedRecipes';

const { width, height } = Dimensions.get('window');

// const RecipeDetail = ({ result, savedRecipes, recipes, refresh, hi }) => {
const RecipeDetail = ({ result }) => {
  const dispatch = useDispatch();
  const [liked, toggleLike] = useState(true);
  const [recipe, setRecipe] = useState('');

  const youClickedMe = async () => {
    dispatch(removeSavedRecipe(result.id));
    const axiosInstance = await axiosWithToken();
    const response = await axiosInstance.post('./savedRecipes', {
      recipe: result.id,
      add: false,
    });
  };

  return (
    <View style={difStyles.container}>
      {result.image ? <Image style={difStyles.image} source={{ uri: result.image }} /> : null}
      <View style={difStyles.recipeDescription}>
        <Text style={difStyles.name}>{result.name}</Text>
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
    height: height * 0.3,
    resizeMode: 'stretch',
    borderRadius: 4,
    marginBottom: 5,
    borderColor: 'black',
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
    fontFamily: 'Roboto-regular',
    fontSize: 15,
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
