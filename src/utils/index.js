/**
 * Return an error object for all reducer in container
 * Note: Use with handleActions of type reducerMap
 *
 * @param {object} state Any previous state
 * @param {object} action Values of createAction in redux-actions
 * @returns {object}
 */
export function ReducerError(state, action) {
  // console.log('onError', state);
  console.log('onError', action);
  const { error, type, payload } = action;
  const { status, statusText, message, data } = payload.response;
  const { message: responseMessage, stack } = data;
  return {
    ...state,
    loading: false,
    type,
    serverError: { status, statusText, stack, message: responseMessage || message }
  };
}
