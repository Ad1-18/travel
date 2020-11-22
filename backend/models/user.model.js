const mongoose = require('mongoose');
const Hotel = require('./hotel.model')

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Hotel
  },
  room:{
    type: string,
    ref: Hotel.rooms
  },
  Dates: [Date],
})

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  bookings: [bookingSchema]
}, {
    timestamps: true,
}) ;

const User = mongoose.model('User', userSchema)

module.exports = User;
