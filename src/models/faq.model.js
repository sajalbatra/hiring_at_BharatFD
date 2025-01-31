const mongoose = require('mongoose');
const { translate } = require('../services/translation.service');

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true
  },
  // Multilingual question fields
  question_hi: { type: String },
  question_bn: { type: String },
  
  // Multilingual answer fields
  answer_hi: { type: String },
  answer_bn: { type: String },
  
  languages: {
    type: [String],
    default: ['en']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook for automatic translations
FAQSchema.pre('save', async function(next) {
  if (this.isModified('question') || this.isNew) {
    try {
      this.question_hi = await translate(this.question, 'hi');
      this.question_bn = await translate(this.question, 'bn');
      this.languages = ['en', 'hi', 'bn'];
    } catch (error) {
      console.error('Translation error:', error);
    }
  }
  
  if (this.isModified('answer') || this.isNew) {
    try {
      this.answer_hi = await translate(this.answer, 'hi');
      this.answer_bn = await translate(this.answer, 'bn');
    } catch (error) {
      console.error('Translation error:', error);
    }
  }
  
  next();
});

// Method to get translated text
FAQSchema.methods.getTranslatedText = function(field, language = 'en') {
  const translations = {
    'question': {
      'en': this.question,
      'hi': this.question_hi || this.question,
      'bn': this.question_bn || this.question
    },
    'answer': {
      'en': this.answer,
      'hi': this.answer_hi || this.answer,
      'bn': this.answer_bn || this.answer
    }
  };
  
  return translations[field][language] || translations[field]['en'];
};

module.exports = mongoose.model('FAQ', FAQSchema);