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
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { HeaderBackButton } from 'react-navigation-stack';
import HTML from 'react-native-render-html';
import { FontAwesome, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { addSavedRecipe, removeSavedRecipe } from '../actions/savedRecipes';
import BottomMenu from '../components/BottomMenu';
import axiosWithToken from '../api/axiosWithToken';

// import retrieveRecipes from '../hooks/retrieveRecipes';

const { width, height } = Dimensions.get('window');

const RecipeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  //   const [results, errorMessage] = retrieveRecipes();
  const { id } = navigation.state.params;
  // const [value, setValue] = useState('');
  const [recipe, setRecipe] = useState('');
  const [saved, setSaved] = useState(false);

  // TODO call axios request
  useEffect(() => {
    const getRecipe = async () => {
      // setLoading(true);
      const axiosInstance = await axiosWithToken();
      const response = await axiosInstance.post('./recipeClicked', {
        recipe: id,
      });
      console.log(response.data.saved);
      console.log(response.data);
      // console.log(response.data.Recipe);
      setRecipe(response.data.Recipe);
      setSaved(response.data.saved);
      // setLoading(false);
    };
    // setValue(val);
    getRecipe();
  }, []);
  // const savedR = useSelector((state) => state.savedRecipeReducer.savedRecipeList);
  // // console.log(list);
  // if (savedR.length > 0) {
  //   if (savedR.includes((r) => r.key === result.recipe._id)) {
  //     // saved = true;
  //   } else {
  //     // saved = false;
  //   }
  // }

  // useEffect(() => {
  //   ({ navigation }) => ({
  //     headerLeft: <HeaderBackButton onPress={() => navigation.replace('SavedRecipeScreen')} />,
  //   });
  // }, [navigation, value]);

  const youClickedMe = async () => {
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

  return (
    <View style={styles.container}>
      {recipe ? (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* Area for title */}
          <View style={styles.topBar}>
            {/* Title Goes Here */}
            <Text style={styles.title}> {recipe.title} </Text>
            {saved ? (
              <TouchableOpacity onPress={() => youClickedMe()}>
                <AntDesign name="heart" size={24} color="red" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => youClickedMe()}>
                <AntDesign name="hearto" size={24} color="black" />
              </TouchableOpacity>
            )}
            {/* Prep Time, Servings, and Likes Go Here */}
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
            {/* Dividing Line Goes Here */}
            <View style={styles.lineContainer}>
              <View style={styles.lineStyle} />
            </View>
          </View>

          {/* The recipe image */}
          <View style={{ alignItems: 'center' }}>
            <Image style={styles.image} source={{ uri: recipe.image }} />
          </View>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.lineContainer}>
              <View style={styles.lineStyle} />
            </View>
          </View>
          {/* Area for the ingredients */}
          <View style={styles.parentInstructions}>
            {recipe.extendedIngredients ? (
              <View style={styles.ingredients}>
                <Text style={styles.header}>Ingredients</Text>
                <FlatList
                  data={recipe.extendedIngredients}
                  renderItem={({ item }) => (
                    <View key={item.id} style={{ flexDirection: 'row' }}>
                      <Text>{'\u25AA '}</Text>
                      <Text>
                        {item.name}
                        {'\n'}
                      </Text>
                    </View>
                  )}
                />
              </View>
            ) : null}

            {/* Area for the instructions */}
            {recipe.analyzedInstructions[0] ? (
              <View style={styles.instructions}>
                <Text style={styles.header}>Instructions</Text>
                <FlatList
                  data={recipe.analyzedInstructions[0].steps}
                  renderItem={({ item }) => (
                    <View
                      key={item.number}
                      style={{ flexDirection: 'row', paddingRight: width * 0.1 }}>
                      <Text>{`${item.number}.`}</Text>
                      <Text>
                        {item.step}
                        {'\n'}
                      </Text>
                    </View>
                  )}
                />
              </View>
            ) : null}

            {/* <HTML html={recipe.instructions} imagesMaxWidth={Dimensions.get('window').width} /> */}
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF4D1',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // paddingBottom: height * 0.17,
  },
  scrollView: {
    marginHorizontal: '5%',
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: '20%',
  },
  topBar: {
    // marginTop: height * 0.01,
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
    alignItems: 'flex-start', // if you want to fill rows left to right
  },
  ingredients: {
    width: '40%',
    marginRight: '10%',
    alignItems: 'flex-start',
  },
  instructions: { flexWrap: 'wrap' },
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
  header: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
});

export default RecipeScreen;
