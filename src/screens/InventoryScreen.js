import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ListView,
  FlexBox,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import TopMenu from '../components/TopMenu';
import AddIngredientBar from '../components/AddIngredientBar';
import BottomMenu from '../components/BottomMenu';
import axiosWithToken from '../api/axiosWithToken';

const { width, height } = Dimensions.get('window');

const Inventory = () => {
  const [term, setTerm] = useState('');
  const [onTermChange, setOntermChange] = useState('');
  const [arr, setArr] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [save, setSave] = useState(false);

  useEffect(() => {
    setTerm('hello');
    const getIngred = async () => {
      const axiosInstance = await axiosWithToken();
      const responseIngredients = await axiosInstance.get('/allIngredients');
      const responseInventory = await axiosInstance.get('/inventory');
      const newInventory = responseInventory.data.map((item) => ({ name: item }));
      setIngredients(responseIngredients.data);
      setArr(newInventory); // TODO: set to responseInventory when Reshma finishes
    };
    getIngred();
    return () => {
      console.log('bye');
    };
  }, []);

  const deleteElement = (key) => {
    const arr2 = [...arr];
    arr2.splice(key, 1);
    setArr(arr2);
    setSave(true);
  };
  const addIngredient = (name) => {
    const arr2 = [...arr];
    arr2.push({ name });
    setArr(arr2);
    setSave(true);
  };

  return (
    <View style={styles.container}>
      {/* Search in Pantry */}

      <TopMenu title="Inventory" />
      {/* <SearchIngredient /> */}

      <AddIngredientBar data={ingredients} addIngredient={addIngredient} />
      <View style={styles.box}>
        <Text style={styles.pantryText}>Your Pantry</Text>
        <Text style={styles.numIngred}>
          {/* need to change this to the array length that gets from axios request8 */}
          {arr.length} ingredients
        </Text>
        <View style={styles.lineLine}>
          <View style={styles.line} />
        </View>

        {arr.length === 0 ? (
          <Text style={{ textAlign: 'center', paddingVertical: 10 }}>
            Your Ingredients will be here
          </Text>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <ScrollView
              horizontal
              bounces={false}
              style={{ marginVertical: height * 0.01, marginHorizontal: width * 0.07 }}
              contentContainerStyle={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              {arr.map((item, key) => (
                <View key={key} style={styles.itemBox}>
                  <Feather
                    style={styles.iconStyle}
                    name="minus"
                    onPress={(key) => deleteElement(key)}
                  />
                  <Text>{item.name}</Text>
                </View>
              ))}
            </ScrollView>
          </ScrollView>
        )}
      </View>

      <View style={styles.bottomMenu}>
        <BottomMenu data={arr} save={save} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    maxHeight: height * 0.5,
    borderWidth: 2,
    marginHorizontal: width * 0.1,
    borderRadius: 5,
  },
  pantryText: {
    marginLeft: width * 0.05,
    marginTop: height * 0.015,
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  numIngred: {
    marginLeft: width * 0.05,
    fontSize: width * 0.03,
    fontWeight: '300',
  },
  container: {
    flex: 1,
    backgroundColor: '#FEF4D1',
  },
  lineLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  line: {
    flex: 1,
    height: height * 0.003,
    backgroundColor: 'black',
  },
  itemBox: {
    backgroundColor: '#D9B580',
    padding: '0.3%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    marginHorizontal: 3,
    marginVertical: 5,
  },
  itemBox1: {
    backgroundColor: '#ffffff',
    padding: '0.3%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    marginHorizontal: 3,
    marginVertical: 5,
  },
  inputStyle: {
    flex: 1,
    fontSize: 14,
  },
  iconStyle: {
    fontSize: 16,
    alignSelf: 'center',
    marginHorizontal: width * 0.01,
  },
  marginTop: {
    marginTop: 10,
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
  },
});
export default Inventory;
