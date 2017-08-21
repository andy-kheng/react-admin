import { mapValues, keyBy } from 'lodash';
import indicative from 'indicative';

/**
 * Return an error object for all reducer in container.
 * Note: Use with handleActions of type reducerMap.
 *
 * @param {object} state Any previous state
 * @param {object} action Values of createAction in redux-actions
 * @returns {object}
 */
export function ReducerError(state, action) {
  // console.log('onError', state);
  // console.log('onError', action);
  const { type, payload } = action;
  const { status, statusText, message, data } = payload.response;
  const { message: responseMessage, stack } = data;
  return {
    ...state,
    loading: false,
    type,
    serverError: { status, statusText, stack, message: responseMessage || message }
  };
}

/**
 * Custom validator for redux-form with asyncValidate.
 * http://indicative.adonisjs.com/
 *
 * NOTE: When using this validator, you must implement shouldAsyncValidate function below to check on first time submit.
 *
 * @param {object} data
 * @param {object} rules
 * @param {object} [messages={}]
 * @returns {object} {field: message}
 */
export async function validate(data, rules, messages = {}) {
  messages = {
    ...{
      alpha_numeric: 'The {{field}} field can only contain letters and numbers.',
      boolean: 'The {{field}} field must be true or false.',
      date_format: 'The {{field}} field has an invalid date format.',
      email: 'The {{field}} provided is not a valid email address.',
      integer: 'The {{field}} must be an integer.',
      max: 'The {{field}} field is too long.',
      min: 'The {{field}} field is too short.',
      required: 'The {{field}} field is required.',
      string: 'The {{field}} field must be a string'
    },
    ...messages
  };
  try {
    await indicative.validateAll(data, rules, messages);
    return {};
  } catch (errors) {
    return mapValues(keyBy(errors, 'field'), 'message');
  }
}

/**
 * An optional function you may provide to have full control over when async validation happens.
 * http://redux-form.com/6.7.0/docs/api/ReduxForm.md/
 *
 * NOTE: Use this functions in redux-form when do asyncValidate.
 *
 * @param {object} { trigger, syncValidationPasses }
 * @returns {boolean}
 */
export function shouldAsyncValidate({ trigger, syncValidationPasses }) {
  return !syncValidationPasses ? false : [ 'blur', 'submit' ].includes(trigger) ? true : false;
}
