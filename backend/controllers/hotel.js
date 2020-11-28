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

exports.rating = (req, res) => {
  let { hotelId } = req.params;
  Hotel.findById(hotelId, 'reviews.rating').exec(function(err, ratings) {
    if (err) {res.status(500).json({ error: err })}
    if (!ratings) { res.status(404).json({ ratings: 'Not found' })}
    if (ratings) {res.status(200).json(ratings)}
  })
}

exports.addReview = (req, res) => {
  let { hotelId, userId, review, rating } = req.body;
  let newReview = {
    userId: userId,
    review: review,
    rating: rating
  }
  Hotel.findByIdAndUpdate(hotelId, { $push: { reviews: newReview }}).select('name').exec( (err, response) => {
    if (err) {res.status(500).json({ error: err })}
    if (response) {
      res.status(200).json({
        success: true,
        review: newReview,
        result: response
    })}
  });
}

exports.delReview = (req, res) => {
  let { hotelId, userId } = req.body;
  Hotel.findByIdAndUpdate(hotelId, { $pull: { reviews: {userId: userId } } }).select('name reviews').exec( (err, response) => {
    if (err) {res.status(500).json({ error: err })}
    if (!response) {res.status(404).json({ review: 'Not found' })}
    if (response) {res.status(200).json({
      success: true,
      result: response
    })}
  });
}
