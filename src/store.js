import { createStore, combineReducers } from 'redux';
import savedRecipeReducer from './reducer/savedRecipeReducer';
import profilePicReducer from './reducer/profilePicReducer';
import inventoryReducer from './reducer/inventoryReducer';
import exploreReducer from './reducer/exploreReducer';

const rootReducer = combineReducers({
  savedRecipeReducer,
  profilePicReducer,
  inventoryReducer,
  exploreReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
