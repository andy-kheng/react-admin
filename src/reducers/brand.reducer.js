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
import _ from 'lodash';
import { createAction, handleActions } from 'redux-actions';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import Api, { serverError } from '../api';

export const types = {
  INITIALIZE_BRAND: 'app/BRAND/INITIALIZE_BRAND',

  GET_BRAND_REQUEST: 'app/BRAND/GET_BRAND_REQUEST',
  GET_BRAND_SUCCESS: 'app/BRAND/GET_BRAND_SUCCESS',
  GET_BRAND_ERROR: 'app/BRAND/GET_BRAND_ERROR',

  SUBMIT_BRAND_REQUEST: 'app/BRAND/SUBMIT_BRAND_REQUEST',
  SUBMIT_BRAND_SUCCESS: 'app/BRAND/SUBMIT_BRAND_SUCCESS',
  SUBMIT_BRAND_ERROR: 'app/BRAND/SUBMIT_BRAND_ERROR'
};

export const actions = {
  initBrand: createAction(types.GET_BRAND_SUCCESS),
  getBrand: createAction(types.GET_BRAND_REQUEST),
  submitBrand: createAction(types.SUBMIT_BRAND_REQUEST)
};

export const initialState = {
  loading: true,
  error: null,
  data: {
    banner_file_name: '',
    brand_category_ids: [],
    group_brand_id: '',
    locales: {},
    logo_file_name: '',
    name: '',
    sector_cd: '',
    transaction_type_cd: '',
    vat: '',
    vat_method: ''
  }
};

export default handleActions(
  {
    [types.INITIALIZE_BRAND]: (state) => ({ ...state, loading: false }),
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
    const { brand_id } = payload || {};
    const brand = brand_id ? yield call(Api.Brand.getDetail, brand_id) : initialState.data;

    const options = { status_cd: 'ACT', order: '-name', limit: 1000 };
    const [ { data: group_brands }, { data: brand_categories }, { data: languages } ] = yield all([
      call(Api.GroupBrand.getList, options),
      call(Api.BrandCategory.getList, options),
      call(Api.Language.getList)
    ]);

    console.log('languages', languages);
    const locales = {};
    languages.forEach(({ language_name, language_code }) => {
      const { name = '' } = brand.locales[language_code] || {};
      locales[language_code] = { name, language_name };
    });
    Object.assign(brand, { transaction_type_cd: brand.transaction_type_cd.split('|'), locales });
    console.log('new brand', brand);

    yield put({
      type: types.GET_BRAND_SUCCESS,
      data: brand,
      group_brands: group_brands.map((x) => ({ label: x.name, value: x.id })),
      brand_categories: brand_categories.map((x) => ({ label: x.name, value: x.id }))
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_BRAND_ERROR,
      error: serverError(error)
    });
  }
}

export const brandSagas = [ takeEvery(types.GET_BRAND_REQUEST, getBrandDetailSaga) ];
