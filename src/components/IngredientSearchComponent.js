import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Autocomplete from 'react-native-autocomplete-input';
import { useDispatch, useSelector } from 'react-redux';
import { addPantryItem, removePantryItem } from '../actions/actionInventory';

const { width, height } = Dimensions.get('window');

// const AddIngredientBar = ({ ingredientRedux, addIngredient, save, deleteIngredient }) => {
const AddIngredientBar = ({ save, setRefresh }) => {
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const ingredientsRedux = useSelector((state) => state.inventoryReducer.ingredients);
  const pantryRedux = useSelector((state) => state.inventoryReducer.pantry);
  const dispatch = useDispatch();

  const filterIngred = (value) => {
    if (value) {
      const regex = new RegExp(`${value.trim()}`, 'i');
      setFilteredIngredients(ingredientsRedux.filter((item) => item.name.search(regex) >= 0));
    } else {
      setFilteredIngredients([]);
    }
  };
  const deleteIngredient = (key) => {
    // const arr2 = [...arr];
    // arr2.splice(key, 1);
    // setArr(arr2);
    console.log(pantryRedux[key]);
    dispatch(removePantryItem(pantryRedux[key]));
    setRefresh(true);
  };
  const addIngredient = (name) => {
    // const arr2 = [...arr];
    // arr2.push({ name });
    // setArr(arr2);
    dispatch(addPantryItem({ name }));
    setRefresh(true);
  };
  return (
    <View style={styles.backgroundStyle}>
      <Autocomplete
        containerStyle={{
          flex: 1,
          marginHorizontal: '7%',
        }}
        inputContainerStyle={{
          borderWidth: 2,
          borderColor: 'grey',
          borderRadius: 3,
        }}
        listStyle={{ maxHeight: height * 0.2, marginHorizontal: width * 0.015, zIndex: 1 }}
        data={filteredIngredients}
        defaultValue={selectedValue}
        onChangeText={(change) => {
          setSelectedValue(change);
          filterIngred(change);
        }}
        placeholder="   add your ingredient"
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                borderWidth: 0.4,
              }}
              onPress={() => {
                if (save.includes(item.name)) {
                  console.log('This is pantryRedux ', pantryRedux);
                  console.log({ name: item.name });
                  // const index = userData.indexOf({ name: item.name });
                  const index = pantryRedux.findIndex((p) => p.name === item.name);
                  console.log('This is index', index);
                  deleteIngredient(index);
                  setFilteredIngredients([]);
                  setSelectedValue('');
                } else {
                  addIngredient(item.name);
                  setFilteredIngredients([]);
                  setSelectedValue('');
                }
              }}>
              <Feather
                name={save.includes(item.name) ? 'check' : 'plus'}
                size={24}
                color={save.includes(item.name) ? 'green' : 'black'}
              />
              <Text
                style={{
                  color: save.includes(item.name) ? 'green' : 'black',
                  marginTop: 1.8,
                  marginLeft: 10,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <Feather
        style={{ marginTop: height * 0.01, position: 'absolute', right: '10%', zIndex: 1 }}
        name="x"
        size={24}
        color="#000000"
        onPress={() => {
          setSelectedValue('');
          setFilteredIngredients([]);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    zIndex: 1,
  },

  inputStyle1: {
    flex: 1,
    fontSize: 14,
    color: '#A79B9B',
  },
  iconStyle1: {
    fontSize: 24,
    alignSelf: 'center',
    color: '#A79B9B',
    marginHorizontal: width * 0.01,
  },
});

export default AddIngredientBar;
