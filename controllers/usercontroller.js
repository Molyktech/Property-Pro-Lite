class Users {
  getUsers() {
    return this.usersArray;
  }

  addUser(firstName, lastName, emailId, phoneNum) {
    this.i += 1;

    this.usersArray = [...this.usersArray, {
      id: this.i,
      fname: firstName,
      lName: lastName,
      email: emailId,
      phone: phoneNum,
    }];
  }

  updateUser(id, firstName, lastName, emailId, phoneNum) {
    this.usersArray = this.usersArray.map((element) => {
      if (element.id == id) {
        return {
          id,
          fname: firstName,
          lName: lastName,
          email: emailId,
          phone: phoneNum,
        };
      }
      return element;
    });
  }

  deleteUser(id) {
    this.usersArray = this.usersArray.filter(element => (element.id != id));
  }
}

module.exports = Users;
