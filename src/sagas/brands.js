import { call, put, takeEvery } from 'redux-saga/effects';
import { addNotification as notify } from 'reapop';
import { types } from '../reducers/brands';
import API from '../api';

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
    yield put({ type: types.REMOVE_BRAND_SUCCESS, brand_id });
  } catch (error) {
    const message = error.response.data.message;
    yield put(notify({ title: 'Error', message, status: 'error' }));
  }
}

export default [
  takeEvery(types.GET_BRANDS_REQUEST, getBrandListSaga),
  takeEvery(types.REMOVE_BRAND_REQUEST, removeBrandSaga)
];
