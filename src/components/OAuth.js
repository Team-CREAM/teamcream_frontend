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

      if (type === 'success') {
        console.log('success');
        await axiosWithoutToken
          .post('/google', {
            email: user.email,
          })
          .then(function (response) {
            if (response.data.token) {
              console.log('Axios google worked', response.data.token);
              storeToken(response.data.token);
              navigation.navigate('Home');
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

  const facebook = async () => {
    await Facebook.initializeAsync({
      autoLogAppEvents: true,
      appId: 203083637970193,
    });
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('203083637970193', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`,
        )
          .then((response) => console.log(response.json()))
          .then((data) => {
            console.log(data);
          })
          .catch((e) => console.log(e));
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={styles.facebookLogo} source={require('../../images/facebook_logo.png')} />
        <TouchableOpacity onPress={() => facebook()}>
          <Text style={{ color: 'blue' }}>Connect with Facebook</Text>
        </TouchableOpacity>
      </View>

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
