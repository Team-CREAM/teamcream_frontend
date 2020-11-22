import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableHighlight,
  Button,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import OAuth from '../components/OAuth';
import axiosWithoutToken from '../api/axiosWithoutToken';
import useValidation from '../hooks/useValidation';

const { width, height } = Dimensions.get('window');

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focus2, setFocus2] = useState(false);

  const [validateInputs] = useValidation();

  const SignInAxios = async () => {
    setLoading(true);
    await axiosWithoutToken
      .post('/login', {
        email,
        password,
      })
      .then(function (response) {
        setLoading(false);
        if (response.data.token) {
          navigation.navigate('Home', { token: response.data.token });
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

  const validateSubmit = () => {
    const [isValidated, error] = validateInputs('Login', email, password, '');
    if (isValidated) {
      SignInAxios();
    }
    if (error) {
      errorHandle(error);
    }
  };

  const errorHandle = (err) => {
    setError(err);
    setEmail('');
    setPassword('');
    setTimeout(() => {
      setError('');
    }, 5000);
  };
  const buttonColor = Platform.OS === 'ios' ? '#ffffff' : '#D9B580';

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.logoStyle}
          source={require('../../images/crumbs_logo2.png')}
        />
      </View>
      <TextInput
        returnKeyType="next"
        style={styles.textInputStyle}
        placeholder=" Enter email or username"
        value={email}
        onChangeText={(newTerm) => {
          setEmail(newTerm);
        }}
        onSubmitEditing={() => setFocus2(true)}
      />
      <TextInput
        focus={focus2}
        returnKeyType="done"
        style={styles.textInputStyle}
        placeholder=" Enter password"
        secureTextEntry
        value={password}
        onChangeText={(newTerm) => setPassword(newTerm)}
        onSubmitEditing={() => validateSubmit()}
      />
      <TouchableHighlight style={styles.loginButtonWrapper}>
        <Button onPress={() => validateSubmit()} title="Login" color={buttonColor} />
      </TouchableHighlight>

      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      {error ? (
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* LINE OR LINE */}
      <View style={styles.lineOrLine}>
        <View style={styles.leftLine} />
        <View>
          <Text style={styles.or}>OR</Text>
        </View>
        <View style={styles.rightLine} />
      </View>

      {/* Facebook and google OAuth */}
      <OAuth />

      {/* SIGN UP */}
      <View style={styles.accountWrapper}>
        <View style={styles.noAccount}>
          <Text>No Account? </Text>
          <Text style={styles.textWeight} onPress={() => navigation.navigate('SignUp2')}>
            Sign up
          </Text>
        </View>
        {/* Forgot Password */}
        <Text style={styles.textWeight} onPress={() => navigation.navigate('ResetPw2')}>
          Forgot Password?
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF4D1',
  },
  imageContainer: {
    marginTop: 50,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStyle: {
    width: 0.8 * width,
    height: 0.375 * height,
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
    fontFamily: 'monospace',
  },
  loginButtonWrapper: {
    marginHorizontal: width * 0.12,
    width: width * 0.76,
    height: height * 0.052,
    justifyContent: 'center',
    marginBottom: 10,
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
    marginBottom: 10,
  },
  errorText: { color: 'white', textAlign: 'center' },
  lineOrLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftLine: {
    flex: 1,
    height: height * 0.003,
    backgroundColor: 'black',
    marginLeft: '12%',
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
});

export default SignIn;
