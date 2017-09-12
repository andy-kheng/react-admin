import { createAction, handleActions } from 'redux-actions';

export const types = {
  GET_RESTAURANTS_REQUEST: 'app/RESTAURANTS/GET_RESTAURANTS_REQUEST',
  GET_RESTAURANTS_SUCCESS: 'app/RESTAURANTS/GET_RESTAURANTS_SUCCESS',
  GET_RESTAURANTS_FAILURE: 'app/RESTAURANTS/GET_RESTAURANTS_FAILURE',
  //=====================================================
  REMOVE_RESTAURANT_REQUEST: 'app/RESTAURANT/REMOVE_RESTAURANT_REQUEST',
  REMOVE_RESTAURANT_SUCCESS: 'app/RESTAURANT/REMOVE_RESTAURANT_SUCCESS',
  //=====================================================
  RESET_RESTAURANT: 'app/RESTAURANTS/RESET_RESTAURANT'
};

export const actions = {
  getList: createAction(types.GET_RESTAURANTS_REQUEST),
  removeRestaurant: createAction(types.REMOVE_RESTAURANT_REQUEST),
  _resetList: createAction(types.RESET_RESTAURANT)
};

export const initialState = { loading: true, data: [], page: 0, error: null };

export default handleActions(
  {
    [types.RESET_RESTAURANT]: () => initialState,
    [types.GET_RESTAURANTS_REQUEST]: (state) => ({ ...state, loading: true }),
    [types.GET_RESTAURANTS_SUCCESS]: (state, { data, page }) => ({ ...state, loading: false, data, page }),
    [types.GET_RESTAURANTS_FAILURE]: (state, { error }) => ({ ...state, loading: false, error }),
    [types.REMOVE_RESTAURANT_SUCCESS]: ({ data }, { restaurant_id }) => ({
      data: data.map((x) => Object.assign(x, x.id === restaurant_id ? { status_cd: 'DEL' } : {}))
    })
  },
  initialState
);
