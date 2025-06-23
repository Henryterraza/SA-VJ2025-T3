const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SecurityLevel = sequelize.define('SecurityLevel', {
  level: { type: DataTypes.STRING, unique: true, allowNull: false }
});

module.exports = SecurityLevel;