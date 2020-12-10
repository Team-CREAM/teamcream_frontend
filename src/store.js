import { createStore, combineReducers } from 'redux';
import savedRecipeReducer from './reducer/savedRecipeReducer';
import profilePicReducer from './reducer/profilePicReducer';

const rootReducer = combineReducers({
  savedRecipeReducer,
  profilePicReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
