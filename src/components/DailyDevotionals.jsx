import React, { useState, useEffect } from 'react';
import { Heart, Star, Sunrise, Moon, BookOpen, Target, Lightbulb, RefreshCw } from 'lucide-react';
import './DailyDevotionals.css';

const DailyDevotionals = () => {
  const [currentTheme, setCurrentTheme] = useState(null);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [currentReflection, setCurrentReflection] = useState(null);
  const [currentGoal, setCurrentGoal] = useState(null);

  // Daily themes that rotate based on the day of the week
  const dailyThemes = [
    {
      id: 'gratitude',
      name: 'Gratitude & Thankfulness',
      icon: Heart,
      color: '#10b981',
      description: 'Reflecting on Allah\'s countless blessings',
      verse: 'وَإِن تَعُدُّوا نِعْمَةَ اللَّهِ لَا تُحْصُوهَا',
      translation: 'And if you should count the favors of Allah, you could not enumerate them.',
      reference: 'Quran 14:34'
    },
    {
      id: 'patience',
      name: 'Patience & Perseverance',
      icon: Star,
      color: '#8b5cf6',
      description: 'Finding strength through life\'s challenges',
      verse: 'وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ',
      translation: 'And be patient, and your patience is not but through Allah.',
      reference: 'Quran 16:127'
    },
    {
      id: 'hope',
      name: 'Hope & Optimism',
      icon: Sunrise,
      color: '#f59e0b',
      description: 'Trusting in Allah\'s mercy and wisdom',
      verse: 'وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ',
      translation: 'And do not despair of the mercy of Allah.',
      reference: 'Quran 12:87'
    },
    {
      id: 'peace',
      name: 'Inner Peace & Tranquility',
      icon: Moon,
      color: '#06b6d4',
      description: 'Finding serenity through remembrance',
      verse: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
      translation: 'Verily, in the remembrance of Allah do hearts find rest.',
      reference: 'Quran 13:28'
    },
    {
      id: 'knowledge',
      name: 'Seeking Knowledge',
      icon: BookOpen,
      color: '#dc2626',
      description: 'The pursuit of wisdom and understanding',
      verse: 'وَقُل رَّبِّ زِدْنِي عِلْمًا',
      translation: 'And say: My Lord, increase me in knowledge.',
      reference: 'Quran 20:114'
    },
    {
      id: 'purpose',
      name: 'Life Purpose & Direction',
      icon: Target,
      color: '#7c3aed',
      description: 'Understanding our role as servants of Allah',
      verse: 'وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ',
      translation: 'And I did not create the jinn and mankind except to worship Me.',
      reference: 'Quran 51:56'
    },
    {
      id: 'reflection',
      name: 'Self-Reflection & Growth',
      icon: Lightbulb,
      color: '#059669',
      description: 'Examining our hearts and actions',
      verse: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ',
      translation: 'O you who believe! Fear Allah and let every soul look to what it has put forth for tomorrow.',
      reference: 'Quran 59:18'
    }
  ];

  // Inspirational quotes from Quran and Hadith
  const inspirationalQuotes = [
    {
      text: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
      translation: 'For indeed, with hardship comes ease.',
      reference: 'Quran 94:6',
      theme: 'hope'
    },
    {
      text: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا',
      translation: 'And whoever fears Allah, He will make for him a way out.',
      reference: 'Quran 65:2',
      theme: 'trust'
    },
    {
      text: 'The believer is not one who eats his fill while his neighbor goes hungry.',
      translation: 'Hadith - Prophet Muhammad (ﷺ)',
      reference: 'Al-Adab Al-Mufrad',
      theme: 'compassion'
    },
    {
      text: 'وَاللَّهُ مَعَ الصَّابِرِينَ',
      translation: 'And Allah is with the patient.',
      reference: 'Quran 2:153',
      theme: 'patience'
    },
    {
      text: 'The best of people are those who benefit others.',
      translation: 'Hadith - Prophet Muhammad (ﷺ)',
      reference: 'Daraqutni',
      theme: 'service'
    },
    {
      text: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً',
      translation: 'Our Lord, give us good in this world and good in the next world.',
      reference: 'Quran 2:201',
      theme: 'prayer'
    }
  ];

  // Daily reflection prompts
  const reflectionPrompts = [
    {
      question: 'What are three things you\'re grateful for today?',
      focus: 'Gratitude helps us recognize Allah\'s blessings in our daily lives.',
      theme: 'gratitude'
    },
    {
      question: 'How can you show more patience in challenging situations?',
      focus: 'Patience is a virtue that brings us closer to Allah\'s mercy.',
      theme: 'patience'
    },
    {
      question: 'What knowledge did you gain today that benefits your faith?',
      focus: 'Every day is an opportunity to grow in wisdom and understanding.',
      theme: 'knowledge'
    },
    {
      question: 'How did you help someone or show kindness today?',
      focus: 'Acts of kindness reflect the beauty of Islamic character.',
      theme: 'compassion'
    },
    {
      question: 'What steps are you taking toward your spiritual goals?',
      focus: 'Consistent small actions lead to meaningful spiritual growth.',
      theme: 'purpose'
    },
    {
      question: 'How can you improve your connection with Allah tomorrow?',
      focus: 'Each day offers new opportunities for spiritual enhancement.',
      theme: 'reflection'
    }
  ];

  // Daily spiritual goals
  const spiritualGoals = [
    {
      title: 'Dhikr Practice',
      description: 'Recite "SubhanAllah" 33 times after each prayer',
      benefit: 'Increases mindfulness and connection with Allah',
      difficulty: 'Easy'
    },
    {
      title: 'Quran Reading',
      description: 'Read and reflect on one page of the Quran',
      benefit: 'Deepens understanding of Islamic teachings',
      difficulty: 'Medium'
    },
    {
      title: 'Dua Memorization',
      description: 'Learn one new dua or perfect an existing one',
      benefit: 'Enhances personal prayer and supplication',
      difficulty: 'Medium'
    },
    {
      title: 'Acts of Charity',
      description: 'Perform one act of kindness or give charity',
      benefit: 'Purifies the soul and helps the community',
      difficulty: 'Easy'
    },
    {
      title: 'Islamic Learning',
      description: 'Study one Hadith and its practical application',
      benefit: 'Increases knowledge of Prophet\'s teachings',
      difficulty: 'Medium'
    },
    {
      title: 'Night Prayer',
      description: 'Perform 2 rakats of Tahajjud prayer',
      benefit: 'Strengthens spiritual discipline and connection',
      difficulty: 'Challenging'
    }
  ];

  // Get content based on current day
  const getDailyContent = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    
    const theme = dailyThemes[dayOfWeek];
    const quote = inspirationalQuotes[dayOfYear % inspirationalQuotes.length];
    const reflection = reflectionPrompts[dayOfYear % reflectionPrompts.length];
    const goal = spiritualGoals[dayOfYear % spiritualGoals.length];
    
    return { theme, quote, reflection, goal };
  };

  // Refresh content manually
  const refreshContent = () => {
    const randomTheme = dailyThemes[Math.floor(Math.random() * dailyThemes.length)];
    const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
    const randomReflection = reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)];
    const randomGoal = spiritualGoals[Math.floor(Math.random() * spiritualGoals.length)];
    
    setCurrentTheme(randomTheme);
    setCurrentQuote(randomQuote);
    setCurrentReflection(randomReflection);
    setCurrentGoal(randomGoal);
  };

  // Initialize content on component mount
  useEffect(() => {
    const { theme, quote, reflection, goal } = getDailyContent();
    setCurrentTheme(theme);
    setCurrentQuote(quote);
    setCurrentReflection(reflection);
    setCurrentGoal(goal);
  }, []);

  if (!currentTheme || !currentQuote || !currentReflection || !currentGoal) {
    return <div className="daily-devotionals loading">Loading daily inspiration...</div>;
  }

  const ThemeIcon = currentTheme.icon;

  return (
    <div className="daily-devotionals">
      {/* Header */}
      <div className="devotionals-header">
        <div className="header-content">
          <h2 className="devotionals-title">
            <ThemeIcon className="title-icon" />
            Daily Devotionals
          </h2>
          <p className="devotionals-subtitle">
            Today's Theme: {currentTheme.name}
          </p>
        </div>
        <button className="refresh-btn" onClick={refreshContent}>
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Daily Theme */}
      <div className="theme-section" style={{ '--theme-color': currentTheme.color }}>
        <div className="theme-header">
          <ThemeIcon className="theme-icon" />
          <div className="theme-info">
            <h3 className="theme-name">{currentTheme.name}</h3>
            <p className="theme-description">{currentTheme.description}</p>
          </div>
        </div>
        <div className="theme-verse">
          <div className="arabic-text">{currentTheme.verse}</div>
          <div className="translation">"{currentTheme.translation}"</div>
          <div className="reference">— {currentTheme.reference}</div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="devotionals-grid">
        {/* Inspirational Quote */}
        <div className="devotional-card quote-card">
          <div className="card-header">
            <Star className="card-icon" />
            <h3>Daily Inspiration</h3>
          </div>
          <div className="quote-content">
            <div className="quote-text">
              {currentQuote.text.includes('Hadith') ? (
                <div className="hadith-text">"{currentQuote.text}"</div>
              ) : (
                <div className="arabic-text">{currentQuote.text}</div>
              )}
            </div>
            <div className="quote-translation">"{currentQuote.translation}"</div>
            <div className="quote-reference">— {currentQuote.reference}</div>
          </div>
        </div>

        {/* Daily Reflection */}
        <div className="devotional-card reflection-card">
          <div className="card-header">
            <Lightbulb className="card-icon" />
            <h3>Daily Reflection</h3>
          </div>
          <div className="reflection-content">
            <div className="reflection-question">{currentReflection.question}</div>
            <div className="reflection-focus">{currentReflection.focus}</div>
          </div>
        </div>

        {/* Spiritual Goal */}
        <div className="devotional-card goal-card">
          <div className="card-header">
            <Target className="card-icon" />
            <h3>Today's Spiritual Goal</h3>
          </div>
          <div className="goal-content">
            <h4 className="goal-title">{currentGoal.title}</h4>
            <p className="goal-description">{currentGoal.description}</p>
            <div className="goal-details">
              <div className="goal-benefit">
                <strong>Benefit:</strong> {currentGoal.benefit}
              </div>
              <div className={`goal-difficulty ${currentGoal.difficulty.toLowerCase()}`}>
                {currentGoal.difficulty}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Progress */}
      <div className="daily-progress">
        <h3>Today's Spiritual Journey</h3>
        <div className="progress-items">
          <div className="progress-item">
            <div className="progress-icon">🤲</div>
            <div className="progress-text">
              <span className="progress-label">Prayers Completed</span>
              <span className="progress-value">3/5</span>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-icon">📖</div>
            <div className="progress-text">
              <span className="progress-label">Quran Pages Read</span>
              <span className="progress-value">2</span>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-icon">💝</div>
            <div className="progress-text">
              <span className="progress-label">Acts of Kindness</span>
              <span className="progress-value">1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyDevotionals;