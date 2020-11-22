const express = require('express');
const router = express.Router();

const { browse, byId, rooms, card } = require('../controllers/hotel');

router.get('/browse', browse);
router.get('/:hotelId', byId);
router.get('/rooms/:hotelId', rooms);
router.get('/card/:hotelId', card);

module.exports = router;
