const express = require('express');
const router = express.Router();

// Main route
router.get('/', (req, res) => {
    res.send('api works');
});

module.exports = router;