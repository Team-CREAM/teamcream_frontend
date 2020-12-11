import { SET_EXPLORE_RECIPES } from '../actions/actionTypes';

const initialState = {
  recipes: [],
};

const exploreReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXPLORE_RECIPES:
      return {
        ...state,
        recipes: action.data,
      };
    default:
      return state;
  }
};

export default exploreReducer;
