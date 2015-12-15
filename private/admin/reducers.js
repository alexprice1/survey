import Immutable from 'immutable';
import { combineReducers } from 'redux';
import { UPDATE_QUESTION_TITLE, UPDATE_ANSWER, ADD_ANSWER, REMOVE_ANSWER, GOT_QUESTIONS, GOT_QUESTION, SET_NEW_QUESTION_STATUS } from './actions.js';

function newAnswer() {
  return Immutable.Map({
    answer: '',
  });
}

function defaultNewQuestion() {
  return Immutable.Map({
    title: '',
    answers: Immutable.List([
      newAnswer(),
    ]),
  });
}

const initialState = Immutable.Map({
  newQuestion: defaultNewQuestion(),
  questions: Immutable.List(),
  question: {},
});

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
      return state.set('questions', Immutable.List(action.questions));
    case GOT_QUESTION:
      return state.set('question', action.question);
    case SET_NEW_QUESTION_STATUS:
      const newState = action.status === 'finished' ? state.set('newQuestion', defaultNewQuestion()) : state;
      return newState.set('newQuestionStatus', action.status);
    default:
      return state;
  }
}

export default combineReducers({
  applicationInformation,
});
