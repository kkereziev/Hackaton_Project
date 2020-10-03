const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const db = require('../db/index');
const { createValidUser, userWithExistingUsername, userWithInvalidUsername } = require('./helpers/index').authSignUp;

// assertion style
chai.should();
chai.use(chaiHttp);

describe('Signup Endpoint', () => {
  const agent = chai.request.agent(app);
  before((done) => {
    setTimeout(() => {
      done();
    }, 1000);
  });

  after((done) => {
    db.models.User.destroy({
      where: {},
    });
    done();
  });
  it('Should should register new user', (done) => {
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

  it('Should not register because username already exists', (done) => {
    agent
      .post('/api/users/register')
      .send(createValidUser)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.have.property('error');
        done();
      });
  });
  it("Should not register because username doesn't meet the criteria", (done) => {
    agent
      .post('/api/users/register')
      .send(userWithInvalidUsername)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property('error');
        done();
      });
  });
});
