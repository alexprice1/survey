export const SELECT_ANSWER = 'SELECT_ANSWER';

export function selectAnswer(selectedAnswerId) {
  return {
    type: SELECT_ANSWER,
    selectedAnswerId
  };
};
