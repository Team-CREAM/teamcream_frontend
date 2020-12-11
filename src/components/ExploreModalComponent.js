import React from 'react';
import { Modal, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setExploreFilters } from '../actions/actionExplore';

const ExploreModalComponent = ({
  exploreSearch,
  modalVisible,
  setModalVisible,
  inventory,
  setInventory,
  veryHealthy,
  setVeryHealthy,
  veryPopular,
  setVeryPopular,
  term,
}) => {
  const dispatch = useDispatch();

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.header}>Filter by: </Text>

          <View style={{ ...styles.row, marginBottom: 10 }}>
            <View style={styles.boolText}>
              <Text>Inventory:</Text>
            </View>
            <MaterialIcons
              style={{ position: 'absolute', right: 0 }}
              name={inventory ? 'check-box' : 'check-box-outline-blank'}
              size={24}
              color={inventory ? 'black' : 'grey'}
              onPress={() => {
                setInventory(!inventory);
              }}
            />
          </View>
          <Text style={styles.header}>Additional options: </Text>
          <View style={styles.row}>
            <View style={styles.boolText}>
              <Text>Healthy:</Text>
            </View>
            <MaterialIcons
              style={{ position: 'absolute', right: 0 }}
              name={veryHealthy ? 'check-box' : 'check-box-outline-blank'}
              size={24}
              color={veryHealthy ? 'black' : 'grey'}
              onPress={() => {
                setVeryHealthy(!veryHealthy);
              }}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.boolText}>
              <Text>Popular:</Text>
            </View>
            <MaterialIcons
              style={{ position: 'absolute', right: 0 }}
              name={veryPopular ? 'check-box' : 'check-box-outline-blank'}
              size={24}
              color={veryPopular ? 'black' : 'grey'}
              onPress={() => {
                setVeryPopular(!veryPopular);
              }}
            />
          </View>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={() => {
              dispatch(
                setExploreFilters({
                  inventory,
                  healthy: veryHealthy,
                  popular: veryPopular,
                }),
              );
              setModalVisible(!modalVisible);
              exploreSearch(term, veryHealthy, veryPopular, inventory, false);
            }}>
            <Text style={styles.textStyle}>Save</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    width: '75%',
  },
  row: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  header: {
    fontWeight: 'bold',
  },
});

export default ExploreModalComponent;
