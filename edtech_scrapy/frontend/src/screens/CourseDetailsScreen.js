import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCourseDetails } from '../actions/courseActions';
import { useParams } from 'react-router-dom';

const CourseDetailsScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const courseDetails = useSelector((state) => state.courseDetails);
    const { loading, error, course } = courseDetails;

    const [videoUrl, setVideoUrl] = useState('');
    const [transcript, setTranscript] = useState('');

    useEffect(() => {
        dispatch(listCourseDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (course && course.videos && course.videos.length > 0) {
            setVideoUrl(course.videos[0].video_url);
            setTranscript(course.videos[0].transcript);
        }
    }, [course]);

    const handleVideoChange = (video) => {
        setVideoUrl(video.video_url);
        setTranscript(video.transcript);
    };

    return (
        <div className="course-details">
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
                <>
                    <div className="video-container">
                        <video controls src={videoUrl}></video>
                        <div className="transcript">
                            <h3>Transcript</h3>
                            <p>{transcript}</p>
                        </div>
                    </div>
                    <aside className="course-content">
                        <h3>Course Content</h3>
                        <ul>
                            {course.videos.map(video => (
                                <li key={video.id} onClick={() => handleVideoChange(video)}>
                                    {video.title}
                                </li>
                            ))}
                        </ul>
                    </aside>
                </>
            )}
        </div>
    );
};

export default CourseDetailsScreen;
