import {
    Pool
} from 'pg'
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});


pool.on('connect', () => {
    console.log('connected to the db');
});
/*** CREATE TABLES */
const createTables = () => {
    const queryText =
        `CREATE TABLE IF NOT EXISTS
     Users(
        id SERIAL PRIMARY KEY,
        firstName VARCHAR NOT NULL,
        lastName VARCHAR NOT NULL,
        email VARCHAR UNIQUE NOT NULL,
        phoneNumber VARCHAR NOT NULL,
        address VARCHAR NOT NULL,
        created0n TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        isAdmin BOOLEAN DEFAULT FALSE

     )`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

/**DROP TABLES */

const dropTables = () => {
    const queryText = 'DROP TABLE IF EXISTS Users';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

pool.on('error', (err) => {
    console.log(err)
});

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

export {
    createTables,
    dropTables
}

require('make-runnable');