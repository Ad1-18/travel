const mongoose = require('mongoose');
const Booking = require('./booking.model.js')

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true
  }
})

const roomSchema = new Schema({
  number: {
    type: String,
    required: true
  }, // Room number may include letters depending on the Hotel
  type: String, // Single, double, king, queen, suite, etc.
  occupancy: {
    type: Number,
    required: true
  },
  ac: Boolean,
  bathroom: Boolean, // attached bathroom: 1 = yes, 0 = no
  wifi: Boolean,
  amenities: [String], // fridge, tv, iron boards, etc.
  bookedDates: [Date],
  price: Number
})

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: addressSchema,
  tags: [String],
  rooms: [roomSchema],
  desc: String,
  bookings: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  }]
}, {
    timestamps: true,
}) ;

const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel;
