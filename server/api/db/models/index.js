const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

// Define sequelize connection
const {
  POSTGRES_DB,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
} = process.env;

const sequelize = new Sequelize(
  `postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`,
  { logging: false }
);

const db = {};

// Import models
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') > 0 && file !== 'index.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = Object.assign({}, { sequelize, Sequelize }, db);
