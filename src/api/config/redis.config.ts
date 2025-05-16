import { createClient } from 'redis';

const redisClient = createClient();
const createRedisClient = async () => {
    try {
        redisClient.on('error', err => console.log('Redis Client Error', err));
        await redisClient.connect();
        console.log('connection successfully made using redis client');
    } catch (error) {
        console.log('error connecting to redis client is ', error.message);
    }
}

export {redisClient, createRedisClient};