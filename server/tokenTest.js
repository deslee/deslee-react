var express = require('express');
var FirebaseTokenGenerator = require('firebase-token-generator');

var app = express();
app.get('/', function(req,res) {
	var tokenGenerator = new FirebaseTokenGenerator('vrVwXBgSp9fibS1qky1AS5ZdtfiSXpZ777Lyc7sj');
	var token = tokenGenerator.createToken({uid: "1"}, {admin: true});
	res.send(token);
});

app.listen(3000);