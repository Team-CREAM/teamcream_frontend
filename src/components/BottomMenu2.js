import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const BottomMenu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('RecipeScreen')}>
        <Entypo name="open-book" size={24} color="black" />
        <Text style={styles.menuItemText}>Saved Recipes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
        <Entypo name="circle" size={24} color="black" />
        <Text style={styles.menuItemText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
        <MaterialCommunityIcons name="fridge-outline" size={24} color="black" />
        <Text style={styles.menuItemText}>Inventory</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
        <Feather style={styles.iconStyle} name="search" size={24} color="black" />
        <Text style={styles.menuItemText}>Search</Text>
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
  },
});

export default withNavigation(BottomMenu);
