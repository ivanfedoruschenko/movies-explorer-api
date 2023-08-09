require('dotenv').config();

const {
  NODE_ENV, JWT_SECRET, DB_HOST,
} = process.env;

const DEV_SECRET = 'some_secret_key';
const DEV_DB_HOST = 'mongodb://localhost:27017/bitfilmsdb';

const DB = NODE_ENV === 'production' && DB_HOST
  ? DB_HOST : DEV_DB_HOST;

const SECRET_STRING = NODE_ENV === 'production'
&& JWT_SECRET ? JWT_SECRET : DEV_SECRET;

module.exports = {
  DB,
  SECRET_STRING,
};
