/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state. To add a new action, add it to the handle actions function.
 *
 * NOTE: We use redux-actions along side with redux-promise. 'throw' function generally
 *       use [ReducerError] function in utils folder to throw error on API request
 *       example with 'fn1' below does not support with arrow function
 *
 * Example:
 * const reducer = handleActions(
 *   {
 *     [YOUR_ACTION_CONSTANT]: (state, action) => ({ ...state, ...action }),
 *     [YOUR_ACTION_CONSTANT]: fn1,
 *     [YOUR_ACTION_CONSTANT]: { next: fn1, throw: ReducerError }
 *   },
 *   defaultState
 * );
 * function fn1 () {...}
 */

import { handleActions } from 'redux-actions';
import { CREATE_BRAND, INITIALIZE_BRAND, GET_BRAND } from './constants';
import { ReducerError } from '../../utils/';

const defaultState = {
  loading: true,
  error: false,
  payload: {},
  server: {}
};

//export default reducer;
export default handleActions(
  {
    //[CREATE_BRAND]: (state, action) => ({ ...state, ...action }),
    [INITIALIZE_BRAND]: initialize,
    [GET_BRAND]: { next: get, throw: ReducerError }
  },
  defaultState
);

function get(state, action) {
  console.log('app:brand_edit:get_brand', action);
  const { data } = action.payload;
  const { transaction_type_cd } = data;
  Object.assign(data, { transaction_type_cd: transaction_type_cd ? transaction_type_cd.split('|') : '' });
  return { ...state, loading: false, payload: data };
}

const initialize = (state, action) => {
  return {
    ...state,
    loading: false,
    payload: {}
  };
};
