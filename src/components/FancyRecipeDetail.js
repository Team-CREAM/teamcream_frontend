/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import heartIcon from 'react-native-vector-icons/AntDesign';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');



function FancyRecipeDetail({ result }) {
    const [liked, toggleLike] = useState(false);

    const AnimatedHeart = Animatable.createAnimatableComponent(heartIcon);


    let smallAnimatedIcon = AnimatedHeart;

    const handleSmallAnimatedIconRef = (ref) => {
        smallAnimatedIcon = ref;
    };

    const handleOnPressLike = () => {
        smallAnimatedIcon.bounceIn();
        // eslint-disable-next-line no-lone-blocks
        {/* liked = !liked;
        smallAnimatedIcon.color = '#ff0000';
        console.log(liked); */}
        toggleLike(!liked);
        console.log(liked);

    };

    const { vegetarian,
        vegan,
        glutenFree,
        dairyFree,
        veryHealthy,
        cheap,
        veryPopular,
        sustainable,
        weightWatcherSmartPoints,
        gaps,
        lowFodMap,
        aggregateLikes,
        spoonacularScore,
        healthScore,
        creditsText,
        license,
        sourceName,
        pricePerServing,
        extendedIngredients,
        id,
        title,
        readyInMinutes,
        servings,
        sourceUrl,
        image,
        imageType,
        summary,
        cuisines,
        dishTypes,
        diets,
        occasions,
        instructions,
        analyzedInstructions,
        originalId,
        spoonacularSourceUrl, } = result;
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: image }} />
            <View style={styles.parent}>
                <Text style={styles.name}>{title}</Text>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={handleOnPressLike}
                >
                    <AnimatedHeart
                        ref={handleSmallAnimatedIconRef}
                        name={liked ? 'heart' : 'hearto'}
                        color={liked ? colors.heartColor : colors.black}
                        size={18}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.parent}>
                {/* <Text>
                    {rating} Stars, {review_count} Reviews{' '}
                </Text> */}
                <MaterialCommunityIcons name="fridge-outline" size={24} color="black" />
            </View>

        </View >
    );
}

const colors = {
    transparent: 'transparent',
    white: '#fff',
    heartColor: '#e92f3c',
    textPrimary: '#515151',
    black: '#000',
};

const styles = StyleSheet.create({
    image: {
        width: width * 0.9,
        height: height * 0.2,
        borderRadius: 4,
        marginBottom: 5,
        alignItems: 'center'
    },
    name: {
        fontWeight: 'bold',
        alignItems: 'flex-start'
    },
    container: {
        width: width * .9,
        alignSelf: 'center',
        marginTop: height * .05,
        borderBottomWidth: 1,
        borderColor: 'black',
        borderRadius: 4,

    },
    parent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

export default FancyRecipeDetail;
