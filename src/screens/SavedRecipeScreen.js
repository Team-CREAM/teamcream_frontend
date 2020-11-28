/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import SearchBar from '../components/SearchBar';
import useRecipes from '../hooks/useRecipes2';
import RecipeDetail from '../components/RecipeDetail_R';
import BottomMenu from '../components/BottomMenu';
import TopMenu from '../components/TopMenu';

const { width, height } = Dimensions.get('window');

const SavedRecipeScreen = () => {
    const [refresh, setRefresh] = useState(false);
    const [term, setTerm] = useState('');
    const [searchApi, results, errorMessage] = useRecipes();
    return (
        <View style={styles.container}>
            <TopMenu
                // title="Saved Recipes"
                searchbar
                term={term}
                onTermChange={(newTerm) => setTerm(newTerm)}
                onTermSubmit={() => searchApi(term)}
            />
            <View style={styles.marginTop}>
                <FlatList
                    data={results}
                    extraData={refresh}
                    keyExtractor={(result) => result.id}
                    renderItem={({ item }) => {
                        return (
                            // <TouchableOpacity onPress={() => navigation.navigate('ResultsShow', { id: item.id })}>
                            <TouchableOpacity onPress={() => console.log(item.id)}>
                                <RecipeDetail result={item} savedRecipeList={results} boolean={false} refresh={setRefresh} hi={refresh}/>
                            </TouchableOpacity>
                        );
                    }}
                />
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
    bottomMenu: {
        position: 'absolute',
        bottom: 0,
    },
});

export default SavedRecipeScreen;
