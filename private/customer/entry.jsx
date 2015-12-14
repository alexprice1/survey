'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect } from 'react-router';
import reducers from './reducers';
import * as actions from './actions';
import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import createBrowserHistory from 'history/lib/createHashHistory';
import AppContainer from './components/app-container';
import Customer from './components/survey';
import thunk from 'redux-thunk';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

const ConnectedAppContainer = connect(mapStateToProps, mapDispatchToProps)(AppContainer);

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

const store = createStoreWithMiddleware(reducers);

const history = createBrowserHistory({
  queryKey: false
});

ReactDOM.render(
  <Provider store={store}>
      <Router history={history}>
        <Route component={ConnectedAppContainer}>
          <Route component={Customer} path="/"/>
        </Route>
        <Redirect from="*" to="/" />
      </Router>
    </Provider>,
  document.getElementById('react-entry')
);
