import React from 'react';

export default class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  submitAnswer(event) {
    event.preventDefault();
  }

  render() {
    const { question, actions, selectedAnswerId } = this.props;
    const answers = question.answers.map((answer, index) => {
      return (
        <div key={index}>
          <label>
            <input type='radio' name="answer" checked={selectedAnswerId === answer.id} onClick={() => actions.selectAnswer(answer.id)}/> {answer.answer}
          </label>
          <br/>
        </div>
      );
    });

    return (
      <div>
        <h2>Welcome to our amazing Survey! Here is your first question.</h2>
        <form onSubmit={this.submitAnswer}>
          <h4>{question.question}</h4>
          {answers}
          <br/>
          <button>Submit Answer</button>
        </form>
      </div>
    );
  }
};