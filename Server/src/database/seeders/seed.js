import {
    Pool
} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString = null;

if (process.env.NODE_ENV === 'test') connectionString = process.env.DATABASE_URL_TEST;
if (process.env.NODE_ENV === 'PROD') connectionString = process.env.DATABASE_URL;
if (process.env.NODE_ENV === 'development') connectionString = process.env.DATABASE_URL_DEV;


const pool = new Pool({
    connectionString: connectionString

});

pool.on('connect', () => {
    console.log('connected to the db');

});
const data = `INSERT INTO Users(
    first_name, 
    last_name,
    is_admin,
    email,
    password,
    address,
    phone_number,
    
) VALUES(
    'Modupe',
    'Adebayo',
    true,
    'modupeadebayo001@gmail.com',
    'IamAdmin',
    'wuse II, abuja',
    '07088331011'
);

INSERT INTO Properties(
    state,
    city,
    type,
    price,
    address,
    image_url,
    owner,
    created_on,
    status,
) VALUES(
    'abuja',
    'fct',
    '2-bedroom',
    '20000000',
    'no 4, koforidua street, wuse abuja',
    'https://via.placeholder.com/250/92c952',
    1,
    '2019-07-14 22:46:19',
    'available'
)`;

pool
    .query(data)
    .then((res) => {
        pool.end();
    })
    .catch((err) => {
        pool.end();
    });