import React from 'react';
import { Link } from 'react-router';

export default class Admin extends React.Component {
  render() {
    window.applicationInformation = this.props.applicationInformation;
    const routeComponent = React.cloneElement(this.props.children, {
      applicationInformation: this.props.applicationInformation,
      actions: this.props.actions,
      params: this.props.params,
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
                  <button type="submit" className="button button-no-margin">Logout</button>
                </form>
              </li>
            </ul>
          </div>
        </div>
        <div>
          {routeComponent}
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  applicationInformation: React.PropTypes.object,
  actions: React.PropTypes.object,
  params: React.PropTypes.object,
  children: React.PropTypes.node,
};
