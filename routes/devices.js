// routes/devices.js
const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const authUser = require('../middlewares/authUser');

// Добавление устройства (только для администраторов)
router.post('/', authUser, (req, res, next) => {
  if (!req.user.is_admin) {
    return res.status(403).json({ error: 'Требуются права администратора' });
  }
  next();
}, deviceController.addDevice);

// Получение устройств организации
router.get('/org/:orgId', authUser, deviceController.getOrgDevices);

// Удаление устройства (только для администраторов)
router.delete('/:id', authUser, (req, res, next) => {
  if (!req.user.is_admin) {
    return res.status(403).json({ error: 'Требуются права администратора' });
  }
  next();
}, deviceController.deleteDevice);

module.exports = router;