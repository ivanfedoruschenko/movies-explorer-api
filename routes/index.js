const router = require('express').Router();
const userRoutes = require('./user');
const movieRoutes = require('./movie');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/user');
const { validationCreateUser, validationLogin } = require('../utils/validation');
const NotFoundError = require('../errors/error-not-found');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('*', (reg, res, next) => {
  next(new NotFoundError('Неправильный адрес'));
});

module.exports = router;
