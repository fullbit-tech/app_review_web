import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, Route, hashHistory, IndexRedirect, Redirect } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import promise from 'redux-promise-middleware'
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import reducers from './reducers';
import AppLoader from 'containers/AppLoader';


const middleware = routerMiddleware(hashHistory);
const store = createStore(
  reducers,
  applyMiddleware(middleware, promise(), logger, thunk)
);

const history = syncHistoryWithStore(hashHistory, store);

function scrollToTop() {
  window.scrollTo(0, 0);
}

const rootRoute = {
  childRoutes: [{
    path: '/',
    indexRoute: require('./routes/home'),
    component: require('./containers/App'),
    childRoutes: [
      require('./routes/app'),
      require('./routes/404'),
      require('./routes/500'),
      //require('./routes/confirmEmail'),
      //require('./routes/forgotPassword'),
      require('./routes/login'),
      //require('./routes/signUp'),
      {
        path: '*',
        indexRoute: { onEnter: (nextState, replace) => replace('/404') },
      }
    ]
  }]
};
//test
render(
  <Provider store={store}>
    <AppLoader>
      <Router
        onUpdate={scrollToTop}
        history={history}
        routes={rootRoute}
      />
    </AppLoader>
  </Provider>,
  document.getElementById('app-container')
);
