const mongoose = require('mongoose');
const User = require('./user.model');
const Hotel = require('./hotel.model');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  hotelId: {
    type: Schema.Types.ObjectId,
    ref: Hotel
  },
  room: {
    type: String
  },
  dates: [Date]
}, {
  timestamps: true
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking;
