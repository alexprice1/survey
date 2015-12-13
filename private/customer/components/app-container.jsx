import React from 'react';

export default class AppContainer extends React.Component {
  render() {
    const routeComponent = React.cloneElement(this.props.children, {
      question: this.props.applicationInformation.question,
      selectedAnswerId: this.props.applicationInformation.selectedAnswerId,
      actions: this.props.actions
    });

    return (
      <div>
        {routeComponent}
      </div>
    );
  }
};