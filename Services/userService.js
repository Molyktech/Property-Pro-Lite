import User from '../models/userModel';
import users from '../models/db/userDb';

const userFunctions = {

  getAllUsers() {
    const allUsers = users.map((user) => {
      const newUser = new User();
      newUser.id = user.id;
      newUser.firstName = user.firstName;
      newUser.lastName = user.lastName;
      newUser.email = user.email;
      newUser.password = user.password;
      newUser.address = user.address;
      newUser.phoneNumber = user.phoneNumber;
      return newUser;
    });
    return allUsers;
  },

  addUser(details) {
    const userLength = users.length;
    const newId = userLength + 1;
    details.id = newId;
    users.push(details);
    return details;
  },
};
export default userFunctions;
