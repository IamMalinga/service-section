import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import AddService from './components/AddService';
import ServiceList from './pages/Services';
import AuthProvider from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import SubServices from './components/SubServices';
import ProfileCreateWrapper from './services/ProfileCreateWrapper';
import ProfileDetailsWrapper from './services/ProfileDetailsWrapper';
import Documentation from './pages/Documentation';
import Contact from './pages/Contact';
import About from './pages/About';
import ProfileList from './components/ProfileList'

import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-service" element={<PrivateRoute><AddService /></PrivateRoute>} />
          <Route path="/services" element={<PrivateRoute><ServiceList /></PrivateRoute>} />
          <Route path="/profiles" element={<PrivateRoute><ProfileList /></PrivateRoute>} />
          <Route path="/services/:serviceId" element={<PrivateRoute><SubServices /></PrivateRoute>} />
          <Route path="/profiles/create/:subServiceId/:subServiceName" element={<PrivateRoute><ProfileCreateWrapper /></PrivateRoute>} />
          <Route path="/profiles/:profileId/:subServiceName" element={<PrivateRoute><ProfileDetailsWrapper /></PrivateRoute>} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
