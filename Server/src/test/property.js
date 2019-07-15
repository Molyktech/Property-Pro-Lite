import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import path from 'path';
import app from '../app';

chai.use(chaiHttp);
chai.should();

let testToken;
const user = {
  email: 'sjabisol@gmail.com',
  first_name: 'kim',
  last_name: 'oprah',
  password: 'kimoprah1',
  address: 'No 1 Adebowale crescent lekki, Lagos',
  phone_number: '070-6227-8182',
}

describe('Property Validation', () => {

  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        return done();
      });

  });
  describe('POST', () => {
    it('should allow a signedup user stored in the database to login', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'sjabisol@gmail.com',
          password: 'kimoprah1',
        })
        .then((err, res) => {
          if (err) done(err);
          testToken = res.body.data.token;
          console.log(testToken);
          res.body.should.be.an('object');
          // res.body.should.have.keys('status', 'data');
          // res.body.should.have.property('status').that.equals('success');
          // res.body.data.should.be.an('object');
          // res.body.data.token.should.be.a('string');
          // res.body.data.user.should.be.an('object');
          // res.body.data.user.id.should.be.a('number');
          // res.body.data.user.email.should.be.a('string');
          // res.body.data.user.first_name.should.be.a('string');
          // res.body.data.user.last_name.should.be.a('string');
          // res.body.data.user.address.should.be.a('string');
          // res.body.data.user.phone_number.should.be.a('string');
          // res.body.data.user.is_admin.should.be.a('boolean');

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