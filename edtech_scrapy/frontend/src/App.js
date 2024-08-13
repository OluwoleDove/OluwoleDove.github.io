import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardScreen from './screens/DashboardScreen';
import CourseDetailsScreen from './screens/CourseDetailsScreen';
import LoginScreen from './screens/LoginScreen';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<DashboardScreen />} exact />
                    <Route path="/course/:id" element={<CourseDetailsScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
