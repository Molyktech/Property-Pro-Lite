/* eslint disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import path from 'path';
import app from '../app';


chai.use(chaiHttp);
chai.should();


// user auth test
let testToken;

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
        .send({
          email: 'janed@gmail.com',
          first_name: 'Janeb',
          last_name: 'Lawson',
          password: 'Janedbso1',
          address: 'No 1 Adebowale crescent lekki, Lagos',
          phone_number: '070-622-78182',
        })
        .end((err, res) => {
          if (err) return done(err);
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
    it('should allow a signedup user stored in the database to login', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'janed@gmail.com',
          password: 'Janedbso1',
        })
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'data');
          res.body.data.should.be.an('object');
          res.body.data.user.email.should.be.a('string');
          res.body.data.user.first_name.should.be.a('string');
          res.body.data.user.last_name.should.be.a('string');
          res.body.data.token.should.be.a('string');
          res.body.data.user.should.be.an('object');
          res.body.data.user.id.should.be.a('number');
          done();
        });
    });
  });
});

// property test
describe('Property endpoints', () => {
  describe('GET, POST /property', () => {
    it('should create and a save a property advert provided by rgistered user to the db', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', `Bearer ${testToken}`)
        .field('price', 5000000)
        .field('state', 'Lagos')
        .field('city', 'Lekki')
        .field('address', 'No 1 Admiralty way,Lekki')
        .field('type', '2 bedroom')
        .field('status', 'available')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'data');
          res.body.data.should.be.an('object');
          res.body.data.state.should.be.a('string');
          res.body.data.city.should.be.a('string');
          res.body.data.address.should.be.a('string');
          res.body.data.type.should.be.a('string');
          res.body.data.status.should.be.a('string');
          res.body.data.price.should.be.a('number');
          res.body.data.id.should.be.a('number');
          res.body.data.image_url.should.be.a('string');
          done();
        });
    });

    it('should update property advert previously created by the user', (done) => {
      chai.request(app)
        .patch('/api/v1/property/2')
        .set('Authorization', `Bearer ${testToken}`)
        .field('price', 5000000)
        .field('state', 'Lagos')
        .field('city', 'Lekki')
        .field('address', 'No 1 Admiralty way,Lekki')
        .field('type', '2 bedroom')
        .field('status', 'available')
        .attach('image', path.join(`${__dirname}/images/apartments.jpg`))
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'data');
          res.body.data.should.be.an('object');
          res.body.data.state.should.be.a('string');
          res.body.data.city.should.be.a('string');
          res.body.data.address.should.be.a('string');
          res.body.data.type.should.be.a('string');
          res.body.data.status.should.be.a('string');
          res.body.data.price.should.be.a('number');
          res.body.data.id.should.be.a('number');
          res.body.data.image_url.should.be.a('string');
          done();
        });
    });

    // update property as sold
    it('should update a property advert posted by the user as sold', (done) => {
      chai.request(app)
        .patch('/api/v1/property/2/sold')
        .set('Authorization', `Bearer ${testToken}`)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'data');
          res.body.data.should.be.an('object');
          res.body.data.state.should.be.a('string');
          res.body.data.city.should.be.a('string');
          res.body.data.address.should.be.a('string');
          res.body.data.type.should.be.a('string');
          res.body.data.status.should.be.a('string');
          res.body.data.price.should.be.a('number');
          res.body.data.id.should.be.a('number');
          res.body.data.image_url.should.be.a('string');
          done();
        });
    });

    it('should get all property record', (done) => {
      chai.request(app)
        .get('/api/v1/property')
        .end((err, res) => {
          if (err) done(err);
          res.body.should.have.keys('status', 'data');
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.data[0].id.should.be.a('number');
          res.body.data[0].status.should.be.a('string');
          res.body.data[0].state.should.be.a('string');
          res.body.data[0].type.should.be.a('string');
          res.body.data[0].city.should.be.a('string');
          res.body.data[0].address.should.be.a('string');
          res.body.data[0].image_url.should.be.a('string');
          res.body.data[0].price.should.be.a('number');
          res.body.data[0].owner_email.should.be.a('string');
          res.body.data[0].owner_phone_number.should.be.a('string');
          done();
        });
    });

    it('should get all property advert of a specific type posted on the application', (done) => {
      chai.request(app)
        .get('/api/v1/property?type=1 bedroom')
        .end((err, res) => {
          if (err) done(err);
          res.body.should.have.keys('status', 'data');
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.data[0].id.should.be.a('number');
          res.body.data[0].status.should.be.a('string');
          res.body.data[0].state.should.be.a('string');
          res.body.data[0].type.should.be.a('string');
          res.body.data[0].city.should.be.a('string');
          res.body.data[0].address.should.be.a('string');
          res.body.data[0].image_url.should.be.a('string');
          res.body.data[0].price.should.be.a('number');
          res.body.data[0].owner_email.should.be.a('string');
          res.body.data[0].owner_phone_number.should.be.a('string');
          done();
        });
    });
    // test to get a single property
    it('should get a single property record', (done) => {
      chai.request(app)
        .get('/api/v1/property/1').end((err, res) => {
          if (err) done(err);
          res.body.should.have.keys('status', 'data');
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.data.id.should.be.a('number');
          res.body.data.status.should.be.a('string');
          res.body.data.state.should.be.a('string');
          res.body.data.type.should.be.a('string');
          res.body.data.city.should.be.a('string');
          res.body.data.address.should.be.a('string');
          res.body.data.image_url.should.be.a('string');
          res.body.data.price.should.be.a('number');
          res.body.data.owner_email.should.be.a('string');
          res.body.data.owner_phone_number.should.be.a('string');
          done();
        });
    });
    // for failure to get a single record
    it('should not get a property and return a message indicating why', (done) => {
      chai.request(app).get('/api/v1/property/9').end((err, res) => {
        res.body.should.have.keys('status', 'error');
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.status.should.be.a('string');
        res.body.error.should.be.an('string');
        res.body.error.should.equal('Property does not exist');
        done();
      });
    });

    // delete a property
    it('should delete a property advert provided by the user', (done) => {
      chai.request(app)
        .delete('/api/v1/property/2')
        .set('Authorization', `Bearer ${testToken}`)
        .end((err, res) => {
          if (err) done(err);
          res.body.should.have.keys('status', 'data');
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.status.should.be.a('string');
          res.body.data.should.be.an('object');
          res.body.data.message.should.be.an('string');
          done();
        });
    });

    // /handle delete error

    it('should not delete a property and return a message indicating why ', (done) => {
      chai.request(app)
        .delete('/api/v1/property/10')
        .set('Authorization', `Bearer ${testToken}`)
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
  });
});
