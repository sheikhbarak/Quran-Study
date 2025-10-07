import React, { useState } from 'react';
import { Heart, Briefcase, Mountain, Users, DollarSign, Home, BookOpen, Shield, Lightbulb, MessageCircle, Star, ArrowRight } from 'lucide-react';
import './Discussions.css';

const Discussions = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState(null);

  const categories = [
    { id: 'all', label: 'All Topics', icon: BookOpen },
    { id: 'relationships', label: 'Relationships', icon: Heart },
    { id: 'business', label: 'Business & Finance', icon: Briefcase },
    { id: 'life', label: 'Life Challenges', icon: Mountain }
  ];

  const discussionTopics = [
    // Relationships
    {
      id: 1,
      category: 'relationships',
      title: 'Marriage and Partnership',
      description: 'Islamic guidance on building strong, loving marriages based on Quranic principles',
      verses: ['Quran 30:21', 'Quran 2:187'],
      guidance: 'Marriage in Islam is described as finding tranquility in your spouse. The Quran emphasizes mutual love, mercy, and respect as the foundation of a successful marriage.',
      keyPoints: [
        'Choose a partner based on faith and character',
        'Maintain open and respectful communication',
        'Show appreciation and gratitude daily',
        'Resolve conflicts with patience and wisdom'
      ]
    },
    {
      id: 2,
      category: 'relationships',
      title: 'Parent-Child Relationships',
      description: 'Honoring parents while raising righteous children according to Islamic teachings',
      verses: ['Quran 17:23-24', 'Quran 31:14'],
      guidance: 'The Quran places great emphasis on honoring parents and raising children with love, discipline, and Islamic values.',
      keyPoints: [
        'Treat parents with kindness and respect',
        'Make dua for your parents regularly',
        'Teach children through example and patience',
        'Balance discipline with compassion'
      ]
    },
    {
      id: 3,
      category: 'relationships',
      title: 'Friendship and Community',
      description: 'Building meaningful friendships and contributing to your community',
      verses: ['Quran 49:10', 'Quran 5:2'],
      guidance: 'Islam emphasizes the importance of righteous companionship and helping one another in good deeds.',
      keyPoints: [
        'Choose friends who encourage your faith',
        'Be loyal and trustworthy in friendships',
        'Support your community in times of need',
        'Forgive and seek reconciliation when possible'
      ]
    },
    {
      id: 4,
      category: 'relationships',
      title: 'Dealing with Difficult People',
      description: 'Islamic approaches to handling conflicts and challenging relationships',
      verses: ['Quran 41:34', 'Quran 7:199'],
      guidance: 'The Quran teaches us to respond to evil with good and to be patient with difficult people.',
      keyPoints: [
        'Respond to negativity with kindness',
        'Set healthy boundaries when necessary',
        'Seek Allah\'s guidance in difficult situations',
        'Practice forgiveness for your own peace'
      ]
    },

    // Business & Finance
    {
      id: 5,
      category: 'business',
      title: 'Ethical Business Practices',
      description: 'Conducting business with integrity and Islamic principles',
      verses: ['Quran 2:282', 'Quran 83:1-3'],
      guidance: 'Islam emphasizes honesty, fairness, and transparency in all business dealings.',
      keyPoints: [
        'Be honest in all transactions',
        'Honor contracts and agreements',
        'Avoid interest-based dealings (riba)',
        'Treat employees and customers fairly'
      ]
    },
    {
      id: 6,
      category: 'business',
      title: 'Wealth and Money Management',
      description: 'Islamic principles for earning, spending, and managing wealth',
      verses: ['Quran 2:261', 'Quran 25:67'],
      guidance: 'Islam teaches moderation in spending, earning through halal means, and sharing wealth with those in need.',
      keyPoints: [
        'Earn through lawful and ethical means',
        'Practice moderation in spending',
        'Pay zakat and give charity regularly',
        'Avoid extravagance and waste'
      ]
    },
    {
      id: 7,
      category: 'business',
      title: 'Career and Professional Growth',
      description: 'Balancing career ambitions with Islamic values and family life',
      verses: ['Quran 9:105', 'Quran 62:10'],
      guidance: 'Islam encourages hard work and excellence while maintaining balance and remembering Allah.',
      keyPoints: [
        'Strive for excellence in your work',
        'Maintain work-life balance',
        'Use your skills to benefit society',
        'Remember Allah throughout your workday'
      ]
    },
    {
      id: 8,
      category: 'business',
      title: 'Dealing with Financial Hardship',
      description: 'Finding hope and practical solutions during financial difficulties',
      verses: ['Quran 65:2-3', 'Quran 94:5-6'],
      guidance: 'Allah promises that with hardship comes ease. Trust in Allah while taking practical steps.',
      keyPoints: [
        'Trust in Allah\'s provision and timing',
        'Seek help from family and community',
        'Look for new opportunities and skills',
        'Practice gratitude for what you have'
      ]
    },

    // Life Challenges
    {
      id: 9,
      category: 'life',
      title: 'Dealing with Loss and Grief',
      description: 'Finding comfort and healing through Islamic teachings during times of loss',
      verses: ['Quran 2:156', 'Quran 29:2-3'],
      guidance: 'Islam teaches that trials are a test of faith and that Allah is with those who are patient.',
      keyPoints: [
        'Say "Inna lillahi wa inna ilayhi raji\'un"',
        'Seek comfort in prayer and Quran',
        'Allow yourself to grieve naturally',
        'Find support in your community'
      ]
    },
    {
      id: 10,
      category: 'life',
      title: 'Overcoming Anxiety and Stress',
      description: 'Islamic methods for finding peace and managing life\'s pressures',
      verses: ['Quran 13:28', 'Quran 94:5-6'],
      guidance: 'The remembrance of Allah brings peace to hearts. Trust in Allah\'s plan and take practical steps.',
      keyPoints: [
        'Practice dhikr (remembrance of Allah)',
        'Maintain regular prayers and Quran reading',
        'Seek professional help when needed',
        'Focus on what you can control'
      ]
    },
    {
      id: 11,
      category: 'life',
      title: 'Making Difficult Decisions',
      description: 'Using Islamic guidance and prayer to make important life choices',
      verses: ['Quran 2:216', 'Quran 3:159'],
      guidance: 'Islam teaches us to consult with others, pray for guidance (Istikhara), and trust in Allah\'s wisdom.',
      keyPoints: [
        'Perform Salat al-Istikhara for guidance',
        'Consult with knowledgeable people',
        'Consider the Islamic perspective',
        'Trust in Allah after making your decision'
      ]
    },
    {
      id: 12,
      category: 'life',
      title: 'Finding Life Purpose and Direction',
      description: 'Discovering your role as a Muslim and your unique contribution to the world',
      verses: ['Quran 51:56', 'Quran 2:30'],
      guidance: 'Our primary purpose is to worship Allah and serve as His representatives on Earth.',
      keyPoints: [
        'Remember your purpose is to worship Allah',
        'Use your talents to benefit humanity',
        'Seek knowledge and personal growth',
        'Leave a positive legacy for future generations'
      ]
    },
    {
      id: 13,
      category: 'life',
      title: 'Health and Wellness',
      description: 'Maintaining physical and mental health according to Islamic principles',
      verses: ['Quran 2:195', 'Quran 4:29'],
      guidance: 'Islam emphasizes taking care of your body as it is a trust from Allah.',
      keyPoints: [
        'Eat halal and nutritious food in moderation',
        'Exercise regularly and stay active',
        'Get adequate rest and sleep',
        'Seek medical treatment when needed'
      ]
    },
    {
      id: 14,
      category: 'life',
      title: 'Forgiveness and Moving Forward',
      description: 'Learning to forgive others and yourself according to Islamic teachings',
      verses: ['Quran 42:40', 'Quran 24:22'],
      guidance: 'Forgiveness is a noble quality that brings one closer to righteousness and Allah\'s mercy.',
      keyPoints: [
        'Forgive for the sake of Allah\'s pleasure',
        'Understand that forgiveness heals the heart',
        'Don\'t let past mistakes define your future',
        'Seek Allah\'s forgiveness regularly'
      ]
    }
  ];

  const filteredTopics = selectedCategory === 'all' 
    ? discussionTopics 
    : discussionTopics.filter(topic => topic.category === selectedCategory);

  const handleTopicClick = (topic) => {
    setSelectedTopic(selectedTopic?.id === topic.id ? null : topic);
  };

  return (
    <div className="discussions">
      <div className="discussions-header">
        <div className="header-content">
          <MessageCircle className="header-icon" />
          <div className="header-text">
            <h1>Islamic Discussions</h1>
            <p>Find guidance and wisdom from the Quran for life's important topics</p>
          </div>
        </div>
      </div>

      <div className="discussions-container">
        {/* Category Filter */}
        <div className="category-filter">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <Icon className="category-icon" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Topics Grid */}
        <div className="topics-grid">
          {filteredTopics.map(topic => (
            <div key={topic.id} className="topic-card">
              <div className="topic-header" onClick={() => handleTopicClick(topic)}>
                <div className="topic-info">
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                </div>
                <ArrowRight className={`expand-icon ${selectedTopic?.id === topic.id ? 'expanded' : ''}`} />
              </div>

              {selectedTopic?.id === topic.id && (
                <div className="topic-content">
                  <div className="verses-section">
                    <h4><BookOpen className="section-icon" /> Related Verses</h4>
                    <div className="verses">
                      {topic.verses.map((verse, index) => (
                        <span key={index} className="verse-tag">{verse}</span>
                      ))}
                    </div>
                  </div>

                  <div className="guidance-section">
                    <h4><Lightbulb className="section-icon" /> Islamic Guidance</h4>
                    <p>{topic.guidance}</p>
                  </div>

                  <div className="points-section">
                    <h4><Star className="section-icon" /> Key Points</h4>
                    <ul>
                      {topic.keyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="no-topics">
            <MessageCircle className="no-topics-icon" />
            <h3>No topics found</h3>
            <p>Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discussions;