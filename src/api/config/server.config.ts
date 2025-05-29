import express from 'express';
import cors from 'cors';
import { router } from '../core/routes/v1/routes';
// import { connectMongoDatabase } from './database.config';
import { createRedisClient } from './redis.config';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

export const createExpressApp = async () => {
    const app = express();
    

    app.use(session({
        secret : "anson the dev",
        saveUninitialized : false, // it is for the session store
        resave : false, // forcing a session back to the session store 
        cookie : {
            maxAge : 60000 * 60,
        }

    }))
    app.use(cors({
        origin : "http://localhost:5173",
        credentials: true
    }));

    app.set('trust proxy', true);
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({extended : true}));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/', router);
    
    // await connectMongoDatabase();
    await createRedisClient();


    return app;

}
