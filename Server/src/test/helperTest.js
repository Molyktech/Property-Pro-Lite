import chai from 'chai';
import Helper from '../helpers/authHelpers';
import 'dotenv/config';


chai.should();

describe('Hash password and compare password Tests', () => {
    let testResult = null;
    it('should return a string', (done) => {
        Helper.hashPassword("Hello")
            .then((result) => {
                testResult = result;
                try {
                    result.should.be.a('string');
                    done();
                } catch (err) {
                    done(err);
                }
            });
    });
    it('should return a boolean', (done) => {
        Helper.comparePassword('Hello', testResult)
            .then((result) => {
                try {
                    result.should.be.a('boolean');
                    done();
                } catch (err) {
                    done(err);
                }
            });
    });
});