var express = require('express');
var app = express()
var mysql= require('mysql')
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use('./node_modules',  express.static(__dirname + './node_modules'));

const port = process.env.PORT || 3000;


app.get('/',function(req,res){
    res.sendFile('index.html',{'root': __dirname + '/templates'});
})

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "breakout"
});
app.post('/create', function(req,res){
	var fname = req.body.FirstName;
	var lname = req.body.LastName;
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.emailid;
	var encrypted = sha1(password);
	var sql = "INSERT INTO player(pfname,plname,pusername,password,pemailid,online) VALUES('"+fname+"','"+lname+"','"+username+"','"+encrypted+"','"+email+"','no')";
	con.query(sql, function(err, result){
		if(err) throw err;
		res.redirect('/')
	})
})

var server = app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

module.exports = server
