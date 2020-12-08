const dotenv = require('dotenv');

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

module.exports = {
  username: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  dialect: 'postgres',
  logging: false,
};
