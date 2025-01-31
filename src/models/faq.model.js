const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    question_hi: String,
    answer_hi: String,
    question_bn: String,
    answer_bn: String,
}, { timestamps: true });

faqSchema.methods.getTranslatedText = function(lang) {
    return {
        question: this[`question_${lang}`] || this.question,
        answer: this[`answer_${lang}`] || this.answer,
    };
};

module.exports = mongoose.model('FAQ', faqSchema);
