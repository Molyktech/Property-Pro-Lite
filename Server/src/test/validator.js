import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';


chai.use(chaiHttp);
chai.should();



const user = {
    email: 'fiyin@ymail.com',
    first_name: 'fiyin',
    last_name: 'jacobs',
    password: 'Fiyjayc22',
    phoneNumber: '080-4562-1114',
    address: 'Festac, Lagos'
};



describe('Testing validators', () => {
    before((done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

    it('should return an error status code 500 if the email already exists', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(400);
                res.body.should.have.property('status');
                res.body.should.be.an('object');
                res.body.status.should.equal('Error');
                res.body.should.have.keys('status', 'error');

                return done();
            });
    });

});