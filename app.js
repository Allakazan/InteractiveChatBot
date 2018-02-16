// Dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const api = require('./server/routes/api');
const Bot = require('./server/controllers/Bot');

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
    client.on('joinRoom', function(data) {
        client.join(data.roomId);
        console.log(' Client '+data.roomId+' joined the room and client id is '+ client.id);
    });
     client.on('sendUserMessage', function(data) {
         io.in(data.roomId).emit('newMessage', {'message':data.message, 'sender':'user'});
         var botMessage = Bot.getBotMessage();
         setTimeout(function () {
             io.in(data.roomId).emit('newMessage', {'message':botMessage.message, 'sender':'bot'});
         }, 300);
    });
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