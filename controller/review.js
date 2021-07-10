const Review = require('../model/review');
const { updateMovieAverageRating } = require('./helper/index');

// exports.getCurrentUserReview = async (req, res) => {
//     if (req.isAuthenticated()) {
//         try {
//             const { movieId } = req.query;
//             const userId = req.user._id;
//             const userReview = await Review.findOne({ user: userId, movie: movieId });
//             res.status(200).json({
//                 userReview
//             });
//         } catch {
//             res.status(500).send();
//         }
//     } else {
//         res.status(401).send();
//     }
// };

exports.getMovieReviews = async (req, res) => {
    try {
        const movieId = req.params.id;
        // populate: exclude user id and only include username
        const movieReviews = await Review.find({ movie: movieId }).populate('user', 'username');
        res.status(200).json({
            movieReviews
        });
    } catch {
        res.status(500).send();
    }
};

exports.addReview = async (req, res) => {
    try {
        if (!req.isAuthenticated()) return res.status(401).send();
        const { review, rating, movieId } = req.body;
        const userId = req.user._id;
        const movieReview = await Review.findOneByMovieIdAndUserId(movieId, userId);
        // if review does not exist
        if (!movieReview) {
            const newReview = new Review({
                user: userId,
                movie: movieId,
                rating,
                review
            });
            await newReview.save();
        } else {
            // update last review if review already exists
            await Review.findOneAndUpdate(
                { user: userId, movie: movieId },
                { rating, review },
                { useFindAndModify: false }
            );
        }
        // update average rating of movie after review has been added
        await updateMovieAverageRating(movieId);
        return res.status(201).send();
    } catch (err) {
        return res.status(500).send();
    }
};
