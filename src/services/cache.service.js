const redisClient = require('../config/redis');

exports.cacheFAQ = async (faq) => {
    try {
        await redisClient.set(`faq:${faq._id}`, JSON.stringify(faq));
    } catch (error) {
        console.error('Cache Error:', error.message);
    }
};
