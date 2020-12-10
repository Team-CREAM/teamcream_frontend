import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import Login from './src/screens/LoginScreen';
import SignUp from './src/screens/SignUpScreen';
import ForgotPassword from './src/screens/ForgotPasswordScreen';
import Home from './src/screens/HomeScreen';
import Explore from './src/screens/ExploreScreen';
import SavedRecipeScreen from './src/screens/SavedRecipeScreen';
import RecipeScreen from './src/screens/RecipeScreen';
import DietaryRestrictions from './src/screens/DietaryRestrictionsScreen';
import EmailSent from './src/screens/EmailSentScreen';
import ProfilePic from './src/screens/ProfilePicScreen';
import Inventory from './src/screens/InventoryScreen';

const navigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    Explore: {
      screen: Explore,
      navigationOptions: {
        headerShown: false,
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: 'Create Account',
      },
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        title: 'Reset Password',
      },
    },
    DietaryRestrictions,
    EmailSent,
    ProfilePic,
    Inventory,
    SavedRecipeScreen: {
      screen: SavedRecipeScreen,
      navigationOptions: {
        title: 'Saved Recipes',
        headerShown: false,
      },
    },
    RecipeScreen: {
      screen: RecipeScreen,
      navigationOptions: {
        headerShown: false,
        title: '',
      },
    },
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const RootApp = createAppContainer(navigator);

export default App = () => {
  const [loaded] = useFonts({
    'roboto-regular': require('./assets/fonts/RobotoMono-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/RobotoMono-Bold.ttf'),
  });

  if (!loaded) {
    return <AppLoading />;
  }
  return <RootApp />;
};
