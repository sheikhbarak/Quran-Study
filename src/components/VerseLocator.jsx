import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, BookOpen, Filter, Sparkles, MapPin, Heart, 
  Copy, Share2, Bookmark, Star, Eye, ChevronDown,
  Paintbrush, BookmarkCheck, RefreshCw, X, Info
} from 'lucide-react';
import './VerseLocator.css';

const VerseLocator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('keyword');
  const [selectedSurah, setSelectedSurah] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [highlighted, setHighlighted] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const [showMeaning, setShowMeaning] = useState({});

  // Comprehensive verse database
  const verseDatabase = [
    {
      id: 1,
      surah: "Al-Fatihah",
      surahNumber: 1,
      verse: 1,
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      transliteration: "Bismillahi'r-rahmani'r-raheem",
      meaning: "This is the opening verse of the Quran, known as the Basmala. It invokes Allah's mercy and compassion before beginning any endeavor. The two names of Allah mentioned here emphasize His infinite mercy - Ar-Rahman (The Entirely Merciful) encompasses all creation, while Ar-Raheem (The Especially Merciful) is specific to believers.",
      themes: ["mercy", "compassion", "beginning", "blessing"],
      keywords: ["Allah", "mercy", "compassion", "name", "bismillah"],
      context: "Opening of every chapter except At-Tawbah",
      revelation: "Meccan"
    },
    {
      id: 2,
      surah: "Al-Fatihah",
      surahNumber: 1,
      verse: 2,
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      translation: "All praise is due to Allah, Lord of the worlds.",
      transliteration: "Alhamdu lillahi rabbi'l-alameen",
      meaning: "This verse establishes the fundamental principle of praising Allah as the Creator and Sustainer of all worlds. 'Alameen' refers to all of creation - humans, jinn, angels, and everything in existence. It teaches us that all praise ultimately belongs to Allah alone.",
      themes: ["praise", "lordship", "creation", "gratitude"],
      keywords: ["praise", "Allah", "Lord", "worlds", "creation"],
      context: "Second verse of Al-Fatihah, the opening chapter",
      revelation: "Meccan"
    },
    {
      id: 3,
      surah: "Al-Baqarah",
      surahNumber: 2,
      verse: 255,
      arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
      translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep.",
      transliteration: "Allahu la ilaha illa huwa'l-hayyu'l-qayyum. La ta'khudhuhu sinatun wa la nawm",
      meaning: "Known as Ayat al-Kursi (Verse of the Throne), this is one of the most powerful verses in the Quran. It describes Allah's absolute oneness, His eternal life, and His constant vigilance over creation. Unlike His creation, Allah never sleeps, rests, or becomes tired.",
      themes: ["monotheism", "divine attributes", "power", "vigilance"],
      keywords: ["Allah", "deity", "living", "sustainer", "sleep", "throne"],
      context: "The greatest verse in the Quran according to Prophet Muhammad (PBUH)",
      revelation: "Medinan"
    },
    {
      id: 4,
      surah: "Al-Baqarah",
      surahNumber: 2,
      verse: 286,
      arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
      translation: "Allah does not charge a soul except [with that within] its capacity.",
      transliteration: "La yukallifu'llahu nafsan illa wus'aha",
      meaning: "This verse provides immense comfort and reassurance. Allah, in His infinite wisdom and mercy, never burdens any soul beyond what it can bear. This applies to all aspects of life - religious obligations, trials, and challenges. It reminds us that Allah knows our limitations and capabilities perfectly.",
      themes: ["mercy", "capacity", "burden", "comfort", "divine wisdom"],
      keywords: ["Allah", "burden", "soul", "capacity", "charge"],
      context: "Final verse of Al-Baqarah, often recited for comfort",
      revelation: "Medinan"
    },
    {
      id: 5,
      surah: "Al-Ikhlas",
      surahNumber: 112,
      verse: 1,
      arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
      translation: "Say, 'He is Allah, [who is] One,'",
      transliteration: "Qul huwa'llahu ahad",
      meaning: "This chapter, known as the 'Chapter of Sincerity,' is a concise declaration of Allah's absolute oneness. The word 'Ahad' emphasizes Allah's unique, indivisible unity - He is One without any partners, equals, or divisions.",
      themes: ["unity", "monotheism", "oneness", "sincerity"],
      keywords: ["Allah", "one", "unity", "say", "he"],
      context: "Complete chapter about Allah's oneness, equal to 1/3 of Quran in reward",
      revelation: "Meccan"
    },
    {
      id: 6,
      surah: "An-Nur",
      surahNumber: 24,
      verse: 35,
      arabic: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
      translation: "Allah is the light of the heavens and the earth.",
      transliteration: "Allahu nuru's-samawati wa'l-ard",
      meaning: "This beautiful verse describes Allah as the source of all light - both physical and spiritual. Just as light illuminates darkness, Allah's guidance illuminates the hearts and minds of believers, showing them the path to truth and righteousness.",
      themes: ["light", "guidance", "illumination", "divine guidance"],
      keywords: ["Allah", "light", "heavens", "earth", "illumination"],
      context: "Part of the famous 'Light Verse' describing Allah's guidance",
      revelation: "Medinan"
    },
    {
      id: 7,
      surah: "Ar-Rahman",
      surahNumber: 55,
      verse: 13,
      arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ",
      translation: "So which of the favors of your Lord would you deny?",
      transliteration: "Fabi-ayyi ala-i rabbikuma tukadhdhibani",
      meaning: "This verse is repeated 31 times in Surah Ar-Rahman, each time after mentioning Allah's countless blessings. It serves as a powerful reminder to reflect on and acknowledge the innumerable favors Allah has bestowed upon us, from the air we breathe to the complex systems that sustain life.",
      themes: ["gratitude", "blessings", "reflection", "acknowledgment"],
      keywords: ["favors", "Lord", "deny", "blessings", "which"],
      context: "Repeated refrain in Surah Ar-Rahman about Allah's countless blessings",
      revelation: "Meccan"
    },
    {
      id: 8,
      surah: "Al-Baqarah",
      surahNumber: 2,
      verse: 153,
      arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",
      translation: "O you who believe! Seek help through patience and prayer.",
      transliteration: "Ya ayyuha'lladhina amanu sta'inu bi's-sabri wa's-salah",
      meaning: "This verse provides a divine prescription for dealing with life's challenges. Patience (sabr) teaches us to persevere through difficulties with faith, while prayer (salah) connects us directly to Allah, providing spiritual strength and guidance. Together, they form a powerful combination for overcoming any obstacle.",
      themes: ["patience", "prayer", "help", "perseverance", "faith"],
      keywords: ["believe", "help", "patience", "prayer", "seek"],
      context: "Divine guidance for dealing with life's challenges",
      revelation: "Medinan"
    },
    {
      id: 9,
      surah: "Al-Baqarah",
      surahNumber: 2,
      verse: 261,
      arabic: "مَثَلُ الَّذِينَ يُنْفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنْبَتَتْ سَبْعَ سَنَابِلَ",
      translation: "The example of those who spend their wealth in the way of Allah is like a seed [of grain] which grows seven spikes.",
      transliteration: "Mathalu'lladhina yunfiquna amwalahum fi sabili'llahi kamathali habbatin anbatat sab'a sanabil",
      meaning: "This verse uses a beautiful agricultural metaphor to describe the exponential rewards of charitable giving. Just as a single seed can produce multiple spikes with hundreds of grains, spending in Allah's way multiplies in reward. It encourages generosity by showing how Allah multiplies good deeds.",
      themes: ["charity", "generosity", "reward", "multiplication", "giving"],
      keywords: ["spend", "wealth", "Allah", "seed", "grain", "seven"],
      context: "Encouragement for charitable giving with promise of multiplied rewards",
      revelation: "Medinan"
    },
    {
      id: 10,
      surah: "Al-Isra",
      surahNumber: 17,
      verse: 23,
      arabic: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا",
      translation: "And your Lord has decreed that you not worship except Him, and to parents, good treatment.",
      transliteration: "Wa qada rabbuka alla ta'budu illa iyyahu wa bi'l-walidayni ihsana",
      meaning: "This verse establishes two fundamental principles: the worship of Allah alone (monotheism) and excellent treatment of parents. The juxtaposition shows that after our duty to Allah, the most important obligation is kindness to our parents, who are the means through which Allah brought us into existence.",
      themes: ["worship", "parents", "kindness", "respect", "duty"],
      keywords: ["Lord", "worship", "parents", "good", "treatment", "decreed"],
      context: "Fundamental commandment linking worship of Allah with respect for parents",
      revelation: "Meccan"
    },
    {
      id: 11,
      surah: "Ash-Shura",
      surahNumber: 42,
      verse: 30,
      arabic: "وَمَا أَصَابَكُمْ مِنْ مُصِيبَةٍ فَبِمَا كَسَبَتْ أَيْدِيكُمْ وَيَعْفُو عَنْ كَثِيرٍ",
      translation: "And whatever strikes you of disaster - it is for what your hands have earned; but He pardons much.",
      transliteration: "Wa ma asabakum min musibatin fabima kasabat aydikum wa ya'fu 'an kathir",
      meaning: "This verse provides perspective on trials and difficulties. While some hardships may result from our own actions, Allah's mercy is evident in that He forgives much more than He punishes. It encourages self-reflection while emphasizing Allah's overwhelming forgiveness and mercy.",
      themes: ["trials", "forgiveness", "mercy", "consequences", "reflection"],
      keywords: ["disaster", "hands", "earned", "pardons", "much"],
      context: "Understanding trials and Allah's mercy in dealing with human mistakes",
      revelation: "Meccan"
    },
    {
      id: 12,
      surah: "Al-Ankabut",
      surahNumber: 29,
      verse: 69,
      arabic: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا",
      translation: "And those who strive for Us - We will surely guide them to Our ways.",
      transliteration: "Wa'lladhina jahadu fina lanahdiyannahum subulana",
      meaning: "This verse promises divine guidance to those who sincerely strive in Allah's path. The word 'jahadu' implies earnest effort and struggle. Allah guarantees that those who make genuine efforts to please Him and follow His guidance will be shown the right paths in life.",
      themes: ["striving", "guidance", "effort", "divine help", "paths"],
      keywords: ["strive", "guide", "ways", "paths", "surely"],
      context: "Promise of divine guidance for those who sincerely strive",
      revelation: "Meccan"
    }
  ];

  const surahs = [
    "Al-Fatihah", "Al-Baqarah", "Al-Imran", "An-Nisa", "Al-Maidah", "Al-An'am",
    "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus", "Hud", "Yusuf", "Ar-Ra'd",
    "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha",
    "Al-Anbiya", "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan", "Ash-Shu'ara",
    "An-Naml", "Al-Qasas", "Al-Ankabut", "Ar-Rum", "Luqman", "As-Sajdah",
    "Al-Ahzab", "Saba", "Fatir", "Ya-Sin", "As-Saffat", "Sad", "Az-Zumar",
    "Ghafir", "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiyah",
    "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf", "Adh-Dhariyat",
    "At-Tur", "An-Najm", "Al-Qamar", "Ar-Rahman", "Al-Waqi'ah", "Al-Hadid",
    "Al-Mujadila", "Al-Hashr", "Al-Mumtahanah", "As-Saff", "Al-Jumu'ah",
    "Al-Munafiqun", "At-Taghabun", "At-Talaq", "At-Tahrim", "Al-Mulk",
    "Al-Qalam", "Al-Haqqah", "Al-Ma'arij", "Nuh", "Al-Jinn", "Al-Muzzammil",
    "Al-Muddaththir", "Al-Qiyamah", "Al-Insan", "Al-Mursalat", "An-Naba",
    "An-Nazi'at", "Abasa", "At-Takwir", "Al-Infitar", "Al-Mutaffifin",
    "Al-Inshiqaq", "Al-Buruj", "At-Tariq", "Al-A'la", "Al-Ghashiyah",
    "Al-Fajr", "Al-Balad", "Ash-Shams", "Al-Layl", "Ad-Duha", "Ash-Sharh",
    "At-Tin", "Al-Alaq", "Al-Qadr", "Al-Bayyinah", "Az-Zalzalah", "Al-Adiyat",
    "Al-Qari'ah", "At-Takathur", "Al-Asr", "Al-Humazah", "Al-Fil", "Quraysh",
    "Al-Ma'un", "Al-Kawthar", "Al-Kafirun", "An-Nasr", "Al-Masad", "Al-Ikhlas",
    "Al-Falaq", "An-Nas"
  ];

  const themes = [
    "Faith & Belief", "Prayer & Worship", "Patience & Perseverance", "Gratitude & Praise",
    "Mercy & Compassion", "Forgiveness & Repentance", "Guidance & Wisdom", "Justice & Fairness",
    "Charity & Generosity", "Family & Relationships", "Knowledge & Learning", "Trials & Tests",
    "Hope & Trust", "Unity & Brotherhood", "Morality & Ethics", "Life & Death",
    "Paradise & Hell", "Prophets & Messengers", "Divine Attributes", "Social Justice"
  ];

  const searchTypes = [
    { value: 'keyword', label: 'Keyword Search', icon: Search },
    { value: 'theme', label: 'Theme Search', icon: BookOpen },
    { value: 'surah', label: 'Surah Search', icon: MapPin },
    { value: 'meaning', label: 'Meaning Search', icon: Sparkles }
  ];

  // Load favorites and highlighted verses from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('quran-favorites');
    const savedHighlighted = localStorage.getItem('quran-highlighted');
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    if (savedHighlighted) {
      setHighlighted(JSON.parse(savedHighlighted));
    }
  }, []);

  // Save to localStorage whenever favorites or highlighted change
  useEffect(() => {
    localStorage.setItem('quran-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('quran-highlighted', JSON.stringify(highlighted));
  }, [highlighted]);

  // Search functionality
  const searchResults = useMemo(() => {
    if (!searchQuery && !selectedSurah && !selectedTheme) {
      return verseDatabase;
    }

    return verseDatabase.filter(verse => {
      const matchesQuery = !searchQuery || (
        searchType === 'keyword' ? 
          verse.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase())) ||
          verse.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
          verse.arabic.includes(searchQuery) :
        searchType === 'theme' ?
          verse.themes.some(theme => theme.toLowerCase().includes(searchQuery.toLowerCase())) :
        searchType === 'surah' ?
          verse.surah.toLowerCase().includes(searchQuery.toLowerCase()) :
        searchType === 'meaning' ?
          verse.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
          verse.translation.toLowerCase().includes(searchQuery.toLowerCase()) :
          true
      );

      const matchesSurah = !selectedSurah || verse.surah === selectedSurah;
      const matchesTheme = !selectedTheme || verse.themes.some(theme => 
        theme.toLowerCase().includes(selectedTheme.toLowerCase())
      );

      return matchesQuery && matchesSurah && matchesTheme;
    });
  }, [searchQuery, searchType, selectedSurah, selectedTheme, verseDatabase]);

  // Favorites management
  const toggleFavorite = (verse) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === verse.id);
      if (isAlreadyFavorite) {
        return prev.filter(fav => fav.id !== verse.id);
      } else {
        return [...prev, verse];
      }
    });
  };

  // Highlighting management
  const toggleHighlight = (verse) => {
    setHighlighted(prev => {
      const isAlreadyHighlighted = prev.some(high => high.id === verse.id);
      if (isAlreadyHighlighted) {
        return prev.filter(high => high.id !== verse.id);
      } else {
        return [...prev, verse];
      }
    });
  };

  // Copy verse to clipboard
  const copyVerse = async (verse) => {
    const text = `${verse.arabic}\n\n"${verse.translation}"\n\n- ${verse.surah} ${verse.verse}`;
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy verse:', err);
    }
  };

  // Share verse
  const shareVerse = async (verse) => {
    const text = `${verse.arabic}\n\n"${verse.translation}"\n\n- ${verse.surah} ${verse.verse}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${verse.surah} ${verse.verse}`,
          text: text,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyVerse(verse);
    }
  };

  // Toggle meaning display
  const toggleMeaning = (verseId) => {
    setShowMeaning(prev => ({
      ...prev,
      [verseId]: !prev[verseId]
    }));
  };

  const displayedResults = showFavorites ? favorites : searchResults;

  return (
    <div className="verse-locator">
      <div className="verse-locator-header">
        <h1 className="page-title">Verse Locator</h1>
        <p className="page-subtitle">
          Discover, explore, and save verses with advanced search and personal collections
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="navigation-tabs">
        <button 
          className={`nav-tab ${!showFavorites ? 'active' : ''}`}
          onClick={() => setShowFavorites(false)}
        >
          <Search className="nav-icon" />
          Search Verses
        </button>
        <button 
          className={`nav-tab ${showFavorites ? 'active' : ''}`}
          onClick={() => setShowFavorites(true)}
        >
          <Heart className="nav-icon" />
          My Favorites ({favorites.length})
        </button>
      </div>

      {!showFavorites && (
        <>
          {/* Search Section */}
          <div className="search-section">
            <div className="search-types">
              {searchTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    className={`search-type-btn ${searchType === type.value ? 'active' : ''}`}
                    onClick={() => setSearchType(type.value)}
                  >
                    <Icon className="search-type-icon" />
                    {type.label}
                  </button>
                );
              })}
            </div>

            <div className="search-container">
              <div className="search-input-wrapper">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder={
                    searchType === 'keyword' ? 'Search for specific words (e.g., "patience", "Allah")...' :
                    searchType === 'theme' ? 'Search by theme (e.g., "mercy", "guidance")...' :
                    searchType === 'surah' ? 'Search by surah name (e.g., "Al-Fatihah")...' :
                    'Search by meaning or context (e.g., "comfort in trials")...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button 
                  className="clear-search-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSurah('');
                    setSelectedTheme('');
                  }}
                >
                  <X className="clear-icon" />
                </button>
              </div>
              
              <div className="search-filters">
                <button 
                  className={`filter-btn ${showFilters ? 'active' : ''}`}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="filter-icon" />
                  Filters
                  <ChevronDown className={`chevron ${showFilters ? 'rotated' : ''}`} />
                </button>
              </div>

              {showFilters && (
                <div className="filters-panel">
                  <div className="filter-group">
                    <label>Surah:</label>
                    <select 
                      value={selectedSurah} 
                      onChange={(e) => setSelectedSurah(e.target.value)}
                      className="filter-select"
                    >
                      <option value="">All Surahs</option>
                      {surahs.map((surah, index) => (
                        <option key={index} value={surah}>{surah}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Theme:</label>
                    <select 
                      value={selectedTheme} 
                      onChange={(e) => setSelectedTheme(e.target.value)}
                      className="filter-select"
                    >
                      <option value="">All Themes</option>
                      {themes.map((theme, index) => (
                        <option key={index} value={theme}>{theme}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Popular Themes */}
          <div className="popular-themes">
            <h3 className="themes-title">Popular Themes</h3>
            <div className="themes-grid">
              {themes.slice(0, 10).map((theme, index) => (
                <button 
                  key={index} 
                  className={`theme-tag ${selectedTheme === theme ? 'active' : ''}`}
                  onClick={() => setSelectedTheme(selectedTheme === theme ? '' : theme)}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Results Section */}
      <div className="search-results">
        <div className="results-header">
          <h3>{showFavorites ? 'My Favorite Verses' : 'Search Results'}</h3>
          <span className="results-count">
            {displayedResults.length} verse{displayedResults.length !== 1 ? 's' : ''} found
          </span>
        </div>
        
        <div className="results-list">
          {displayedResults.map((verse) => (
            <div 
              key={verse.id} 
              className={`result-card ${highlighted.some(h => h.id === verse.id) ? 'highlighted' : ''}`}
            >
              <div className="result-header">
                <div className="result-location">
                  <MapPin className="location-icon" />
                  <span>{verse.surah} {verse.verse}</span>
                  <span className="revelation-type">{verse.revelation}</span>
                </div>
                <div className="result-actions">
                  <button 
                    className={`action-btn highlight-btn ${highlighted.some(h => h.id === verse.id) ? 'active' : ''}`}
                    onClick={() => toggleHighlight(verse)}
                    title="Highlight verse"
                  >
                    <Paintbrush className="action-icon" />
                  </button>
                  <button 
                    className={`action-btn favorite-btn ${favorites.some(f => f.id === verse.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(verse)}
                    title="Add to favorites"
                  >
                    <Heart className="action-icon" />
                  </button>
                  <button 
                    className="action-btn copy-btn"
                    onClick={() => copyVerse(verse)}
                    title="Copy verse"
                  >
                    <Copy className="action-icon" />
                  </button>
                  <button 
                    className="action-btn share-btn"
                    onClick={() => shareVerse(verse)}
                    title="Share verse"
                  >
                    <Share2 className="action-icon" />
                  </button>
                </div>
              </div>
              
              <div className="verse-content">
                <div className="verse-arabic">{verse.arabic}</div>
                <div className="verse-transliteration">{verse.transliteration}</div>
                <div className="verse-translation">"{verse.translation}"</div>
              </div>

              <div className="verse-themes">
                {verse.themes.map((theme, index) => (
                  <span key={index} className="theme-tag small">{theme}</span>
                ))}
              </div>

              <div className="verse-footer">
                <button 
                  className={`meaning-toggle ${showMeaning[verse.id] ? 'active' : ''}`}
                  onClick={() => toggleMeaning(verse.id)}
                >
                  <Info className="info-icon" />
                  {showMeaning[verse.id] ? 'Hide' : 'Show'} Meaning & Context
                </button>
              </div>

              {showMeaning[verse.id] && (
                <div className="verse-meaning">
                  <div className="meaning-content">
                    <h4>Meaning & Context:</h4>
                    <p>{verse.meaning}</p>
                    <div className="context-info">
                      <strong>Context:</strong> {verse.context}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {displayedResults.length === 0 && (
          <div className="no-results">
            <BookOpen className="no-results-icon" />
            <h3>{showFavorites ? 'No favorite verses yet' : 'No verses found'}</h3>
            <p>
              {showFavorites 
                ? 'Start exploring verses and add them to your favorites!' 
                : 'Try adjusting your search terms or filters to find more verses.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Statistics */}
      {!showFavorites && (
        <div className="verse-stats">
          <div className="stat-card">
            <BookOpen className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">{verseDatabase.length}</span>
              <span className="stat-label">Total Verses</span>
            </div>
          </div>
          <div className="stat-card">
            <Heart className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">{favorites.length}</span>
              <span className="stat-label">Favorites</span>
            </div>
          </div>
          <div className="stat-card">
            <Paintbrush className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">{highlighted.length}</span>
              <span className="stat-label">Highlighted</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerseLocator;