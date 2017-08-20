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

import axios from 'axios';
import { createAction, createActions } from 'redux-actions';
import { GET_BRAND_LIST } from './constants';

// export function getBrandList() {
//   return {
//     type: GET_BRAND_LIST,
//     payload: request
//   };
// }

const request = axios({
  url: 'https://apidev.tesjor.com/v4/admin/brands/',
  headers: {
    Token: 'Bearer 7a283fc9ce663fc14e0ef905c8aa5112aa08babc',
    'X-Auth':
      'Bearer NDJmODU1OTJhYjFkNDU2YmJkNDJiZjFjMWI0NDA5X2FkbWluNGJlODY3NDY3M2QwNDM4ZTk2MDFkMDEyMDQ2NjExOGU4YzE4OTM0MGRiMGVlOGRmY2M5NmRiNGNjYWJlOGNmNDg5ZTY4NDk3OjNCM0FFRDNDLUEyRDYtNDYxNC04RTYxLThFQkQxNUNERUU5NA==',
    'Content-Type': 'application/json',
    'Uses-Id': 123456,
    'Local-Timezone': 'Asia/Phnom_Penh',
    'App-Type': 'client',
    'App-Version': 1,
    'Device-Name': 'shit',
    Model: 'shit',
    'Os-version': 'xxx',
    Platform: '123',
    'Language-code': 'EN'
  }
});

export const getBrandList = createAction(GET_BRAND_LIST, async () => {
  console.log('================get list');
  const res = await request;
  console.log(res);
  return res.data;
});
