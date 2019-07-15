import "dotenv/config";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.use(chaiHttp);
chai.should();


let testToken;
let wrongToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJzjhdkidhiuhjhoiuowewiyydsgud9tIiwiaWF0IjoxNTYyODkxOTA1LCJqsjkdbhkdliudhwjqhbdbhks";
describe("Testing Token verification on protected routes", () => {
  before(done => {
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: 'selraya@gmail.com',
        password: 'selrayaenah1',
      })
      .end(async (err, res) => {
        testToken = await res.body.data.token;
        if (err) return done(err);
        return done();
      });
  });

  it("should return error 403 when there is no token provided", done => {
    chai
      .request(app)
      .patch("/api/v1/property/1/sold")
      .end((err, res) => {
        if (err) done(err);
        res.status.should.equal(403);
        done();
      });
  });
});