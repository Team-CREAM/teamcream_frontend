import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import SearchBar from './SearchBar';

const { width, height } = Dimensions.get('window');

const TopMenu = ({ navigation, title, searchbar, term, onTermChange, onTermSubmit }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Home')}>
        <MaterialIcons name="face" size={24} color="black" />
      </TouchableOpacity>
      {title ? (
        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      ) : null}
      {searchbar ? (
        <View style={styles.searchBarWrapper}>
          <SearchBar term={term} onTermChange={onTermChange} onTermSubmit={onTermSubmit} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: height * 0.1,
    paddingTop: height * 0.02,
    backgroundColor: '#D9B580',
  },
  icon: {
    width: width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarWrapper: {
    width: width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
  },
  menuItemText: {
    fontSize: 12,
  },
});

export default withNavigation(TopMenu);