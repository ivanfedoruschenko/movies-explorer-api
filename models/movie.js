const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  nameEN: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) { validator.isURL(v); },
      message: 'Введен некорректный url',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) { validator.isURL(v); },
      message: 'Введен некорректный url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) { validator.isURL(v); },
      message: 'Введен некорректный url',
    },
  },
  movieId: {
    type: Number,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
