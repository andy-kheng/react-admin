import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { addNotification as notify } from 'reapop';

import API from '../api';

export const types = {
  GET_BRANDS_REQUEST: 'app/BRANDS/GET_BRANDS_REQUEST',
  GET_BRANDS_SUCCESS: 'app/BRANDS/GET_BRANDS_SUCCESS',
  GET_BRANDS_FAILURE: 'app/BRANDS/GET_BRANDS_FAILURE',
  //=====================================================
  REMOVE_BRAND_REQUEST: 'app/BRAND/REMOVE_BRAND_REQUEST',
  REMOVE_BRAND_SUCCESS: 'app/BRAND/REMOVE_BRAND_SUCCESS',
  //=====================================================
  RESET_BRAND: 'app/BRANDS/RESET_BRAND'
};

export const actions = {
  getList: createAction(types.GET_BRANDS_REQUEST),
  removeBrand: createAction(types.REMOVE_BRAND_REQUEST),
  resetList: createAction(types.RESET_BRAND)
};

export const initialState = {
  loading: true,
  data: [],
  page: 0,
  error: null
};

export default handleActions(
  {
    [types.RESET_BRAND]: () => initialState,
    [types.GET_BRANDS_REQUEST]: (state) => ({ ...state, loading: true }),
    [types.GET_BRANDS_SUCCESS]: (state, { data, page }) => ({ ...state, loading: false, data, page }),
    [types.GET_BRANDS_FAILURE]: (state, { error }) => ({ ...state, loading: false, error }),
    [types.REMOVE_BRAND_SUCCESS]: ({ data }, { brand_id }) => ({
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
    yield put({ type: types.GET_BRANDS_FAILURE, error: error.message });
  }
}

function* removeBrandSaga({ payload }) {
  try {
    const { brand_id } = payload || {};
    yield call(API.Brand.remove, brand_id);
    yield put(notify({ title: 'Success', message: 'Brand has been delete successfully.', status: 'success' }));
    yield put({ type: types.GET_BRANDS_FAILURE, brand_id });
  } catch (error) {
    const message = error.response.data.message;
    yield put(notify({ title: 'Error', message, status: 'error' }));
  }
}

export const brandsSagas = [
  takeEvery(types.GET_BRANDS_REQUEST, getBrandListSaga),
  takeEvery(types.REMOVE_BRAND_REQUEST, removeBrandSaga)
];
