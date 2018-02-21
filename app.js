// Dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var ConversationV1 = require('watson-developer-cloud/conversation/v1');

var config = require('./config');

const api = require('./server/routes/api');
const Socket = require('./server/controllers/Socket');

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

var conversation = new ConversationV1({
    username: config.watson.user, // replace with username from service key
    password: config.watson.password, // replace with password from service key
    path: { workspace_id: config.watson.workspace_id }, // replace with workspace ID
    version_date: '2018-02-16'
});

// Create http server
const server = http.createServer(app);

var io = require('socket.io')(server);

//Socket.io connections and todo's
Socket.handleSocket(io, conversation);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));