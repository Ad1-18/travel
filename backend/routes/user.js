const express = require('express');
const router = express.Router();

const { byId,bookings } = require('../controllers/user');

router.get('/:userId', byId);
router.get('/bookings/:userId', bookings);

module.exports = router;
