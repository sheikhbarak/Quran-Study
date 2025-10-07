import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StudyPlans from './components/StudyPlans';
import VerseLocator from './components/VerseLocator';
import Discussions from './components/Discussions';
import AIChat from './components/AIChat';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/study-plans" element={<StudyPlans />} />
            <Route path="/verse-locator" element={<VerseLocator />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
