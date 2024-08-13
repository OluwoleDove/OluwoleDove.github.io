import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCourses } from '../actions/courseActions';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer'; // Import the Footer component
import Navbar from '../components/Navbar';

const DashboardScreen = () => {
    const dispatch = useDispatch();

    const courseList = useSelector((state) => state.courseList);
    const { loading, error, courses } = courseList;

    useEffect(() => {
        dispatch(listCourses());
    }, [dispatch]);

    return (
        <div className="dashboard">
            <Navbar />
            <section className="courses">
                <h2>Popular Courses</h2>
                {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
                    <div className="course-cards">
                        {courses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </div>
    );
};

export default DashboardScreen;
