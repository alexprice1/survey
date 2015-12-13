import React from 'react';
import { Link } from 'react-router';

export default class Questions extends React.Component {
  componentDidMount() {
    this.props.actions.getQuestions();
  }

  render() {
    const questions = this.props.applicationInformation.get('questions').map(function(question, index) {
      return (
        <li key={index}><Link to={`/questions/${question.id}`}>{question.title}</Link></li>
      );
    });

    return (
      <div>
        <h2> Questions </h2>
        <ul>
          {questions}
        </ul>
      </div>
    );
  }
};
