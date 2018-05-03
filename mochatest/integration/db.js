var mysql = require('mysql');
var env = process.env.NODE_ENV || 'development';
if(env=="development"){
  var connection = mysql.createConnection({
      host     : '127.0.0.1',
      user     : 'root',
      password : '',
      database : 'breakout'
  });
}

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
