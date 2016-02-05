var express = require('express');
var _ = require('lodash');
var fs = require('fs');

var app = express();
var beverages;
fs.readFile('systemet/Systembolaget-JSON.json', 'utf-8', function(err, data) {
	if(err)  throw error;
	// console.log(data);
	beverages = JSON.parse(data.toString()).artiklar.artikel;
	console.log('loaded json file!');
});

var greetings = [{'text':'hej!','language':'swe'},{'text':'hello','language':'eng'}];


// on GET req



app.get('/beverages/:name', function(req, res) {

	res.charset = 'utf-8';

	var name = req.params.name.toLowerCase();
	var matchesArr = [];

	console.log('searching for b with name AS ' + name);
	_.forEach( beverages, function(beverage){ // see http://stackoverflow.com/questions/1789945/how-can-i-check-if-one-string-contains-another-substring
		var b_name = beverage.Namn.toLowerCase();
		if( b_name.indexOf(name) !== -1) {
			matchesArr.push(beverage);
			console.log("found match: " + beverage.Namn);
		}
	});

	if(matchesArr.length == 0) {
		res.json(matchesArr);
	} else {
		res.json(matchesArr);
	}
	

});




app.get('/', function(req, res) {
	console.log('path: /');

/*	fs.readFile('index.html', function(error, contents) {
	res.set('Content-Type', 'text/html');
	res.send(contents);
	});*/

	res.sendFile( __dirname + '/index.html', function(err) {
	if(err){ res.status(500).send(err);}
	});

});

app.get('/greeting', function(req, res){
	console.log('path: /greeting');
	res.json(greetings);
});

// on GET with params
app.get('/greeting/:lang', function(req, res){
	console.log('path: greeting/:lang');
	var greeting = _.find(greetings, {language: req.params.lang});
	res.json(greeting);
});

// on POST
app.post('/greeting', function(req, res) {
	res.json(greetings);
});


// where to listen
var port = 8080;
app.listen(port, function(){
	console.log('listening on [raspberry ip] port ' + port);
});
