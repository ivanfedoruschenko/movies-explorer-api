const router = require('express').Router();
const {
  validationCreateMovie,
  validationDeleteMovie,
} = require('../utils/validation');

const {
  deleteMovie, createMovie, getMovie,
} = require('../controllers/movie');

router.get('/', getMovie);

router.post('/', validationCreateMovie, createMovie);

router.delete('/:movieId', validationDeleteMovie, deleteMovie);

module.exports = router;
