const Booking = require('../models/booking.model');
const User = require('../models/user.model');
const Hotel = require('../models/hotel.model');

exports.add = (req,res) => {
  let { userId, hotelId, room, dates } = req.body;
  const booking = new Booking({
    userId: userId,
    hotelId: hotelId,
    room: room,
    dates: dates
  });
  booking.save( function(err, response) {
    if (err) { res.status(500).json({ error: err })}
    if (response) {
      User.findByIdAndUpdate( userId, { $push: {bookings: response._id }}, (err) => {
        if (err) {res.status(500).json({ error: err})}
      })
      Hotel.findByIdAndUpdate( hotelId, { $push: {bookings: response._id }}, (err) => {
        if (err) {res.status(500).json({ error: err})}
      })
      res.status(200).json({
        success: true,
        result: response
      })
    }
  })
}

exports.del = (req,res) => {
  let { bookingId } = req.body;
  Booking.findByIdAndDelete( bookingId ).exec( (err, booking ) => {
    if (err) { res.status(500).json({ error: err }) }
    if (booking) {
      User.findByIdAndUpdate(booking.userId, {$pull: {bookings: bookingId}}, (err) => {
        if (err) {res.status(500).json({ error: err})}
      })
      Hotel.findByIdAndUpdate(booking.hotelId, {$pull: {bookings: bookingId}}, (err) => {
        if (err) {res.status(500).json({ error: err})}
      })
      res.status(200).json({
        success: true,
        deletedBooking: booking
      })
    }
  })
}
