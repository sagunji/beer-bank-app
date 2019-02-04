import { combineReducers } from 'redux';

import favouriteBeerReducer from './favouriteBeerReducer';

const rootReducer = combineReducers({
  favouriteBeerReducer
});

export default rootReducer;
