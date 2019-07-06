import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

const userForTest = {
  email: 'janedoe@gmail.com',
  first_name: 'jane',
  last_name: 'doe',
  password: 'janetdoe1',
  phone_number: '080-333-21212',
  address: 'trademore estate, lekki',
};


describe('Users Authentication', () => {
  it('should check if user exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'me@gmail.com',
        first_name: 'Jacob',
        last_name: 'Lawson',
        password: 'Jabowe1',
        address: 'No 1 Adebowale crescent lekki, Lagos',
        phone_number: '070-622-78182',
      })
      .then((res) => {
        res.should.have.status(409);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'error');
        res.body.status.should.be.a('string');
        res.body.status.should.equal('Error');
        res.body.error.should.be.a('string');
        done();
      });
  });

  it('should check for wrong email formats', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'me.com',
        first_name: 'Jacob',
        last_name: 'Lawson',
        password: 'Jabowe1',
        address: 'No 1 Adebowale crescent lekki, Lagos',
        phone_number: '070-622-78182',
      })
      .then((res) => {
        res.should.have.status(422);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'error');
        res.body.error.should.be.an('object');
        res.body.status.should.equal('Error');
        done();
      });
  });
  it('should return an error status code 422 if the email is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: '',
        first_name: 'Jacob',
        last_name: 'doe',
        password: 'Jabowe1',
        address: 'No 1 Adebowale crescent lekki, Lagos',
        phone_number: '070-622-78182',
      })
      .then((res) => {
        res.should.have.status(422);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'error');
        res.body.error.should.be.an('object');
        res.body.status.should.equal('Error');
        return done();
      });
  });


  it('should check for wrong first name formats', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({

        firstname: 'J-12UJN',
        email: 'test@test.com',
        last_name: 'Lawson',
        password: 'Jabowe1',
        address: 'No 1 Adebowale crescent lekki, Lagos',
        phone_number: '070-622-78182',
      })
      .then((res) => {
        res.should.have.status(422);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'error');
        res.body.error.should.be.an('object');
        res.body.status.should.equal('Error');
        done();
      });
  });

  it('should return an error status code 422 if the firstname field is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'jacob@gmail.com ',
        first_name: '',
        last_name: 'Lawson',
        password: 'Jabowe1',
        address: 'No 1 Adebowale crescent lekki, Lagos',
        phone_number: '070-622-78182',
      })
      .then((res) => {
        res.should.have.status(422);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'error');
        res.body.error.should.be.an('object');
        res.body.status.should.equal('Error');
        return done();
      });
  });


  it('should check for wrong last name formats', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Janet',
        email: 'test@test.com',
        last_name: 'i77h-d',
        password: 'Jabowe1',
        address: 'No 1 Adebowale crescent lekki, Lagos',
        phone_number: '070-622-78182',
      })
      .then((res) => {
        res.should.have.status(422);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'error');
        res.body.error.should.be.an('object');
        res.body.status.should.equal('Error');
        done();
      });
  });

  it('should return an error status code 422 if the lastname is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'jacob@test.com',
        first_name: 'Jacob',
        last_name: '',
        password: 'Jabowe1',
        address: 'No 1 Adebowale crescent lekki, Lagos',
        phone_number: '070-622-78182',
      })
      .then((res) => {
        res.should.have.status(422);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'error');
        res.body.error.should.be.an('object');
        res.body.status.should.equal('Error');
        return done();
      });
  });


  it('should check for wrong password formats', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Janet',
        email: 'test@test.com',
        last_name: 'Doe',
        password: '123',
        address: 'No 1 Adebowale crescent lekki, Lagos',
        phone_number: '070-622-78182',
      })
      .then((res) => {
        res.should.have.status(422);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'error');
        res.body.error.should.be.an('object');
        res.body.status.should.equal('Error');
        done();
      });
  });
});


describe('POST /api/v1/auth/login', () => {
  it('should check if login details match user in the db', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'janesanta@ymail.com',
        password: 'janetsanta',
      })
      .then((res) => {
        res.should.have.status(401);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'error');
        res.body.error.should.be.a('string');
        res.body.status.should.equal('Error');
        res.body.error.should.equal('Invalid login details, wrong email/password');
        done();
      });
  });
  it('should return an error status code 422 if the email is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: '',
        password: 'Jabowe1',

      })
      .then((res) => {
        res.should.have.status(422);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'message', 'error');
        res.body.error.should.be.an('object');
        res.body.status.should.equal('error');
        res.body.message.should.equal('Invalid login details');
        return done();
      });
  });

  it('should return an error status code 422 if the password is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'jacob@test.com',
        password: '',

      })
      .then((res) => {
        res.should.have.status(422);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'message', 'error');
        res.body.error.should.be.an('object');
        res.body.status.should.equal('error');
        res.body.message.should.equal('Invalid login details');
        return done();
      });
  });
});
