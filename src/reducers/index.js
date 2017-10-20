import { combineReducers } from 'redux';
import TotalsReducer from './reducer_totals';

// Combine all the reducers into one
const rootReducer = combineReducers({
  totals: TotalsReducer
});

export default rootReducer;
