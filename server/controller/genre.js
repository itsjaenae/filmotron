const Genre = require('../model/genre');

exports.getGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).json({
            genres
        });
    } catch {
        res.status(500).send();
    }
};
