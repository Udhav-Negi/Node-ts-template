import express from 'express';
import cors from 'cors';
import { router } from '../core/routes/v2/routes';
import { connectMongoDatabase } from './database.config';
import { createRedisClient } from './redis.config';

export const createExpressApp = async () => {
    const app = express();
    
    app.set('trust proxy', true);
    app.use(express.json());
    app.use(express.urlencoded({extended : true}));
    app.use(cors())
    app.use('/', router)

    // await connectMongoDatabase();
    await createRedisClient();


    return app;

}
