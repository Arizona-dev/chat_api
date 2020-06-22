const express = require('express');
const socket = require('socket.io');
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection;
const bodyParser = require('body-parser');
require('dotenv/config');

// Middlewares
app.use(bodyParser.json());

// Import Routes
const authRoute = require('./routes/auth');
const messageRoute = require('./routes/message');

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/message', messageRoute);

// Application setup
var server = app.listen(process.env.PORT, function() {
    console.log('Listening to http://localhost:3000');
})

// Database setup
mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }
);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to DB!');
});

// Routes



// Serving static files
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