const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CIAuditLog = sequelize.define('CIAuditLog', {
  ci_id: DataTypes.INTEGER,
  action: { type: DataTypes.ENUM('CREATE', 'UPDATE', 'DELETE'), allowNull: false },
  performed_by: { type: DataTypes.STRING(100), allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  change_summary: DataTypes.TEXT
});

module.exports = CIAuditLog;