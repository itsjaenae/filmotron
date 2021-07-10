const fs = require('fs').promises;
const Movie = require('../model/movie');
const { updateGenre, addGenre, isAdmin, deleteGenre, deleteReviews } = require('./helper/index.js');

const IMAGE_MIMETYPES = ['image/png', 'image/jpeg', 'image/jpg'];

// helpers
function validMimeType(mimetype) {
    if (mimetype === null) {
        return false;
    }
    if (IMAGE_MIMETYPES.includes(mimetype)) {
        return true;
    }
    return false;
}
function getMovieFilter(searchQuery, genre, rating) {
    const filter = {
        title: searchQuery,
        genre,
        avgRating: {
            // greater than or equal to user's rating
            $gte: parseFloat(rating)
        }
    };
    if (genre === 'All') {
        delete filter.genre;
    }
    if (parseFloat(rating) <= 0) {
        delete filter.avgRating;
    }
    if (searchQuery.length <= 0) {
        delete filter.title;
    } else {
        // title that starts with searchQuery string
        filter.title = new RegExp(`^${searchQuery}`);
    }
    return filter;
}

exports.addMovie = async (req, res) => {
    try {
        if (!req.isAuthenticated()) return res.status(401).send();
        // check if admin
        if (!(await isAdmin(req.user._id))) return res.status(403).send(); // unauthorized
        const data = await fs.readFile(req.file.path);
        if (validMimeType(req.file.mimetype) !== true) {
            return res.status(400).send();
        }
        const contentType = req.file.mimetype;
        const newMovie = new Movie({
            title: req.body.title,
            genre: req.body.genre,
            trailerLink: req.body.trailerLink,
            movieLength: {
                hours: req.body.hours,
                minutes: req.body.minutes
            },
            description: req.body.description,
            image: { data, contentType }
        });
        // save new movie in db
        await newMovie.save();
        // add genre to db
        await addGenre(newMovie.genre);
        // delete movie image after saving movie to db
        await fs.unlink(req.file.path);
        return res.status(201).json({ movieID: newMovie.id });
    } catch {
        return res.status(500).send();
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json({
            movie
        });
    } catch {
        res.status(500).send();
    }
};

exports.getMovies = async (req, res) => {
    try {
        const { searchQuery, genre, rating, page, limit } = req.query;
        const filter = getMovieFilter(searchQuery, genre, rating);
        const [movies, movieCount] = await Promise.all([
            await Movie.find(filter)
                .limit(limit * 1)
                .skip((page - 1) * limit),
            await Movie.find(filter).countDocuments()
        ]);
        res.status(200).json({ movies, movieCount });
    } catch {
        res.status(500).send();
    }
};

exports.deleteMovieById = async (req, res) => {
    try {
        if (!req.isAuthenticated()) return res.status(401).send();
        // check if admin
        if (!(await isAdmin(req.user._id))) return res.status(403).send(); // unauthorized

        const movieId = req.params.id;
        const movie = await Movie.findByIdAndDelete(movieId);
        // Delete genre if there are no movies with this genre
        if (movie) {
            const genreFilter = { genre: movie.genre };
            const movieWithPrevGenre = await Movie.findOne(genreFilter);
            if (!movieWithPrevGenre) {
                await deleteGenre(movie.genre);
                await deleteReviews(movieId);
            }
        }
        return res.status(204).send();
    } catch {
        return res.status(500).send();
    }
};

exports.getMovieAverageById = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await Movie.findById(movieId);
        res.status(200).json({ avgRating: movie.avgRating });
    } catch {
        res.status(500).send();
    }
};

exports.updateMovieById = async (req, res) => {
    try {
        if (!req.isAuthenticated()) return res.status(401).send();
        if (!(await isAdmin(req.user._id))) return res.status(403).send(); // unauthorized
        const movieId = req.params.id;
        const { title, genre, prevGenre, trailerLink, hours, minutes, description } = req.body;
        const update = {
            title,
            genre,
            trailerLink,
            movieLength: {
                hours,
                minutes
            },
            description
        };
        if (req.file) {
            const data = await fs.readFile(req.file.path);
            if (validMimeType(req.file.mimetype) !== true) {
                return res.status(400).send();
            }
            const contentType = req.file.mimetype;
            update.image = { data, contentType };

            await fs.unlink(req.file.path);
        }
        // update movie in db
        await Movie.findByIdAndUpdate(movieId, update, { useFindAndModify: false });
        // update genre to db
        await updateGenre(prevGenre, genre);
        return res.status(200).send();
    } catch {
        return res.status(500).send();
    }
};
