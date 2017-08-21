/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { createAction } from 'redux-actions';
import { GET_BRAND_LIST, SET_LOADING_LIST } from './constants';
import { onGetBrandList } from '../../server/brand';

export const setLoadingList = createAction(SET_LOADING_LIST);
export const getBrandList = createAction(GET_BRAND_LIST, onGetBrandList);
