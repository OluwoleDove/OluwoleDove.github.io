import {
    COURSE_LIST_REQUEST,
    COURSE_LIST_SUCCESS,
    COURSE_LIST_FAIL,
    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
    COURSE_DETAILS_FAIL,
    COURSE_LIKE_SUCCESS,
    COURSE_COMMENT_SUCCESS,
    COURSE_SHARE_SUCCESS,
} from '../constants/courseConstants';

export const courseListReducer = (state = { courses: [] }, action) => {
    switch (action.type) {
        case COURSE_LIST_REQUEST:
            return { loading: true, courses: [] };
        case COURSE_LIST_SUCCESS:
            return { loading: false, courses: action.payload };
        case COURSE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const courseDetailsReducer = (state = { course: { videos: [], likes: 0, comments: [], shares: 0 } }, action) => {
    switch (action.type) {
        case COURSE_DETAILS_REQUEST:
            return { loading: true, ...state };
        case COURSE_DETAILS_SUCCESS:
            return { loading: false, course: action.payload };
        case COURSE_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case COURSE_LIKE_SUCCESS:
            return { ...state, course: { ...state.course, likes: action.payload.likes } };
        case COURSE_COMMENT_SUCCESS:
            return { ...state, course: { ...state.course, comments: action.payload.comments } };
        case COURSE_SHARE_SUCCESS:
            return { ...state, course: { ...state.course, shares: action.payload.shares } };
        default:
            return state;
    }
};

