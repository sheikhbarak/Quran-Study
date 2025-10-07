import React, { useState, useEffect } from 'react';
import { Heart, Clock, Star, RefreshCw, BookOpen, Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import './PersonalizedPrayers.css';

const PersonalizedPrayers = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [spiritualMood, setSpiritualMood] = useState('peaceful');
  const [currentRecommendation, setCurrentRecommendation] = useState(null);
  const [userProgress] = useState({
    prayersCompleted: 127,
    versesRead: 342,
    reflectionDays: 15,
    favoriteTopics: ['patience', 'gratitude', 'guidance']
  });

  // Prayer times and spiritual moments
  const spiritualMoments = {
    fajr: { name: 'Fajr', icon: Sunrise, time: '05:30', color: '#f59e0b' },
    dhuhr: { name: 'Dhuhr', icon: Sun, time: '12:45', color: '#eab308' },
    asr: { name: 'Asr', icon: Sun, time: '15:30', color: '#f97316' },
    maghrib: { name: 'Maghrib', icon: Sunset, time: '18:15', color: '#dc2626' },
    isha: { name: 'Isha', icon: Moon, time: '19:45', color: '#7c3aed' }
  };

  // Comprehensive prayer and scripture database
  const spiritualContent = {
    morning: {
      prayers: [
        {
          title: "Morning Gratitude",
          arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
          translation: "O Allah, help me to remember You, thank You, and worship You in the best manner.",
          benefit: "Starts your day with mindfulness and gratitude"
        },
        {
          title: "Seeking Guidance",
          arabic: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ",
          translation: "O Allah, guide me among those You have guided.",
          benefit: "Asks for divine guidance throughout the day"
        }
      ],
      verses: [
        {
          arabic: "وَهُوَ الَّذِي يُنَزِّلُ الْغَيْثَ مِن بَعْدِ مَا قَنَطُوا وَيَنشُرُ رَحْمَتَهُ",
          translation: "And it is He who sends down rain after they had despaired and spreads His mercy.",
          reference: "Ash-Shura 42:28",
          theme: "Hope and Divine Mercy"
        }
      ]
    },
    afternoon: {
      prayers: [
        {
          title: "Midday Reflection",
          arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
          translation: "Our Lord, give us good in this world and good in the next world.",
          benefit: "Balances worldly and spiritual aspirations"
        }
      ],
      verses: [
        {
          arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
          translation: "And whoever fears Allah - He will make for him a way out.",
          reference: "At-Talaq 65:2",
          theme: "Trust and Solutions"
        }
      ]
    },
    evening: {
      prayers: [
        {
          title: "Evening Protection",
          arabic: "اللَّهُمَّ أَنْتَ رَبِّي لا إِلَهَ إِلا أَنْتَ عَلَيْكَ تَوَكَّلْتُ",
          translation: "O Allah, You are my Lord, there is no god but You. In You I trust.",
          benefit: "Provides spiritual protection and peace"
        }
      ],
      verses: [
        {
          arabic: "وَاللَّيْلِ إِذَا يَغْشَىٰ وَالنَّهَارِ إِذَا تَجَلَّىٰ",
          translation: "By the night when it covers and by the day when it appears.",
          reference: "Al-Layl 92:1-2",
          theme: "Divine Signs and Reflection"
        }
      ]
    },
    night: {
      prayers: [
        {
          title: "Night Gratitude",
          arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَكَفَانَا",
          translation: "Praise be to Allah who fed us, gave us drink, and sufficed us.",
          benefit: "Ends the day with thankfulness"
        }
      ],
      verses: [
        {
          arabic: "وَمِنْ آيَاتِهِ مَنَامُكُم بِالَّيْلِ وَالنَّهَارِ",
          translation: "And among His signs is your sleep by night and day.",
          reference: "Ar-Rum 30:23",
          theme: "Rest and Divine Wisdom"
        }
      ]
    }
  };

  // Mood-based recommendations
  const moodBasedContent = {
    peaceful: {
      prayer: {
        title: "Inner Peace",
        arabic: "اللَّهُمَّ أَصْلِحْ لِي دِينِي وَدُنْيَايَ وَآخِرَتِي",
        translation: "O Allah, make righteous for me my religion, my worldly affairs, and my afterlife.",
        benefit: "Brings harmony to all aspects of life"
      },
      verse: {
        arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
        translation: "Verily, in the remembrance of Allah do hearts find rest.",
        reference: "Ar-Ra'd 13:28",
        theme: "Peace and Tranquility"
      }
    },
    grateful: {
      prayer: {
        title: "Deep Gratitude",
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى شُكْرِكَ وَذِكْرِكَ وَحُسْنِ عِبَادَتِكَ",
        translation: "O Allah, help me to thank You, remember You, and worship You excellently.",
        benefit: "Cultivates a grateful heart"
      },
      verse: {
        arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
        translation: "If you are grateful, I will certainly give you more.",
        reference: "Ibrahim 14:7",
        theme: "Gratitude and Abundance"
      }
    },
    seeking: {
      prayer: {
        title: "Seeking Guidance",
        arabic: "رَبِّ اشْرُحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
        translation: "My Lord, expand for me my breast and ease for me my task.",
        reference: "Ta-Ha 20:25-26",
        benefit: "Opens the heart to divine guidance"
      },
      verse: {
        arabic: "وَمَن يَهْدِ اللَّهُ فَهُوَ الْمُهْتَدِ",
        translation: "And whoever Allah guides - he is the [rightly] guided.",
        reference: "Al-Isra 17:97",
        theme: "Divine Guidance"
      }
    },
    reflective: {
      prayer: {
        title: "Deep Reflection",
        arabic: "رَبَّنَا مَا خَلَقْتَ هَٰذَا بَاطِلًا سُبْحَانَكَ",
        translation: "Our Lord, You did not create this aimlessly; exalted are You.",
        reference: "Al-Imran 3:191",
        benefit: "Encourages contemplation of creation"
      },
      verse: {
        arabic: "وَفِي أَنفُسِكُمْ ۚ أَفَلَا تُبْصِرُونَ",
        translation: "And in yourselves. Then will you not see?",
        reference: "Adh-Dhariyat 51:21",
        theme: "Self-Reflection"
      }
    }
  };

  // Get time-based recommendations
  const getTimeBasedContent = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return spiritualContent.morning;
    if (hour >= 12 && hour < 17) return spiritualContent.afternoon;
    if (hour >= 17 && hour < 21) return spiritualContent.evening;
    return spiritualContent.night;
  };

  // Get personalized recommendation
  const getPersonalizedRecommendation = () => {
    const timeContent = getTimeBasedContent();
    const moodContent = moodBasedContent[spiritualMood];
    
    // Combine time-based and mood-based content
    const recommendation = {
      timePrayer: timeContent.prayers[Math.floor(Math.random() * timeContent.prayers.length)],
      timeVerse: timeContent.verses[Math.floor(Math.random() * timeContent.verses.length)],
      moodPrayer: moodContent.prayer,
      moodVerse: moodContent.verse,
      timeOfDay: getTimeOfDay()
    };
    
    return recommendation;
  };

  const getTimeOfDay = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };

  const getNextPrayerTime = () => {
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const currentTimeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    
    const prayerTimes = Object.values(spiritualMoments);
    const nextPrayer = prayerTimes.find(prayer => prayer.time > currentTimeStr) || prayerTimes[0];
    
    return nextPrayer;
  };

  const refreshRecommendation = () => {
    setCurrentRecommendation(getPersonalizedRecommendation());
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    // Initial recommendation
    setCurrentRecommendation(getPersonalizedRecommendation());

    return () => clearInterval(timer);
  }, [spiritualMood]);

  const nextPrayer = getNextPrayerTime();

  return (
    <div className="personalized-prayers">
      <div className="prayers-header">
        <div className="header-content">
          <h2 className="prayers-title">
            <Heart className="title-icon" />
            Your Spiritual Companion
          </h2>
          <p className="prayers-subtitle">
            Personalized prayers and verses for your journey
          </p>
        </div>
        <button 
          className="refresh-btn"
          onClick={refreshRecommendation}
          title="Get new recommendation"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Spiritual Mood Selector */}
      <div className="mood-selector">
        <span className="mood-label">How are you feeling spiritually?</span>
        <div className="mood-options">
          {Object.keys(moodBasedContent).map(mood => (
            <button
              key={mood}
              className={`mood-btn ${spiritualMood === mood ? 'active' : ''}`}
              onClick={() => setSpiritualMood(mood)}
            >
              {mood.charAt(0).toUpperCase() + mood.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Next Prayer Time */}
      <div className="next-prayer">
        <div className="prayer-time-info">
          <nextPrayer.icon className="prayer-icon" style={{ color: nextPrayer.color }} />
          <div className="prayer-details">
            <span className="prayer-name">Next: {nextPrayer.name}</span>
            <span className="prayer-time">{nextPrayer.time}</span>
          </div>
        </div>
      </div>

      {/* Personalized Recommendations */}
      {currentRecommendation && (
        <div className="recommendations">
          {/* Time-based Prayer */}
          <div className="recommendation-card prayer-card">
            <div className="card-header">
              <Clock className="card-icon" />
              <h3>Prayer for {currentRecommendation.timeOfDay}</h3>
            </div>
            <div className="prayer-content">
              <h4>{currentRecommendation.timePrayer.title}</h4>
              <div className="arabic-text">{currentRecommendation.timePrayer.arabic}</div>
              <div className="translation">{currentRecommendation.timePrayer.translation}</div>
              <div className="benefit">{currentRecommendation.timePrayer.benefit}</div>
            </div>
          </div>

          {/* Mood-based Prayer */}
          <div className="recommendation-card prayer-card">
            <div className="card-header">
              <Star className="card-icon" />
              <h3>For Your Current Mood</h3>
            </div>
            <div className="prayer-content">
              <h4>{currentRecommendation.moodPrayer.title}</h4>
              <div className="arabic-text">{currentRecommendation.moodPrayer.arabic}</div>
              <div className="translation">{currentRecommendation.moodPrayer.translation}</div>
              <div className="benefit">{currentRecommendation.moodPrayer.benefit}</div>
            </div>
          </div>

          {/* Time-based Verse */}
          <div className="recommendation-card verse-card">
            <div className="card-header">
              <BookOpen className="card-icon" />
              <h3>Verse for Reflection</h3>
            </div>
            <div className="verse-content">
              <div className="arabic-text">{currentRecommendation.timeVerse.arabic}</div>
              <div className="translation">{currentRecommendation.timeVerse.translation}</div>
              <div className="verse-reference">{currentRecommendation.timeVerse.reference}</div>
              <div className="verse-theme">Theme: {currentRecommendation.timeVerse.theme}</div>
            </div>
          </div>

          {/* Mood-based Verse */}
          <div className="recommendation-card verse-card">
            <div className="card-header">
              <Star className="card-icon" />
              <h3>Verse for Your Heart</h3>
            </div>
            <div className="verse-content">
              <div className="arabic-text">{currentRecommendation.moodVerse.arabic}</div>
              <div className="translation">{currentRecommendation.moodVerse.translation}</div>
              <div className="verse-reference">{currentRecommendation.moodVerse.reference}</div>
              <div className="verse-theme">Theme: {currentRecommendation.moodVerse.theme}</div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="spiritual-progress">
        <h3>Your Spiritual Journey</h3>
        <div className="progress-stats">
          <div className="progress-item">
            <span className="progress-number">{userProgress.prayersCompleted}</span>
            <span className="progress-label">Prayers Completed</span>
          </div>
          <div className="progress-item">
            <span className="progress-number">{userProgress.versesRead}</span>
            <span className="progress-label">Verses Read</span>
          </div>
          <div className="progress-item">
            <span className="progress-number">{userProgress.reflectionDays}</span>
            <span className="progress-label">Days of Reflection</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedPrayers;