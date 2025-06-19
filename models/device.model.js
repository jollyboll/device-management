// models/device.model.js
const db = require('../config/db');

class Device {
  static async create({ org_id, added_by, type, port_number, speed, parity, address }) {
    const { rows } = await db.query(
      `INSERT INTO devices (org_id, added_by, type, port_number, speed, parity, address)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [org_id, added_by, type, port_number, speed, parity, address]
    );
    return rows[0];
  }

  static async findByOrganization(org_id) {
    const { rows } = await db.query(
      `SELECT d.*, u.email as added_by_email 
       FROM devices d LEFT JOIN users u ON d.added_by = u.user_id
       WHERE d.org_id = $1`,
      [org_id]
    );
    return rows;
  }

  static async delete(id, org_id) {
    const { rowCount } = await db.query(
      'DELETE FROM devices WHERE device_id = $1 AND org_id = $2',
      [id, org_id]
    );
    return rowCount > 0;
  }
}

module.exports = Device;