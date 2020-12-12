import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Button,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import axiosWithToken from '../api/axiosWithToken';

const dimensions = Dimensions.get('window');
const { width } = dimensions;
const { height } = dimensions;

const DietaryRestrictions = ({ navigation, route }) => {
  const [vegetarian, setIsVegetarian] = useState(false);
  const [dairyFree, setIsDairyfree] = useState(false);
  const [vegan, setIsVegan] = useState(false);
  const [glutenFree, setIsGlutenfree] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getPreferences = async () => {
      try {
        const axiosInstance = await axiosWithToken();
        const response = await axiosInstance.get('/profile').then((response) => {
          const { vegetarian, dairyFree, vegan, glutenFree } = response.data.preferences;
          setIsDairyfree(dairyFree);
          setIsVegetarian(vegetarian);
          setIsVegan(vegan);
          setIsGlutenfree(glutenFree);
        });
      } catch (err) {
        setError('Something went wrong');
      }
    };

    getPreferences();
  }, []);

  const DietaryRestrictionsAxios = async () => {
    try {
      const axiosInstance = await axiosWithToken();
      const response = await axiosInstance
        .post('/preferences', {
          preferences: {
            vegetarian,
            dairyFree,
            vegan,
            glutenFree,
            keepMeSignedIn: false,
            intolerables: [],
            metric: false,
          },
        })
        .then((response) => {
          console.log(response.data);
          navigation.replace('Home');
        });
    } catch (err) {
      setError('Something went wrong');
    }
  };

  const errorHandle = (err) => {
    setError(err);
    setIsDairyfree(false);
    setIsGlutenfree(false);
    setIsVegan(false);
    setIsVegetarian(false);
    setTimeout(() => {
      setError('');
    }, 5000);
  };

  const buttonColor = Platform.OS === 'ios' ? '#ffffff' : '#D9B580';

  return (
    <SafeAreaView style={styles.somecontainer}>
      <StatusBar barstyle="light-content" />
      <View style={styles.canvas}>
        {/* Header: please select all that Apply */}
        <View style={{ top: height * 0.15 }}>
          <Text style={styles.title}> Please Select All That Apply:</Text>
        </View>

        {/* Container of all the boxes */}
        <View style={styles.container}>
          {/* Header of the container "Dietary Restriction" */}
          <Text style={styles.header}>Dietary Restrictions</Text>

          {/* vegetarian box */}
          <TouchableOpacity style={styles.boxes} onPress={() => setIsVegetarian(!vegetarian)}>
            <Text style={styles.text}>Vegetarian?</Text>
            <View style={styles.buttonBox}>
              <MaterialIcons
                name={vegetarian ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>

          {/* dairy-free box */}
          <TouchableOpacity style={styles.boxes} onPress={() => setIsDairyfree(!dairyFree)}>
            <Text style={styles.text}>Dairy-free?</Text>
            <View style={styles.buttonBox}>
              <MaterialIcons
                name={dairyFree ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>

          {/* vegan box */}
          <TouchableOpacity style={styles.boxes} onPress={() => setIsVegan(!vegan)}>
            <Text style={styles.text}>Vegan?</Text>
            <View style={styles.buttonBox}>
              <MaterialIcons
                name={vegan ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>

          {/* gluten-free box */}
          <TouchableOpacity style={styles.boxes} onPress={() => setIsGlutenfree(!glutenFree)}>
            <Text style={styles.text}>Gluten-free?</Text>
            <View style={styles.buttonBox}>
              <MaterialIcons
                name={glutenFree ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>
          {/* Confirm Button */}
          <TouchableOpacity
            style={{
              backgroundColor: '#D9B580',
              shadowRadius: 2,
              shadowColor: 'black',
              shadowOpacity: 0.3,
              shadowOffset: { height: 4 },
            }}>
            <Button
              title="confirm"
              color={buttonColor}
              onPress={() => DietaryRestrictionsAxios()}
            />
          </TouchableOpacity>
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
  canvas: {
    flex: 1,
    backgroundColor: '#fef4d1',
    alignItems: 'center',
  },
  title: {
    fontWeight: '900',
    fontSize: 26,
    width: width - 30,
  },
  container: {
    top: height * 0.2,
    backgroundColor: '#fef4d1',
    width: width - 40,
    height: height * 0.55,
    flexDirection: 'column',
  },
  boxes: {
    backgroundColor: 'white',
    height: '10%',
    marginTop: 10,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 3,
    marginBottom: 30,
  },
  buttonBox: {
    top: '20%',
    position: 'absolute',
    right: 0,
    marginRight: width * 0.03,
  },
  button: {
    backgroundColor: '#D9B580',
    height: '4.4%',
    marginTop: 10,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 3,
    top: '13%',
    left: '32s%',
  },
  header: {
    fontSize: 20,
    fontWeight: '900',
  },
  text: { top: '30%', paddingLeft: 6, width: 100 },
  buttontext: { top: '30%', left: '8%', width: 90 },
});

export default DietaryRestrictions;
