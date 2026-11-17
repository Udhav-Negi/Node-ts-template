import { RedisStore } from 'connect-redis';
import { createClient, createCluster } from 'redis';

class RedisConfig {

    static redisObj: RedisConfig;
    private redisClient;
    private redisSessionStoreClient;

    constructor() {
        this.redisClient = createClient();
        this.redisSessionStoreClient = new RedisStore({
            client : this.redisClient,
            prefix : "sess:"
        });
    }

    static async connectToRedis() {
        console.log('inside connect to redis');
        if(this.redisObj == null || this.redisObj == undefined) {
            this.redisObj = new RedisConfig();
        }

        this.redisObj.redisClient.on('error', err => console.log('Redis Client Error', err));
        await this.redisObj.redisClient.connect();
        console.log('connected to redis');
    }


    static getRedisClient() {
        console.log('inside get redis client:', this.redisObj);
        return this.redisObj.redisClient;
    }

    static getRedisSessionStore() {
        return this.redisObj.redisSessionStoreClient;
    }


}

export {RedisConfig};