'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('instruments', {
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['Strings', 'Woodwinds', 'Brass', 'Percussion'],
    },
  });
};
