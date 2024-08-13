import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCourseDetails, likeCourse, commentOnCourse, shareCourse } from '../actions/courseActions';
import { useParams, useNavigate } from 'react-router-dom';
import { checkAuthentication } from '../actions/authActions';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CourseDetailsScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const courseDetails = useSelector((state) => state.courseDetails);
    const { loading, error, course } = courseDetails;

    const [videoUrl, setVideoUrl] = useState('');
    const [transcript, setTranscript] = useState('');
    const [newComment, setNewComment] = useState('');
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        dispatch(listCourseDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (course && course.modules && course.modules.length > 0) {
            setVideoUrl(course.modules[0].video_url); // Set the initial video URL if applicable
            setTranscript(course.modules[0].transcript); // Set the initial transcript if applicable
            setLikes(course.likes || 0); // Initialize likes from the course data
        }
    }, [course]);

    const handleAuthAction = (actionType) => {
        const isAuthenticated = checkAuthentication();

        if (!isAuthenticated) {
            navigate('/login');
        } else {
            switch (actionType) {
                case 'like':
                    dispatch(likeCourse(id)); // Dispatch like action
                    setLikes(likes + 1); // Increment likes locally
                    break;
                case 'comment':
                    if (newComment.trim()) {
                        dispatch(commentOnCourse(id, newComment)); // Dispatch comment action
                        setNewComment(''); // Clear the comment input
                    }
                    break;
                case 'share':
                    const shareLink = window.location.href;
                    dispatch(shareCourse(id, shareLink)); // Dispatch share action
                    alert('Course shared!');
                    break;
                default:
                    break;
            }
        }
    };

    const handleModuleClick = (videoUrl) => {
        setVideoUrl(videoUrl); // Update the video URL to the clicked module's video
    };

    return (
        <div className="cap">
            <Navbar />
            <div className="course-details">
                {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
                    <>
                        <div className="video-container">
                            <video controls src={videoUrl}></video>
                            <div className="transcript">
                                <h3>Transcript</h3>
                                <p>{transcript}</p>
                            </div>
                            <div className="social-actions">
                                <button onClick={() => handleAuthAction('like')}>
                                    <i className="fas fa-thumbs-up"></i> {likes} Like
                                </button>
                                <button onClick={() => handleAuthAction('comment')}>
                                    <i className="fas fa-comment"></i> Comment
                                </button>
                                <button onClick={() => handleAuthAction('share')}>
                                    <i className="fas fa-share"></i> Share
                                </button>
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add a comment"
                                ></textarea>
                            </div>
                        </div>
                        <aside className="course-content">
                            <h3>Course Modules</h3>
                            <ul className="module-list">
                                {course.modules && course.modules.length > 0 ? (
                                    course.modules.map(module => (
                                        <li key={module.id} onClick={() => handleModuleClick(module.video_url)}>
                                            <img src={module.thumbnail} alt={module.title} />
                                            <div className="module-info">
                                                <span>{module.title}</span>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <p>No modules available for this course.</p>
                                )}
                            </ul>
                        </aside>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CourseDetailsScreen;
