import superagent from 'superagent'; 

export const UPDATE_QUESTION_TITLE = 'UPDATE_QUESTION_TITLE';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';
export const ADD_ANSWER = 'ADD_ANSWER';
export const REMOVE_ANSWER = 'REMOVE_ANSWER';
export const CREATE_QUESTION_FINISHED = 'CREATE_QUESTION_FINISHED';
export const GOT_QUESTIONS = 'GOT_QUESTIONS';
export const GOT_QUESTION = 'GOT_QUESTION';

export function updateQuestionTitle(questionTitle) {
  return {
    type: UPDATE_QUESTION_TITLE,
    questionTitle
  };
};

export function updateAnswer(answer, answerIndex) {
  return {
    type: UPDATE_ANSWER,
    answer,
    answerIndex
  };
};

export function addAnswer() {
  return {
    type: ADD_ANSWER
  };
};

export function removeAnswer(answerIndex) {
  return {
    type: REMOVE_ANSWER,
    answerIndex
  };
};

export function createQuestionFinished() {
  return {
    type: CREATE_QUESTION_FINISHED
  }
};

export function gotQuestions(questions) {
  return {
    type: GOT_QUESTIONS,
    questions
  };
};

export function gotQuestion(question) {
  return {
    type: GOT_QUESTION,
    question
  };
};

export function getQuestions() {
  return function(dispatcher) {
    superagent
      .get('/api/questions')
      .end(function(err, response) {
        dispatcher(gotQuestions(response.body));
      });
  }
};

export function getQuestion(questionId) {
  return function(dispatcher) {
    superagent
      .get(`/api/questions/results/${questionId}`)
      .end(function(err, response) {
        dispatcher(gotQuestion(response.body));
      });
  }
};

export function createQuestion() {
  return function(dispatcher, getState) {
    const question = getState().applicationInformation.get('newQuestion').toJS();
    superagent
      .post('/api/questions')
      .send(question)
      .end(function(err, response) {
        console.log('done', arguments);
      });
  };
};
