const app = require('../index');
const expect = require('expect');
const request = require('supertest');
const should = require('should');
const jest = require('jest');
describe('Testing Post /create', ()=>{
  it('should create new user', (done)=>{
    request(app)
      .post('/create')
      .send({
        fname: "Sumanth",
        lname: "Nadadur",
        username: "NRS",
        password: "xuz",
        email: "sumanthnr111gmail.com"
      })
      .expect(200)
      .expect((res)=>{
        expect(res.body.email).toEqual(sumanthnr111gmail.com);
      })
      .end(done);
  });
  it('should not create new user',(done)=>{
    request(app)
    .post('/create')
    .send({})
    .expect(400)
    .end((err, res)=>{
      return done(err);
    });
  });
});
