const Hotel = require('../models/hotel.model.js');

exports.browse = (req, res) => {
  Hotel.find({ }, function(err, hotels) {
    res.json(hotels);
  });
}

exports.byId = (req, res) => {
  let { hotelId } = req.params;
  Hotel.findById(hotelId, function(err, hotel) {
    res.json(hotel);
  });
}

exports.rooms = (req, res) => {
  let { hotelId } = req.params;
  Hotel.findById(hotelId, 'rooms', function(err, hotel) {
    res.json(hotel);
  });
}

exports.card = (req, res) => {
  let { hotelId } = req.params;
  Hotel.findById(hotelId, 'name location.city desc rooms.price').sort('rooms.price').slice('rooms', 1).exec(function(err,cardData) {
    res.json(cardData);
  });
}

exports.bookings = (req, res) => {
  let { hotelId, room } = req.params;
  Hotel.find({ _id: hotelId }, 'bookings').populate({path: 'bookings', match: {room: room}}).exec(function(err, bookings) {
    if (err) {res.status(500).json({ error: err })}
    if (bookings) {res.json(bookings)}
  });
}
