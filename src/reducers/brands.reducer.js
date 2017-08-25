/*
 * AppConstants
 * export const types = { YOUR_ACTION_CONSTANT: 'yourproject/REDUCER_NAME/YOUR_ACTION_CONSTANT' };
 *
 * AppActions
 * export const actions = { yourAction: createAction(types.YOUR_ACTION_CONSTANT) };
 *
 * AppReducer
 * const reducer = handleActions( { [YOUR_ACTION_CONSTANT]: (state, action) => ({ ...state, ...action }) }, defaultState );
 */

import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import api from '../api';

export const types = {
  GET_BRANDS_REQUEST: 'app/BRANDS/GET_BRANDS_REQUEST',
  GET_BRANDS_SUCCESS: 'app/BRANDS/GET_BRANDS_SUCCESS',
  GET_BRANDS_ERROR: 'app/BRANDS/GET_BRANDS_ERROR'
};

export const actions = {
  getList: createAction(types.GET_BRANDS_REQUEST)
};

export const initialState = {
  loading: true,
  data: [],
  page: 0,
  error: null
};

export default handleActions(
  {
    [types.GET_BRANDS_REQUEST]: (state) => ({ ...state, loading: true }),
    [types.GET_BRANDS_SUCCESS]: (state, { data, page }) => ({ ...state, loading: false, data, page }),
    [types.GET_BRANDS_ERROR]: (state, { error }) => ({ ...state, loading: false, data: [], page: 0, error })
  },
  initialState
);

//==============================================
// REDUX-SAGA
//==============================================
function* getBrandListSaga({ payload }) {
  try {
    const { data: responseData } = yield call(api.Brand.getBrandList, payload);
    const { data, metadata: { total, limit } } = responseData;
    yield put({ type: types.GET_BRANDS_SUCCESS, data, page: Math.ceil(total / limit) });
  } catch (error) {
    yield put({ type: types.GET_BRANDS_ERROR, error });
  }
}

export const brandsSagas = [ takeEvery(types.GET_BRANDS_REQUEST, getBrandListSaga) ];
