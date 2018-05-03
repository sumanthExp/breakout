var mysql = require('mysql');
var value;
var connection = mysql.createConnection({
  host : "localhost",
  user: "root",
  password: "",
  database: "breakout"
})
var qry = "Select password from player where pusername='gtakoor'"
connection.query(qry, function(err, result){
some_function(result[0].password)
})
function some_function(x){
  value=x
}
if(connection){
  module.exports = {
    sql: function(){
    return "SQL CONNECT SUCCESSFUL";
    },
    password: function(){
        return value;
    }
  }
}
connection.end()
