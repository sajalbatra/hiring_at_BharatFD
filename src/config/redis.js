const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.connect();

module.exports = redisClient;
