import User from '../models/userModel';
import users from '../models/db/userDb';

const userFunctions = {

  getAllUsers() {
    const allUsers = users.map((user) => {
      const newUser = new User();
      newUser.id = user.id;
      newUser.is_admin = user.is_admin;
      newUser.first_name = user.first_name;
      newUser.last_name = user.last_name;
      newUser.email = user.email;
      newUser.password = user.password;
      newUser.address = user.address;
      newUser.phone_number = user.phone_number;
      return newUser;
    });
    return allUsers;
  },

  addUser(details) {
    const userLength = users.length;
    const newId = userLength + 1;

    details.id = newId;
    details.is_admin = false;
    users.push(details);
    return details;
  },
};
export default userFunctions;
