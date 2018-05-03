const assert = require('chai').assert;
const sql = require('../app').sql;
const query1 = require('../app').query1;

describe('App', function(){

  it('app should connect', function(){
    let result = sql();
    assert.equal(result,'SQL CONNECT SUCCESSFUL')

  });

  it('app returns tables', function(){

    let result1 = query1();

    assert.typeOf(result1, 'string');
  });



});
