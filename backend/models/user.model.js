const mongoose = require('mongoose');
const Booking = require('./booking.model');

const Schema = mongoose.Schema;

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
  bookings: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  }]
}, {
    timestamps: true,
}) ;

const User = mongoose.model('User', userSchema)

module.exports = User;
