const express = require('express');
const router = express.Router();

// Main route
router.get('/', (req, res) => {
    //req.connection.remoteAddress
    res.send('api works');
});

router.get('/socket', (req, res) => {
    //req.connection.remoteAddress
    res.send('socket works');
});

module.exports = router;