import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const CourseCard = ({ course }) => {
    return (
        <Link to={`/course/${course.id}`}> {/* Wrap the card in a Link */}
            <div className="course-card">
                <img src={course.thumbnail} alt={course.title} />
                <h3>{course.title}</h3>
                <div className="rating">
                    <span>{ course.rating } </span>
                    {[...Array(5)].map((_, index) => (
                        <FaStar
                            key={index}
                            color={index < course.rating ? 'gold' : 'gray'}
                        />
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;
