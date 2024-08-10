import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardScreen from './screens/DashboardScreen';
import CourseDetailsScreen from './screens/CourseDetailsScreen';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DashboardScreen />} exact />
                <Route path="/course/:id" element={<CourseDetailsScreen />} />
            </Routes>
        </Router>
    );
};

export default App;
