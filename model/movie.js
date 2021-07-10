const mongoose = require('mongoose');

const movieLengthSchema = new mongoose.Schema({
    _id: false,
    hours: { type: Number, require: true },
    minutes: { type: Number, require: true }
});

const movieSchema = new mongoose.Schema({
    title: { type: String, trim: true, required: true },
    genre: { type: String, trim: true, required: true },
    trailerLink: { type: String, trim: true, required: true },
    movieLength: movieLengthSchema,
    description: { type: String, trim: true, required: true },
    image: { data: Buffer, contentType: String },
    avgRating: { type: Number, default: null },
    createdAt: { type: Date, default: Date.now }
});

// movieSchema.statics.convertToFloat = function convertToFloat(movie) {
//     return {
//         ...movie.toObject(),
//         avgRating: parseFloat(movie.avgRating),
//         image: {
//             data: movie.image.data,
//             contentType: movie.image.contentType
//         }
//     };
// };

module.exports = mongoose.model('Movie', movieSchema);
