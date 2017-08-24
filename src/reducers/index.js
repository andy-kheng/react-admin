import { combineReducers } from 'redux';
import { reducer as fromReducer } from 'redux-form';
import { all } from 'redux-saga/effects';

import brandsReducer, { brandsSagas } from './brands.reducer';
import brandReducer, { brandSagas } from './brand.reducer';

export const rootReducers = combineReducers({
  brands: brandsReducer,
  brand: brandReducer,
  form: fromReducer
});

export default function* rootSaga() {
  yield all([ ...brandsSagas, ...brandSagas ]);
}
