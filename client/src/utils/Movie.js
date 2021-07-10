export const formatMovieImage = (data, contentType) => {
    const encodedImage = new Buffer.from(data, 'binary').toString('base64');
    const movieImage = `data:${contentType};base64,` + encodedImage;
    return movieImage;
};

// export const getAverageRating = (rateValue, rateCount) => {
//     if (rateCount === 0) {
//         return null;
//     }
//     return parseFloat(rateValue / rateCount).toFixed(2);
// };

// export const averageMovieRatings = (movies) => {
//     movies.forEach((movie) => {
//         movie.avgRating = getAverageRating(movie.rateValue, movie.rateCount);
//     });
// };

// export const filterByRatings = (movies, rating) => {
//     if (rating <= 0) {
//         console.log('return movies');
//         return movies;
//     }
//     return movies.filter((movie) => {
//         return movie.avgRating >= rating;
//     });
// };
