import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as MobXProvider } from 'mobx-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import DevTools from 'mobx-react-devtools';
import App from './containers/App';
import Login from './containers/Login';
import store from './store';

import CounterStore from './stores/counter.store'

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import 'react-select/dist/react-select.css';
import 'react-table/react-table.css';
import 'react-datetime/css/react-datetime.css';

import './style.css';

// import auth from './auth';
// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       auth.isAuthenticated() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//       )}
//   />
// );

ReactDOM.render(
  <div><DevTools />
  <ReduxProvider store={store}>
      <BrowserRouter>
          <MobXProvider
            counterStore={new CounterStore()}
          >
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route path="/" name="Home" component={App} />
            </Switch>

          </MobXProvider>
      </BrowserRouter>

  </ReduxProvider></div>,
  document.getElementById('root')
);

registerServiceWorker();
