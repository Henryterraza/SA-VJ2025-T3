const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CIType = sequelize.define('CIType', {
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
  });



module.exports = CIType;