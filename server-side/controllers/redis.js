const redis = require("redis")
require("dotenv").config()

const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  url: process.env.REDIS_URL
});
  
redisClient.connect()
.then(() => {
  console.log('Connected to Redis')
})
.catch((error) => {
  console.log('Error connecting to Redis', error)
})
  
const manageRedis = async (req, res, next) => {
  try {
    if (!redisClient.isOpen) {
      console.error('Redis client is not connected')
      return next()
    }

    const { username } = req.params;
    if (!username) {
      return next()
    }
    const checkCachedData = await redisClient.get(`viewpost:${username}`);
    if (checkCachedData) {
      console.log('Data retrieved from cache')
      return res.json(JSON.parse(checkCachedData))
    }
    next()
  } 
  
  catch (error) {
    console.error('Could not retrieve data from cache', error)
    next()
  }
  // next()
}

module.exports = { manageRedis };