import React from 'react';

export default class NewQuestion extends React.Component {
  render() {
    const { actions } = this.props;
    const newQuestionStatus = this.props.applicationInformation.get('newQuestionStatus');
    const answers = this.props.applicationInformation.getIn(['newQuestion', 'answers']);
    let newQuestionMessage;
    let disableCreateQuestion;

    const answerNodes = answers.map((answer, index) => {
      return (
        <div className="input-group" key={index}>
          <div className="input-group-button">
            <button className="button alert" disabled={answers.size === 1} onClick={() => actions.removeAnswer(index)}>-</button>
          </div>
          <input className="button-no-margin" type="text" value={answer.get('answer')} onChange={(event) => actions.updateAnswer(event.target.value, index)}/>
        </div>
      );
    });

    switch (newQuestionStatus) {
      case 'noTitle':
        newQuestionMessage = 'You must provide a question.';
        disableCreateQuestion = false;
        break;
      case 'blankAnswer':
        newQuestionMessage = 'None of your answers can be blank.';
        disableCreateQuestion = false;
        break;
      case 'pending':
        newQuestionMessage = 'Creating...';
        disableCreateQuestion = true;
        break;
      case 'error':
        newQuestionMessage = 'There was an error creating your question. Try again.';
        disableCreateQuestion = false;
        break;
      case 'finished':
        newQuestionMessage = 'Created!';
        disableCreateQuestion = false;
        break;
      default:
        disableCreateQuestion = false;
        break;
    }

    return (
      <div>
        <div className="row">
          <div className="columns small-12">
            <h3> New Question </h3>
            <label>
              Question
              <textarea type="text" value={this.props.applicationInformation.getIn(['newQuestion', 'title'])} onChange={(event) => actions.updateQuestionTitle(event.target.value)}/>
            </label>
            <br/>
            Answers
            <br/>
            {answerNodes}
          </div>
        </div>
        <div className="row">
          <div className="columns small-2">
            <button className="button success" onClick={actions.addAnswer}>+</button>
          </div>
          <div className="columns small-10 text-right">
            <button className="button button-no-margin" disabled={disableCreateQuestion} onClick={actions.createQuestion}> Create Question </button>
          </div>
        </div>
        <div className="row">
          <div className="columns small-12 text-right">
             {newQuestionMessage}
          </div>
        </div>
      </div>
    );
  }
}

NewQuestion.propTypes = {
  applicationInformation: React.PropTypes.object,
  actions: React.PropTypes.object,
  params: React.PropTypes.object,
  children: React.PropTypes.node,
};
