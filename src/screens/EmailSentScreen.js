import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dimensions = Dimensions.get('window');
const { width } = dimensions;
const { height } = dimensions;

const EmailSent = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.somecontainer}>
      <StatusBar barstyle="light-content" />
      <View style={styles.container}>
        <Image source={require('../../images/email_sent_logo.png')} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontfamily: 'robot' }}> Go back to </Text>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ fontfamily: 'roboto', fontWeight: 'bold' }}>login</Text>
          </TouchableOpacity>

          <Text style={{ fontfamily: 'roboto', paddingLeft: width * 0.01 }}>
            after verification.
          </Text>
        </View>
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
    paddingTop: height * 0.15,
    flex: 1,
    backgroundColor: '#FEF4D1',
    alignItems: 'center',
  },
});
export default EmailSent;
