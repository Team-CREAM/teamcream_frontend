import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { RFPercentage } from 'react-native-responsive-fontsize';
import axiosWithToken from '../api/axiosWithToken';

const { width, height } = Dimensions.get('window');

const BottomMenu = ({ navigation, data, save }) => {
  const { routeName } = navigation.state;

  const saveInventory = async () => {
    const revisedData = data.map((item) => item.name);
    const axiosInstance = await axiosWithToken();
    const response = await axiosInstance
      .post('/inventory', { ingredients: revisedData })
      .then((res) => {
        console.log('inventory updated');
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          if (save) {
            saveInventory();
          }
          navigation.replace('SavedRecipeScreen');
        }}>
        <Entypo
          name="open-book"
          size={24}
          color={routeName === 'SavedRecipeScreen' ? 'white' : 'black'}
        />
        <Text
          style={
            routeName === 'SavedRecipeScreen' ? styles.menuItemTextScreen : styles.menuItemText
          }>
          Saved Recipes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          if (save) {
            saveInventory();
          }
          navigation.replace('Home');
        }}>
        <Entypo name="circle" size={24} color={routeName === 'Home' ? 'white' : 'black'} />
        <Text style={routeName === 'Home' ? styles.menuItemTextScreen : styles.menuItemText}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.replace('Inventory')}>
        <MaterialCommunityIcons
          name="fridge-outline"
          size={24}
          color={routeName === 'Inventory' ? 'white' : 'black'}
        />
        <Text style={routeName === 'Inventory' ? styles.menuItemTextScreen : styles.menuItemText}>
          Inventory
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          if (save) {
            saveInventory();
          }
          navigation.replace('Explore');
        }}>
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
