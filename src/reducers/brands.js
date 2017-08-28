import { createAction, handleActions } from 'redux-actions';

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
  _resetList: createAction(types.RESET_BRAND)
};

export const initialState = { loading: true, data: [], page: 0, error: null };

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
