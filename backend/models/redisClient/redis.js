const redis = require('redis');

const client = redis.createClient();

client.on('connect', (err) => {
  if (err) {
    console.log('Error occurred while connecting to Redis');
  } else {
    console.log('Connected to Redis Client');
  }
});

module.exports = client;
