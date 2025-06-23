const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Environment = sequelize.define('Environment', {
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
  });

module.exports = Environment;