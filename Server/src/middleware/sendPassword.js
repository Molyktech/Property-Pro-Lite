import db from '../models/index';
import Helper from '../helpers/authHelpers';
import Util from '../utils/Utils';
import sendMail from '../helpers/nodemail';


const sendPassword = async (req, res, next) => {
    if (Object.keys(req.body).length) return next();
    const password = Helper.generatePassword(10);

    const {
        useremail: email
    } = req.params;

    try {
        const newPassword = await Helper.hashPassword(password);
        const updateOneQuery = `UPDATE Users SET password = $1 WHERE email = $2 returning *`;
        const values = [newPassword, email];
        const {
            rows
        } = await db.query(updateOneQuery, values);

        await sendMail(res, rows[0].first_name, password, email);


    } catch (error) {
        Util.setError(500, error.message)
        return Util.send(res);
    }
}
export default sendPassword;