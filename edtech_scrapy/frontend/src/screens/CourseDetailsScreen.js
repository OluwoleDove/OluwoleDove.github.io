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
        if (course && course.videos && course.videos.length > 0) {
            setVideoUrl(course.videos[0].video_url);
            setTranscript(course.videos[0].transcript);
            setLikes(course.likes || 0); // Initialize likes from the course data
        }
    }, [course]);

    const handleVideoChange = (video) => {
        setVideoUrl(video.video_url);
        setTranscript(video.transcript);
    };

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

    return (
        <div class="cap">
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
                            <h3>Course Content</h3>
                            <ul className="course-list">
                                {course.videos.map(video => (
                                    <li key={video.id} onClick={() => handleVideoChange(video)}>
                                        <img src={video.thumbnail} alt={video.title} />
                                        <div className="video-info">
                                            <span>{video.title}</span>
                                            <span>{video.duration}</span>
                                        </div>
                                    </li>
                                ))}
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