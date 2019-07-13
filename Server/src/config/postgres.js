import dotenv from 'dotenv';

dotenv.config();

export default {

    development: {
        user: "Postgres",
        password: "abdulateef",
        database: "propertypro_db",
        host: "127.0.0.1",
        port: 5432,

        dialect: "postgres"
    },
    test: {
        user: "Postgres",
        password: "abdulateef",
        database: "property_testdb",
        host: "127.0.0.1",
        port: 5432,

        dialect: "postgres"
    },

    production: {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
};