const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const db = require('../db/index');
const { createTimesheet, shouldntCreateTimesheet } = require('./helpers/index').timesheetHelper;

// assertion style
chai.should();
chai.use(chaiHttp);

describe('Timesheet Endpoint when not logged in', function () {
  const agent = chai.request.agent(app);

  before(function (done) {
    setTimeout(async () => {
      await agent.post('/api/users/logout');
      done();
    }, 1000);
  });

  it("shouldn't get starting dates of each week", function (done) {
    agent.get('/api/timesheets/getDates').end((err, res) => {
      res.should.have.status(401);
      done();
    });
  });

  it("should't create timesheet", function (done) {
    agent
      .post('/api/timesheets/')
      .send(createTimesheet)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it("shouldn't create timesheet", function (done) {
    agent
      .post('/api/timesheets/')
      .send(shouldntCreateTimesheet)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it("shouldn't get all timesheets", function (done) {
    agent.get('/api/timesheets/getAll').end((err, res) => {
      res.should.have.status(401);
      done();
    });
  });
});
