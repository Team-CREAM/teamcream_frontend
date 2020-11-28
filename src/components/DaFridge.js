import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const fridge = ({ inventory, recipe }) => {
  const compare = ({ inventory, recipe }) => {
    const difference = inventory.length - recipe.length;
    if (difference < 0) {
      return (
        <View style={[styles.circle, styles.warning]}>
          <Text>{Math.abs(difference)}</Text>
        </View>
      );
    }
    // In case we want to attain the missing ingredients
    // const missingIng = recipe.filter((ingredient) => {
    //   return !inventory.has(ingredient);
    // });
    return <View style={[styles.circle, styles.good]} />;
  };

  return (
    <View>
      <MaterialCommunityIcons name="fridge" size={30} color="black" />
    </View>
  );
};
const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  warning: {
    backgroundColor: 'red',
  },
  good: {
    backgroundColor: 'green',
  },
});

export default fridge;
