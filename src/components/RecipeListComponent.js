import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import RecipeDetail from './HomeRecipeDetailComponent';

const RecipeList = ({ title, results, navigation }) => {
  if (results) {
    for (let i = 0; i < results.length; ++i) {
      try {
        const temp = results[i].recipe._id;
      } catch {
        results.splice(i, 1);
      }
    }
    // return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={(result) => result.recipe._id} // CHANGE TO RESULT.RECIPE.ID
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RecipeScreen', {
                  id: item.recipe._id,
                  previousScreen: 'Home',
                })
              }>
              <RecipeDetail result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
  },
  container: {
    marginBottom: 15,
  },
});

export default withNavigation(RecipeList);
