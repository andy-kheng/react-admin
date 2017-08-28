import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import rootReducers from './reducers';
import rootSagas from './sagas';

const env = process.env.NODE_ENV === `development`;
const devTool = env ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : {};

const sagaMiddleware = createSagaMiddleware();
const middlewares = [ thunk, sagaMiddleware ];
const store = compose(applyMiddleware(...middlewares), devTool)(createStore)(rootReducers);

sagaMiddleware.run(rootSagas);

export default store;
