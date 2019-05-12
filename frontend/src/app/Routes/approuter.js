import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Container } from 'react-bootstrap';
import path from 'path'
import ROUTES from './rootsdirectory';

class AppRouter extends Component {

  render() {
    return (
        <Router>
        <Container
        fluid={true}>
            <Switch>
              <Route exact path={ROUTES.locations.path} component={ROUTES.locations.component} />
              <Route exact path={`${ROUTES.book.path}/:location`} component={ROUTES.book.component} />
              <Route  path='/' component={() => <Redirect to={ROUTES.locations.path}/>} />
            </Switch>
          </Container>
        </Router>


    );
  }
};


export default AppRouter;
