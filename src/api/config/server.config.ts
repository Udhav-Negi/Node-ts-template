import express from 'express';
import cors from 'cors';
import { router } from '../core/routes/v1/routes';
// import { connectMongoDatabase } from './database.config';
import { createRedisClient } from './redis.config';
import cookieParser from 'cookie-parser';

export const createExpressApp = async () => {
    const app = express();
    

    app.use(cors({
        origin : "http://localhost:5173",
        credentials: true
    }));

    app.set('trust proxy', true);
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({extended : true}));
    app.use('/', router);
    
    // await connectMongoDatabase();
    await createRedisClient();


    return app;

}
