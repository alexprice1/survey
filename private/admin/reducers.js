import immutable from 'immutable';
import { combineReducers } from 'redux';
import { UPDATE_QUESTION_TITLE, UPDATE_ANSWER, ADD_ANSWER, REMOVE_ANSWER, GOT_QUESTIONS, GOT_QUESTION } from './actions.js';

const initialState = immutable.Map({
  newQuestion: immutable.Map({
    title: 'Question Title',
    answers: immutable.List(['a'])
  }),
  questions: immutable.List(),
  question: immutable.Map()
});

export function applicationInformation(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_QUESTION_TITLE:
      return state.setIn(['newQuestion', 'title'], action.questionTitle);
    case UPDATE_ANSWER:
      return state.setIn(['newQuestion', 'answers', action.answerIndex], action.answer);
    case ADD_ANSWER:
      const answers = state.getIn(['newQuestion', 'answers']).push('');
      return state.setIn(['newQuestion', 'answers'], answers);
    case REMOVE_ANSWER:
      return state.removeIn(['newQuestion', 'answers', action.answerIndex]);
    case GOT_QUESTIONS:
      return state.set('questions', immutable.List(action.questions));
    case GOT_QUESTION:
      return state.set('question', immutable.Map(action.question));
    default:
      return state;
  }
};

export default combineReducers({
  applicationInformation
});