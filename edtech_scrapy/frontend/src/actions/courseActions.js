import axios from 'axios';
import {
    COURSE_LIST_REQUEST,
    COURSE_LIST_SUCCESS,
    COURSE_LIST_FAIL,
    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
    COURSE_DETAILS_FAIL,
} from '../constants/courseConstants';

export const listCourses = () => async (dispatch) => {
    try {
        dispatch({ type: COURSE_LIST_REQUEST });

        const { data } = await axios.get('https://witslens.com/backend/get_courses.php');

        dispatch({
            type: COURSE_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: COURSE_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const listCourseDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: COURSE_DETAILS_REQUEST });

        const { data } = await axios.get(`https://witslens.com/backend/get_course_details.php?id=${id}`);

        dispatch({
            type: COURSE_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: COURSE_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const likeCourse = (courseId) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post('https://witslens.com/backend/like', { course_id: courseId, user_id: getState().auth.userId });
        dispatch({ type: 'COURSE_LIKE_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'COURSE_LIKE_FAIL', payload: error.response.data.message });
    }
};

export const commentOnCourse = (courseId, comment) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post('https://witslens.com/backend/comment', { course_id: courseId, user_id: getState().auth.userId, comment });
        dispatch({ type: 'COURSE_COMMENT_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'COURSE_COMMENT_FAIL', payload: error.response.data.message });
    }
};

export const shareCourse = (courseId, shareLink) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post('https://witslens.com/backend/', { course_id: courseId, user_id: getState().auth.userId, share_link: shareLink });
        dispatch({ type: 'COURSE_SHARE_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'COURSE_SHARE_FAIL', payload: error.response.data.message });
    }
};
