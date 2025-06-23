const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CIRelationship = sequelize.define('CIRelationship', {
  parent_ci_id: DataTypes.INTEGER,
  child_ci_id: DataTypes.INTEGER
});

module.exports = CIRelationship;