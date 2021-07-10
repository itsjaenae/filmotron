const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema({
    movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    review: { type: String, require: true },
    rating: { type: Number, require: true }
});

reviewSchema.statics.findOneByMovieIdAndUserId = function findOneByMovieIdAndUserId(
    movieId,
    userId
) {
    return this.findOne({ movie: movieId, user: userId });
};

module.exports = mongoose.model('Review', reviewSchema);
