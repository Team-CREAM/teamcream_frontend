import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Text,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipeDetail from '../components/RecipeDetail_R';
import BottomMenu from '../components/BottomMenu';
import TopMenu from '../components/TopMenu';
import axiosWithToken from '../api/axiosWithToken';
import { addSavedRecipe } from '../actions/savedRecipes';
import ProfileModal from '../components/ProfileModal';

const { height } = Dimensions.get('window');

const SavedRecipeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [proflileModalVisible, setProfileModalVisible] = useState(false);
  const reducerList = useSelector((state) => state.savedRecipeReducer.savedRecipeList);

  useEffect(() => {
    if (reducerList.length === 0) {
      console.log('hello');
      const receiveSavedRecipes = async () => {
        console.log('did the axios request');
        setLoading(true);
        const axiosInstance = await axiosWithToken();
        const response = await axiosInstance.get('/savedRecipes');
        const list = response.data.map(({ id, title, imageUrl }) => ({
          id,
          name: title,
          image: imageUrl,
        }));
        const storeInReducer = response.data.map(({ id, title, imageUrl }) =>
          dispatch(addSavedRecipe({ _id: id, title, image: imageUrl })),
        );
        setLoading(false);

        setRecipes(list);
      };
      receiveSavedRecipes();
    }
    setRecipes(reducerList);
  }, [reducerList]);

  // checks to see if user has saved recipe, conditional render
  const HasSavedRecipes = () => {
    if (recipes.length > 0) {
      return (
        <FlatList
          data={recipes}
          keyExtractor={(result) => result.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RecipeScreen', {
                    id: item.id,
                    previousScreen: 'SavedRecipeScreen',
                  })
                }>
                <RecipeDetail result={item} />
              </TouchableOpacity>
            );
          }}
        />
      );
    }
    if (!loading) {
      return <Text style={styles.noRecipe}>No Saved Recipes</Text>;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.somecontainer}>
      <StatusBar barstyle="light-content" />

      <View style={styles.container}>
        <TopMenu title="Saved Recipes" profileIcon onProfilePress={setProfileModalVisible} />
        {proflileModalVisible === true ? <ProfileModal isVisible={setProfileModalVisible} /> : null}
        <View style={styles.marginTop}>
          {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
          <HasSavedRecipes />
        </View>
      </View>
      <View style={styles.bottomMenu}>
        <BottomMenu />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  somecontainer: {
    flex: 1,
    backgroundColor: 'black',
    // paddingBottom: height * 0.17,
  },
  container: {
    flex: 1,
    backgroundColor: '#FEF4D1',
    paddingBottom: height * 0.17,
  },
  marginTop: {
    marginTop: 10,
    alignItems: 'center',
  },
  noRecipe: {},
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
  },
});

export default SavedRecipeScreen;
