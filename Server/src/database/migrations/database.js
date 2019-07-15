const {
    Pool
} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

let connectionString = null;

if (process.env.NODE_ENV === 'test') connectionString = process.env.DATABASE_URL_TEST;
if (process.env.NODE_ENV === 'PROD') connectionString = process.env.DATABASE_URL_PROD;
if (process.env.NODE_ENV === 'development') connectionString = process.env.DATABASE_URL;

console.log(connectionString)
const pool = new Pool({
    connectionString: connectionString

});

pool.on('connect', () => {
    console.log('connected to the db');
    console.log(connectionString)
});
/*** CREATE TABLES */
const createAllTables = () => {
    const queryText =
        `
        DROP TABLE IF EXISTS Users;
        CREATE TABLE 
     Users(
        id SERIAL PRIMARY KEY NOT NULL,
        first_name VARCHAR NOT NULL,
        last_name VARCHAR NOT NULL,
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        phone_number VARCHAR NOT NULL,
        address VARCHAR NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE

     );

     DROP TABLE IF EXISTS Properties;
     CREATE TABLE Properties (
        id SERIAL PRIMARY KEY NOT NULL,
        owner INTEGER NOT NULL,
        status VARCHAR(45) DEFAULT 'available',
        price FLOAT NOT NULL,
        state VARCHAR(45) NOT NULL,
        city VARCHAR NOT NULL,
        address TEXT NOT NULL,
        type VARCHAR(128) NOT NULL,
        created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        image_url TEXT NOT NULL,
        FOREIGN KEY (owner) REFERENCES Users(id) ON DELETE CASCADE
    );
     
     `;

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

createAllTables();


export {

    createAllTables
}

require('make-runnable');