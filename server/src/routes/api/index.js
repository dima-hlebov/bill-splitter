const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth/auth'));
router.use('/rooms', require('./rooms/rooms'));
 
module.exports = router;