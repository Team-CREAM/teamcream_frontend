import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const BottomMenu = ({ navigation }) => {
  const { routeName } = navigation.state;
  // console.log(routeName);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('SavedRecipeScreen')}>
        <Entypo
          name="open-book"
          size={24}
          color={routeName === 'RecipeScreen' ? 'white' : 'black'}
        />
        <Text
          style={routeName === 'RecipeScreen' ? styles.menuItemTextScreen : styles.menuItemText}>
          Saved Recipes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
        <Entypo name="circle" size={24} color={routeName === 'Home' ? 'white' : 'black'} />
        <Text style={routeName === 'Home' ? styles.menuItemTextScreen : styles.menuItemText}>
          Home
        </Text>
      </TouchableOpacity>
      {/* TODO: Change This to Inventory */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Inventory')}>
        <MaterialCommunityIcons
          name="fridge-outline"
          size={24}
          color={routeName === 'Inventory' ? 'white' : 'black'}
        />
        <Text style={routeName === 'Inventory' ? styles.menuItemTextScreen : styles.menuItemText}>
          Inventory
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Explore')}>
        <Feather
          style={styles.iconStyle}
          name="search"
          size={24}
          color={routeName === 'Explore' ? 'white' : 'black'}
        />
        <Text style={routeName === 'Explore' ? styles.menuItemTextScreen : styles.menuItemText}>
          Explore
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: height * 0.07,
    backgroundColor: '#D9B580',
    paddingHorizontal: '10%',
  },
  menuItem: {
    width: width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: RFPercentage(1.55),
    color: 'black',
  },
  menuItemTextScreen: {
    fontSize: RFPercentage(1.55),
    color: 'white',
  },
});

export default withNavigation(BottomMenu);
