const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const CodeError = require('../errors/error-code');
const ConflictValueError = require('../errors/error-conflict-value');
const NotFoundError = require('../errors/error-not-found');
const { SECRET_STRING } = require('../utils/config');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((user) => {
          res.send({
            name: user.name, email,
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new CodeError('Введенные данные неккоректны'));
            return;
          } if (err.code === 11000) {
            next(new ConflictValueError('При регистрации указан email, который уже существует'));
            return;
          } next(err);
        });
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CodeError('Введенные данные неккоректны'));
        return;
      } next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_STRING,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};
