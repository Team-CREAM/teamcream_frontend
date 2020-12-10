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
  TouchableOpacity,
  Button,
} from 'react-native';
import { FontAwesome, AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addSavedRecipe, removeSavedRecipe } from '../actions/savedRecipes';
import axiosWithToken from '../api/axiosWithToken';

const { width, height } = Dimensions.get('window');

const RecipeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { id, previousScreen } = navigation.state.params;
  const [recipe, setRecipe] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const getRecipe = async () => {
      const axiosInstance = await axiosWithToken();
      const response = await axiosInstance.post('/recipeClicked', {
        recipe: id,
      });
      setRecipe(response.data.Recipe);
      setSaved(response.data.saved);
    };
    getRecipe();
  }, []);

  const clickedHeart = async () => {
    if (!saved) {
      setSaved(!saved);
      dispatch(addSavedRecipe(recipe));
      const axiosInstance = await axiosWithToken();
      const response = await axiosInstance.post('./savedRecipes', {
        recipe,
        add: true,
      });
      console.log(response.data.message);
    } else {
      setSaved(!saved);
      dispatch(removeSavedRecipe(recipe._id));
      const axiosInstance = await axiosWithToken();
      const response = await axiosInstance.post('./savedRecipes', {
        recipe,
        add: false,
      });
      console.log(response.data.message);
    }
  };

  const goBack = () => {
    if (previousScreen === 'Explore') {
      navigation.goBack();
    }
    if (previousScreen === 'Home') {
      navigation.goBack();
    }
    if (previousScreen === 'SavedRecipeScreen') {
      navigation.goBack();
    } else {
      navigation.replace(previousScreen);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barstyle="light-content" />
      <View
        style={{
          paddingBottom: 10,
          zIndex: 1,
          width,
          backgroundColor: '#FEF4D1',
        }}>
        <Ionicons
          name="md-arrow-round-back"
          size={35}
          color="black"
          style={{ marginLeft: 10, fontWeight: 'bold' }}
          onPress={() => {
            goBack();
          }}
        />
      </View>

      <StatusBar barstyle="light-content" />
      {recipe ? (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.topBar}>
            <Text style={styles.title}> {recipe.title} </Text>
            {saved ? (
              <TouchableOpacity onPress={() => clickedHeart()}>
                <AntDesign name="heart" size={24} color="red" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => clickedHeart()}>
                <AntDesign name="hearto" size={24} color="black" />
              </TouchableOpacity>
            )}
            <View style={styles.titleDescription}>
              <Text>Prep Time: </Text>
              <Text>{recipe.readyinMinutes}</Text>
              <Text> Minutes </Text>
              <FontAwesome name="circle" size={10} color="black" />
              <Text> Servings: </Text>
              <Text>{recipe.servings} </Text>
              <FontAwesome name="circle" size={10} color="black" />
              <Text> Likes: </Text>
              <Text>{recipe.aggregateLikes}</Text>
            </View>
            <View style={styles.lineContainer}>
              <View style={styles.lineStyle} />
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Image style={styles.image} source={{ uri: recipe.image }} />
          </View>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.lineContainer}>
              <View style={styles.lineStyle} />
            </View>
          </View>
          <View style={styles.parentInstructions}>
            {recipe.extendedIngredients ? (
              <View style={styles.ingredients}>
                <Text style={styles.header}>Ingredients</Text>
                <FlatList
                  data={recipe.extendedIngredients}
                  renderItem={({ item }) => (
                    <View
                      key={item.id}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Entypo name="dot-single" size={24} color="black" style={{ marginTop: 1 }} />
                      <Text>{item.name}</Text>
                    </View>
                  )}
                />
              </View>
            ) : null}

            {recipe.analyzedInstructions[0] ? (
              <View style={styles.instructions}>
                <View style={{ marginLeft: '10%' }}>
                  <Text style={styles.header}>Instructions</Text>
                  <FlatList
                    data={recipe.analyzedInstructions[0].steps}
                    renderItem={({ item }) => (
                      <View
                        key={item.number}
                        style={{ flexDirection: 'row', paddingRight: width * 0.2 }}>
                        <Text>{`${item.number}. `}</Text>
                        <Text>
                          {item.step}
                          {'\n'}
                        </Text>
                      </View>
                    )}
                  />
                </View>
              </View>
            ) : null}
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF4D1',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: '20%',
    paddingTop: 20,
  },
  topBar: {
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: width * 0.8,
    height: height * 0.3,
    borderRadius: 4,
    justifyContent: 'center',
    borderColor: 'black',
    resizeMode: 'stretch',
  },
  parentInstructions: {
    flex: 1,
    alignItems: 'flex-start',
  },
  ingredients: {
    width: '100%',
    marginHorizontal: '10%',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  instructions: {
    flexWrap: 'wrap',
    width,
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
  header: { fontWeight: 'bold', fontSize: 16, marginBottom: 0 },
});

export default RecipeScreen;
