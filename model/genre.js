const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    genre: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Genre', genreSchema);
