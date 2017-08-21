/*
 * AppActions
 *
 * Actions change things in your application.
 * We have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * NOTE: We use redux-actions along side with redux-promise to do async / await
 *  Async action creators
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export const yourAction =  createAction('YOUR_ACTION_CONSTANT', async () => {})
 */
// import { createAction } from 'redux-actions';
// export const yourAction = createAction('YOUR_ACTION_CONSTANT', () => {});

import { createAction } from 'redux-actions';
import auth from '../../server/auth';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from './constants';

export const requestLogin = createAction(LOGIN_REQUEST, auth.Auth);
export const receiveLogin = createAction(LOGIN_SUCCESS, () => {});
export const loginError = createAction(LOGIN_FAILURE, () => {});
