/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions, ActivityIndicator, Text } from 'react-native';
import SearchBar from '../components/SearchBar';
import useRecipes from '../hooks/useRecipes2';
import RecipeDetail from '../components/RecipeDetail_R';
import BottomMenu from '../components/BottomMenu';
import TopMenu from '../components/TopMenu';
import axiosWithToken from '../api/axiosWithToken';

const { width, height } = Dimensions.get('window');

const SavedRecipeScreen = ({navigation}) => {
    const [refresh, setRefresh] = useState(false);
    const [term, setTerm] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getRecipes = async() => {
            setLoading(true);
            const axiosInstance = await axiosWithToken();
            const response = await axiosInstance.get('./savedRecipes');
            setRecipes(response.data);
            setLoading(false);
        };
        getRecipes();
    }, []);

    const HasSavedRecipes = () => {
        if (recipes.length > 0){
            return <FlatList
            data={recipes}
            extraData={refresh}
            keyExtractor={(result) => result.recipe}
            renderItem={({ item }) => {
                return (
                    // <TouchableOpacity onPress={() => navigation.navigate('ResultsShow', { id: item.id })}>
                    // <TouchableOpacity onPress={() => navigation.navigate('RecipeScreen', { item })}> // DO NOT UNCOMMENT
                   <TouchableOpacity onPress={() => console.log(item)}> 
                        <RecipeDetail result={item} savedRecipes = {recipes} recipes={setRecipes} refresh={setRefresh} hi={refresh}/>
                    </TouchableOpacity>
                );
            }}
        />;
        }
        if(!loading){
            return <Text style={styles.noRecipe}>No Saved Recipes</Text>;
        }
        return null;
        
    };

    return (
        <View style={styles.container}> 
        {/* WORK ON SEARCH BAR?? */}
            <TopMenu
                // title="Saved Recipes"
                searchbar
                term={term}
                onTermChange={(newTerm) => setTerm(newTerm)}
                onTermSubmit={() => searchApi(term)}
            />
            <View style={styles.marginTop}>
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            <HasSavedRecipes />
            </View>
            <View style={styles.bottomMenu}>
                <BottomMenu />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEF4D1',
        paddingBottom: height * 0.17,
    },
    marginTop: {
        marginTop: 10,
        alignItems: 'center'
    },
    noRecipe: {
        // letterSpacing: 2,
        // fontWeight: 'bold',
        // fontSize: 100,
    },
    bottomMenu: {
        position: 'absolute',
        bottom: 0,
    },
});

export default SavedRecipeScreen;
