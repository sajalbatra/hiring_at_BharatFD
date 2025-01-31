// // const fetch = require('node-fetch');

// // const LIBRE_TRANSLATE_URL = 'https://libretranslate.com/translate';

// // async function translateText(text, targetLang) {
// //     const response = await fetch(LIBRE_TRANSLATE_URL, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //             q: text,
// //             source: 'en', // Assuming English as the source language
// //             target: targetLang,
// //         }),
// //     });

// //     if (!response.ok) {
// //         throw new Error('Translation failed');
// //     }

// //     const data = await response.json();
// //     return data.translatedText;
// // }

// const axios = require('axios');

// async function translateText(text, targetLang) {
//     const response = await axios.post('https://libretranslate.com/translate', {
//         q: text,
//         source: 'en',
//         target: targetLang,
// 		api_key: ""
//     });

//     return response.data.translatedText;
// }

// exports.translateFAQ = async ({ question, answer }) => {
//     const translations = {};

//     try {
//         translations.question_hi = await translateText(question, 'hi');
//         translations.answer_hi = await translateText(answer, 'hi');

//         translations.question_bn = await translateText(question, 'bn');
//         translations.answer_bn = await translateText(answer, 'bn');
        
//     } catch (error) {
//         console.error('Translation Error:', error.message);
//     }

//     return translations;
// };

const { GoogleGenerativeAI }=require( "@google/generative-ai");

// Initialize the Gemini API with your API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Ensure this is set in your .env file

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function translateText(text, targetLang) {
    const prompt = `Translate the following text to ${targetLang}: "${text}"`;
    const result = await model.generateContent(prompt);
    return result.response.text(); // Extract the translated text from the response
}

exports.translateFAQ = async ({ question, answer }) => {
    const translations = {};
    try {
        translations.question_hi = await translateText(question, 'Hindi');
        translations.answer_hi = await translateText(answer, 'Hindi');

        translations.question_bn = await translateText(question, 'Bengali');
        translations.answer_bn = await translateText(answer, 'Bengali');
        
    } catch (error) {
        console.error('Translation Error:', error.message);
    }

    return translations;
};
