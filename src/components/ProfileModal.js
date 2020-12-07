import React, { useState, useEffect } from 'react';
import { View, Alert, Modal, Text, TouchableHighlight, Dimensions, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import useSetToken from '../hooks/useSetToken';
import { clearSavedRecipes } from '../actions/savedRecipes';

// two buttons: One that sends you to Dietary Restriction Screen and one that logs you out
const { width, height } = Dimensions.get('window');

const ProfileModal = ({ navigation, isVisible }) => {
  const dispatch = useDispatch();
  const [storeToken] = useSetToken();
  return (
    <Modal
      animationType="slide"
      transparent
      visible
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={() => {
              isVisible(false);
              navigation.replace('ProfilePic');
            }}>
            <Text style={styles.textStyle}>User Settings</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={() => {
              dispatch(clearSavedRecipes());
              isVisible(false);
              storeToken('');
              dispatch(clearSavedRecipes());
              navigation.replace('Login');
            }}>
            <Text style={styles.textStyle}>Logout</Text>
          </TouchableHighlight>

          <MaterialIcons
            name="clear"
            size={30}
            style={{ position: 'absolute', top: 5, right: 5 }}
            onPress={() => {
              isVisible(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF4D1',
    paddingBottom: height * 0.17,
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boolText: {
    justifyContent: 'center',
    width: '50%',
  },
  row: {
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  header: {
    fontWeight: 'bold',
  },
});
export default withNavigation(ProfileModal);
