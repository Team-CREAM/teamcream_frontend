import { ADD_SAVED_RECIPE, REMOVE_SAVED_RECIPE, CLEAR_SAVED_RECIPES } from './types';

export const addSavedRecipe = (recipe) => ({
  type: ADD_SAVED_RECIPE,
  data: recipe,
});

export const removeSavedRecipe = (id) => ({
  type: REMOVE_SAVED_RECIPE,
  id,
});

export const clearSavedRecipes = () => ({
  type: CLEAR_SAVED_RECIPES,
});
