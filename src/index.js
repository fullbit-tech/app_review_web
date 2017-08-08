import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import PublicHeader from './components/public/Header.js';
import PublicFooter from './components/public/Footer.js';
import Dashboard from './components/Dashboard.js';
import DashboardHeader from './components/dashboard/Header.js';
import DashboardFooter from './components/dashboard/Footer.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Instance from './components/Instance.js';
import Instances from './components/Instances.js';
import Recipe from './components/Recipe.js';
import RequiresAuth from './components/RequiresAuth.js';
import Public from './components/Public.js';


ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App>
      <Public>
        <PublicHeader />
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <PublicFooter />
      </Public>
      <RequiresAuth>
        <DashboardHeader />
        <Dashboard>
          <Route path="/:owner/:repo/pull/:pullNumber" component={Instance} />
          <Route path="/recipe/:recipeId" component={Recipe} />
          <Route exact path="/recipes" component={Recipe} />
          <Route exact path="/instances" component={Instances} />
        </Dashboard>
        <DashboardFooter />
      </RequiresAuth>
    </App>
  </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
