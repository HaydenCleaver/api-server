'use strict';

require('dotenv').config();
const {Sequelize, DataTypes } = require('sequelize');
const animalSchema = require('./animals');
const instrumentSchema = require('./instruments');
const ModelInterface = require('./collection-class');

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory' :
  process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const AnimalModel = animalSchema(sequelizeDatabase, DataTypes);
const InstrumentModel = instrumentSchema(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  animalInterface: new ModelInterface(AnimalModel),
  instrumentInterface: new ModelInterface(InstrumentModel),
};
