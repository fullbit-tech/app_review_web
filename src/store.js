import { applyMiddleware, createStore } from 'redux'

import promise from 'redux-promise-middleware'
import logger from 'redux-logger'
import thunk from 'redux-thunk';

import reducer from './reducer'


const middleware = applyMiddleware(promise(), logger, thunk);
const store = createStore(reducer, middleware);


export default store;
