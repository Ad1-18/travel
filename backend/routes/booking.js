const express = require('express');
const router = express.Router();

const { add, del } = require('../controllers/booking');

router.post('/add', add);
router.post('/del', del)

module.exports = router;
