import { handleActions } from 'redux-actions';

import { GET_BRAND_LIST } from './constants';

const defaultState = { data: [], metadata: { total: 0, offset: 0, limit: 0 } };

const reducer = handleActions(
  {
    [GET_BRAND_LIST]: (state, action) => ({
      ...state,
      ...action.payload
    })
  },
  defaultState
);

export default reducer;
