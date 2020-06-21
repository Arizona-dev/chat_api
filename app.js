var express = require('express');
var socket = require('socket.io');
const mongoose = require('mongoose');
require('dotenv/config');

//Setup
var app = express();
var server = app.listen(process.env.PORT, function() {
    console.log('Listening to http://localhost:3000');
})
mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to DB!')
);

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