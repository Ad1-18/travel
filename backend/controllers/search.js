const Hotel = require('../models/hotel.model.js');

// Simple Search
exports.search = (req,res) => {
  let { query } = req.params;
  query = query.toLowerCase()
  Hotel.find({ tags: { $regex: '.*' + query + '.*'} }, function(err, hotels) {
    res.json(hotels);
  });
}
