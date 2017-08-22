import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import App from './containers/App';
import Login from './containers/Login';
import store from './store';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import 'react-select/dist/react-select.css';
import 'react-table/react-table.css';
import './style.css';

// Views
//import Login from './views/Pages/Login/';
import Register from './views/Pages/Register/';
import Page404 from './views/Pages/Page404/';
import Page500 from './views/Pages/Page500/';

import auth from './auth';
function requireAuth(nextState, replaceState) {
  console.log('nextState', nextState);
  if (!auth.loggedIn()) replaceState({ nextPathname: nextState.location.pathname }, '/login');
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )}
  />
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <PrivateRoute path="/" name="Home" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
