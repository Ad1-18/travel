const express = require('express');
const router = express.Router();

const { browse, byId, rooms, card, bookings, rating, addReview, delReview } = require('../controllers/hotel');

router.get('/browse', browse);
router.get('/:hotelId', byId);
router.get('/rooms/:hotelId', rooms);
router.get('/card/:hotelId', card);
router.get('/bookings/:hotelId/:room', bookings);
router.get('/rating/:hotelId', rating);
router.post('/review/add', addReview);
router.post('/review/del', delReview);

module.exports = router;
