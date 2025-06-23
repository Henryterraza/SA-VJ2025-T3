const sequelize = require('../config/database');
const CiType = require('./ciType');
const Environment = require('./environment');
const SecurityLevel = require('./securityLevel');
const ComplianceLevel = require('./complianceLevel');
const ConfigurationItem = require('./ci');
const CIRelationship = require('./ciRelationship');
const CIAuditLog = require('./ciAuditLog');

ConfigurationItem.belongsTo(CiType, { foreignKey: 'ci_type_id' });
ConfigurationItem.belongsTo(Environment, { foreignKey: 'environment_id' });
ConfigurationItem.belongsTo(SecurityLevel, { foreignKey: 'security_level_id' });
ConfigurationItem.belongsTo(ComplianceLevel, { foreignKey: 'compliance_level_id' });

ConfigurationItem.hasMany(CIAuditLog, { foreignKey: 'ci_id' });
ConfigurationItem.hasMany(CIRelationship, { foreignKey: 'parent_ci_id', as: 'Children' });
ConfigurationItem.hasMany(CIRelationship, { foreignKey: 'child_ci_id', as: 'Parents' });


module.exports = {
  sequelize,
  ConfigurationItem,
  CiType,
  Environment,
  SecurityLevel,
  ComplianceLevel,
  CIRelationship,
  CIAuditLog
};