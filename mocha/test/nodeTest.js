const assert = require('chai').assert;
const sql = require('../node').sql;
const query1 = require('../node').password;

describe('Node', function(){

    it('app should connect', function(){
      let result = sql();
      assert.equal(result,'SQL CONNECT SUCCESSFUL')

    });

  it('password should be hashed', function(){
    let result = query1();
    assert.equal(result, '9c5a809c7a4683075467b56c85445e4f1f49ef42');

  });

});
