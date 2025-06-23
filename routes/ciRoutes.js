const express = require('express');
const router = express.Router();
const ciController = require('../controllers/ciController');

router.post('/', ciController.createCI);
router.get('/', ciController.getAllCIs);
router.get('/:id', ciController.getCIById);
router.put('/:id', ciController.updateCI);
router.delete('/:id', ciController.deleteCI);

router.post('/:id/children', ciController.addChildRelation);
router.get('/:id/children', ciController.getChildren);
router.get('/:id/parents', ciController.getParents);

router.get('/:id/audit-log', ciController.getAuditLog);

module.exports = router;
