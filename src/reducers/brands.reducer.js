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
import { addNotification as notify } from 'reapop';

import API from '../api';

export const types = {
  GET_BRANDS_REQUEST: 'app/BRANDS/GET_BRANDS_REQUEST',
  GET_BRANDS_SUCCESS: 'app/BRANDS/GET_BRANDS_SUCCESS',
  GET_BRANDS_ERROR: 'app/BRANDS/GET_BRANDS_ERROR',
  UPDATE_DELETE_BRANDS: 'app/BRANDS/UPDATE_DELETE_BRANDS',
  RESET_BRAND: 'app/BRANDS/RESET_BRAND',
  REMOVE_BRAND_REQUEST: 'app/BRAND/REMOVE_BRAND_REQUEST'
};

export const actions = {
  getList: createAction(types.GET_BRANDS_REQUEST),
  resetList: createAction(types.RESET_BRAND),
  updateDeleteList: createAction(types.UPDATE_DELETE_BRANDS),
  removeBrand: createAction(types.REMOVE_BRAND_REQUEST)
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
    [types.GET_BRANDS_ERROR]: (state, { error }) => ({ ...state, loading: false, data: [], page: 0, error }),
    [types.RESET_BRAND]: (state) => ({ ...state, ...initialState }),
    [types.UPDATE_DELETE_BRANDS]: ({ data }, { payload: brand_id = 0 }) => ({
      data: data.map((x) => Object.assign(x, x.id === brand_id ? { status_cd: 'DEL' } : {}))
    })
  },
  initialState
);

//==============================================
// REDUX-SAGA
//==============================================
function* getBrandListSaga({ payload }) {
  try {
    const { data, metadata: { total, limit } } = yield call(API.Brand.getBrandList, payload);
    data.forEach((x) => Object.assign(x, { limit })); // For Action Buttons Style
    yield put({ type: types.GET_BRANDS_SUCCESS, data, page: Math.ceil(total / limit) });
  } catch (error) {
    yield put({ type: types.GET_BRANDS_ERROR, error });
  }
}

function* removeBrandSaga({ payload }) {
  try {
    const { brand_id } = payload || {};
    yield call(API.Brand.remove, brand_id);
    yield put(notify({ title: 'Brand Delete', message: 'Brand has been delete successfully.', status: 'success' }));
    yield put(actions.updateDeleteList(brand_id));
  } catch (error) {
    yield put(notify({ title: 'Brand Delete', message: error.toString(), status: 'error' }));
  }
}

export const brandsSagas = [
  takeEvery(types.GET_BRANDS_REQUEST, getBrandListSaga),
  takeEvery(types.REMOVE_BRAND_REQUEST, removeBrandSaga)
];
