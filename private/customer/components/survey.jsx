import React from 'react';

export default class Customer extends React.Component {
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
    const { question, selectedAnswerId, actions, submitAnswerStatus } = this.props;
    const answers = question.Answers.map((answer, index) => {
      return (
        <div key={index}>
          <label>
            <input type="radio" name="answer" checked={selectedAnswerId === answer.id} onClick={() => actions.selectAnswer(answer.id)}/> {answer.answer}
          </label>
        </div>
      );
    });
    let submitAnswerMessage;
    let submitAnswerDisabled;
    let nextQuestionButton;

    switch (submitAnswerStatus) {
      case 'pending':
        submitAnswerDisabled = true;
        submitAnswerMessage = 'Submitting...';
        break;
      case 'finished':
        submitAnswerDisabled = true;
        submitAnswerMessage = 'Answer Submitted!';

        nextQuestionButton = (
          <button className="button success" onClick={this._handleNextQuestionClick}>
            Next Question
          </button>
        );
        break;
      case 'error':
        submitAnswerDisabled = false;
        submitAnswerMessage = 'There was an error submitting your answer. Try again.';
        break;
      default:
        submitAnswerDisabled = false;
        submitAnswerMessage = 'There was an error submitting your answer. Try again.';
        break;
    }

    return (
      <div>
        <form onSubmit={this._handleFormSubmit}>
          <h3>{question.title}</h3>
          {answers}
          <div className="row">
            <div className="columns small-12 medium-6">
              <button className="button" disabled={submitAnswerDisabled}>Submit Answer</button> {submitAnswerMessage}
            </div>
            <div className="columns small-12 medium-6" style={{ textAlign: 'right' }}>
              {nextQuestionButton}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Customer.propTypes = {
  selectedAnswerId: React.PropTypes.any,
  actions: React.PropTypes.object,
  submitAnswerStatus: React.PropTypes.string,
  question: React.PropTypes.object,
};
