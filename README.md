[![Build Status](https://travis-ci.org/Molyktech/Property-Pro-Lite.svg?branch=develop)](https://travis-ci.org/Molyktech/Property-Pro-Lite)

[![Coverage Status](https://coveralls.io/repos/github/Molyktech/Property-Pro-Lite/badge.svg)](https://coveralls.io/github/Molyktech/Property-Pro-Lite)

# Property Pro Lite

---

Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

#### Table of Contents

- [Technologies](#Technologies)
- [Features](#Features)
- [Installation](#Installation)
- [Tools and Modules](#Tools-and-Modules)
- [Running Tests](#Running-Tests)
- [Author](#Author)

#### Technologies

This Project was created with:

- HTML - A markup language for documents designed to be displayed in a web browser.
- Cascading Stylesheet(CSS) - A style sheet language used for describing the presentation of a document written in a markup language like HTML
- JavaScript - The Programming Language for the Web
- NodeJS - An open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser. ( A javascript server-side engine)
- Express Library - A web application framework for Node.js
- Cloudinary - A file storage platform
- Pivotal Tracker - A project management/planning tool
- Travis CI - A continuous integration and testing platform
- Coveralls - A hosted analysis tool, providing statistics about your code coverage

#### Features/User stories

- User can sign up.
- User can sign in.
- User (agent) can post a property advert.
- User (agent) can update the details of a property advert.
- User (agent) can mark his/her posted advert as sold.
- User (agent) can delete an advert.
- User can view all properties.
- User can view all properties of a specific type - 2 bedroom, 3 bedroom, mini flat  etc.
- User can view a specific property.

### Installation

For now, simply clone the repo or download the zip file

```bash
git clone https://github.com/Molyktech/Property-Pro-Lite.git
cd Property-Pro-Lite
run npm install
run npm run dev
```

#### Tools and Modules

The tools and modules employed in this project are:

- Git
- npm
- A test suite e.g Mocha and Chai
- JSON Web Token
- Multer
- bcryptjs
- JOI validation module

#### Running Tests

Tests are set up using:

- Mocha
- Chai
- Chai HTTP

* Testing

---

```bash

run npm test
or
npm t
```

##### Usage Example

```
  Testing endpoints
    √ It should create a new user/ signup a new user to the database (1275ms)
    √ It should allow a signedup user stored in the database to login (655ms)
```

#### Bug Reports & Feature Requests

Please use the issue tracker to report any bugs or file feature requests.

NIL

#### Project status

In development (API)

#### Author

Modupe Adebayo

#### License

[MIT](https://choosealicense.com/licenses/mit/)
