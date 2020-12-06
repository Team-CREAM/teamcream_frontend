import { createStore, combineReducers } from 'redux';
import savedRecipeReducer from './reducer/savedRecipeReducer';

const rootReducer = combineReducers({
  savedRecipeReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
