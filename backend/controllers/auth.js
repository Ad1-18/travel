const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { createJWT } = require('../utils/auth');

// Register
exports.signup = (req, res, next) => {
  let { email, password, password_confirmation, firstName, lastName } = req.body;
  // Validation
  let errors = [];
  // Presence Checks
  if (!email) { errors.push({ email: 'required' }); }
  if (!password) { errors.push({ password: 'required' }); }
  if (!password_confirmation) { errors.push({ password_confirmation: 'required' }); }
  if (!firstName) { errors.push({ firstName: 'required' }); }
  if (!lastName) { errors.push({ lastName: 'required' }); }
  // Format Checks
  if (!validator.isEmail(email)) { errors.push({ email: 'invalid' }); }
  if (!validator.isAlpha(firstName)) { errors.push({ firstName: 'can only contain letters'}); }
  if (!validator.isAlpha(lastName)) { errors.push({ lastName: 'can only contain letters'}); }
  // Other Checks
  if (password != password_confirmation) { errors.push({ password: "mismatch" }); }

  if (errors.length > 0) { return res.status(422).json({ errors: errors }); }

  User.findOne({ email: email })
    .then(user => {
      // Check if user exists already
      if (user) {
        return res.status(442).json({ errors: [{ user: 'email already exists ' }] });
      } else {
        const user = new User({
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName
        });
        // password hashing
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, function(err,hash){
            if (err) throw err;
            user.password = hash;
            user.save ()
              .then (response => {
                res.status(200).json({
                  success: true,
                  result: response
                })
              })
              .catch(err => { res.status(500).json({ errors: [{ error: err }] }); });
          });
        });
      }
    })
    .catch(err => { res.status(500).json({ errors: [{ error: err }] }); });
}

//Log In
exports.signin = (req, res) => {
  let{ email, password } = req.body;

  // Validation
  let errors = [];
  // Presence Checks
  if (!email) { errors.push({ email: 'required' }); }
  if (!password) { errors.push({ password: 'required' }); }
  // Format Checks
  if (!validator.isEmail(email)) { errors.push({ email: 'invalid' }); }

  if (errors.length > 0) { return res.status(422).json({ errors: errors }); }

  User.findOne({ email: email })
    .then(user => {
      // checking if user exists
      if (!user) {
        return res.status(404).json({ errors: [{ user: 'not found' }],});
      } else {
        bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({ errors: [{password: 'incorrect'}]});
          }

      // Create Token and Verify
      let access_token = createJWT(
        user.email,
        user._id,
        7200 // Token expires after 2 hours
      );
      jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) { res.status(500).json({ erros: err}); }
        if (decoded) {
          return res.status(200).json({
            success: true,
            token: access_token,
            message: user
          });
        }
      });
        })
        .catch(err => {res.status(500).json({ erros: err +'2' }); });
      }
    })
    .catch(err => {res.status(500).json({ erros: err + '3' }); });
}
