import { createStore, combineReducers } from 'redux';
import savedRecipeReducer from './reducer/savedRecipeReducer';
import profilePicReducer from './reducer/profilePicReducer';
import inventoryReducer from './reducer/inventoryReducer';

const rootReducer = combineReducers({
  savedRecipeReducer,
  profilePicReducer,
  inventoryReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
