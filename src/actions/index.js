export const INCREMENT = 'INCREMENT';
export const TOTAL_QUESTIONS = 'TOTAL_QUESTIONS';
export const RESET = 'RESET';

// Increment the total number of correct answers
export const increment = () => ({ type: INCREMENT });

// Save the total number of questions pulled from the API
export const total_questions = (total) => ({type: TOTAL_QUESTIONS, total_questions: total});

// Reset the number of correct answers
export const reset = () => ({ type: RESET });
