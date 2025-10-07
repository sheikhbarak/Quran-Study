import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Target, Clock, Star, Brain, CheckCircle, Heart, 
  Shield, Sunrise, Users, Baby, Briefcase, Home, Lightbulb,
  Play, Lock, ChevronRight, Award, Calendar, User
} from 'lucide-react';
import './StudyPlans.css';

const StudyPlans = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userProgress, setUserProgress] = useState({});

  // Comprehensive study plan database with themed journeys
  const studyPlans = [
    {
      id: 'godly-marriage',
      title: "Building a Godly Marriage",
      category: "relationships",
      description: "Discover Islamic principles for a blessed and harmonious marriage relationship",
      duration: "21 days",
      difficulty: "Intermediate",
      lessons: 21,
      participants: 1247,
      rating: 4.9,
      icon: Heart,
      color: "#e91e63",
      tags: ["Marriage", "Relationships", "Family"],
      lessons_detail: [
        {
          day: 1,
          title: "The Foundation of Marriage in Islam",
          verse: "And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts. (Quran 30:21)",
          reflection: "How does understanding marriage as a sign of Allah change your perspective on your relationship?",
          action: "Discuss with your spouse the spiritual goals you want to achieve together."
        },
        {
          day: 2,
          title: "Mutual Rights and Responsibilities",
          verse: "And women shall have rights similar to the rights against them, according to what is equitable. (Quran 2:228)",
          reflection: "What are the balanced rights and responsibilities in your marriage?",
          action: "Create a list of ways you can better fulfill your spouse's rights."
        },
        {
          day: 3,
          title: "Communication with Kindness",
          verse: "And speak to people good words. (Quran 2:83)",
          reflection: "How can you improve the way you communicate with your spouse?",
          action: "Practice speaking only kind words to your spouse today."
        }
      ]
    },
    {
      id: 'mental-health',
      title: "Mental Health & Spiritual Wellness",
      category: "wellness",
      description: "Find peace and healing through Islamic teachings on mental and emotional well-being",
      duration: "28 days",
      difficulty: "Beginner",
      lessons: 28,
      participants: 2156,
      rating: 4.8,
      icon: Brain,
      color: "#4caf50",
      tags: ["Mental Health", "Anxiety", "Depression", "Peace"],
      lessons_detail: [
        {
          day: 1,
          title: "Allah's Mercy in Times of Distress",
          verse: "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose. (Quran 65:3)",
          reflection: "How can trusting in Allah's plan bring peace to your anxious thoughts?",
          action: "Practice dhikr (remembrance of Allah) for 10 minutes when feeling overwhelmed."
        },
        {
          day: 2,
          title: "The Healing Power of Prayer",
          verse: "And seek help through patience and prayer, and indeed, it is difficult except for the humbly submissive. (Quran 2:45)",
          reflection: "How has prayer served as a source of comfort in your life?",
          action: "Dedicate extra time in sujood (prostration) to pour out your heart to Allah."
        }
      ]
    },
    {
      id: 'grief-loss',
      title: "Navigating Grief & Loss",
      category: "healing",
      description: "Find comfort and hope in Islamic teachings during times of loss and bereavement",
      duration: "14 days",
      difficulty: "Beginner",
      lessons: 14,
      participants: 892,
      rating: 4.9,
      icon: Shield,
      color: "#9c27b0",
      tags: ["Grief", "Loss", "Healing", "Comfort"],
      lessons_detail: [
        {
          day: 1,
          title: "Understanding Allah's Wisdom in Loss",
          verse: "Indeed we belong to Allah, and indeed to Him we will return. (Quran 2:156)",
          reflection: "How can remembering our return to Allah bring comfort in times of loss?",
          action: "Recite this verse and reflect on its meaning when grief overwhelms you."
        },
        {
          day: 2,
          title: "The Temporary Nature of This World",
          verse: "And the worldly life is not but amusement and diversion; but the home of the Hereafter is best for those who fear Allah. (Quran 6:32)",
          reflection: "How does understanding the temporary nature of this life help in processing grief?",
          action: "Write a letter to your loved one, expressing your feelings and prayers for them."
        }
      ]
    },
    {
      id: 'morning-routine',
      title: "Sacred Morning Routine",
      category: "spiritual",
      description: "Start each day with purpose through Islamic morning practices and supplications",
      duration: "30 days",
      difficulty: "Beginner",
      lessons: 30,
      participants: 3421,
      rating: 4.7,
      icon: Sunrise,
      color: "#ff9800",
      tags: ["Morning", "Routine", "Dhikr", "Productivity"],
      lessons_detail: [
        {
          day: 1,
          title: "Waking Up with Gratitude",
          verse: "All praise is due to Allah who gave us life after having taken it away and unto Him is the resurrection. (Morning Dua)",
          reflection: "How can starting your day with gratitude transform your entire mindset?",
          action: "Recite the morning dua immediately upon waking for the next week."
        }
      ]
    },
    {
      id: 'community-building',
      title: "Building Strong Communities",
      category: "social",
      description: "Learn Islamic principles for creating unity and brotherhood in your community",
      duration: "21 days",
      difficulty: "Intermediate",
      lessons: 21,
      participants: 1876,
      rating: 4.6,
      icon: Users,
      color: "#2196f3",
      tags: ["Community", "Brotherhood", "Unity", "Social"],
      lessons_detail: [
        {
          day: 1,
          title: "The Ummah as One Body",
          verse: "The believers in their mutual kindness, compassion, and sympathy are just one body. (Hadith)",
          reflection: "How can you contribute to the unity and strength of your community?",
          action: "Reach out to a community member you haven't spoken to in a while."
        }
      ]
    },
    {
      id: 'parenting',
      title: "Islamic Parenting Wisdom",
      category: "family",
      description: "Raise righteous children with guidance from Quran and Sunnah",
      duration: "35 days",
      difficulty: "Intermediate",
      lessons: 35,
      participants: 2341,
      rating: 4.8,
      icon: Baby,
      color: "#8bc34a",
      tags: ["Parenting", "Children", "Family", "Education"],
      lessons_detail: [
        {
          day: 1,
          title: "Children as Amanah (Trust)",
          verse: "O you who believe! Ward off yourselves and your families against a Fire. (Quran 66:6)",
          reflection: "How does viewing your children as a trust from Allah change your parenting approach?",
          action: "Spend quality time teaching your child about Allah's love and mercy."
        }
      ]
    },
    {
      id: 'workplace-ethics',
      title: "Islamic Work Ethics",
      category: "professional",
      description: "Apply Islamic principles in your professional life and career",
      duration: "14 days",
      difficulty: "Beginner",
      lessons: 14,
      participants: 1654,
      rating: 4.5,
      icon: Briefcase,
      color: "#607d8b",
      tags: ["Work", "Ethics", "Professional", "Career"],
      lessons_detail: [
        {
          day: 1,
          title: "Excellence in Work as Worship",
          verse: "And that there is nothing for man except what he strives for. (Quran 53:39)",
          reflection: "How can you view your work as a form of worship and service to Allah?",
          action: "Approach your work tasks today with the intention of pleasing Allah."
        }
      ]
    },
    {
      id: 'home-peace',
      title: "Creating a Peaceful Home",
      category: "family",
      description: "Transform your home into a sanctuary of peace and Islamic values",
      duration: "21 days",
      difficulty: "Beginner",
      lessons: 21,
      participants: 1987,
      rating: 4.7,
      icon: Home,
      color: "#795548",
      tags: ["Home", "Peace", "Family", "Environment"],
      lessons_detail: [
        {
          day: 1,
          title: "The Home as a Place of Worship",
          verse: "And make your homes places of worship. (Quran 10:87)",
          reflection: "How can you make your home more conducive to worship and remembrance of Allah?",
          action: "Designate a special area in your home for prayer and Quran reading."
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Plans', icon: BookOpen, color: '#6366f1' },
    { id: 'relationships', name: 'Relationships', icon: Heart, color: '#e91e63' },
    { id: 'wellness', name: 'Wellness', icon: Brain, color: '#4caf50' },
    { id: 'healing', name: 'Healing', icon: Shield, color: '#9c27b0' },
    { id: 'spiritual', name: 'Spiritual', icon: Star, color: '#ff9800' },
    { id: 'social', name: 'Community', icon: Users, color: '#2196f3' },
    { id: 'family', name: 'Family', icon: Baby, color: '#8bc34a' },
    { id: 'professional', name: 'Professional', icon: Briefcase, color: '#607d8b' }
  ];

  // Filter plans based on selected category
  const filteredPlans = selectedCategory === 'all' 
    ? studyPlans 
    : studyPlans.filter(plan => plan.category === selectedCategory);

  // Initialize user progress
  useEffect(() => {
    const savedProgress = localStorage.getItem('studyPlansProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage
  const updateProgress = (planId, progress) => {
    const newProgress = { ...userProgress, [planId]: progress };
    setUserProgress(newProgress);
    localStorage.setItem('studyPlansProgress', JSON.stringify(newProgress));
  };

  // Start a study plan
  const startPlan = (planId) => {
    updateProgress(planId, { currentLesson: 1, completedLessons: [], startDate: new Date().toISOString() });
  };

  // Get progress percentage for a plan
  const getProgressPercentage = (planId, totalLessons) => {
    const progress = userProgress[planId];
    if (!progress) return 0;
    return Math.round((progress.completedLessons.length / totalLessons) * 100);
  };

  return (
    <div className="study-plans">
      <div className="study-plans-header">
        <h1 className="page-title">Spiritual Study Plans</h1>
        <p className="page-subtitle">
          Structured journeys through scripture with personalized themes for every aspect of life
        </p>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              style={{ '--category-color': category.color }}
            >
              <Icon className="category-icon" />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Study Plans Grid */}
      <div className="study-plans-grid">
        {filteredPlans.map((plan) => {
          const Icon = plan.icon;
          const progress = getProgressPercentage(plan.id, plan.lessons);
          const isStarted = userProgress[plan.id];
          
          return (
            <div key={plan.id} className="study-plan-card">
              <div className="plan-header">
                <div className="plan-icon" style={{ backgroundColor: plan.color }}>
                  <Icon />
                </div>
                <div className="plan-meta">
                  <span className="plan-duration">{plan.duration}</span>
                  <span className={`plan-difficulty ${plan.difficulty.toLowerCase()}`}>
                    {plan.difficulty}
                  </span>
                </div>
              </div>
              
              <h3 className="plan-title">{plan.title}</h3>
              <p className="plan-description">{plan.description}</p>
              
              <div className="plan-stats">
                <div className="stat">
                  <Calendar className="stat-icon" />
                  <span>{plan.lessons} lessons</span>
                </div>
                <div className="stat">
                  <User className="stat-icon" />
                  <span>{plan.participants.toLocaleString()} enrolled</span>
                </div>
                <div className="stat">
                  <Star className="stat-icon" />
                  <span>{plan.rating} rating</span>
                </div>
              </div>

              <div className="plan-tags">
                {plan.tags.map((tag, index) => (
                  <span key={index} className="plan-tag">{tag}</span>
                ))}
              </div>
              
              {isStarted && (
                <div className="plan-progress">
                  <div className="progress-header">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${progress}%`, backgroundColor: plan.color }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="plan-actions">
                <button 
                  className="plan-button primary"
                  onClick={() => isStarted ? setSelectedPlan(plan) : startPlan(plan.id)}
                >
                  {isStarted ? (
                    <>
                      <Play className="btn-icon" />
                      Continue Journey
                    </>
                  ) : (
                    <>
                      <Target className="btn-icon" />
                      Start Journey
                    </>
                  )}
                </button>
                <button 
                  className="plan-button secondary"
                  onClick={() => setSelectedPlan(plan)}
                >
                  <BookOpen className="btn-icon" />
                  Preview
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Plan Detail Modal */}
      {selectedPlan && (
        <div className="plan-modal-overlay" onClick={() => setSelectedPlan(null)}>
          <div className="plan-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <div className="modal-icon" style={{ backgroundColor: selectedPlan.color }}>
                  <selectedPlan.icon />
                </div>
                <div>
                  <h2>{selectedPlan.title}</h2>
                  <p>{selectedPlan.description}</p>
                </div>
              </div>
              <button className="close-btn" onClick={() => setSelectedPlan(null)}>×</button>
            </div>
            
            <div className="modal-content">
              <div className="lesson-preview">
                <h3>Sample Lessons</h3>
                {selectedPlan.lessons_detail.slice(0, 3).map((lesson, index) => (
                  <div key={index} className="lesson-card">
                    <div className="lesson-header">
                      <span className="lesson-day">Day {lesson.day}</span>
                      <h4>{lesson.title}</h4>
                    </div>
                    <div className="lesson-verse">
                      <Lightbulb className="verse-icon" />
                      <p>"{lesson.verse}"</p>
                    </div>
                    <div className="lesson-reflection">
                      <strong>Reflection:</strong> {lesson.reflection}
                    </div>
                    <div className="lesson-action">
                      <strong>Action:</strong> {lesson.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="modal-btn primary"
                onClick={() => {
                  if (!userProgress[selectedPlan.id]) {
                    startPlan(selectedPlan.id);
                  }
                  setSelectedPlan(null);
                }}
              >
                {userProgress[selectedPlan.id] ? 'Continue Journey' : 'Start Journey'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlans;