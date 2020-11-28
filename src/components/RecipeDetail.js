import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const RecipeDetail = ({ result }) => {
  // const { name, image_url, rating, review_count } = result;
  // return (
  //   <View style={styles.container}>
  //     <Image style={styles.image} source={{ uri: image_url }} />
  //     <Text style={styles.name}>{name}</Text>
  //     <Text>
  //       {rating} Stars, {review_count} Reviews{' '}
  //     </Text>
  //   </View>
  // );
  const { title, image } = result;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.name}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5,
  },
  name: {
    width: 250,
    fontWeight: 'bold',
  },
  container: {
    marginLeft: 15,
    borderBottomWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
  },
});

export default RecipeDetail;
