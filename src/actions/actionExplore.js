import { SET_EXPLORE_RECIPES, SET_EXPLORE_FILTERS } from './actionTypes';

export const setExploreRecipes = (recipes) => ({
  type: SET_EXPLORE_RECIPES,
  data: recipes,
});

export const setExploreFilters = (filters) => ({
  type: SET_EXPLORE_FILTERS,
  data: filters,
});
