const express = require('express');
const { addReview, getMovieReviews } = require('../controller/review');

const router = express.Router();

router.post('/new', addReview);
router.get('/movie/:id', getMovieReviews);
// router.get('/movie/userreview', getCurrentUserReview);

module.exports = router;
