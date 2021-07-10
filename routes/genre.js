const express = require('express');

const router = express.Router();
const { getGenres } = require('../controller/genre');

router.get('/', getGenres);

module.exports = router;
