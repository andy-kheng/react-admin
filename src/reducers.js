import { combineReducers } from 'redux';
import { reducer as fromReducer } from 'redux-form';

import brandEditReducer from './containers/BrandEdit/reducer';
import brandListReducer from './containers/BrandList/reducer';

const rootReducer = combineReducers({
  brandDetail: brandEditReducer,
  brandList: brandListReducer,
  form: fromReducer
});

export default rootReducer;
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
