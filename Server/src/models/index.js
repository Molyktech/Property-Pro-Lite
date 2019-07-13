import pool from '../database/dbConnection';
export default {
    /**
     * DB Query
     * @param {object} req
     * @param {object} res
     * @returns {object} object 
     * method with parameters text - query text and params - values required by text
     */
    query(text, params) {
        return new Promise((resolve, reject) => {
            pool.query(text, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}