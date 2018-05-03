var mysql = require('mysql');
var value;

var connection = mysql.createConnection({

  host : "localhost",
  user: "root",
  password: "",
  database: "breakout"
})

var qry = "Show tables"
connection.query(qry, function(err, result){
  console.log(result)
  some_function(result[1].Tables_in_breakout)
})

function some_function(x){
  value=x
}


if(connection){
  module.exports ={
    sql: function(){
    return "SQL CONNECT SUCCESSFUL";
  },
  query1: function(){

    return value;
  }
}
}
connection.end()
