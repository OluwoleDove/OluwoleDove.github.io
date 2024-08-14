import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { courseListReducer, courseDetailsReducer } from './reducers/courseReducers';
import { userLoginReducer } from './reducers/authReducers';

// Define the initial state with userInfo from localStorage
let userInfo;
try {
    userInfo = JSON.parse(localStorage.getItem('userInfo'));
} catch (e) {
    userInfo = null;
}

const initialState = {
    userLogin: {
        userInfo: userInfo || null,
    },
};


// Combine all reducers
const reducer = combineReducers({
    courseList: courseListReducer,
    courseDetails: courseDetailsReducer,
    userLogin: userLoginReducer,
});

// Create the store with middleware and Redux DevTools extension
const composeEnhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(
    reducer,
    initialState,
    composeEnhancer
);

export default store;