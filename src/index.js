import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Instance from './components/Instance.js';
import RequiresAuth from './components/RequiresAuth.js';


ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App>
      <Header />
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <RequiresAuth>
        <Route path="/:owner/:repo/pull/:pullNumber" component={Instance} />
      </RequiresAuth>
      <Footer />
    </App>
  </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
