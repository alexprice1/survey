import React from 'react';

export default class NewQuestion extends React.Component {
  render() {
    const { actions } = this.props;
    const answers = this.props.applicationInformation.getIn(['newQuestion', 'answers']);
    const answerNodes = answers.map((answer, index) => {
      return (
        <div key={index}>
          <button disabled={answers.size === 1} onClick={() => actions.removeAnswer(index)}>-</button> <input type="text" value={answer} onChange={(event) => actions.updateAnswer(event.target.value, index)}/>
          <br/>
          <br/>
        </div>
      );
    });

    return (
      <div>
        <h2> Admin </h2>

        <h4> You are the best, now create a question... </h4>
        <label>
          Question  
          <br/>
          <input type="text" value={this.props.applicationInformation.getIn(['newQuestion', 'title'])} onChange={(event) => actions.updateQuestionTitle(event.target.value)}/>
        </label>
        <br/>
        <br/>
        Answers
        <br/>
        {answerNodes}
        <button onClick={actions.addAnswer}>+</button>
        <br/>
        <br/>
        <button onClick={actions.createQuestion}> Create Question </button>
      </div>
    );
  }
};
