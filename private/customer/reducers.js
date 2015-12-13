import { combineReducers } from 'redux';
import { SELECT_ANSWER } from './actions.js';

const initialState = {
  question: {
    question: 'How are you?',
    answers: [
      {
        answer: 'Good',
        id: 1
      }, {
        answer: 'Alright',
        id: 2
      }, {
        answer: 'Bad',
        id: 3
      }
    ]
  }
};

export function applicationInformation(state = initialState, action = {}) {
  switch (action.type) {
    case SELECT_ANSWER:
      return Object.assign({}, state, {
        selectedAnswerId: action.selectedAnswerId
      });
    default:
      return state;
  }
};

export default combineReducers({
  applicationInformation
});