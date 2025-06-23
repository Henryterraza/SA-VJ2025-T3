const ciService = require('../services/ciService');

exports.createCI = async (req, res) => {
  const result = await ciService.createCI(req.body, req.headers['x-user'] || 'admin');
  res.status(201).json(result);
};

exports.getAllCIs = async (req, res) => {
  const filters = req.query;
  const cis = await ciService.getFilteredCIs(filters);
  res.json(cis);
};

exports.getCIById = async (req, res) => {
  const ci = await ciService.getCIById(req.params.id);
  if (!ci) return res.status(404).json({ error: 'CI not found' });
  res.json(ci);
};

exports.updateCI = async (req, res) => {
  const updated = await ciService.updateCI(req.params.id, req.body, req.headers['x-user'] || 'admin');
  if (!updated) return res.status(404).json({ error: 'CI not found' });
  res.json(updated);
};

exports.deleteCI = async (req, res) => {
  const deleted = await ciService.deleteCI(req.params.id, req.headers['x-user'] || 'admin');
  if (!deleted) return res.status(404).json({ error: 'CI not found' });
  res.json({ message: 'CI deleted' });
};

exports.addChildRelation = async (req, res) => {
  const { child_ci_id } = req.body;
  const relation = await ciService.addRelation(req.params.id, child_ci_id);
  res.status(201).json(relation);
};

exports.getChildren = async (req, res) => {
  const children = await ciService.getChildren(req.params.id);
  res.json(children);
};

exports.getParents = async (req, res) => {
  const parents = await ciService.getParents(req.params.id);
  res.json(parents);
};

exports.getAuditLog = async (req, res) => {
  const logs = await ciService.getAuditLog(req.params.id);
  res.json(logs);
};