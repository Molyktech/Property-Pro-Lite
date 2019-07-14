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
    },

    async resetPassword(req, res) {
        const {
            email
        } = req.user;

        let {
            password,
            new_password: newPassword
        } = req.body;

        const checkQuery = 'SELECT password FROM Users WHERE email = $1';
        const value = [email];
        try {
            const {
                rows
            } = await db.query(checkQuery, value);

            const comparePassword = await Helper.comparePassword(rows[0].password, password);

            if (comparePassword) {
                newPassword = await Helper.hashPassword(newPassword);

                const updateOneQuery = `UPDATE Users SET password = $1 WHERE email = $2 returning *`;
                const values = [newPassword, email]
                const resetPassword = await db.query(updateOneQuery, values);
                if (resetPassword) {
                    Util.setSuccess(200, 'Password reset successful');
                    return Util.send(res)
                }

            } else {
                Util.setError(422, 'Incorrect Password, Password did not macth stored password, please check and try again');
                return Util.send(res);
            }


        } catch (error) {
            Util.setError(500, error.message)
            return Util.send(res);
        }

    }



}

export default User;