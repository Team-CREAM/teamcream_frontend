import { SET_EXPLORE_RECIPES } from './actionTypes';

export const setExploreRecipes = (recipes) => ({
  type: SET_EXPLORE_RECIPES,
  data: recipes,
});
