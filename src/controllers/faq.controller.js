const FAQ = require('../models/faq.model');
const cacheService = require('../services/cache.service');
const translationService = require('../services/translation.service');

exports.createFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;
        
        const translations = await translationService.translateFAQ(req.body);
        const faq = new FAQ({ 
            question, 
            answer, 
            ...translations 
        });
        
        await faq.save();
        await cacheService.cacheFAQ(faq);

        res.status(201).json(faq);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFAQs = async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        
        const faqs = await FAQ.find();
        const translatedFAQs = faqs.map(faq => faq.getTranslatedText(lang));

        res.json(translatedFAQs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;

        const translations = await translationService.translateFAQ(req.body);

        const updatedFAQ = await FAQ.findByIdAndUpdate(id, { 
            question, 
            answer, 
            ...translations 
        }, { new: true });

        if (!updatedFAQ) return res.status(404).json({ message: 'FAQ not found' });

        await cacheService.cacheFAQ(updatedFAQ);
        
        res.json(updatedFAQ);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedFAQ = await FAQ.findByIdAndDelete(id);
        
        if (!deletedFAQ) return res.status(404).json({ message: 'FAQ not found' });
        
        res.json({ message: 'FAQ deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
