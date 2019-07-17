import {
    Pool
} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString = process.env.DATABASE_URL_DEV;

if (process.env.NODE_ENV == 'test') {
    connectionString = process.env.DATABASE_URL_TEST;
} else if (process.env.NODE_ENV == 'PROD') {
    connectionString = process.env.DATABASE_URL;

}

const pool = new Pool({
    connectionString: connectionString

});




pool.on('connect', () => {

});

export default pool;