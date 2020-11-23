const express = require('express');
const router = express.Router();

const { byId,bookings,reccomendations } = require('../controllers/user');

router.get('/:userId', byId);
router.get('/bookings/:userId', bookings);
router.get('/rec/:userId', reccomendations);

module.exports = router;
