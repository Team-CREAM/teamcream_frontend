import { SET_PROFILE_PIC } from '../actions/types';

const initialState = {
  ICONDATA: [
    {
      name: require('../../images/profilepicicons/bento_box.png'),
    },
    {
      name: require('../../images/profilepicicons/burger.png'),
    },
    {
      name: require('../../images/profilepicicons/chef_hat.png'),
    },
    {
      name: require('../../images/profilepicicons/chips.png'),
    },
    {
      name: require('../../images/profilepicicons/coffee.png'),
    },
    {
      name: require('../../images/profilepicicons/donut.png'),
    },
    {
      name: require('../../images/profilepicicons/food_truck.png'),
    },
    {
      name: require('../../images/profilepicicons/fork.png'),
    },
    {
      name: require('../../images/profilepicicons/hotdog.png'),
    },
    {
      name: require('../../images/profilepicicons/icecream.png'),
    },
    {
      name: require('../../images/profilepicicons/ketchup.png'),
    },
    {
      name: require('../../images/profilepicicons/popcorn.png'),
    },
    {
      name: require('../../images/profilepicicons/rice.png'),
    },
    {
      name: require('../../images/profilepicicons/soda.png'),
    },
    {
      name: require('../../images/profilepicicons/taco.png'),
    },
  ],
  profileImage: 0,
};

const profilePicReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_PIC:
      return {
        ...state,
        profileImage: action.data,
      };
    default:
      return state;
  }
};

export default profilePicReducer;
