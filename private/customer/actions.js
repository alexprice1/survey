import superagent from 'superagent';

export const SELECT_ANSWER = 'SELECT_ANSWER';
export const GOT_QUESTION = 'GOT_QUESTION';
export const SUBMIT_ANSWER_STATUS = 'SUBMIT_ANSWER_STATUS';

export function selectAnswer(selectedAnswerId) {
  return {
    type: SELECT_ANSWER,
    selectedAnswerId
  };
};

export function gotQuestion(question, error) {
  return {
    type: GOT_QUESTION,
    error,
    question
  };
};

export function getQuestion() {
  return function(dispatcher) {
    superagent
      .get('/api/questions/random')
      .end(function(error, response) {
        if(error) {
          if(response.status === 404) {
            dispatcher(gotQuestion(null));
          } else {
            dispatcher(gotQuestion(null, true));
          }
        } else {
          dispatcher(gotQuestion(response.body));
        }
      });
  };
};

export function submitAnswerStatus(status) {
  return {
    type: SUBMIT_ANSWER_STATUS,
    status
  };
};

export function submitAnswer() {
  return function(dispatcher, getState) {
    dispatcher(submitAnswerStatus('pending'));
    const applicationInformation = getState().applicationInformation;
    const selectedAnswerId = applicationInformation.get('selectedAnswerId');
    const questionId = applicationInformation.get('question').id;
    if(!selectedAnswerId) {
      return;
    }
    superagent
      .post('/api/responses')
      .send({
        answerId: selectedAnswerId,
        questionId: questionId
      })
      .end(function(error, response) {
        if(error) {
          dispatcher(submitAnswerStatus('error'));
        } else {
          dispatcher(submitAnswerStatus('finished'));
        }
      });
  };
}
