var express = require('express');
var FirebaseTokenGenerator = require('firebase-token-generator');
var secret = require('./secret');
var bodyParser = require('body-parser');

// secret.js module.exports = 'key'

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/', function(req,res) {
	var tokenGenerator = new FirebaseTokenGenerator(secret.secret);
	if (req.body.password !== secret.password) {
		res.send("wrong password!");
	}
	else {
		var token = tokenGenerator.createToken({uid: "1"}, {admin: true});
		res.send(token);
	}
});

app.listen(44423);