import { all } from 'redux-saga/effects';

import brandsSagas from './brands';
import brandSagas from './brand';

export default function* rootSaga() {
  yield all([ ...brandsSagas, ...brandSagas ]);
}
