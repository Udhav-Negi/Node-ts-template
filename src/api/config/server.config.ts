import express from 'express';
import cors from 'cors';
import { authRoutes } from '../core/routes/v1/auth.routes';
import { mainRoutes } from '../core/routes/v1/main.routes';
import { RedisConfig } from './redis.config';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { DatabaseConfig } from './database.config';
import { PassportStrategy } from '../core/middlewares/passport-strategy.middleware';

export const createExpressApp = async () => {
    
    const app = express();
    await RedisConfig.connectToRedis();
    await DatabaseConfig.connectToPgDb();
    

    app.use(session({
        store : RedisConfig.getRedisSessionStore(),
        secret : process.env.SESSIONS_SECRET as string,
        saveUninitialized : false, // it is for the session store
        resave : false, // forcing a session back to the session store 
        cookie : {
            maxAge : 60000 * 60,
        }
        
    }));
    
    await PassportStrategy.initialiseLocalStrategy();
    app.use(passport.authenticate('session'));

    app.use(cors());
    app.set('trust proxy', true);
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({extended : true}));

    app.use('/', authRoutes);
    app.use('/', mainRoutes);
    return app;

}
