import { combineReducers } from 'redux';
import immutable from 'immutable';
import { SELECT_ANSWER , GOT_QUESTION, SUBMIT_ANSWER_STATUS } from './actions.js';

const initialState = immutable.Map({
  question: {
    title: '',
    Answers: []
  },
});

export function applicationInformation(state = initialState, action = {}) {
  switch (action.type) {
    case SELECT_ANSWER:
      return state.set('selectedAnswerId', action.selectedAnswerId);
    case GOT_QUESTION:
      return state.set('question', action.question).set('submitAnswerStatus', undefined);
    case SUBMIT_ANSWER_STATUS:
      return state.set('submitAnswerStatus', action.status);
    default:
      return state;
  }
};

export default combineReducers({
  applicationInformation
});