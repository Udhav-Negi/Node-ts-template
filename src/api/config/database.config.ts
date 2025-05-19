import mysql, { PoolOptions } from 'mysql2'
import { Db, MongoClient } from 'mongodb';

// const mongodbURL = process.env.MONGODB_DATABASE_URL + process.env.MONGODB_DATABASE ;
const mongodbURL = "mongodb://localhost:27017/radiowalla4";
const client = new MongoClient(mongodbURL, {
    maxPoolSize: 20
});


const pool = mysql.createPool({
    connectionLimit : 50,
    // eslint-disable-next-line no-undef
    database : process.env.MYSQL_DATABASE,
    // eslint-disable-next-line no-undef
    host : process.env.MYSQL_HOST,
    // eslint-disable-next-line no-undef
    user : process.env.MYSQL_USERNAME,
    // eslint-disable-next-line no-undef
    password : process.env.MYSQL_PASSWORD,
     
    debug : false,
} as PoolOptions);


const wpool = mysql.createPool({
    connectionLimit : 20,
    // eslint-disable-next-line no-undef
    database : process.env.MYSQL_DATABASE,
    // eslint-disable-next-line no-undef
    host : process.env.MYSQL_HOST,
    // eslint-disable-next-line no-undef
    user : process.env.MYSQL_USERNAME,
    // eslint-disable-next-line no-undef
    password : process.env.MYSQL_PASSWORD,
    debug : false
} as PoolOptions);


let mongoClient : Db;
 

const connectMongoDatabase = async () => {
    try {
        await client.connect();
        console.log('connected successfully to mongodb');
        // eslint-disable-next-line no-undef
        const mongodbName = process.env.MONGODB_DATABASE;
        mongoClient = client.db(mongodbName);
    } catch (error) {
        console.log('error in connection to mongodb is ', error.message);
    }
}

export {mongoClient, connectMongoDatabase, pool, wpool}
