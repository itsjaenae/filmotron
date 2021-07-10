const mongoose = require('mongoose');
const Genre = require('../../model/genre');
const User = require('../../model/user');
const Review = require('../../model/review');
const Movie = require('../../model/movie');

const addGenre = async (genreName) => {
    // add new genre if genre does not exist
    const genre = await Genre.findOne({ genre: genreName });
    if (!genre) {
        const newGenre = new Genre({
            genre: genreName
        });
        newGenre.save();
    }
};
exports.addGenre = addGenre;

exports.deleteGenre = async (genreName) => {
    const filter = { genre: genreName };
    await Genre.findOneAndDelete(filter);
};

exports.deleteReviews = async (movieId) => {
    const filter = { movie: movieId };
    await Review.deleteMany(filter);
};

exports.updateGenre = async (prevGenreName, newGenreName) => {
    // if there are no longer any movies with the previous genre then update/remove the previous genre
    if (!(await Movie.findOne({ genre: prevGenreName }))) {
        const filter = { genre: prevGenreName };
        const update = { genre: newGenreName };
        // if new genre already exists remove previous genre in collection
        if (await Genre.findOne({ genre: newGenreName })) {
            await Genre.findOneAndDelete(filter);
        } else {
            // update previous genre to new genre
            await Genre.findOneAndUpdate(filter, update, { useFindAndModify: false });
        }
    } else {
        // if there is a movie in database with previous genre then attempt to add new genre to collection
        await addGenre(newGenreName);
    }
};

exports.isAdmin = async (userId) => {
    const admin = await User.findOneAdminById(userId);
    if (admin) {
        return true;
    }
    return false;
};

exports.updateMovieAverageRating = async (movieId) => {
    const result = await Review.aggregate([
        {
            $match: { movie: mongoose.Types.ObjectId(movieId), rating: { $exists: true } }
        },
        {
            $group: { _id: movieId, avgRating: { $avg: '$rating' } }
        }
    ]);
    const update = { avgRating: result[0] ? result[0].avgRating : null };

    await Movie.findByIdAndUpdate(movieId, update, { useFindAndModify: false });
};
