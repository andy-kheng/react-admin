import { combineReducers } from 'redux';
import { reducer as fromReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'reapop';

import brandsReducer from './brands';
import brandReducer from './brand';

export default combineReducers({
  form: fromReducer,
  notifications: notificationsReducer(),
  //=======================
  brands: brandsReducer,
  brand: brandReducer
});
