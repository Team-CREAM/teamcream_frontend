import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Autocomplete from 'react-native-autocomplete-input';

const { width, height } = Dimensions.get('window');

const AddIngredientBar = ({ data, addIngredient, save }) => {
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [show, setShow] = useState(false);

  const filterIngred = (value) => {
    if (value) {
      const regex = new RegExp(`${value.trim()}`, 'i');
      setFilteredIngredients(data.filter((item) => item.name.search(regex) >= 0));
      // setFilteredIngredients(
      //   data.filter((item) => {
      //     return item.name.toLowerCase().includes(value) || item.name.toLowerCase().includes(value);
      //   }),
      // );
    } else {
      setFilteredIngredients([]);
    }
  };

  return (
    <View style={styles.backgroundStyle}>
      <Autocomplete
        containerStyle={{
          position: 'relative',
          // top: '20%',
          // backgroundColor: 'purple',
        }}
        inputContainerStyle={{
          borderWidth: 2,
          borderColor: 'grey',
          borderRadius: 3,
          backgroundColor: 'red',
          shadowColor: 'red',
        }}
        listStyle={{ maxHeight: height * 0.2, marginHorizontal: width * 0.015 }}
        // listContainerStyle={{ backgroundColor: 'blue' }}
        data={filteredIngredients}
        defaultValue={selectedValue}
        onChangeText={(change) => {
          // setShow(false);
          setSelectedValue(change);
          filterIngred(change);
        }}
        placeholder="   add your ingredient"
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          // console.log(save.includes({ name: item.name }));
          // console.log({ name: item.name } === save[0]);
          // console.log(save[0]);
          // console.log(save);
          return (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                borderWidth: 0.4,
                // backgroundColor: save.includes(item.name) ? 'green' : 'white',
                // backgroundColor: save.length !== 0 ? 'red' : 'green',
              }}
              onPress={() => {
                if (save.includes(item.name)) {
                  Alert.alert('Oops!', 'Ingredient Already in Inventory');
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
        style={{ marginTop: height * 0.01, position: 'absolute', right: 10 }}
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
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    // alignItems: 'center',
    margin: height * 0.04,
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
