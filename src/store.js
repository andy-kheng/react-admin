import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducers from './reducers';

const env = process.env.NODE_ENV === `development`;
const middlewares = [ promise ];

if (env) {
  // Logger for Redux
  // const { logger } = require(`redux-logger`);
  // middlewares.push(logger);
}

const devTool = env ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : {};

export default compose(applyMiddleware(...middlewares), devTool)(createStore)(reducers);
