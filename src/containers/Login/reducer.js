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
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from './constants';

const defaultState = {

};

export default handleActions(
  {
    [LOGIN_REQUEST]: (state, action) => ({ ...state, ...action }),
    [LOGIN_SUCCESS]: (state, action) => ({ ...state, ...action }),
    [LOGIN_FAILURE]: (state, action) => ({ ...state, ...action }),
  },
  defaultState
);
