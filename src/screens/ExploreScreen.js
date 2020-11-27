import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import TopMenu from '../components/TopMenu';
import BottomMenu from '../components/BottomMenu2';

import useRecipes from '../hooks/useRecipes';

const { width, height } = Dimensions.get('window');

const ExploreScreen = () => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage] = useRecipes();

  const filterList = (results) => {
    return results;
  };

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
          data={filterList(results)}
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
                source={{ uri: item.image_url }}
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
