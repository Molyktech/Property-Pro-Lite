/* eslint disable import/no-extraneous-dependencies */
import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import path from 'path';
import app from '../app';

const {
  expect
} = chai;
chai.use(chaiHttp);
chai.should();

const signupUser = {
  first_name: 'Modupes',
  last_name: 'Grey',
  email: 'motuswit@gmail.com',
  password: 'MoBillionD',
  phone_number: '080-8333-1011',
  address: 'Hollywood,usa'
}

const loginUser = {
  email: 'motuswit@gmail.com',
  password: 'MoBillionD',
}

const password = {
  assword: 'Fiyjayc22',
  new_password: 'hio'
};
// user auth test
let testToken;
console.log(process.env.NODE_ENV)
describe('Home endpoint', () => {


  describe('GET /', () => {
    it('should welcome you to Property-Pro Lite', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          if (err) return done(err);
          res.text.should.be.a('string');
          done();
        });
    });
  });
});

describe('User endpoints', () => {
  describe('POST /auth', () => {
    it('should create a new user/ signup a new user to the database', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(signupUser)
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'data');
          res.body.should.have.property('status').that.equals('success');
          res.body.data.should.be.an('object');
          res.body.data.token.should.be.a('string');
          res.body.data.should.be.an('object');
          res.body.data.email.should.be.a('string');
          res.body.data.first_name.should.be.a('string');
          res.body.data.last_name.should.be.a('string');
          res.body.data.address.should.be.a('string');
          res.body.data.phone_number.should.be.a('string');
          res.body.data.is_admin.should.be.a('boolean');
          res.body.data.should.be.an('object');
          res.body.data.id.should.be.a('number');
          res.body.data.should.have.property('message').that.is.a('string');
          done();
        });
    });

    it('should allow a signedup user stored in the database to login', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(loginUser)
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'data');
          res.body.should.have.property('status').that.equals('success');
          res.body.data.should.be.an('object');
          res.body.data.token.should.be.a('string');
          res.body.data.should.be.an('object');
          res.body.data.id.should.be.a('number');
          res.body.data.email.should.be.a('string');
          res.body.data.first_name.should.be.a('string');
          res.body.data.last_name.should.be.a('string');
          res.body.data.address.should.be.a('string');
          res.body.data.phone_number.should.be.a('string');
          res.body.data.is_admin.should.be.a('boolean');
          res.body.data.should.have.property('message').that.is.a('string');
          testToken = res.body.data.token;

          done();
        });
    });
  });
});

