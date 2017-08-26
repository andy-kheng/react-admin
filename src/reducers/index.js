import { combineReducers } from 'redux';
import { reducer as fromReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'reapop';
import { all } from 'redux-saga/effects';

import brandsReducer, { brandsSagas } from './brands.reducer';
import brandReducer, { brandSagas } from './brand.reducer';

export const rootReducers = combineReducers({
  form: fromReducer,
  notifications: notificationsReducer(),
  //=======================
  brands: brandsReducer,
  brand: brandReducer
});

export default function* rootSaga() {
  yield all([ ...brandsSagas, ...brandSagas ]);
}
