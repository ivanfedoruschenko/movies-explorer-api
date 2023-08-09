const Movie = require('../models/movie');
const CodeError = require('../errors/error-code');
const NotFoundError = require('../errors/error-not-found');
const ForbiddenRequestError = require('../errors/error-forbidden-request');

module.exports.createMovie = (req, res, next) => {
  const { _id } = req.user;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: _id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CodeError('Переданные данные некорректны'));
        return;
      }
      next(err);
    });
};

module.exports.getMovie = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenRequestError('Запрещено удалять чужие карточки');
      }
      movie.deleteOne()
        .then(() => res.send(movie))
        .catch(next);
    })
    .catch(next);
};
