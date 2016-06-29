var app = require('express')();
var http = require('http').Server(app);
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
	    console.log("omg found");
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


