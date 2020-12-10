import {
  STORE_INGREDIENTS,
  ADD_PANTRY_ITEM,
  REMOVE_PANTRY_ITEM,
  CLEAR_PANTRY,
} from '../actions/actionTypes';

const initialState = {
  ingredients: [],
  pantry: [],
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_INGREDIENTS:
      if (state.ingredients.length !== action.data.length) {
        return {
          ...state,
          ingredients: state.ingredients.concat(action.data),
        };
      }
      return state;
    case ADD_PANTRY_ITEM:
      if (!state.pantry.some((item) => item.name === action.data.name)) {
        return {
          ...state,
          pantry: state.pantry.concat(action.data),
        };
      }
      return state;
    case REMOVE_PANTRY_ITEM:
      return {
        ...state,
        pantry: state.pantry.filter((item) => item.name !== action.data.name),
      };
    case CLEAR_PANTRY:
      return {
        ...state,
        pantry: [],
      };
    default:
      return state;
  }
};

export default inventoryReducer;
