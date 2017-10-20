import { INCREMENT, TOTAL_QUESTIONS, RESET } from '../actions/index';

const initialState = {
  answers_total: 0,
  total_questions: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        answers_total: state.answers_total + 1,
      };

    case RESET:
      return {
        ...state,
        answers_total: 0,
      };

    case TOTAL_QUESTIONS:
      return {
        ...state,
        total_questions: action.total_questions,
      };

    default:
      return state;
  }
}
