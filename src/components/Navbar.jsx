import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Search, User, Moon, Sparkles, MessageCircle, Users } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/study-plans', label: 'Study Plans', icon: BookOpen },
    { path: '/verse-locator', label: 'Verse Locator', icon: Search },
    { path: '/discussions', label: 'Discussions', icon: Users },
    { path: '/ai-chat', label: 'AI Chat', icon: MessageCircle },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Moon className="brand-icon" />
          <span className="brand-text">Quran Study</span>
        </div>
        
        <div className="navbar-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
                           (location.pathname === '/' && item.path === '/dashboard');
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`navbar-item ${isActive ? 'active' : ''}`}
              >
                <Icon className="navbar-icon" />
                <span className="navbar-label">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;