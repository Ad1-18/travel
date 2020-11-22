const User = require('../models/user.model.js');
const Hotel = require('../models/hotel.model.js')

exports.byId = (req, res) => {
  let { userId } = req.params;
  User.findById(userId, function(err, user) {
    res.json(user);
  });
}

exports.bookings = (req, res) => {
  let { userId } = req.params;
  User.findById(userId, 'bookings', function(err, bookings) {
    res.json(bookings);
  });
}
