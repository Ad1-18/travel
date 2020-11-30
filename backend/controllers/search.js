const Hotel = require('../models/hotel.model.js');

// Simple Search
exports.search = (req,res) => {
  let { query } = req.params;
  query = query.toLowerCase()
  Hotel.find({ tags: { $regex: '.*' + query + '.*'} }).select('name location.city desc rooms.price image reviews.rating').sort('rooms.price').slice('rooms', 1).exec((err, hotels) => {
    if (err) {res.status(500).json({ error: err })}
    if (hotels) {res.status(200).json(hotels)}
  });
}
