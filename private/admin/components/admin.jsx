import React from 'react';
import { Link } from 'react-router';

export default class Dashboard extends React.Component {
  render() {
    const routeComponent = React.cloneElement(this.props.children, {
      applicationInformation: this.props.applicationInformation,
      actions: this.props.actions,
      params: this.props.params
    });
    return (
      <div>
        <Link to="/">Add A New Question</Link>&nbsp;
        <Link to="/questions">Questions</Link>
        {routeComponent}
      </div>
    );
  }
};