// property test
describe('Property endpoints', () => {
  describe('GET, POST /property', () => {
    it('should create and a save a property advert provided by registered user to the db', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('x-access-token', testToken)
        .field('price', 5000000)
        .field('state', 'Lagos')
        .field('city', 'Lekki')
        .field('address', 'No 1 Admiralty way,Lekki')
        .field('type', '2-bedroom')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'message', 'data');
          res.body.should.have.property('status').that.equals('success');
          res.body.status.should.be.a('string');
          res.body.message.should.be.a('string');
          res.body.data.should.be.an('object');
          res.body.data.state.should.be.a('string');
          res.body.data.city.should.be.a('string');
          res.body.data.address.should.be.a('string');
          res.body.data.type.should.be.a('string');
          res.body.data.status.should.be.a('string');
          res.body.data.price.should.be.a('number');
          res.body.data.id.should.be.a('number');
          res.body.data.address.should.be.a('string');
          res.body.data.created_on.should.be.a('string');
          res.body.data.image_url.should.be.a('string');
          res.body.data.owner.should.be.a('number');
          done();
        });
    });

    it('should update property advert previously created by the user', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('x-access-token', testToken)
        .field('price', 1000000)
        .field('state', 'Lagos')
        .field('city', 'Lekki')
        .field('address', 'No 20 Admiralty way,Lekki')
        .field('type', '2-bedroom')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'message', 'data');
          res.body.should.have.property('status').that.equals('success');
          res.body.message.should.be.a('string');
          res.body.data.should.be.an('object');
          res.body.data.state.should.be.a('string');
          res.body.data.city.should.be.a('string');
          res.body.data.address.should.be.a('string');
          res.body.data.type.should.be.a('string');
          res.body.data.status.should.be.a('string');
          res.body.data.price.should.be.a('number');
          res.body.data.id.should.be.a('number');
          res.body.data.image_url.should.be.a('string');
          res.body.data.owner.should.be.a('number');
          done();
        });
    });

    // test to get a single property
    it('should get a single property record', (done) => {
      chai.request(app)
        .get('/api/v1/property/1')
        .set('x-access-token', testToken)
        .end((err, res) => {

          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'message', 'data');
          res.body.should.have.property('status').that.equals('success');
          res.body.message.should.be.a('string');
          res.body.data.should.be.an('object');
          res.body.data.id.should.be.a('number');
          res.body.data.status.should.be.a('string');
          res.body.data.state.should.be.a('string');
          res.body.data.type.should.be.a('string');
          res.body.data.city.should.be.a('string');
          res.body.data.address.should.be.a('string');
          res.body.data.image_url.should.be.a('string');
          res.body.data.price.should.be.a('number');
          res.body.data.owneremail.should.be.a('string');
          res.body.data.ownerphonenumber.should.be.a('string');
          done();
        });
    });


    // update property as sold
    it('should update a property advert posted by the user as sold', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1/sold')
        .set('x-access-token', testToken)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'message', 'data');
          res.body.should.have.property('status').that.equals('success');
          res.body.message.should.be.a('string');
          res.body.data.should.be.an('object');
          res.body.data.state.should.be.a('string');
          res.body.data.city.should.be.a('string');
          res.body.data.address.should.be.a('string');
          res.body.data.type.should.be.a('string');
          res.body.data.status.should.be.a('string');
          res.body.data.price.should.be.a('number');
          res.body.data.id.should.be.a('number');
          res.body.data.created_on.should.be.a('string');
          res.body.data.owner.should.be.a('number');
          res.body.data.image_url.should.be.a('string');
          done();
        });
    });

    it('should get all property record', (done) => {
      chai.request(app)
        .get('/api/v1/property')
        .set('x-access-token', testToken)
        .end((err, res) => {

          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'message', 'data');
          res.body.should.have.property('status').that.equals('success');
          res.body.message.should.be.a('string');
          res.body.data.id.should.be.a('number');
          res.body.data.status.should.be.a('string');
          res.body.data.state.should.be.a('string');
          res.body.data.type.should.be.a('string');
          res.body.data.city.should.be.a('string');
          res.body.data.address.should.be.a('string');
          res.body.data.image_url.should.be.a('string');
          res.body.data.price.should.be.a('number');
          res.body.data.owneremail.should.be.a('string');
          res.body.data.ownerphonenumber.should.be.a('string');
          res.body.data.created_on.should.be.a('string');
          done();
        });
    });

    it('should get all property advert of a specific type posted on the application', (done) => {
      chai.request(app)
        .get('/api/v1/property?type=2-bedroom')
        .set('x-access-token', testToken)
        .end((err, res) => {

          if (err) done(err);

          console.log(res.body)
          res.should.have.status(200);
          res.body.should.have.keys('status', 'message', 'data');
          res.body.should.be.an('object');
          res.body.message.should.be.a('string');
          res.body.data.id.should.be.a('number');
          res.body.data.status.should.be.a('string');
          res.body.data.state.should.be.a('string');
          res.body.data.type.should.be.a('string');
          res.body.data.city.should.be.a('string');
          res.body.data.address.should.be.a('string');
          res.body.data.image_url.should.be.a('string');
          res.body.data.price.should.be.a('number');
          res.body.data.owneremail.should.be.a('string');
          res.body.data.ownerphonenumber.should.be.a('string');
          res.body.data.created_on.should.be.a('string');
          done();
        });
    });

    // for failure to get a single record
    it('should not get a property and return a message indicating why', (done) => {
      chai.request(app)
        .get('/api/v1/property/39')
        .set('x-access-token', testToken)
        .end((err, res) => {
          if (err) done(err)

          res.body.should.have.keys('status', 'error');
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.status.should.be.a('string');
          res.body.error.should.be.an('string');
          res.body.error.should.equal('Property not found');
          done();
        });
    });



    // /handle delete error

    it('should not delete a property and return a message indicating why ', (done) => {
      chai.request(app)
        .delete('/api/v1/property/20')
        .set('x-access-token', testToken)
        .end((err, res) => {

          if (err) done(err);
          res.body.should.have.keys('status', 'error');
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.status.should.be.a('string');
          res.body.error.should.be.an('string');
          res.body.error.should.equal('Property not found');
          done();
        });
    });

    // delete a property
    it('should delete a property advert provided by the user', (done) => {
      chai.request(app)
        .delete('/api/v1/property/1')
        .set('x-access-token', testToken)
        .end((err, res) => {
          if (err) done(err);

          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.status.should.be.a('string');
          res.body.message.should.be.a('string');
          done();
        });
    });


    it('should check for wrong state formats /empty', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('x-access-token', testToken)
        .field('price', 5000000)
        .field('state', '')
        .field('city', 'Lekki')
        .field('address', 'No. 1 Admiralty way Lekki, Lagos')
        .field('type', '2 bedroom')
        .field('status', 'available')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error');
          res.body.error.should.be.an('string');
          res.body.status.should.equal('Error');
          done();
        });
    });

    it('should check for wrong price formats', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('x-access-token', testToken)
        .field('price', 'five thousand')
        .field('state', 'lagos')
        .field('city', 'Lekki')
        .field('address', 'No. 1 Admiralty way Lekki, Lagos')
        .field('type', '2 bedroom')
        .field('status', 'available')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error');
          res.body.error.should.be.an('string');
          res.body.status.should.equal('Error');
          done();
        });
    });

    it('should check if price empty', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('x-access-token', testToken)
        .field('price', '')
        .field('state', 'lagos')
        .field('city', 'Lekki')
        .field('address', 'No. 32 off Admiralty way Lekki, Lagos')
        .field('type', '2 bedroom')
        .field('status', 'available')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error');
          res.body.error.should.be.an('string');
          res.body.status.should.equal('Error');
          done();
        });
    });

    it('should check if city empty', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('x-access-token', testToken)
        .field('price', '5000000')
        .field('state', 'lagos')
        .field('city', '')
        .field('address', 'No. 232 off Admiralty way Lekki, Lagos')
        .field('type', '2 bedroom')
        .field('status', 'available')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error');
          res.body.error.should.be.an('string');
          res.body.status.should.equal('Error');
          done();
        });
    });

    it('should check if address empty', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('x-access-token', testToken)
        .field('price', '3000000')
        .field('state', 'lagos')
        .field('city', 'Lagos')
        .field('address', '')
        .field('type', '2 bedroom')
        .field('status', 'available')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error');
          res.body.error.should.be.an('string');
          res.body.status.should.equal('Error');
          done();
        });
    });

    it('should check if address is a formatted properly', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('x-access-token', testToken)
        .field('price', 'five thousand')
        .field('state', 'lagos')
        .field('city', '')
        .field('address', 'No. 2')
        .field('type', '2 bedroom')
        .field('status', 'available')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error');
          res.body.error.should.be.an('string');
          res.body.status.should.equal('Error');
          done();
        });
    });

    it('should check if type empty', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('x-access-token', testToken)
        .field('price', 'five thousand')
        .field('state', 'lagos')
        .field('city', 'Lagos')
        .field('address', 'no, 1 florin street off admiralty way lekki')
        .field('type', '')
        .field('status', 'available')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error');
          res.body.error.should.be.an('string');
          res.body.status.should.equal('Error');
          done();
        });
    });


    it('should save property advert details provided without selecting a file (image)', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('x-access-token', testToken)
        .field('price', 3500000)
        .field('state', 'Lagos')
        .field('city', 'Lekki')
        .field('address', 'Lekki, Lagos State')
        .field('type', '2 bedroom')
        .end((err, res) => {
          if (err) done(err);
          res.body.should.have.keys('status', 'message', 'data');
          res.status.should.equal(201);
          res.body.should.be.an('object');
          res.body.should.have.property('status').that.equals('success');
          res.body.should.have.property('data');
          res.body.data.should.be.an('object')
          res.body.data.id.should.be.a('number');
          res.body.data.status.should.be.a('string');
          res.body.data.state.should.be.a('string');
          res.body.data.type.should.be.a('string');
          res.body.data.city.should.be.a('string');
          res.body.data.address.should.be.a('string');
          res.body.data.image_url.should.be.a('string');
          res.body.data.price.should.be.a('number');
          done();
        });
    });


  });
});

describe('Password Reset', () => {
  it('should save new password set by user and return a success message', (done) => {
    chai.request(app)
      .post('/api/v1/auth/motuswit@gmail.com/reset_password')
      .set('x-access-token', testToken)
      .send({
        password: 'MoBillionD',
        new_password: 'MogotTrillions'
      })
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.have.property('status');
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'message');
        res.body.message.should.be.a('string');
        done();
      });
  });

  it('should send an email to user if password is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/motuswit@gmail.com/reset_password')
      .set('x-access-token', testToken)
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.have.property('status');
        res.status.should.equal(201);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'message');
        res.body.message.should.be.a('string');
        done();
      });
  });


  it('should return an error status code 403 if the password is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/motuswit@gmail.com/reset_password')
      .send(password)
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.have.property('status');
        res.status.should.equal(403);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'error');
        res.body.should.have.property('status').that.equals('error');
        res.body.status.should.be.a('string');
        res.body.error.should.be.a('string');
        return done();
      });
  });
});