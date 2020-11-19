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
import Explore from './src/screens/ExploreScreen';

const navigator = createStackNavigator(
  {
    Home: {
      screen: Home,
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
    Explore: {
      screen: Explore,
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
  },
  {
    initialRouteName: 'SignIn',
    defaultNavigationOptions: {
      title: 'Cooking with Crumbs',
    },
  },
);

export default createAppContainer(navigator);
