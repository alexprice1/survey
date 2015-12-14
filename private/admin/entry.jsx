'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect } from 'react-router';
import reducers from './reducers';
import * as actions from './actions';
import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import createBrowserHistory from 'history/lib/createHashHistory';
import Admin from './components/admin';
import NewQuestion from './components/new-question';
import Questions from './components/questions';
import Question from './components/question';
import thunk from 'redux-thunk';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

const ConnectedAdmin = connect(mapStateToProps, mapDispatchToProps)(Admin);

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
        <Route component={ConnectedAdmin}>
          <Route component={NewQuestion} path="/new-question"/>
          <Route component={Questions} path="/questions"/>
          <Route component={Question} path="/questions/:id"/>
        </Route>
        <Redirect from="*" to="/questions" />
      </Router>
    </Provider>,
  document.getElementById('react-entry')
);
