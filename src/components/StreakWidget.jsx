import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  Flame, 
  Trophy, 
  Target, 
  CheckCircle, 
  Star,
  TrendingUp,
  Award,
  Zap,
  Clock
} from 'lucide-react';
import './StreakWidget.css';

const StreakWidget = () => {
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    longestStreak: 0,
    totalDays: 0,
    lastVisit: null,
    visitHistory: []
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [todayVisited, setTodayVisited] = useState(false);

  // Initialize streak data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('quranAppStreakData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setStreakData(parsed);
      
      // Check if user visited today
      const today = new Date().toDateString();
      const visited = parsed.visitHistory.includes(today);
      setTodayVisited(visited);
      
      // Auto-update streak if user hasn't visited today
      if (!visited) {
        updateStreakForToday();
      }
    } else {
      // First time user - initialize with today's visit
      updateStreakForToday();
    }
  }, []);

  // Update streak when user visits
  const updateStreakForToday = () => {
    const today = new Date();
    const todayString = today.toDateString();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    setStreakData(prevData => {
      // Don't update if already visited today
      if (prevData.visitHistory.includes(todayString)) {
        return prevData;
      }

      const newVisitHistory = [...prevData.visitHistory, todayString];
      let newCurrentStreak = 1;

      // Calculate current streak
      if (prevData.visitHistory.includes(yesterdayString)) {
        newCurrentStreak = prevData.currentStreak + 1;
      } else if (prevData.visitHistory.length > 0) {
        // Streak broken, start new one
        newCurrentStreak = 1;
      }

      const newData = {
        currentStreak: newCurrentStreak,
        longestStreak: Math.max(prevData.longestStreak, newCurrentStreak),
        totalDays: prevData.totalDays + 1,
        lastVisit: todayString,
        visitHistory: newVisitHistory
      };

      // Save to localStorage
      localStorage.setItem('quranAppStreakData', JSON.stringify(newData));
      setTodayVisited(true);
      
      return newData;
    });
  };

  // Get streak level and title
  const getStreakLevel = useMemo(() => {
    const streak = streakData.currentStreak;
    if (streak >= 100) return { level: 'Master', icon: Trophy, color: '#ffd700' };
    if (streak >= 50) return { level: 'Expert', icon: Award, color: '#c0392b' };
    if (streak >= 30) return { level: 'Advanced', icon: Star, color: '#8e44ad' };
    if (streak >= 14) return { level: 'Committed', icon: Target, color: '#2980b9' };
    if (streak >= 7) return { level: 'Consistent', icon: Zap, color: '#27ae60' };
    if (streak >= 3) return { level: 'Building', icon: TrendingUp, color: '#f39c12' };
    return { level: 'Beginner', icon: CheckCircle, color: '#95a5a6' };
  }, [streakData.currentStreak]);

  // Get motivational message
  const getMotivationalMessage = () => {
    const streak = streakData.currentStreak;
    const messages = {
      0: "Start your spiritual journey today! 🌟",
      1: "Great start! Keep the momentum going! 💪",
      3: "Three days strong! You're building a habit! 🔥",
      7: "One week complete! Consistency is key! ⭐",
      14: "Two weeks! You're truly committed! 🏆",
      30: "One month! Your dedication is inspiring! 👑",
      50: "50 days! You're a true seeker of knowledge! 🌙",
      100: "100 days! Subhan'Allah! You're a master! ✨"
    };

    // Find the highest milestone reached
    const milestones = Object.keys(messages).map(Number).sort((a, b) => b - a);
    const milestone = milestones.find(m => streak >= m);
    return messages[milestone] || messages[0];
  };

  // Generate calendar data for current month
  const generateCalendarData = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const calendar = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendar.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toDateString();
      const isVisited = streakData.visitHistory.includes(dateString);
      const isToday = date.toDateString() === today.toDateString();
      
      calendar.push({
        day,
        date: dateString,
        isVisited,
        isToday
      });
    }

    return calendar;
  };

  const calendarData = generateCalendarData();
  const StreakIcon = getStreakLevel.icon;

  return (
    <div className="streak-widget">
      <div className="streak-header">
        <div className="streak-title-section">
          <Flame className="streak-flame" />
          <h3 className="streak-title">Daily Consistency</h3>
        </div>
        <button 
          className="calendar-toggle"
          onClick={() => setShowCalendar(!showCalendar)}
          title="View Calendar"
        >
          <Calendar className="calendar-icon" />
        </button>
      </div>

      <div className="streak-main">
        <div className="streak-display">
          <div className="current-streak">
            <div className="streak-number">{streakData.currentStreak}</div>
            <div className="streak-label">Day Streak</div>
          </div>
          
          <div className="streak-level">
            <StreakIcon 
              className="level-icon" 
              style={{ color: getStreakLevel.color }}
            />
            <span className="level-text" style={{ color: getStreakLevel.color }}>
              {getStreakLevel.level}
            </span>
          </div>
        </div>

        <div className="streak-stats">
          <div className="stat-item">
            <Trophy className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">{streakData.longestStreak}</span>
              <span className="stat-label">Best Streak</span>
            </div>
          </div>
          <div className="stat-item">
            <Clock className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">{streakData.totalDays}</span>
              <span className="stat-label">Total Days</span>
            </div>
          </div>
        </div>

        <div className="motivational-message">
          {getMotivationalMessage()}
        </div>

        {!todayVisited && (
          <button 
            className="check-in-btn"
            onClick={updateStreakForToday}
          >
            <CheckCircle className="check-icon" />
            Mark Today's Visit
          </button>
        )}

        {todayVisited && (
          <div className="checked-in">
            <CheckCircle className="check-icon checked" />
            <span>Today's visit recorded! ✨</span>
          </div>
        )}
      </div>

      {showCalendar && (
        <div className="calendar-view">
          <div className="calendar-header">
            <h4>This Month's Progress</h4>
          </div>
          <div className="calendar-grid">
            <div className="weekday-headers">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="weekday-header">{day}</div>
              ))}
            </div>
            <div className="calendar-days">
              {calendarData.map((dayData, index) => (
                <div 
                  key={index} 
                  className={`calendar-day ${
                    dayData ? (
                      dayData.isToday ? 'today' : 
                      dayData.isVisited ? 'visited' : 'not-visited'
                    ) : 'empty'
                  }`}
                >
                  {dayData && (
                    <>
                      <span className="day-number">{dayData.day}</span>
                      {dayData.isVisited && <div className="visit-indicator" />}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="calendar-legend">
            <div className="legend-item">
              <div className="legend-color visited"></div>
              <span>Visited</span>
            </div>
            <div className="legend-item">
              <div className="legend-color today"></div>
              <span>Today</span>
            </div>
            <div className="legend-item">
              <div className="legend-color not-visited"></div>
              <span>Not Visited</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreakWidget;