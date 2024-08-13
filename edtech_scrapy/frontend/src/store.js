import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { courseListReducer, courseDetailsReducer } from './reducers/courseReducers';
import { userLoginReducer } from './reducers/authReducers';

// Define the initial state with userInfo from localStorage
const initialState = {
    userLogin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
};

// Combine all reducers
const reducer = combineReducers({
    courseList: courseListReducer,
    courseDetails: courseDetailsReducer,
    userLogin: userLoginReducer,
});

// Create the store with middleware and Redux DevTools extension
const composeEnhancer = composeWithDevTools || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
