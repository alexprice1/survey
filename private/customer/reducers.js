import { combineReducers } from 'redux';
import Immutable from 'immutable';
import { SELECT_ANSWER, GOT_QUESTION, SUBMIT_ANSWER_STATUS, SET_QUESTION_FETCH_STATUS } from './actions.js';

const initialState = Immutable.Map();

export function applicationInformation(state = initialState, action = {}) {
  switch (action.type) {
    case SELECT_ANSWER:
      return state.set('selectedAnswerId', action.selectedAnswerId);
    case GOT_QUESTION:
      return state.set('question', action.question).set('submitAnswerStatus', undefined).set('questionFetchStatus', 'finished');
    case SUBMIT_ANSWER_STATUS:
      return state.set('submitAnswerStatus', action.status);
    case SET_QUESTION_FETCH_STATUS:
      return state.set('questionFetchStatus', action.status);
    default:
      return state;
  }
}

export default combineReducers({
  applicationInformation,
});
