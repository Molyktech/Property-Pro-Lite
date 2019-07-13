import {
    Pool
} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString = process.env.DATABASE_URL;

if (process.env.NODE_ENV == 'test') {
    connectionString = process.env.DATABASE_URL_TEST;
} else if (process.env.NODE_ENV == 'PROD') {
    connectionString = process.env.DATABASE_URL_PROD;

}

const pool = new Pool({
    connectionString: connectionString

});




pool.on('connect', () => {
    console.log('connected to the db');
});

export default pool;