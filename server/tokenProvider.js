var express = require('express');
var FirebaseTokenGenerator = require('firebase-token-generator');
var secret = require('./secret');

// secret.js module.exports = 'key'

var app = express();
app.get('/', function(req,res) {
	var tokenGenerator = new FirebaseTokenGenerator(secret);
	var token = tokenGenerator.createToken({uid: "1"}, {admin: true});
	res.send(token);
});

app.listen(44423);