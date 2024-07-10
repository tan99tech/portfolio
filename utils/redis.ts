import Redis from 'ioredis';

// Create a Redis client
const redisClient = new Redis({ 
  host: 'localhost', 
  port: 6379, 
  db: 0,
  // logging: false,
});

export default redisClient;