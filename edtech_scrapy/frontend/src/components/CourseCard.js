import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    return (
        <div className="course-card">
            <Link to={`/course/${course.id}`}>
                <img src={course.thumbnail} alt={course.title} />
                <h3>{course.title}</h3>
            </Link>
        </div>
    );
};

export default CourseCard;
