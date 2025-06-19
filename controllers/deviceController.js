// controllers/deviceController.js
const Device = require('../models/device.model');

exports.addDevice = async (req, res) => {
  try {
    const { type, port_number, speed, parity, address } = req.body;
    
    const device = await Device.create({
      org_id: req.user.org_id,
      added_by: req.user.user_id,
      type,
      port_number,
      speed,
      parity,
      address
    });

    res.status(201).json(device);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOrgDevices = async (req, res) => {
  try {
    // Проверяем, что пользователь запрашивает устройства своей организации
    if (req.user.org_id !== parseInt(req.params.orgId)) {
      return res.status(403).json({ error: 'Нет доступа к этой организации' });
    }

    const devices = await Device.findByOrganization(req.params.orgId);
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDevice = async (req, res) => {
  try {
    const deleted = await Device.delete(req.params.id, req.user.org_id);
    if (!deleted) {
      return res.status(404).json({ error: 'Устройство не найдено' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};