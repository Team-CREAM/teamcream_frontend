import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import TopMenu from '../components/TopMenu';
import AddIngredientBar from '../components/AddIngredientBar';
import BottomMenu from '../components/BottomMenu';

class Inventory extends Component {
  constructor(props) {
    console.log(props.navigation.getParam('token'));
    super(props);
    this.addIngredient = this.addIngredient.bind(this);
    this.state = {
      arr: [],
      query: '',
      selected: '',
    };
  }

  deleteElement(key) {
    const arr2 = [...this.state.arr];
    arr2.splice(key, 1);
    this.setState({ arr: arr2 });
  }

  async componentDidMount() {
    const bye = axios.create({
      baseURL: 'http://10.0.2.2:3000',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmJjNjk0NjMxNzY4YzU5ZDgyNDk5YjgiLCJpYXQiOjE2MDYxODMyMzh9.r6EQGCCKFhyq6J2nCJ-v80ewUb50AYfuBo58EB_s0No',
      },
    });

    const hi = await bye.get('/allIngredients');
    this.setState({ ingredients: hi.data });
    // console.log(this.state);
    // const current = await bye.get('/inventory');

    // const hi = await axios.get('http://10.0.2.2:3000/allIngredients', {
    //   header: {
    //     'Content-Type': 'application/json',
    //     Authorization:
    //       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmJjNjk0NjMxNzY4YzU5ZDgyNDk5YjgiLCJpYXQiOjE2MDYxODMyMzh9.r6EQGCCKFhyq6J2nCJ-v80ewUb50AYfuBo58EB_s0No',
    //   },
    // });
    // console.log(current.data);
  }

  addIngredient(name) {
    const arr2 = [...this.state.arr];
    arr2.push({ name });
    this.setState({ arr: arr2 });
  }

  render() {
    const dimensions = Dimensions.get('window');
    const { width } = dimensions;
    const { height } = dimensions;

    const styles = StyleSheet.create({
      box: {
        maxHeight: height * 0.5,
        borderWidth: 2,
        marginHorizontal: width * 0.1,
        borderRadius: 5,
        marginTop: 10,
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
        minHeight: Math.round(Dimensions.get('window').height),
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
        paddingVertical: '0.5%',
        paddingHorizontal: '2%',
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
      backgroundStyle: {
        height: height * 0.04,

        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        margin: height * 0.04,
      },
      autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
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
    return (
      <View style={styles.container}>
        {/* Search in Pantry */}

        <TopMenu title="Inventory" />
        {/* <SearchIngredient /> */}
        <View
          style={{
            position: 'relative',
          }}>
          <AddIngredientBar data={this.state.ingredients} addIngredient={this.addIngredient} />
        </View>
        <View style={styles.box}>
          <Text style={styles.pantryText}>Your Pantry</Text>
          <Text style={styles.numIngred}>
            {/* need to change this to the array length that gets from axios request8 */}
            {this.state.arr.length} ingredients
          </Text>
          <View style={styles.lineLine}>
            <View style={styles.line} />
          </View>

          {this.state.arr.length === 0 ? (
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
                {this.state.arr.map((item, key) => (
                  <View key={key} style={styles.itemBox}>
                    <Feather
                      style={styles.iconStyle}
                      name="minus"
                      onPress={(key) => this.deleteElement(key)}
                    />
                    <Text>{item.name}</Text>
                  </View>
                ))}
              </ScrollView>
            </ScrollView>
          )}
        </View>

        <KeyboardAvoidingView style={styles.bottomMenu}>
          <BottomMenu />
        </KeyboardAvoidingView>
      </View>
    );
  }
}
export default Inventory;
