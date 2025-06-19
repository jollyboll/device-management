// models/user.model.js
const db = require('../config/db');

class User {
  static async create({ org_id, email, password_hash, full_name, is_admin }) {
    const { rows } = await db.query(
      `INSERT INTO users (org_id, email, password_hash, full_name, is_admin)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [org_id, email, password_hash, full_name, is_admin]
    );
    return rows[0];
  }

  static async findByOrgAndEmail(org_id, email) {
    const { rows } = await db.query(
      'SELECT * FROM users WHERE org_id = $1 AND email = $2',
      [org_id, email]
    );
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await db.query(
      'SELECT * FROM users WHERE user_id = $1',
      [id]
    );
    return rows[0];
  }
}

module.exports = User;