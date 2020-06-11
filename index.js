var express = require('express');
var socket = require('socket.io');

//Setup
var app = express();
var server = app.listen(5000, function() {
    console.log('Listening to http://localhost:5000');
})

//Serving static files
app.use(express.static('public'));

var io = socket(server);

io.on('connection', function(socket) {

    console.log('made a new connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });

})