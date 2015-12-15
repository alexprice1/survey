import request from 'superagent';

export const SELECT_ANSWER = 'SELECT_ANSWER';
export const GOT_QUESTION = 'GOT_QUESTION';
export const SUBMIT_ANSWER_STATUS = 'SUBMIT_ANSWER_STATUS';
export const SET_QUESTION_FETCH_STATUS = 'SET_QUESTION_FETCH_STATUS';

export function selectAnswer(selectedAnswerId) {
  return {
    type: SELECT_ANSWER,
    selectedAnswerId,
  };
}

export function gotQuestion(question) {
  return {
    type: GOT_QUESTION,
    question,
  };
}

export function questionFetchStatus(status) {
  return {
    type: SET_QUESTION_FETCH_STATUS,
    status,
  };
}

export function getQuestion() {
  return function (dispatcher) {
    dispatcher(questionFetchStatus('pending'));
    request
      .get('/api/questions/random')
      .end(function (error, response) {
        if (error) {
          dispatcher(gotQuestion(null));
        } else {
          dispatcher(gotQuestion(response.body));
        }
      });
  };
}

export function submitAnswerStatus(status) {
  return {
    type: SUBMIT_ANSWER_STATUS,
    status,
  };
}

export function submitAnswer() {
  return function (dispatcher, getState) {
    const applicationInformation = getState().applicationInformation;
    const selectedAnswerId = applicationInformation.get('selectedAnswerId');
    const questionId = applicationInformation.get('question').id;
    if (!selectedAnswerId) {
      return dispatcher(submitAnswerStatus('noAnswer'));;
    }

    dispatcher(submitAnswerStatus('pending'));

    request
      .post('/api/responses')
      .send({
        answerId: selectedAnswerId,
        questionId: questionId,
      })
      .end(function (error) {
        if (error) {
          dispatcher(submitAnswerStatus('error'));
        } else {
          dispatcher(submitAnswerStatus('finished'));
        }
      });
  };
}
