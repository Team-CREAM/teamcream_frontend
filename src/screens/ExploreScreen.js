import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import TopMenu from '../components/TopMenuComponent';
import BottomMenu from '../components/BottomMenuComponent';
import useExplore from '../hooks/useExplore';
import ProfileModal from '../components/ProfileComponent';
import ExploreModelComponent from '../components/ExploreModalComponent';

const { width } = Dimensions.get('window');

const ExploreScreen = ({ navigation }) => {
  const [exploreSearch, searchResults, errMsg, loading] = useExplore();

  const [term, setTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [proflileModalVisible, setProfileModalVisible] = useState(false);

  // Filtering
  const [veryHealthy, setVeryHealthy] = useState(
    useSelector((state) => state.exploreReducer.healthy),
  );
  const [veryPopular, setVeryPopular] = useState(
    useSelector((state) => state.exploreReducer.popular),
  );
  const [inventory, setInventory] = useState(
    useSelector((state) => state.exploreReducer.inventory),
  );

  const searchResults2 = useSelector((state) => state.exploreReducer.recipes);

  const filterOptions = (results) => {
    setModalVisible(true);
    return results;
  };

  return (
    <SafeAreaView style={styles.somecontainer}>
      <StatusBar barstyle="light-content" />
      <View style={styles.container}>
        <TopMenu
          profileIcon
          onProfilePress={setProfileModalVisible}
          searchbar
          term={term}
          onTermChange={(newTerm) => setTerm(newTerm)}
          onTermSubmit={() => exploreSearch(term, veryHealthy, veryPopular, inventory, false)}
          onFilterSubmit={() => filterOptions()}
        />
        <View>
          <View style={{ ...styles.centeredView, marginTop: 0 }}>
            {proflileModalVisible === true ? (
              <ProfileModal isVisible={setProfileModalVisible} />
            ) : null}
            <ExploreModelComponent
              exploreSearch={(term, veryHealthy, veryPopular, inventory, cheap) =>
                exploreSearch(term, veryHealthy, veryPopular, inventory, cheap)
              }
              modalVisible={modalVisible}
              setModalVisible={(vis) => setModalVisible(vis)}
              inventory={inventory}
              setInventory={(inv) => setInventory(inv)}
              veryHealthy={veryHealthy}
              setVeryHealthy={(health) => setVeryHealthy(health)}
              veryPopular={veryPopular}
              setVeryPopular={(pop) => setVeryPopular(pop)}
              term={term}
            />
          </View>
          {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
          {searchResults2 < 1 && !loading ? (
            <Text style={{ fontSize: 16, textAlign: 'center' }}>No results found..</Text>
          ) : null}
          <FlatList
            columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 2, marginLeft: 4 }}
            data={searchResults2}
            numColumns={3}
            keyExtractor={(result) => result.id}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RecipeScreen', { id: item._id, previousScreen: 'Explore' })
                }>
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
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <View style={styles.bottomMenu}>
        <BottomMenu />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  somecontainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#FEF4D1',
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExploreScreen;
