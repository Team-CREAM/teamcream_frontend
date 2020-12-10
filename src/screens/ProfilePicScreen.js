import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  FlatList,
  Button,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import useSetIcon from '../hooks/useSetIcon';
import axiosWithToken from '../api/axiosWithToken';
import { setProfilePic } from '../actions/profilePic';

const dimensions = Dimensions.get('window');
const { width } = dimensions;
const { height } = dimensions;

const ProfilePicScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const i = useSelector((state) => state.profilePicReducer.profileImage);
  const [profilePicture, setProfilePicture] = useState(
    useSelector((state) => state.profilePicReducer.ICONDATA[i].name),
  );
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProfileIcon = async () => {
      setLoading(true);
      const axiosInstance = await axiosWithToken();
      const response = await axiosInstance.post('/icon');

      // response.data.icon ? setProfilePicture(ICONDATA[response.data.icon].name) : null;
      if (response.data.icon) {
        dispatch(setProfilePic(response.data.icon));
        // setProfilePicture(ICONDATA[response.data.icon].name);
      }
      setLoading(false);
    };
    getProfileIcon();
  }, []);
  const buttonColor = Platform.OS === 'ios' ? '#ffffff' : '#D9B580';

  const ICONDATA = [
    {
      name: require('../../images/profilepicicons/bento_box.png'),
    },
    {
      name: require('../../images/profilepicicons/burger.png'),
    },
    {
      name: require('../../images/profilepicicons/chef_hat.png'),
    },
    {
      name: require('../../images/profilepicicons/chips.png'),
    },
    {
      name: require('../../images/profilepicicons/coffee.png'),
    },
    {
      name: require('../../images/profilepicicons/donut.png'),
    },
    {
      name: require('../../images/profilepicicons/food_truck.png'),
    },
    {
      name: require('../../images/profilepicicons/fork.png'),
    },
    {
      name: require('../../images/profilepicicons/hotdog.png'),
    },
    {
      name: require('../../images/profilepicicons/icecream.png'),
    },
    {
      name: require('../../images/profilepicicons/ketchup.png'),
    },
    {
      name: require('../../images/profilepicicons/popcorn.png'),
    },
    {
      name: require('../../images/profilepicicons/rice.png'),
    },
    {
      name: require('../../images/profilepicicons/soda.png'),
    },
    {
      name: require('../../images/profilepicicons/taco.png'),
    },
  ];
  // <Image source={navigation.state.params.profilePicture} />;
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIndex(index);
          setProfilePicture(item.name);
        }}
        style={styles.gridElement}>
        <Image style={styles.imageThumbnail} source={item.name} resizeMode="contain" />
      </TouchableOpacity>
    );
  };

  const storeIconFunction = async () => {
    dispatch(setProfilePic(index));
    try {
      const axiosInstance = await axiosWithToken();
      const response = await axiosInstance.post('./icon', {
        icon: index.toString(),
      });
      console.log(response);

      // setLoading(false);
    } catch (err) {
      // setErrorMessage('Something went wrong');
    }
  };
  console.log(profilePicture);
  return (
    <View style={styles.canvas}>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}

      {/* Profilepic img */}
      <View style={styles.profilePicContainer}>
        <Image style={styles.profilePic} source={profilePicture} resizeMode="contain" />
      </View>

      {/* Next Button */}
      <TouchableHighlight style={styles.nextButtonWrapper}>
        <Button
          onPress={async () => {
            storeIconFunction();
            // await storeIcon(index.toString());
            navigation.navigate('DietaryRestrictions');
          }}
          title="NEXT"
          color={buttonColor}
        />
      </TouchableHighlight>
      {/* Choose an Icon */}
      <Text style={styles.anish}>Choose an Icon</Text>
      {/* Gridview of Icons */}
      <View style={styles.container}>
        <FlatList
          data={ICONDATA}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(key, index) => `${key}${index}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: '#fef4d1',
    alignItems: 'center',
  },
  anish: {
    top: '2%',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  gridElement: {
    backgroundColor: 'white',
    marginTop: height * 0.05,
    width: 0.28 * width,
    height: 0.15 * height,
    borderRadius: (width * height) / 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    margin: 6,
  },
  imageThumbnail: {
    height: height * 0.19,
    width: width * 0.19,
  },
  container: {
    flex: 1,
    marginTop: 25,
    justifyContent: 'center',
  },
  profilePicContainer: {
    backgroundColor: 'white',
    marginTop: height * 0.05,
    width: 0.5 * width,
    height: 0.24 * height,
    borderRadius: (width * height) / 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    margin: 6,
  },
  profilePic: {
    height: height * 0.35,
    width: width * 0.3,
  },
  nextButtonWrapper: {
    marginTop: 10,
    marginHorizontal: width * 0.12,
    width: width * 0.76,
    height: height * 0.052,
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: '#D9B580',
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { height: 4 },
  },
});

export default ProfilePicScreen;
