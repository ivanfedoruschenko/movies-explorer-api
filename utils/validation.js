const { celebrate, Joi } = require('celebrate');
/* eslint-disable */
const regex = /^(http|https):\/\/(www\.)?[a-zA-Z0-9\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=]{1,256}\.[a-zA-Z0-9\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=]{2,}/;

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    nameEN: Joi.string().min(2).max(30).required(),
    nameRU: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(2).required(),
    trailerLink: Joi.string().pattern(regex).required(),
    image: Joi.string().pattern(regex).required(),
    country: Joi.string().min(2).max(30).required(),
    thumbnail: Joi.string().pattern(regex).required(),
    director: Joi.string().min(2).max(30).required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
  }),
});

const validationDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validationUpdateUser,
  validationCreateMovie,
  validationDeleteMovie,
  validationCreateUser,
  validationLogin,
};
