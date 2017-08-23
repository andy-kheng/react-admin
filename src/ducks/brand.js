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
import { all, call, put, takeEvery } from 'redux-saga/effects';
import Api, { serverError } from '../api';

export const types = {
  GET_BRAND_REQUEST: 'app/BRAND/GET_BRAND_REQUEST',
  GET_BRAND_SUCCESS: 'app/BRAND/GET_BRAND_SUCCESS',
  GET_BRAND_ERROR: 'app/BRAND/GET_BRAND_ERROR',

  SUBMIT_BRAND_REQUEST: 'app/BRAND/SUBMIT_BRAND_REQUEST',
  SUBMIT_BRAND_SUCCESS: 'app/BRAND/SUBMIT_BRAND_SUCCESS',
  SUBMIT_BRAND_ERROR: 'app/BRAND/SUBMIT_BRAND_ERROR'
};

export const actions = {
  getBrand: createAction(types.GET_BRAND_REQUEST),
  submitBrand: createAction(types.SUBMIT_BRAND_REQUEST)
};

export const initialState = {
  loading: true,
  data: {},
  error: null
};

export default handleActions(
  {
    //[types.GET_BRAND_REQUEST]: (state) => ({ ...state, loading: true }),
    [types.GET_BRAND_SUCCESS]: (state, action) => ({ ...state, ...action, loading: false }),
    [types.GET_BRAND_ERROR]: (state, action) => ({ ...state, ...action, loading: false })
  },
  initialState
);

//==============================================
// REDUX-SAGA
//==============================================
function* getBrandDetailSaga({ payload }) {
  try {
    const options = { status_cd: 'ACT', order: '-name', limit: 1000 };
    const [ { data }, { data: { data: group_brands } }, { data: { data: brand_categories } } ] = yield all([
      call(Api.brand.getDetail, payload),
      call(Api.group_brand.getList, options),
      call(Api.brand_category.getList, options)
    ]);

    Object.assign(data, { transaction_type_cd: data.transaction_type_cd.split('|') });

    // console.log('data', data);
    // console.log('group_brands', group_brands);
    // console.log('brand_categories', brand_categories);

    yield put({
      type: types.GET_BRAND_SUCCESS,
      data,
      group_brands: group_brands.map((x) => ({ label: x.name, value: x.id })),
      brand_categories: brand_categories.map((x) => ({ label: x.name, value: x.id }))
    });
  } catch (error) {
    yield put({
      type: types.GET_BRAND_ERROR,
      error: serverError(error)
    });
  }
}

export const brandSagas = [ takeEvery(types.GET_BRAND_REQUEST, getBrandDetailSaga) ];
