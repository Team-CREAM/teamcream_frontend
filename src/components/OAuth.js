// Android Client ID 1082251707964-3q24citcdtoeo8a7l1rapuc5v5ptvggd.apps.googleusercontent.com
// IOS CLient ID 1082251707964-qu924lu7cj0hcbtu6t7ppq23nb3c9b43.apps.googleusercontent.com

import React from 'react';
import { StyleSheet, Text, Image, View, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import axiosWithoutToken from '../api/axiosWithoutToken';
import useSetToken from '../hooks/useSetToken';

const dimensions = Dimensions.get('window');
const { width } = dimensions;
const { height } = dimensions;

const OAuth = ({ navigation }) => {
  const [storeToken] = useSetToken();

  const signInGoogle = async () => {
    // Init Google
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        iosClientId: '1082251707964-qu924lu7cj0hcbtu6t7ppq23nb3c9b43.apps.googleusercontent.com',
        androidClientId:
          '1082251707964-3q24citcdtoeo8a7l1rapuc5v5ptvggd.apps.googleusercontent.com',
        iosStandaloneAppClientId:
          '1082251707964-qu924lu7cj0hcbtu6t7ppq23nb3c9b43.apps.googleusercontent.com',
        androidStandaloneAppClientId:
          '1082251707964-3q24citcdtoeo8a7l1rapuc5v5ptvggd.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      // Call /google and store token
      if (type === 'success') {
        console.log('success');
        await axiosWithoutToken
          .post('/google', {
            email: user.email,
          })
          .then(function (response) {
            // console.log(response.data);
            if (response.data.token) {
              console.log('Axios google worked', response.data.token);
              console.log(response.data.new);
              storeToken(response.data.token);

              console.log('before');
              response.data.new ? navigation.navigate('ProfilePic') : navigation.navigate('Home');

              console.log('after');
            }
          })
          .catch(function (error) {
            console.log('error');
            console.log(error);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={styles.googleLogo} source={require('../../images/google_logo.png')} />
        <TouchableOpacity onPress={() => signInGoogle()}>
          <Text style={{ paddingLeft: width * 0.012, color: 'blue' }}>Connect with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  facebookLogo: {
    width: width * 0.07,
    height: height * 0.04,
    resizeMode: 'contain',
  },
  googleLogo: {
    width: width * 0.043,
    height: height * 0.043,
    resizeMode: 'contain',
  },
});

export default withNavigation(OAuth);
