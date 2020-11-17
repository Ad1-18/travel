const mongoose = require('mongoose');

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
  size: Number,
  status: {
    type: Boolean, // 1 = available, 0 = unavailable
    required: true,
  }
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
  desc: String
}, {
    timestamps: true,
}) ;

const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel;
