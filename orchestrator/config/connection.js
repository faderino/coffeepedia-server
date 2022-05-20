const Redis = require('ioredis');
const redis = new Redis({
    port: 11444,
    host: "redis-11444.c295.ap-southeast-1-1.ec2.cloud.redislabs.com",
    password: process.env.PASS_REDIS,
});

module.exports = redis;