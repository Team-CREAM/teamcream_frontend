import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import TopMenu from '../components/TopMenu';
import BottomMenu from '../components/BottomMenu2';
import useRecipes from '../hooks/useRecipes';
import axiosWithToken from '../api/axiosWithToken';

const { width, height } = Dimensions.get('window');

const ExploreScreen = () => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage] = useRecipes();
  const [token, setToken] = useState('');
  const [result, setResult] = useState(['hello', 'goodbye']);

  const filterList = (results) => {
    return results;
  };

  useEffect(() => {
    const testing = async () => {
      try {
        try {
          const value = await AsyncStorage.getItem('@token');
          setToken(value);
        } catch (e) {
          // error reading value
          console.log('error getting value');
        }

        // console.log('gaergaer');
        // const response = await axiosWithToken.get('/home').then(({ data }) => {
        //   console.log('here');
        //   setResult(data['popular recipes']);
        // });

        // console.log(response);

        const response = axios
          .create({
            baseURL: 'http://10.0.2.2:3000',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          .get('/home')
          .then(({ data }) => {
            setResult(data['popular recipes']);
          });
      } catch (err) {}
    };

    testing();
  }, []);

  return (
    <View style={styles.container}>
      <TopMenu
        // title="Home"
        searchbar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => searchApi(term)}
      />
      <View>
        <FlatList
          columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 2, marginHorizontal: 2 }}
          data={result}
          numColumns={3}
          keyExtractor={(result) => result.id}
          renderItem={({ item, index }) => (
            <View
              style={[
                { width: width / 3 - 2 },
                { height: width / 3 - 2 },
                index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 },
              ]}>
              <Image
                style={{ flex: 1, width: undefined, height: undefined }}
                source={{ uri: item.image }}
              />
            </View>
          )}
        />
      </View>
      <View style={styles.bottomMenu}>
        <BottomMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF4D1',
    paddingBottom: height * 0.17,
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
  },
});

export default ExploreScreen;
