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
import { Login } from '../../server/auth';

export const REQUEST_LOGIN = 'app/Login/REQUEST_LOGIN';
export const requestLogin = createAction(REQUEST_LOGIN, Login);
