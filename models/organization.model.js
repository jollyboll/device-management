const db = require('../config/db');

class Organization {
  static async create({ name, email, password_hash }) {
    const { rows } = await db.query(
      `INSERT INTO organizations (name, email, password_hash) 
       VALUES ($1, $2, $3) RETURNING *`,
      [name, email, password_hash]
    );
    return rows[0];
  }

  static async findByEmail(email) {
    const { rows } = await db.query('SELECT * FROM organizations WHERE email = $1', [email]);
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await db.query('SELECT * FROM organizations WHERE org_id = $1', [id]);
    return rows[0];
  }
}

module.exports = Organization;