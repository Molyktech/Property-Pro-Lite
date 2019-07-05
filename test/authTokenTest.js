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

describe('Testing Token verification on protected routes', () => {
  let testToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userForTest)
      .end(async (err, res) => {
        testToken = await res.body.data.token;
        if (err) return done(err);
        return done();
      });
  });
  it('should return error 403 when a wrong token is used', (done) => {
    chai.request(app)
      .patch('/api/v1/property/1/sold')
      .set('Authorization', `Bearer ${`${testToken}s`}`)
      .end((err, res) => {
        if (err) done(err);
        res.status.should.equal(403);
        done();
      });
  });
  it('should return error 401 when there is no token provided', (done) => {
    chai.request(app)
      .patch('/api/v1/property/1/sold')
      .end((err, res) => {
        if (err) done(err);
        res.status.should.equal(401);
        done();
      });
  });
});
