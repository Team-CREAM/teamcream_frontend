import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/screens/LoginScreen';
import SignUp from './src/screens/SignUpScreen';
import ForgotPassword from './src/screens/ForgotPasswordScreen';
import DietaryRestrictions from './src/screens/DietaryRestrictions';
import EmailSent from './src/screens/EmailSent';
import ProfilePic from './src/screens/ProfilePic';
import Home from './src/screens/HomeScreen';
import Explore from './src/screens/ExploreScreen';
import SavedRecipeScreen from './src/screens/SavedRecipeScreen';
import RecipeScreen from './src/screens/RecipeScreen';

const navigator = createStackNavigator(
  {
    Home: {
      // screen: Home,
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
      },
    },
  },
  {
    initialRouteName: 'Login',
    // initialRouteName: 'Home',
    // initialRouteName: 'SavedRecipeScreen',
    // initialRouteName: 'RecipeScreen',
    defaultNavigationOptions: {
      // title: 'Cooking with Crumbs',
      // headerShown: false,
    },
  },
);

export default createAppContainer(navigator);
