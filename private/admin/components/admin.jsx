import React from 'react';
import { Link } from 'react-router';

export default class Dashboard extends React.Component {
  render() { 
    window.applicationInformation = this.props.applicationInformation;
    const routeComponent = React.cloneElement(this.props.children, {
      applicationInformation: this.props.applicationInformation,
      actions: this.props.actions,
      params: this.props.params
    });
    return (
      <div>
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="dropdown menu">
              <li className="menu-text">Admin</li>
              <li>
                <Link to="/questions">Questions</Link>
              </li>
              <li>
                <Link to="/new-question">New Question</Link>
              </li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <li>
                <form action="/logout" method="post">
                  <button type="submit" className="button">Logout</button>
                </form>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          {routeComponent}
        </div>
      </div>
    );
  }
};
