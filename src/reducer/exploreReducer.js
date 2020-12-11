import { SET_EXPLORE_RECIPES, SET_EXPLORE_FILTERS } from '../actions/actionTypes';

const initialState = {
  recipes: [],
  inventory: false,
  healthy: false,
  popular: false,
};

const exploreReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXPLORE_RECIPES:
      return {
        ...state,
        recipes: action.data,
      };
    case SET_EXPLORE_FILTERS:
      return {
        ...state,
        inventory: action.data.inventory,
        healthy: action.data.healthy,
        popular: action.data.popular,
      };
    default:
      return state;
  }
};

export default exploreReducer;
