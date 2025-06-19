const Organization = require('../models/organization.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const org = await Organization.create({ name, email, password_hash: hashedPassword });
    res.status(201).json({
      org_id: org.org_id,
      name: org.name,
      email: org.email
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const org = await Organization.findByEmail(email);
    
    if (!org || !(await bcrypt.compare(password, org.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { orgId: org.org_id, email: org.email },
      process.env.JWT_ORG_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    res.json(req.org);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};