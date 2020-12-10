import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import RecipeDetail from './RecipeDetail_home';

const RecipeList = ({ title, results, navigation }) => {
  if (!results) {
    console.log(results);
    return null;
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
