import {
  STORE_INGREDIENTS,
  ADD_PANTRY_ITEM,
  REMOVE_PANTRY_ITEM,
  CLEAR_PANTRY,
} from './actionTypes';

export const storeIngredients = (item) => ({
  type: STORE_INGREDIENTS,
  data: item,
});

export const addPantryItem = (item) => ({
  type: ADD_PANTRY_ITEM,
  data: item,
});

export const removePantryItem = (item) => ({
  type: REMOVE_PANTRY_ITEM,
  data: item,
});

export const clearPantry = () => ({
  type: CLEAR_PANTRY,
});
