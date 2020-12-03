/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import useRecipes from '../hooks/useRecipes2';
import RecipeDetail from '../components/RecipeDetail_R';
import BottomMenu from '../components/BottomMenu';
import TopMenu from '../components/TopMenu';
import axiosWithToken from '../api/axiosWithToken';
import ProfileModal from '../components/ProfileModal';


const { width, height } = Dimensions.get('window');

const SavedRecipeScreen = ({navigation}) => {
    const [refresh, setRefresh] = useState(false);
    const [term, setTerm] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [proflileModalVisible, setProfileModalVisible] = useState(false);


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
                    <TouchableOpacity onPress={() => navigation.navigate('RecipeScreen', { id: item.recipe })}> 
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
        <SafeAreaView style={styles.container}> 
        {/* WORK ON SEARCH BAR?? */}
            <TopMenu
                title="Saved Recipes"
                // searchbar
                // term={term}
                profileIcon
                onProfilePress={setProfileModalVisible}
                // onTermChange={(newTerm) => setTerm(newTerm)}
                // onTermSubmit={() => searchApi(term)}
            />
            {proflileModalVisible === true ? (
            <ProfileModal isVisible={setProfileModalVisible} />
          ) : null}
            <View style={styles.marginTop}>
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            <HasSavedRecipes />
            </View>
            <View style={styles.bottomMenu}>
                <BottomMenu />
            </View>
        </SafeAreaView>
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
