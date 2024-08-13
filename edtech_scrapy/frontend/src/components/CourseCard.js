import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    const formatPrice = (price) => {
        if (price !== undefined && price !== null) {
            return `₹${price.toLocaleString('en-IN')}`;
        }
        return 'Price not available';
    };

    return (
        <Link to={`/course/${course.id}`}>
            <div className="course-card">
                <div className="image-container">
                    <img src={course.thumbnail} alt={course.title} />
                    <div className="overlay">
                        <p className="description">{course.description || 'No description available'}</p>
                    </div>
                </div>
                <h3>{course.title}</h3>
                <p><strong>Tutor:&ensp;</strong> {course.tutor || 'Tutor not available'}</p>
                <p><strong>Price:&ensp;</strong> {formatPrice(course.price)}</p>
                <div className="rating">
                    <span>{course.rating}&ensp;</span>
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