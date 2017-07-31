import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";


ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </App>
  </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
