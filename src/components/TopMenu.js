import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import useSetToken from '../hooks/useSetToken';
import ProfileModal from './ProfileModal';
import axiosWithToken from '../api/axiosWithToken';

const { width, height } = Dimensions.get('window');

const TopMenu = ({
  navigation,
  title,
  searchbar,
  term,
  onTermChange,
  onTermSubmit,
  onFilterSubmit,
  profileIcon,
  onProfilePress,
}) => {
  const [icon, setIcon] = useState();
  const i = useSelector((state) => state.profilePicReducer.profileImage);
  const temp = useSelector((state) => state.profilePicReducer.ICONDATA[i].name);

  useEffect(() => {
    // const getProfileIcon = async () => {
    //   // setLoading(true);
    //   const axiosInstance = await axiosWithToken();
    //   const response = await axiosInstance.post('/icon');
    //   // console.log(response.data.icon);
    //   // console.log(response);
    //   response.data.icon ? setIcon(response.data.icon) : null;
    // };
    // getProfileIcon();
    // console.log(useSelector((state) => state.profilePicReducer.ICONDATA[i].name));
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
            {/* <Image style={styles.profilePic} source={ICONDATA[icon].name} /> */}
            <Image style={styles.profilePic} source={icon} />
          </View>
        </TouchableOpacity>
      ) : null}
      {/* {profileIcon ? <MaterialIcons name="face" size={24} color="black" /> : null} */}

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
