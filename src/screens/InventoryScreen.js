import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import TopMenu from '../components/TopMenuComponent';
import AddIngredientBar from '../components/IngredientSearchComponent';
import BottomMenu from '../components/BottomMenuComponent';
import axiosWithToken from '../api/axiosWithToken';
import ProfileModal from '../components/ProfileComponent';
import { storeIngredients, addPantryItem, removePantryItem } from '../actions/actionInventory';

const { width, height } = Dimensions.get('window');

const Inventory = () => {
  const [save, setSave] = useState(false);
  const [proflileModalVisible, setProfileModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const ingredientsRedux = useSelector((state) => state.inventoryReducer.ingredients);
  const pantryRedux = useSelector((state) => state.inventoryReducer.pantry);
  const dispatch = useDispatch();

  useEffect(() => {
    const getIngred = async () => {
      setLoading(true);
      const axiosInstance = await axiosWithToken();
      if (ingredientsRedux.length === 0) {
        const responseIngredients = await axiosInstance.get('/allIngredients');
        dispatch(storeIngredients(responseIngredients.data));
      }
      if (pantryRedux.length === 0) {
        const responseInventory = await axiosInstance.get('/inventory');
        responseInventory.data.map((item) => dispatch(addPantryItem({ name: item.name })));
      }
      setLoading(false);
    };
    getIngred();
    return;
  }, []);

  return (
    <SafeAreaView style={styles.somecontainer}>
      <StatusBar barstyle="light-content" />
      {/* Search in Pantry */}
      <View style={styles.container}>
        <TopMenu title="Inventory" profileIcon onProfilePress={setProfileModalVisible} />
        {/* <SearchIngredient /> */}
        {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}

        {loading ? null : (
          <View>
            <View style={{ zIndex: 1, marginTop: '10%', marginBottom: '7%' }}>
              <AddIngredientBar save={pantryRedux.map((i) => i.name)} setRefresh={setSave} />
            </View>

            <View style={styles.box}>
              {proflileModalVisible === true ? (
                <ProfileModal isVisible={setProfileModalVisible} />
              ) : null}
              <Text style={styles.pantryText}>Your Pantry</Text>
              <Text style={styles.numIngred}>
                {/* need to change this to the array length that gets from axios request8 */}
                {pantryRedux.length} ingredients
              </Text>
              <View style={styles.lineLine}>
                <View style={styles.line} />
              </View>

              {pantryRedux.length === 0 ? (
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
                    {pantryRedux.map((item, num) => (
                      <View key={item.name} style={styles.itemBox}>
                        <Feather
                          style={styles.iconStyle}
                          name="minus"
                          onPress={() => {
                            dispatch(removePantryItem(pantryRedux[num]));
                          }}
                        />
                        <Text>{item.name}</Text>
                      </View>
                    ))}
                  </ScrollView>
                </ScrollView>
              )}
            </View>
          </View>
        )}
      </View>
      <KeyboardAvoidingView style={styles.bottomMenu}>
        <BottomMenu save={save} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  somecontainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  box: {
    maxHeight: height * 0.5,
    borderWidth: 2,
    marginHorizontal: width * 0.07,
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
    minHeight: Math.round(height),
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
    paddingVertical: '0.3%',
    paddingHorizontal: '2%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
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
