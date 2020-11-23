const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const hotelRoutes = require('./routes/hotel');
const searchRoutes = require('./routes/search');
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/booking');

const { db } = require('./models/user.model');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
// POST: /api/signin to login in with email and password
// POST: /api/signup to sign up with first name, last name, email, password and password confirmation
app.use('/hotel', hotelRoutes)
// GET: /hotel/browse to return all hotels
// GET: /hotel/:id to return all data for a given hotel
// GET: /hotel/rooms/:id to return all room data for a given hotel
// GET: /hotel/card/:id to return the name, city, description and minimum room price for a given hotel
// GET: /bookings/:hotelId/:room to return bookings for a given room of a hotel
app.use('/search', searchRoutes);
// GET: /search/:query to return the hotels with :query in their tags (can be substring)
app.use('/user', userRoutes);
// GET: /user/:id to return all data for a given user
// GET: /user/booking/:id to return all booking information for a given user
// GET: /rec/:userId to get 3 recommendations for this user
app.use('/booking', bookingRoutes);
// POST: /booking/add to create new booking with userId, hotelId, rooom, dates (dates is an array, date format: YYYY-MM-DDT00:00:00.000+00:00)
// POST: /booking/del to delete a booking with bookingId

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
