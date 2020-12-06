import { ADD_SAVED_RECIPE, REMOVE_SAVED_RECIPE, CLEAR_SAVED_RECIPES } from '../actions/types';

const initialState = {
  savedRecipeList: [],
};

const savedRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SAVED_RECIPE:
      return {
        ...state,
        savedRecipeList: state.savedRecipeList.concat({
          id: action.data._id,
          name: action.data.title,
          image: action.data.image,
          // image: action.data.image,
        }),
      };
      break;
    case REMOVE_SAVED_RECIPE:
      return {
        ...state,
        savedRecipeList: state.savedRecipeList.filter((item) => item.id !== action.id),
      };
    case CLEAR_SAVED_RECIPES:
      return {
        savedRecipeList: [],
      };
    default:
      return state;
  }
};

export default savedRecipeReducer;
