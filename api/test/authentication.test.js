const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const db = require('../db/index');
const {
  createValidUser,
  userWithExistingUsername,
  userWithInvalidUsername,
  userWithoutUsername,
  userWithoutPassword,
  shouldLogin,
  shouldNotLogin,
} = require('./helpers/index').authHelper;

// assertion style
chai.should();
chai.use(chaiHttp);
describe('Auth Endpoint', function () {
  const agent = chai.request.agent(app);
  before(function (done) {
    setTimeout(() => {
      db.models.User.destroy({
        where: {},
      });
      done();
    }, 1000);
  });

  // eslint-disable-next-line no-undef
  it('Should should register new user', function (done) {
    agent
      .post('/api/users/register')
      .send(createValidUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('username');
        res.body.should.have.property('id');
        done();
      });
  });

  it('Should not register because username already exists', function (done) {
    agent
      .post('/api/users/register')
      .send(userWithExistingUsername)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.have.property('error');
        done();
      });
  });
  it("Should not register because username doesn't meet the criteria", function (done) {
    agent
      .post('/api/users/register')
      .send(userWithInvalidUsername)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property('error');
        done();
      });
  });

  it('Should not register because username is missing', function (done) {
    agent
      .post('/api/users/register')
      .send(userWithoutUsername)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property('error');
        done();
      });
  });

  it('Should not register because password is missing', function (done) {
    agent
      .post('/api/users/register')
      .send(userWithoutPassword)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property('error');
        done();
      });
  });

  it('Should login', function (done) {
    agent
      .post('/api/users/login')
      .send(shouldLogin)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('username');
        done();
      });
  });

  it('Should not login', function (done) {
    agent
      .post('/api/users/login')
      .send(shouldNotLogin)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        done();
      });
  });
  it('Should logout', function (done) {
    agent.post('/api/users/logout').end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('success');
      done();
    });
  });
});
