import React from 'react';
import { Link } from 'react-router';

export default class Questions extends React.Component {
  componentDidMount() {
    this.props.actions.getQuestions();
  }

  render() {
    const questions = this.props.applicationInformation.get('questions').map(function (question, index) {
      return (
        <li key={index}><Link to={`/questions/${question.id}`}>{question.title}</Link></li>
      );
    });
    let noQuestionsNode;
    if (!questions.size) {
      noQuestionsNode = (
        <div>
          You have not create any questions yet! <Link to="/new-question">Create A Question</Link>.
        </div>
      );
    }

    return (
      <div>
        <h3> Questions </h3>
        <ul>
          {questions}
        </ul>
        {noQuestionsNode}
      </div>
    );
  }
}

Questions.propTypes = {
  applicationInformation: React.PropTypes.object,
  actions: React.PropTypes.object,
};
