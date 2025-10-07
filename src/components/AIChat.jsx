import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Sparkles, BookOpen, Heart, Lightbulb, RotateCcw, Loader, AlertCircle, Settings, Globe, X } from 'lucide-react';
import geminiService from '../services/geminiService';
import './AIChat.css';

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Assalamu Alaikum! 🌙 I\'m your AI companion for Quranic guidance and Islamic wisdom. How may I assist you in your spiritual journey today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [suggestedQuestions] = useState(geminiService.getSuggestedQuestions());
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Supported languages
  const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'arabic', name: 'العربية (Arabic)', flag: '🇸🇦' },
    { code: 'urdu', name: 'اردو (Urdu)', flag: '🇵🇰' },
    { code: 'turkish', name: 'Türkçe (Turkish)', flag: '🇹🇷' },
    { code: 'indonesian', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'malay', name: 'Bahasa Melayu', flag: '🇲🇾' },
    { code: 'french', name: 'Français (French)', flag: '🇫🇷' },
    { code: 'spanish', name: 'Español (Spanish)', flag: '🇪🇸' },
    { code: 'german', name: 'Deutsch (German)', flag: '🇩🇪' },
    { code: 'russian', name: 'Русский (Russian)', flag: '🇷🇺' },
    { code: 'chinese', name: '中文 (Chinese)', flag: '🇨🇳' },
    { code: 'hindi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'bengali', name: 'বাংলা (Bengali)', flag: '🇧🇩' },
    { code: 'persian', name: 'فارسی (Persian)', flag: '🇮🇷' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await geminiService.sendMessage(messageText.trim(), selectedLanguage);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.success ? response.message : `I apologize, but I encountered an error: ${response.error}. Please try again.`,
        timestamp: response.timestamp,
        error: !response.success
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      let errorText = 'I apologize, but I\'m having trouble connecting right now. Please check your internet connection and try again.';
      
      // Handle specific error types
      switch (error.message) {
        case 'API_DISABLED':
          errorText = '🔧 The Google Generative AI API needs to be enabled. Please visit the Google Cloud Console to enable the API, then try again. In the meantime, you can use demo mode for basic responses.';
          break;
        case 'INVALID_API_KEY':
          errorText = '🔑 There seems to be an issue with the API key. Please check your configuration and try again.';
          break;
        case 'MODEL_NOT_AVAILABLE':
          errorText = '🤖 The AI model is currently not available. The system has been updated to use an alternative model. Please try your message again.';
          break;
        case 'API_NOT_CONFIGURED':
          errorText = '⚙️ The AI service is not properly configured. Please check your API settings.';
          break;
        case 'NETWORK_ERROR':
          errorText = '🌐 Network error occurred. Please check your internet connection and try again.';
          break;
        default:
          errorText = 'I apologize, but I encountered an unexpected error. Please try again later.';
      }
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: errorText,
        timestamp: new Date().toISOString(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: 'Assalamu Alaikum! 🌙 I\'m your AI companion for Quranic guidance and Islamic wisdom. How may I assist you in your spiritual journey today?',
        timestamp: new Date().toISOString()
      }
    ]);
    geminiService.clearHistory();
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="ai-chat">
      <div className="ai-chat-header">
        <div className="header-content">
          <div className="header-icon">
            <Sparkles className="sparkles-icon" />
            <MessageCircle className="chat-icon" />
          </div>
          <div className="header-text">
            <h1>AI Spiritual Companion</h1>
            <p>Seek guidance, wisdom, and understanding from the Holy Quran</p>
            {geminiService.demoMode && (
              <div className="demo-indicator">
                <AlertCircle size={14} />
                <span>Demo Mode - Enable API for full features</span>
              </div>
            )}
          </div>
          <div className="header-buttons">
            <button 
              className="header-btn settings-btn"
              onClick={() => setShowSettings(true)}
              title="Language Settings"
            >
              <Settings size={18} />
            </button>
            <button 
              className="header-btn clear-chat-btn"
              onClick={clearChat}
              title="Clear conversation"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="ai-chat-container">
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}-message ${message.error ? 'error-message' : ''}`}>
              <div className="message-content">
                <div className="message-avatar">
                  {message.type === 'ai' ? (
                    <div className="ai-avatar">
                      <Sparkles size={16} />
                    </div>
                  ) : (
                    <div className="user-avatar">
                      <Heart size={16} />
                    </div>
                  )}
                </div>
                <div className="message-body">
                  <div className="message-text">{message.content}</div>
                  <div className="message-time">{formatTime(message.timestamp)}</div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message ai-message loading-message">
              <div className="message-content">
                <div className="message-avatar">
                  <div className="ai-avatar">
                    <Loader className="loading-spinner" size={16} />
                  </div>
                </div>
                <div className="message-body">
                  <div className="message-text">Seeking wisdom...</div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Language Settings Modal */}
        {showSettings && (
          <div className="settings-modal-overlay" onClick={() => setShowSettings(false)}>
            <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
              <div className="settings-header">
                <div className="settings-title">
                  <Globe size={20} />
                  <h3>Language Settings</h3>
                </div>
                <button 
                  className="close-settings-btn"
                  onClick={() => setShowSettings(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="settings-content">
                <p>Choose the language for AI responses:</p>
                <div className="language-grid">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      className={`language-option ${selectedLanguage === language.code ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedLanguage(language.code);
                        setShowSettings(false);
                      }}
                    >
                      <span className="language-flag">{language.flag}</span>
                      <span className="language-name">{language.name}</span>
                      {selectedLanguage === language.code && (
                        <span className="selected-indicator">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {messages.length === 1 && (
          <div className="suggested-questions">
            <h3><Lightbulb size={20} /> Suggested Questions</h3>
            <div className="questions-grid">
              {suggestedQuestions.slice(0, 6).map((question, index) => (
                <button
                  key={index}
                  className="suggested-question"
                  onClick={() => handleSuggestedQuestion(question)}
                  disabled={isLoading}
                >
                  <BookOpen size={16} />
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="input-container">
          <div className="input-wrapper">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Quranic guidance, seek wisdom, or request spiritual advice..."
              className="message-input"
              rows="1"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className="send-button"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="input-footer">
            <p>💫 Powered by AI • Guided by Islamic wisdom • Always consult scholars for important matters</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;