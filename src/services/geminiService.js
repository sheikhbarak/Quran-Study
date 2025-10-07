import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error('Gemini API key not found. Please check your .env file.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// System prompt for Quran-focused AI assistant
const QURAN_SYSTEM_PROMPT = `You are a knowledgeable and respectful Islamic AI assistant specializing in the Holy Quran. Your purpose is to help users with:

1. **Scripture Understanding**: Explain verses, provide context, and share interpretations from respected scholars
2. **Personal Guidance**: Offer wisdom from the Quran for life situations while being respectful of different schools of thought
3. **Everyday Living**: Connect Quranic teachings to modern daily life challenges

Guidelines:
- Always be respectful and humble in your responses
- Provide accurate references to Quranic verses when applicable (Surah:Ayah format)
- Acknowledge when you're uncertain and suggest consulting scholars
- Be inclusive of different Islamic perspectives when appropriate
- Focus on spiritual growth, moral guidance, and practical wisdom
- Use "Peace be upon you" or similar Islamic greetings when appropriate
- Avoid controversial theological debates and stick to widely accepted teachings

Remember: You are here to guide, educate, and inspire through the beautiful teachings of the Quran.`;

class GeminiService {
  constructor() {
    this.model = genAI ? genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash"
    }) : null;
    this.chatHistory = [];
    this.demoMode = !genAI || !API_KEY;
  }

  async sendMessage(message) {
    try {
      // Demo mode with sample responses
      if (this.demoMode) {
        return this.getDemoResponse(message);
      }

      if (!this.model) {
        throw new Error('API_NOT_CONFIGURED');
      }

      // Include system prompt if this is the first message
      const history = this.chatHistory.length === 0 
        ? [{ role: 'user', parts: [{ text: QURAN_SYSTEM_PROMPT }] }]
        : this.chatHistory.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
          }));

      const chat = this.model.startChat({
        history: history
      });

      const result = await chat.sendMessage(message);
      const response = result.response.text();

      // Add to chat history
      this.chatHistory.push(
        { role: 'user', content: message },
        { role: 'model', content: response }
      );

      return response;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      // Handle specific API errors
      if (error.message.includes('SERVICE_DISABLED') || error.message.includes('403')) {
        throw new Error('API_DISABLED');
      } else if (error.message.includes('API_KEY')) {
        throw new Error('INVALID_API_KEY');
      } else if (error.message.includes('404') || error.message.includes('not found') || error.message.includes('not supported')) {
        throw new Error('MODEL_NOT_AVAILABLE');
      } else if (error.message === 'API_NOT_CONFIGURED') {
        throw new Error('API_NOT_CONFIGURED');
      } else {
        throw new Error('NETWORK_ERROR');
      }
    }
  }

  // Get suggested questions for users
  getSuggestedQuestions() {
    return [
      "What does the Quran say about patience during difficult times?",
      "Can you explain the meaning of Surah Al-Fatiha?",
      "How can I apply Quranic teachings in my daily work?",
      "What guidance does the Quran offer for family relationships?",
      "Help me understand the concept of gratitude in Islam",
      "What are some verses about seeking knowledge?",
      "How does the Quran guide us in making important decisions?",
      "Can you share wisdom about forgiveness from the Quran?"
    ];
  }

  createLanguagePrompt(message, language) {
    const languageInstructions = {
      english: "Please respond in English.",
      arabic: "يرجى الرد باللغة العربية. Please respond in Arabic.",
      urdu: "براہ کرم اردو میں جواب دیں۔ Please respond in Urdu.",
      turkish: "Lütfen Türkçe yanıtlayın. Please respond in Turkish.",
      indonesian: "Silakan merespons dalam Bahasa Indonesia. Please respond in Indonesian.",
      malay: "Sila balas dalam Bahasa Melayu. Please respond in Malay.",
      french: "Veuillez répondre en français. Please respond in French.",
      spanish: "Por favor responde en español. Please respond in Spanish.",
      german: "Bitte antworten Sie auf Deutsch. Please respond in German.",
      russian: "Пожалуйста, отвечайте на русском языке. Please respond in Russian.",
      chinese: "请用中文回答。 Please respond in Chinese.",
      hindi: "कृपया हिंदी में उत्तर दें। Please respond in Hindi.",
      bengali: "দয়া করে বাংলায় উত্তর দিন। Please respond in Bengali.",
      persian: "لطفاً به فارسی پاسخ دهید. Please respond in Persian."
    };

    const instruction = languageInstructions[language] || languageInstructions.english;
    
    return `${instruction}

You are an Islamic AI assistant. Please provide helpful, accurate information about Islam based on authentic sources like the Quran and Hadith. Be respectful and comprehensive in your responses.

User question: ${message}`;
  }

  getDemoResponse(message, language = 'english') {
    const demoResponses = {
      english: [
        {
          keywords: ['prayer', 'salah', 'namaz'],
          response: "Prayer (Salah) is one of the Five Pillars of Islam. Muslims are required to pray five times a day: Fajr (dawn), Dhuhr (midday), Asr (afternoon), Maghrib (sunset), and Isha (night). Each prayer involves specific recitations from the Quran and follows a prescribed format of standing, bowing, and prostrating."
        },
        {
          keywords: ['quran', 'holy book', 'scripture'],
          response: "The Quran is the holy book of Islam, believed by Muslims to be the direct word of Allah as revealed to Prophet Muhammad (peace be upon him) through the Angel Gabriel. It contains 114 chapters (surahs) and serves as the primary source of Islamic teachings, covering matters of faith, morality, guidance for personal conduct, and law."
        }
      ],
      arabic: [
        {
          keywords: ['prayer', 'salah', 'namaz', 'صلاة', 'صلوات'],
          response: "الصلاة هي الركن الثاني من أركان الإسلام الخمسة. يجب على المسلمين أداء خمس صلوات في اليوم: الفجر والظهر والعصر والمغرب والعشاء. كل صلاة تتضمن تلاوات محددة من القرآن الكريم وتتبع نمطاً مقرراً من القيام والركوع والسجود."
        },
        {
          keywords: ['quran', 'قرآن', 'كتاب'],
          response: "القرآن الكريم هو الكتاب المقدس للإسلام، ويؤمن المسلمون أنه كلام الله المباشر كما أُنزل على النبي محمد (صلى الله عليه وسلم) من خلال الملك جبريل. يحتوي على 114 سورة ويعتبر المصدر الأساسي للتعاليم الإسلامية."
        }
      ]
    };

    const responses = demoResponses[language] || demoResponses.english;
    
    // Find matching response based on keywords
    const matchingResponse = responses.find(item => 
      item.keywords.some(keyword => 
        message.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    const defaultResponses = {
      english: "Thank you for your question about Islam. This is a demo response. Please enable the Gemini API to get comprehensive, real-time answers to your Islamic questions and receive personalized guidance based on authentic Islamic sources.",
      arabic: "شكراً لك على سؤالك حول الإسلام. هذه استجابة تجريبية. يرجى تفعيل Gemini API للحصول على إجابات شاملة وفورية لأسئلتك الإسلامية وتلقي إرشادات شخصية مبنية على مصادر إسلامية أصيلة.",
      urdu: "اسلام کے بارے میں آپ کے سوال کا شکریہ۔ یہ ایک ڈیمو جواب ہے۔ اپنے اسلامی سوالات کے جامع، حقیقی وقت کے جوابات حاصل کرنے اور مستند اسلامی ذرائع پر مبنی ذاتی رہنمائی حاصل کرنے کے لیے Gemini API کو فعال کریں۔"
    };

    const response = matchingResponse ? 
      matchingResponse.response : 
      (defaultResponses[language] || defaultResponses.english);

    // Add to demo chat history
    this.chatHistory.push(
      { role: 'user', content: message },
      { role: 'model', content: response }
    );

    // Simulate API delay
    return new Promise(resolve => {
      setTimeout(() => resolve(response), 1000 + Math.random() * 1000);
    });
  }

  // Clear chat history
  clearHistory() {
    this.chatHistory = [];
  }

  // Get chat history
  getHistory() {
    return this.chatHistory;
  }
}

export default new GeminiService();