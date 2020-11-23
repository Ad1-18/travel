const User = require('../models/user.model.js');
const Booking = require('../models/booking.model');
const Hotel = require('../models/hotel.model');

exports.byId = (req, res) => {
  let { userId } = req.params;
  User.findById(userId, function(err, user) {
    res.json(user);
  });
}

exports.bookings = (req, res) => {
  let { userId } = req.params;
  User.findById(userId, 'bookings').populate('bookings').exec(function(err, bookings) {
    if (err) {res.status(500).json({ error: err })}
    if (bookings) {res.json(bookings)}
  });
}

exports.reccomendations = (req, res) => {
  let { userId } = req.params;
  Booking.findOne({ userId: userId }).sort({'createdAt': -1}).exec( (err,booking) => {
    if (err) {res.status(500).json({ error: err })}
    if (booking) {
      Hotel.findById( booking.hotelId, 'location.city' ).exec( (err, hotel ) => {
        Hotel.find({ 'location.city': hotel.location.city  }).limit(3).exec( (err, hotels) => {
          res.json(hotels)
        })
      })
    }
  })
}
