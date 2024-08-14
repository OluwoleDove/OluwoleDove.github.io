import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { courseListReducer, courseDetailsReducer } from './reducers/courseReducers';
import { userLoginReducer } from './reducers/authReducers';

// Function to retrieve userInfo from localStorage
const getUserInfoFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('userInfo'));
  } catch (error) {
    return null;
  }
};

// Initial state with optional userInfo from localStorage
const initialState = {
  userLogin: {
    userInfo: getUserInfoFromLocalStorage(),
  },
};

// Combine all reducers
const reducer = combineReducers({
  courseList: courseListReducer,
  courseDetails: courseDetailsReducer,
  userLogin: userLoginReducer,
});

// Conditional import of composeWithDevTools for development
const composeEnhancers = process.env.NODE_ENV === 'development'
  ? composeWithDevTools(applyMiddleware(thunk))
  : applyMiddleware(thunk);

// Create the Redux store
const store = createStore(
  reducer,
  initialState,
  composeEnhancers
);

export default store;