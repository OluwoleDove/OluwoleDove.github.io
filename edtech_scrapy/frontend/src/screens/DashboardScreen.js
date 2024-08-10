import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCourses } from '../actions/courseActions';
import CourseCard from '../components/CourseCard';

const DashboardScreen = () => {
    const dispatch = useDispatch();

    const courseList = useSelector((state) => state.courseList);
    const { loading, error, courses } = courseList;

    useEffect(() => {
        dispatch(listCourses());
    }, [dispatch]);

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>My Learning</h1>
                <nav className="dashboard-nav">
                    <ul>
                        <li>All courses</li>
                        <li>My Lists</li>
                        <li>Wishlist</li>
                        <li>Archived</li>
                        <li>Learning Tools</li>
                    </ul>
                </nav>
            </header>
            <section className="courses">
                <h2>Your Courses</h2>
                {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
                    <div className="course-cards">
                        {courses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default DashboardScreen;
