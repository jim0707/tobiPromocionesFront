import { createStore, applyMiddleware } from 'redux';
// import reducers from '../reducers/reducerApp';
import thunkMiddleware from 'redux-thunk';
import { sessionService, sessionReducer } from 'redux-react-session';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './../reducers/reducers.js';
import logger from 'redux-logger';

const middleware = applyMiddleware(logger, thunkMiddleware);

const store = createStore(
	reducers,
	composeWithDevTools(middleware)
);
console.log('store: ', store.getState());

export default store;