import superagent from 'superagent'; 

export const UPDATE_QUESTION_TITLE = 'UPDATE_QUESTION_TITLE';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';
export const ADD_ANSWER = 'ADD_ANSWER';
export const REMOVE_ANSWER = 'REMOVE_ANSWER';
export const CREATE_QUESTION_FINISHED = 'CREATE_QUESTION_FINISHED';
export const GOT_QUESTIONS = 'GOT_QUESTIONS';
export const GOT_QUESTION = 'GOT_QUESTION';
export const SET_NEW_QUESTION_STATUS = 'SET_NEW_QUESTION_STATUS';

export function updateQuestionTitle(questionTitle) {
  console.log('update', new Error().stack);
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

export function setNewQuestionStatus(status) {
  return {
    type: SET_NEW_QUESTION_STATUS,
    status
  };
};

export function createQuestion() {
  return function(dispatcher, getState) {
    const question = getState().applicationInformation.get('newQuestion').toJS();

    if(!question.title) {
      return dispatcher(setNewQuestionStatus('noTitle'));
    }

    for(let i = 0; i < question.answers.length; i++) {
      if(!question.answers[i].answer) {
        return dispatcher(setNewQuestionStatus('blankAnswer')); 
      }
    }

    dispatcher(setNewQuestionStatus('pending'));

    superagent
      .post('/api/questions')
      .send(question)
      .end(function(err, response) {
        if(err) {
          dispatcher(setNewQuestionStatus('error'));
        } else {
          dispatcher(setNewQuestionStatus('finished'));
        }
      });
  };
};
