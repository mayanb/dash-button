var app = require('express')();
var http = require('http').Server(app);
var twilio = require('twilio');
// var client = new twilio.RestClient('SK822e28c813cbfa2bd65e058dee52ed11', 'l6Dsrrpkqy2BqlP1jQ0WUrfivehVMdIZ');
var accountSid = 'ACa697c9d4bf3cf9f0ce5a8783e2538903'; 
var authToken = '03e0108ea758839fb036e6b26f0ae2df'; 
var client = require('twilio')(accountSid, authToken); 
//var io = require('socket.io');
// var io = require('socket.io')(http);
// var express = require("express");
var path = require("path");

app.set('port', (process.env.PORT || 5000));

// app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/dash', function(request, response) {
	var dash_button = require('node-dash-button');
	var dash = dash_button("a0:02:dc:0a:8d:9c"); //address from step above
	dash.on("detected", function (){
	    console.log("button pushed");

	// client.sms.messages.create({
	//     to:'+14255162162',
	//     from:'+16508879122',
	//     body:'ahoy hoy! you pressed the button! Testing Twilio and node.js'
	// }, function(error, message) {
	//     if (!error) {
	//         console.log('Success! The SID for this SMS message is:');
	//         console.log(message.sid);
	//         console.log('Message sent on:');
	//         console.log(message.dateCreated);
	//     } else {
	//         console.log('Oops! There was an error.');
	//     }
	// });
		client.messages.create({ 
			to: "14255162162", 
			from: "+16508879122", 
			body: "Someone just pushed the button!",   
		}, function(err, message) { 
			console.log(message.sid); 
		}); 

	});
  response.sendFile(__dirname + '/dash.html');
});

// app.get('/dash', function(request, response) {
// 	console.log("hiii");
// 	// var dash_button = require('node-dash-button');
// 	// var dash = dash_button("a0:02:dc:0a:8d:9c"); //address from step above
// 	// dash.on("detected", function (){
// 	//     console.log("omg found");
// 	// });
// 	response.render('pages/index');
// }

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


