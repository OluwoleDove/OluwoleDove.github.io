import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { courseListReducer, courseDetailsReducer } from './reducers/courseReducers';

// Combine all reducers
const reducer = combineReducers({
    courseList: courseListReducer,
    courseDetails: courseDetailsReducer,
});

// Initial State (if any)
const initialState = {};

// Create the store with middleware and Redux DevTools extension
const composeEnhancer = composeWithDevTools || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
