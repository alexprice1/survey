import React from 'react';
import SurveyQuestion from './survey-question';

export default class Survey extends React.Component {
  constructor(props) {
    super(props);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleNextQuestionClick = this._handleNextQuestionClick.bind(this);
  }

  componentDidMount() {
    this.props.actions.getQuestion();
  }

  _handleFormSubmit(event) {
    event.preventDefault();
    this.props.actions.submitAnswer();
  }

  _handleNextQuestionClick(event) {
    event.preventDefault();
    this.props.actions.getQuestion();
  }

  render() {
    const { question, questionFetchStatus } = this.props;

    if (question && question.Answers.size !== 0) {
      return <SurveyQuestion {...this.props}/>;
    }

    const questionStatusMessage = questionFetchStatus === 'pending' ? 'Loading...' : 'You either have answered all the questions, or there are no questions yet.';

    return (
      <div>
        <h4>{questionStatusMessage}</h4>
      </div>
    );
  }
}

Survey.propTypes = {
  selectedAnswerId: React.PropTypes.any,
  actions: React.PropTypes.object,
  submitAnswerStatus: React.PropTypes.string,
  question: React.PropTypes.object,
  questionFetchStatus: React.PropTypes.string,
};
