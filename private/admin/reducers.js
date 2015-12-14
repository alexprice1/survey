import immutable from 'immutable';
import { combineReducers } from 'redux';
import { UPDATE_QUESTION_TITLE, UPDATE_ANSWER, ADD_ANSWER, REMOVE_ANSWER, GOT_QUESTIONS, GOT_QUESTION, SET_NEW_QUESTION_STATUS } from './actions.js';

const initialState = immutable.Map({
  newQuestion: immutable.Map({
    title: '',
    answers: immutable.List([
      newAnswer()
    ])
  }),
  questions: immutable.List(),
  question: {}
});

function newAnswer() {
  return immutable.Map({
    isCorrectQuestion: false,
    answer: ''
  });
}

export function applicationInformation(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_QUESTION_TITLE:
      return state.setIn(['newQuestion', 'title'], action.questionTitle);
    case UPDATE_ANSWER:
      return state.setIn(['newQuestion', 'answers', action.answerIndex, 'answer'], action.answer);
    case ADD_ANSWER:
      const answers = state.getIn(['newQuestion', 'answers']).push(newAnswer());
      return state.setIn(['newQuestion', 'answers'], answers);
    case REMOVE_ANSWER:
      return state.removeIn(['newQuestion', 'answers', action.answerIndex]);
    case GOT_QUESTIONS:
      return state.set('questions', immutable.List(action.questions));
    case GOT_QUESTION:
      return state.set('question', action.question);
    case SET_NEW_QUESTION_STATUS:
      return state.set('newQuestionStatus', action.status);
    default:
      return state;
  }
};

export default combineReducers({
  applicationInformation
});