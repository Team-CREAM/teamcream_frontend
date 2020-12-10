import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import axiosWithToken from '../api/axiosWithToken';
import { removeSavedRecipe } from '../actions/actionSavedRecipes';

const { width, height } = Dimensions.get('window');

const RecipeDetail = ({ result }) => {
  const dispatch = useDispatch();

  const clickedHeart = async () => {
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
        <TouchableOpacity onPress={() => clickedHeart()}>
          <AntDesign name="heart" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
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
    fontFamily: 'roboto-regular',
    fontSize: 15,
  },
});

export default RecipeDetail;
