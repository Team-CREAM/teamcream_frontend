import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import axiosWithoutToken from '../api/axiosWithoutToken';

const { width, height } = Dimensions.get('window');

const ResetPw = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ResetPwAxios = async () => {
    setLoading(true);
    await axiosWithoutToken
      .put('/forgotpassword', {
        email,
      })
      .then(function (response) {
        setLoading(false);
        console.log('response');
        if (response.data.success) {
          navigation.navigate('EmailSent');
        }

        if (response.data.error) {
          errorHandle(response.data.error);
        }
      })
      .catch(function (error) {
        console.log('error');
        console.log(error);
      });
  };

  const errorHandle = (err) => {
    setError(err);
    setEmail('');
    setTimeout(() => {
      setError('');
    }, 5000);
  };

  const buttonColor = Platform.OS === 'ios' ? '#ffffff' : '#D9B580';
  return (
    <View style={styles.container}>
      <Text style={styles.SignUpText}>Send Reset Password Link</Text>
      {Platform.OS === 'ios' ? <View style={styles.lineline} /> : null}
      <TextInput
        returnKeyType="done"
        keyboardType="email-address"
        style={styles.textInputStyle}
        placeholder=" Enter Email"
        value={email}
        onChangeText={(newTerm) => setEmail(newTerm)}
        onSubmitEditing={() => ResetPwAxios()}
      />

      <TouchableHighlight style={styles.loginButtonWrapper}>
        <Button onPress={() => ResetPwAxios()} title="Send Link" color={buttonColor} />
      </TouchableHighlight>

      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      {error ? (
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* LINE OR LINE */}
      <View style={styles.lineOrLine}>
        <View style={styles.line} />
      </View>

      <View style={styles.loginWrapper}>
        <Text style={styles.goBackToLogin}>Already have an account? </Text>

        <Text style={{ fontFamily: 'roboto-bold' }} onPress={() => navigation.navigate('Login')}>
          {' '}
          Login
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lineline: {
    height: height * 0.003,
    backgroundColor: 'black',
    marginLeft: '12%',
    marginRight: '12%',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#FEF4D1',
    justifyContent: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: width * 0.12,
  },
  logoStyle: {
    width: width * 0.25,
    height: height * 0.25,
    resizeMode: 'contain',
  },
  SignUpText: {
    paddingBottom: 10,
    fontFamily: 'roboto-regular',
    fontSize: 20,
    lineHeight: 20,
    borderBottomWidth: 2,
    marginBottom: Platform.OS === 'ios' ? 0 : 20,
    marginHorizontal: width * 0.12,
  },
  textInputStyle: {
    paddingLeft: width * 0.02,
    width: width * 0.76,
    height: height * 0.052,
    backgroundColor: '#FFFFFF',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 15,
    flexDirection: 'row',
    marginHorizontal: width * 0.12,
    fontSize: 14,
    fontFamily: 'roboto-regular',
  },
  loginButtonWrapper: {
    marginHorizontal: width * 0.12,
    width: width * 0.76,
    height: height * 0.052,
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: '#D9B580',
  },
  error: {
    flexDirection: 'row',
    backgroundColor: '#D44B4B',
    marginHorizontal: width * 0.12,
    width: width * 0.76,
    height: height * 0.052,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  errorText: { color: 'white', textAlign: 'center' },
  lineOrLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: height * 0.003,
    backgroundColor: 'black',
    marginHorizontal: '12%',
  },
  or: {
    width: width * 0.1,
    textAlign: 'center',
  },
  rightLine: {
    flex: 1,
    height: height * 0.003,
    backgroundColor: 'black',
    marginRight: '12%',
  },
  accountWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  noAccount: {
    flexDirection: 'row',
    marginBottom: height * 0.01,
  },
  textWeight: { fontWeight: 'bold' },
  loginWrapper: {
    flexDirection: 'row',
    marginHorizontal: width * 0.12,
    paddingTop: 15,
    alignContent: 'center',
    justifyContent: 'center',
  },
  goBackToLogin: {
    paddingBottom: 10,
    fontFamily: 'roboto-regular',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
});

export default ResetPw;
