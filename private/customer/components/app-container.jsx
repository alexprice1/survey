import React from 'react';

export default class AppContainer extends React.Component {
  render() {
    const { applicationInformation } = this.props;
    const routeComponent = React.cloneElement(this.props.children, {
      question: applicationInformation.get('question'),
      submitAnswerStatus: applicationInformation.get('submitAnswerStatus'),
      selectedAnswerId: applicationInformation.get('selectedAnswerId'),
      actions: this.props.actions,
    });

    return (
      <div>
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="dropdown menu">
              <li className="menu-text">Survey</li>
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
}

AppContainer.propTypes = {
  applicationInformation: React.PropTypes.object,
  actions: React.PropTypes.object,
  children: React.PropTypes.node,
};
