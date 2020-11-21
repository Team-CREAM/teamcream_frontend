import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomMenu from '../components/BottomMenu2';
import retrieveRecipes from '../hooks/retrieveRecipes';

const RecipeScreen = () => {
  const [searchApi, results, errorMessage] = retrieveRecipes();
  console.log(results);
  return (
    <View style={styles.container}>
      <View />
      <View style={styles.bottomMenu}>
        <BottomMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
  },
});

export default RecipeScreen;
