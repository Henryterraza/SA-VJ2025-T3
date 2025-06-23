const { ConfigurationItem, CIRelationship, CIAuditLog } = require('../models');

exports.createCI = async (data, user) => {
  const ci = await ConfigurationItem.create(data);
  await CIAuditLog.create({ ci_id: ci.id, action: 'CREATE', performed_by: user, change_summary: 'Nuevo CI creado' });
  return ci;
};

exports.getFilteredCIs = (filters) => {
  const where = {};

  if (filters.name) where.name = { [Op.iLike]: `%${filters.name}%` };
  if (filters.ci_type_id) where.ci_type_id = filters.ci_type_id;
  if (filters.environment_id) where.environment_id = filters.environment_id;
  if (filters.current_state) where.current_state = filters.current_state;
  if (filters.security_level_id) where.security_level_id = filters.security_level_id;

  return ConfigurationItem.findAll({ where });
};


exports.getCIById = (id) => ConfigurationItem.findByPk(id);

exports.updateCI = async (id, data, user) => {
  const ci = await ConfigurationItem.findByPk(id);
  if (!ci) return null;
  await ci.update(data);
  await CIAuditLog.create({ ci_id: ci.id, action: 'UPDATE', performed_by: user, change_summary: 'CI actualizado' });
  return ci;
};

exports.deleteCI = async (id, user) => {
  const ci = await ConfigurationItem.findByPk(id);
  if (!ci) return false;
  await CIAuditLog.create({
    ci_id: id,
    action: 'DELETE',
    performed_by: user,
    change_summary: 'CI eliminado'
  });
  await ci.destroy();

  return true;
};


exports.addRelation = (parentId, childId) => CIRelationship.create({ parent_ci_id: parentId, child_ci_id: childId });
exports.getChildren = (id) => CIRelationship.findAll({ where: { parent_ci_id: id } });
exports.getParents = (id) => CIRelationship.findAll({ where: { child_ci_id: id } });
exports.getAuditLog = (ciId) => CIAuditLog.findAll({ where: { ci_id: ciId }, order: [['timestamp', 'DESC']] });
