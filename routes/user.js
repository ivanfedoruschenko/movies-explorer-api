const router = require('express').Router();

const {
  updateUser,
  getCurrentUser,
} = require('../controllers/user');

const {
  validationUpdateUser,
} = require('../utils/validation');

router.get('/me', getCurrentUser);

router.patch('/me', validationUpdateUser, updateUser);

module.exports = router;
