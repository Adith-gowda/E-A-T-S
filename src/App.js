import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Signup from './Components/Signup';
import UserProfile from './Components/UserProfile'; 
import AttendanceSummary from './Components/AttendanceSummary';
import EditProfile from './Components/EditProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AttendanceList from './Components/AttendanceList';
import AdminLogin from './Components/AdminLogin';
import AdminHome from './Components/AdminHome';
import AdminProfile from './Components/AdminProfile';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header companyName="TechTrove" />
              <Login />
            </>
          }
        />
        <Route path="/Admin" element={<AdminLogin />} />
        <Route path="/AdminHome/:id" element={<AdminHome />} />
        <Route path="/AdminProfile/:id" element={<AdminProfile />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-profile/:id" element={<UserProfile />} /> 
        <Route path="/editProfile/:id" element={<EditProfile />} />
        <Route path="/attendance-summary/:id" element={<AttendanceSummary/>} />
        <Route path="/attendance/:id/:month" element={<AttendanceList/>} />
      </Routes>
    </Router>
  );
};

export default App;
