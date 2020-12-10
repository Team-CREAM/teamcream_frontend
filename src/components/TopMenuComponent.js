import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBarComponent';

const { width, height } = Dimensions.get('window');

const TopMenu = ({
  title,
  searchbar,
  term,
  onTermChange,
  onTermSubmit,
  onFilterSubmit,
  onProfilePress,
}) => {
  const [icon, setIcon] = useState();
  const i = useSelector((state) => state.profilePicReducer.profileImage);
  const temp = useSelector((state) => state.profilePicReducer.ICONDATA[i].name);

  useEffect(() => {
    setIcon(temp);
  }, [temp]);

  return (
    <View style={styles.container}>
      {icon ? (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            onProfilePress(true);
          }}>
          <View style={styles.profilePicContainer}>
            <Image style={styles.profilePic} source={icon} />
          </View>
        </TouchableOpacity>
      ) : null}
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
      {onFilterSubmit ? (
        <TouchableOpacity style={styles.icon} onPress={() => onFilterSubmit()}>
          <MaterialIcons name="filter-list" size={24} color="black" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: height * 0.1,
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
  profilePicContainer: {
    backgroundColor: 'white',
    height: 35,
    width: 35,
    borderRadius: (width * height) / 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    margin: 6,
  },
  profilePic: {
    height: 26,
    width: 26,
  },
});

export default withNavigation(TopMenu);
