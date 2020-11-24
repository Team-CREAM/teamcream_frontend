import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignIn from './src/screens/SignInScreen';
import SignUp from './src/screens/SignUpScreen';
import SignUp2 from './src/screens/SignUpScreen2';
import ResetPw from './src/screens/ResetPwScreen';
import ResetPw2 from './src/screens/ResetPwScreen2';
import DietaryRestrictions from './src/screens/DietaryRestrictions';
import EmailSent from './src/screens/EmailSent';
import ProfilePic from './src/screens/ProfilePic';
import Home from './src/screens/HomeScreen';
import HomeR from './src/screens/HomeScreen_R';
import SavedRecipeScreen from './src/screens/SavedRecipeScreen';
import RecipeScreen from './src/screens/RecipeScreen';

const navigator = createStackNavigator(
  {
    Home: {
      // screen: Home,
      screen: HomeR,
      navigationOptions: {
        headerShown: false,
      },
    },
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        headerShown: false,
      },
    },
    SignUp,
    SignUp2,
    ResetPw,
    ResetPw2,
    DietaryRestrictions,
    EmailSent,
    ProfilePic,
    SavedRecipeScreen: {
      screen: SavedRecipeScreen,
      navigationOptions: {
        title: 'Saved Recipes',
        headerShown: true,
      },
    },
    RecipeScreen,
  },
  {
    initialRouteName: 'SavedRecipeScreen',
    // initialRouteName: 'RecipeScreen',
<<<<<<< HEAD
    initialRouteName: 'RecipeScreen',
=======
    // initialRouteName: 'Home',
>>>>>>> e25fda2b6db89bd66de9ae5de39f4e16907c9b58
    defaultNavigationOptions: {
      // title: 'Cooking with Crumbs',
      headerShown: false,
    },
  },
);

export default createAppContainer(navigator);
