const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ComplianceLevel = sequelize.define('ComplianceLevel', {
  level: { type: DataTypes.STRING, unique: true, allowNull: false }
});

module.exports = ComplianceLevel;