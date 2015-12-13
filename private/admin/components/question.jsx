import React from 'react';

export default class Question extends React.Component {
  componentDidMount() {
    this.props.actions.getQuestion(this.props.params.id);
  }

  render() {
    console.log(this.props.applicationInformation.toJS());
    return (
      <div>
        <h2> Question </h2>
      </div>
    );
  }
};
