import db from '../models/index';
import Helper from '../helpers/authHelpers';
import Util from '../utils/Utils';


const User = {

    async create(req, res) {
        let {
            first_name,
            last_name,
            email,
            password,
            address,
            phone_number
        } = req.body;
        password = await Helper.hashPassword(password);
        const createQuery = `INSERT INTO Users
          (first_name, last_name, email, password, phone_number, address, is_admin )
              VALUES($1, $2, $3, $4, $5, $6, DEFAULT)
              returning *`;
        const values = [
            first_name, last_name, email, password, phone_number, address
        ];
        try {
            const {
                rows
            } = await db.query(createQuery, values);

            return Helper.createTokenAndSend(rows[0], res, 201, 'Signup Successful');
        } catch (error) {
            if (error.routine === '_bt_check_unique' || error.code === '23505') {
                return res.status(500).json({
                    status: "Error",
                    message: 'User with that EMAIL already exist'
                });
            }
            return res.status(500).json({
                status: 'Error',
                error: error.message
            });
        }

    },

    async login(req, res) {
        const text = 'SELECT * FROM Users WHERE email = $1';

        try {
            const {
                rows
            } = await db.query(text, [req.body.email]);

            if (!rows[0]) {
                Util.setError(400, 'Incorrect login details')
                return Util.send(res)
            }
            if (!Helper.comparePassword(rows[0].password, req.body.password)) {
                Util.setError(400, 'Incorrect login details')
                return Util.send(res);
            }
            return Helper.createTokenAndSend(rows[0], res, 200, 'Login Successful');
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                error: error.message,
            })
        }
    }



}

export default User;