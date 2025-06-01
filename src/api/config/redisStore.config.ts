import {RedisStore} from "connect-redis"
import { redisClient } from "./redis.config";


export const redisStore = new RedisStore({
    client : redisClient,
    prefix : "sess:"
});