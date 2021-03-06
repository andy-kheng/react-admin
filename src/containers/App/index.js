import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';

import { Breadcrumb, Header, Sidebar, Aside, Footer } from '../../components';
import routes from '../../routes';
//import Page404 from '../../views/Pages/Page404/';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <NotificationsSystem theme={theme} />
        <Header />
        <div className='app-body'>
          <Sidebar {...this.props} />
          <main className='main'>
            <Breadcrumb />
            <Container fluid>
              <Switch>
                {routes.map((route, index) => (
                  <Route key={index} path={route.path} exact={route.exact} component={route.component} />
                ))}
                {/* <Route path='*' name='Page 404' component={Page404} /> */}
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
