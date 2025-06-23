const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ConfigurationItem = sequelize.define('ConfigurationItem', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  serial_number: DataTypes.STRING,
  version: DataTypes.STRING,
  acquisition_date: DataTypes.DATE,
  current_state: DataTypes.STRING,
  physical_location: DataTypes.STRING,
  owner: DataTypes.STRING,
  change_date: DataTypes.DATE,
  change_description: DataTypes.TEXT,
  related_docs: DataTypes.TEXT,
  incident_links: DataTypes.TEXT,
  config_state: DataTypes.STRING,
  license_number: DataTypes.STRING,
  expiration_date: DataTypes.DATE
});

module.exports = ConfigurationItem;
