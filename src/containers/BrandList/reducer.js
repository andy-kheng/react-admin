import { handleActions } from 'redux-actions';

import { GET_BRAND_LIST, SET_LOADING_LIST } from './constants';

const defaultState = { loading: true, page: 0, data: [] };

const reducer = handleActions(
  {
    [GET_BRAND_LIST]: getBrandList,
    [SET_LOADING_LIST]: (state) => ({ ...state, loading: true })
  },
  defaultState
);

export default reducer;

function getBrandList(state, action) {
  const { data: responseData } = action.payload;
  const { data, metadata: { total, limit } } = responseData;
  return { ...state, loading: false, data, page: Math.ceil(total / limit) };
}
