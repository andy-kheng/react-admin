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
import API, { serverError } from '../api';

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
  locale_fields: [],
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
  const log = console.log;
  try {
    const { brand_id } = payload || {};
    const brand = brand_id ? yield call(API.Brand.getDetail, brand_id) : initialState.data;

    const options = { status_cd: 'ACT', order: '-name', limit: 1000 };
    const [ { data: group_brands }, { data: brand_categories }, { data: languages } ] = yield all([
      call(API.GroupBrand.getList, options),
      call(API.BrandCategory.getList, options),
      call(API.Language.getList)
    ]);

    log('languages', languages);
    const locales = {};
    const locale_fields = [];
    languages.forEach(({ language_name, language_code }) => {
      const { name = '' } = brand.locales[language_code] || {};
      locales[language_code] = { name, language_name };
      locale_fields.push({
        label: `Name in ${language_name}`,
        name: `locales.${language_code}.name`
      });
    });
    Object.assign(brand, { transaction_type_cd: brand.transaction_type_cd.split('|'), locales });
    log('new brand', brand);

    yield put({
      type: types.GET_BRAND_SUCCESS,
      data: brand,
      locale_fields,
      group_brands: group_brands.map((x) => ({ label: x.name, value: x.id })),
      brand_categories: brand_categories.map((x) => ({ label: x.name, value: x.id }))
    });
  } catch (error) {
    log(error);
    yield put({
      type: types.GET_BRAND_ERROR,
      error: serverError(error)
    });
  }
}

export const brandSagas = [ takeEvery(types.GET_BRAND_REQUEST, getBrandDetailSaga) ];
