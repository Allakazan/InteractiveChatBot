// Dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

var io = require('socket.io')(server);
io.on('connection', function(client) {
    console.log("Connected to Socket!!"+ client.id);

    client.on('disconnect', function() {
        console.log("disconnected")
    });
    client.on('joinRoom', function(roomId) {
        client.join(roomId);
        console.log(' Client '+roomId+' joined the room and client id is '+ client.id);
    });
     client.on('toBackEnd', function(roomId) {
        io.in(roomId).emit('toFrontEnd', 'AAAAAAAAA');
    })
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));