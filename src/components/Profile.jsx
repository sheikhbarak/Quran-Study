import React from 'react';
import { User, Calendar, BookOpen, Target, Award, Settings, Heart, TrendingUp } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const userStats = [
    { label: 'Days Active', value: '127', icon: Calendar, color: '#10b981' },
    { label: 'Verses Read', value: '2,847', icon: BookOpen, color: '#3b82f6' },
    { label: 'Study Hours', value: '89', icon: Target, color: '#8b5cf6' },
    { label: 'Achievements', value: '15', icon: Award, color: '#f59e0b' }
  ];

  const achievements = [
    {
      title: 'First Steps',
      description: 'Completed your first day of study',
      icon: '🌟',
      earned: true,
      date: '2 months ago'
    },
    {
      title: 'Consistent Reader',
      description: 'Read Quran for 7 consecutive days',
      icon: '📚',
      earned: true,
      date: '1 month ago'
    },
    {
      title: 'Deep Thinker',
      description: 'Added 50 personal reflections',
      icon: '💭',
      earned: true,
      date: '3 weeks ago'
    },
    {
      title: 'Dedicated Student',
      description: 'Complete 30 days of continuous study',
      icon: '🎯',
      earned: false,
      progress: 75
    },
    {
      title: 'Verse Master',
      description: 'Memorize 100 verses',
      icon: '🧠',
      earned: false,
      progress: 45
    },
    {
      title: 'Community Helper',
      description: 'Share knowledge with others',
      icon: '🤝',
      earned: false,
      progress: 20
    }
  ];

  const recentActivity = [
    { action: 'Completed daily reading', surah: 'Al-Baqarah', time: '2 hours ago' },
    { action: 'Added reflection', surah: 'Al-Fatiha', time: '1 day ago' },
    { action: 'Finished study plan', surah: 'Tafseer Deep Dive', time: '3 days ago' },
    { action: 'Reached milestone', surah: '100 verses read', time: '1 week ago' }
  ];

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            <User className="avatar-icon" />
          </div>
          <div className="profile-details">
            <h1 className="profile-name">Abdullah Rahman</h1>
            <p className="profile-title">Dedicated Student</p>
            <p className="profile-joined">Joined 4 months ago</p>
          </div>
        </div>
        <button className="settings-btn">
          <Settings className="settings-icon" />
          Settings
        </button>
      </div>

      <div className="stats-section">
        <h2 className="section-title">Your Journey</h2>
        <div className="stats-grid">
          {userStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                  <Icon />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="achievements-section">
        <h2 className="section-title">Achievements</h2>
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div key={index} className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}>
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-content">
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>
                {achievement.earned ? (
                  <span className="achievement-date">Earned {achievement.date}</span>
                ) : (
                  <div className="achievement-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{achievement.progress}% complete</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="activity-section">
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-list">
          {recentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-dot"></div>
              <div className="activity-content">
                <div className="activity-action">{activity.action}</div>
                <div className="activity-details">{activity.surah}</div>
              </div>
              <div className="activity-time">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="preferences-section">
        <h2 className="section-title">Study Preferences</h2>
        <div className="preferences-grid">
          <div className="preference-card">
            <BookOpen className="preference-icon" />
            <h3>Reading Goal</h3>
            <p>5 verses per day</p>
          </div>
          <div className="preference-card">
            <Heart className="preference-icon" />
            <h3>Favorite Topics</h3>
            <p>Patience, Gratitude, Prayer</p>
          </div>
          <div className="preference-card">
            <TrendingUp className="preference-icon" />
            <h3>Study Level</h3>
            <p>Intermediate</p>
          </div>
        </div>
      </div>

      <div className="inspiration-quote">
        <div className="quote-content">
          <div className="quote-text">
            "And it is He who created the heavens and earth in truth. And the day He says, 'Be,' and it is, His word is the truth."
          </div>
          <div className="quote-reference">Surah Al-An'am (6:73)</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;