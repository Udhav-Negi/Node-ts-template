import mysql, { PoolOptions } from 'mysql2'
import { Db, MongoClient } from 'mongodb';

// const mongodbURL = process.env.MONGODB_DATABASE_URL + process.env.MONGODB_DATABASE ;
const mongodbURL = "mongodb://localhost:27017/radiowalla4";
const client = new MongoClient(mongodbURL, {
    maxPoolSize: 20
});


var pool = mysql.createPool({
    connectionLimit : 50,
    database : process.env.MYSQL_DATABASE,
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    debug : false,
} as PoolOptions);


var wpool = mysql.createPool({
    connectionLimit : 20,
    database : process.env.MYSQL_DATABASE,
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    debug : false
} as PoolOptions);


let mongoClient : Db;
const connectMongoDatabase = async () => {
    try {
        await client.connect();
        console.log('connected successfully to mongodb');
        let mongodbName = process.env.MONGODB_DATABASE;
        mongoClient = client.db(mongodbName);
    } catch (error) {
        console.log('error in connection to mongodb is ', error.message);
    }
}

export {mongoClient, connectMongoDatabase, pool, wpool}
