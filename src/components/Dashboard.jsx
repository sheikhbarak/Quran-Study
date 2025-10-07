import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Target, Search, TrendingUp, Calendar, Heart, Sparkles } from 'lucide-react';
import PersonalizedPrayers from './PersonalizedPrayers';
import DailyDevotionals from './DailyDevotionals';
import StreakWidget from './StreakWidget';
import './Dashboard.css';

const Dashboard = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Daily Reading',
      description: 'Continue your daily Quran reading journey',
      color: '#10b981'
    },
    {
      icon: Target,
      title: 'Study Goals',
      description: 'Track your learning progress and achievements',
      color: '#3b82f6'
    },
    {
      icon: Search,
      title: 'Quick Search',
      description: 'Find verses, topics, and themes instantly',
      color: '#8b5cf6'
    },
    {
      icon: Sparkles,
      title: 'AI Companion',
      description: 'Get personalized guidance and wisdom from the Quran',
      color: '#fbbf24',
      link: '/ai-chat'
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'View your spiritual growth over time',
      color: '#f59e0b'
    },
    {
      icon: Calendar,
      title: 'Prayer Times',
      description: 'Stay connected with daily prayer schedule',
      color: '#ef4444'
    },
    {
      icon: Heart,
      title: 'Favorites',
      description: 'Access your saved verses and reflections',
      color: '#ec4899'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Assalamu Alaikum</h1>
        <p className="dashboard-subtitle">
          Welcome to your spiritual journey. May Allah guide your path to knowledge and understanding.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">127</div>
          <div className="stat-label">Verses Read</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">8</div>
          <div className="stat-label">Surahs Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">42</div>
          <div className="stat-label">Study Hours</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">23</div>
          <div className="stat-label">Favorites</div>
        </div>
      </div>

      {/* Streak Tracking Widget */}
      <StreakWidget />

      {/* Personalized Prayers Widget */}
      <PersonalizedPrayers />

      {/* Daily Devotionals Widget */}
      <DailyDevotionals />

      <div className="features-section">
        <h2 className="section-title">Continue Your Journey</h2>
        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const FeatureCard = (
              <div key={index} className="feature-card">
                <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                  <Icon />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
            
            return feature.link ? (
              <Link key={index} to={feature.link} className="feature-link">
                {FeatureCard}
              </Link>
            ) : (
              FeatureCard
            );
          })}
        </div>
      </div>

      <div className="verse-of-day">
        <h2 className="section-title">Verse of the Day</h2>
        <div className="verse-card">
          <div className="verse-arabic">
            وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
          </div>
          <div className="verse-translation">
            "And whoever fears Allah - He will make for him a way out."
          </div>
          <div className="verse-reference">Surah At-Talaq (65:2)</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;