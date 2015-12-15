import React from 'react';

export default class Question extends React.Component {
  componentDidMount() {
    this.props.actions.getQuestion(this.props.params.id);
  }

  renderPercent(responseCount, totalResponses) {
    if (!totalResponses || !responseCount) {
      return '0%';
    }

    const percent = Math.floor(responseCount / totalResponses * 10000) / 100;
    return `${percent}%`;
  }

  render() {
    const question = this.props.applicationInformation.get('question');
    const { totalResponses } = question;
    const answers = (question.Answers || []).map((answer, index) => {
      return (
        <tr key={index}>
          <td>{answer.answer}</td>
          <td>{answer.responseCount}</td>
          <td>{this.renderPercent(answer.responseCount, totalResponses)}</td>
        </tr>
      );
    });

    return (
      <div>
        <h3> {question.title} </h3>
        <table className="admin-full-width">
          <thead>
            <tr>
              <th>Answer</th>
              <th>Responses</th>
              <th>Percent</th>
            </tr>
          </thead>
          <tbody>
            {answers}
          </tbody>
        </table>
      </div>
    );
  }
}

Question.propTypes = {
  applicationInformation: React.PropTypes.object,
  actions: React.PropTypes.object,
  params: React.PropTypes.object,
};
