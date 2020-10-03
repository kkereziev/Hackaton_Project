const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const db = require('../db/index');
const { createTimesheet, shouldntCreateTimesheet, createTimesheetForDeletion } = require('./helpers/index').timesheetHelper;

// assertion style
chai.should();
chai.use(chaiHttp);

describe('Timesheet Endpoint', function () {
  const agent = chai.request.agent(app);

  before(function (done) {
    setTimeout(async () => {
      db.models.Timesheet.destroy({
        where: {},
        restartIdentity: true,
      });
      await agent.post('/api/users/login').send({ username: 'Ivan4o', password: 'validPassword' });
      done();
    }, 1000);
  });

  it('should get starting dates of each week', function (done) {
    agent.get('/api/timesheets/getDates').end((err, res) => {
      res.should.have.status(200);
      res.should.be.a('object');
      done();
    });
  });

  it('should create timesheet', function (done) {
    agent
      .post('/api/timesheets/')
      .send(createTimesheet)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('startDate');
        done();
      });
  });

  it('should create timesheet for deletion', function (done) {
    agent
      .post('/api/timesheets/')
      .send(createTimesheetForDeletion)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('startDate');
        done();
      });
  });

  it("shouldn't create timesheet", function (done) {
    agent
      .post('/api/timesheets/')
      .send(shouldntCreateTimesheet)
      .end((err, res) => {
        res.should.have.status(422);
        res.should.be.a('object');
        res.body.should.have.property('err');
        done();
      });
  });

  it('should get all timesheets', function (done) {
    agent.get('/api/timesheets/getAll').end((err, res) => {
      res.should.have.status(200);
      res.should.be.a('object');
      done();
    });
  });

  it('should delete timesheet', function (done) {
    db.models.Timesheet.findOne({ where: { startDate: createTimesheetForDeletion.startDate } }).then((result) => {
      agent.delete(`/api/timesheets/${result.id}`).end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('success');
        done();
      });
    });
  });

  it("shouldn't delete timesheet", function (done) {
    agent.delete(`/api/timesheets/-1`).end((err, res) => {
      res.should.have.status(409);
      res.should.be.a('object');
      res.body.should.have.property('error');
      done();
    });
  });
});
