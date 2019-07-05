import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import path from 'path';
import app from '../app';

chai.use(chaiHttp);
chai.should();

let testToken;

describe('Property Validation', () => {
  describe('POST', () => {
    it('should create a new user/ signup a new user to the database', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'janedoe@ymail.com',
          first_name: 'Janeb',
          last_name: 'Lawson',
          password: 'doeisgood1',
          address: 'No 1 Adebowale avenue lekki, Lagos',
          phone_number: '070-622-78182',
        })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'data');
          res.body.data.should.be.an('object');
          res.body.data.user.email.should.be.a('string');
          res.body.data.user.first_name.should.be.a('string');
          res.body.data.user.last_name.should.be.a('string');
          res.body.data.token.should.be.a('string');
          res.body.data.user.should.be.an('object');
          res.body.data.user.id.should.be.a('number');
          testToken = res.body.data.token;
          done();
        });
    });

    it('should check if property exists', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', `Bearer ${testToken}`)
        .field('price', 5000000)
        .field('state', 'Lagos')
        .field('city', 'Lekki')
        .field('address', 'No. 1 Admiralty way Lekki, Lagos')
        .field('type', '2 bedroom')
        .field('status', 'available')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .then((res) => {
          res.should.have.status(409);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error');
          res.body.status.should.be.a('string');
          res.body.status.should.equal('Error');
          res.body.error.should.be.a('string');
          res.body.error.should.equal('a property advert has already been created with this address');
          done();
        });
    });

    it('should check for wrong state formats /empty', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', `Bearer ${testToken}`)
        .field('price', 5000000)
        .field('state', '')
        .field('city', 'Lekki')
        .field('address', 'No. 1 Admiralty way Lekki, Lagos')
        .field('type', '2 bedroom')
        .field('status', 'available')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .then((res) => {
          res.should.have.status(422);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error');
          res.body.error.should.be.an('object');
          res.body.status.should.equal('Error');
          done();
        });
    });

    it('should check for wrong price formats', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', `Bearer ${testToken}`)
        .field('price', 'five thousand')
        .field('state', 'lagos')
        .field('city', 'Lekki')
        .field('address', 'No. 1 Admiralty way Lekki, Lagos')
        .field('type', '2 bedroom')
        .field('status', 'available')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .then((res) => {
          res.should.have.status(422);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error');
          res.body.error.should.be.an('object');
          res.body.status.should.equal('Error');
          done();
        });
    });

    it('should check if price empty', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', `Bearer ${testToken}`)
        .field('price', '')
        .field('state', 'lagos')
        .field('city', 'Lekki')
        .field('address', 'No. 32 off Admiralty way Lekki, Lagos')
        .field('type', '2 bedroom')
        .field('status', 'available')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .then((res) => {
          res.should.have.status(422);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error');
          res.body.error.should.be.an('object');
          res.body.status.should.equal('Error');
          done();
        });
    });

    it('should check if city empty', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', `Bearer ${testToken}`)
        .field('price', 'five thousand')
        .field('state', 'lagos')
        .field('city', '')
        .field('address', 'No. 232 off Admiralty way Lekki, Lagos')
        .field('type', '2 bedroom')
        .field('status', 'available')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .then((res) => {
          res.should.have.status(422);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error');
          res.body.error.should.be.an('object');
          res.body.status.should.equal('Error');
          done();
        });
    });

    it('should check if address empty', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', `Bearer ${testToken}`)
        .field('price', 'five thousand')
        .field('state', 'lagos')
        .field('city', 'Lagos')
        .field('address', '')
        .field('type', '2 bedroom')
        .field('status', 'available')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .then((res) => {
          res.should.have.status(422);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error');
          res.body.error.should.be.an('object');
          res.body.status.should.equal('Error');
          done();
        });
    });

    it('should check if address is a formatted properly', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', `Bearer ${testToken}`)
        .field('price', 'five thousand')
        .field('state', 'lagos')
        .field('city', '')
        .field('address', 'No. 2')
        .field('type', '2 bedroom')
        .field('status', 'available')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .then((res) => {
          res.should.have.status(422);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error');
          res.body.error.should.be.an('object');
          res.body.status.should.equal('Error');
          done();
        });
    });

    it('should check if type empty', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', `Bearer ${testToken}`)
        .field('price', 'five thousand')
        .field('state', 'lagos')
        .field('city', 'Lagos')
        .field('address', 'no, 1 florin street off admiralty way lekki')
        .field('type', '')
        .field('status', 'available')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .then((res) => {
          res.should.have.status(422);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error');
          res.body.error.should.be.an('object');
          res.body.status.should.equal('Error');
          done();
        });
    });

    it('should check if status is empty', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', `Bearer ${testToken}`)
        .field('price', '100000')
        .field('state', 'lagos')
        .field('city', 'Lagos')
        .field('address', 'no, 1 florina street off admiralty way lekki')
        .field('type', '2 bedroom')
        .field('status', '')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .then((res) => {
          res.should.have.status(422);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error');
          res.body.error.should.be.an('object');
          res.body.status.should.equal('Error');
          done();
        });
    });

    it('should check if status is a string', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', `Bearer ${testToken}`)
        .field('price', '100000')
        .field('state', 'lagos')
        .field('city', 'Lagos')
        .field('address', 'no, 1 florina street off admiralty way lekki')
        .field('type', '2 bedroom')
        .field('status', 333)
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
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
});
