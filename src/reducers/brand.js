import { createAction, handleActions } from 'redux-actions';

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
  meal_times: [
    {
      label_end: 'Breakfast End Time',
      label_start: 'Breakfast Start Time',
      name_end: 'meal_times.MTB.end_time',
      name_start: 'meal_times.MTB.start_time'
    },
    {
      label_end: 'Lunch End Time',
      label_start: 'Lunch Start Time',
      name_end: 'meal_times.MTL.end_time',
      name_start: 'meal_times.MTL.start_time'
    },
    {
      label_end: 'Dinner End Time',
      label_start: 'Dinner Start Time',
      name_end: 'meal_times.MTD.end_time',
      name_start: 'meal_times.MTD.start_time'
    }
  ],
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
    [types.GET_BRAND_SUCCESS]: (state, action) => ({ ...state, ...action, loading: false }),
    [types.GET_BRAND_ERROR]: (state, action) => ({ ...state, ...action, loading: false })
  },
  initialState
);
