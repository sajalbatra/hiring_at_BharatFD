const express = require('express');
const faqController = require('../controllers/faq.controller');

const router = express.Router();

router.post('/', faqController.createFAQ);
router.get('/', faqController.getFAQs);
router.put('/:id', faqController.updateFAQ);
router.delete('/:id', faqController.deleteFAQ);

module.exports = router;
