// controllers/userController.js
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { org_id, email, password, full_name, is_admin } = req.body;
    
    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      org_id,
      email,
      password_hash: hashedPassword,
      full_name,
      is_admin
    });

    res.status(201).json({
      user_id: user.user_id,
      email: user.email,
      full_name: user.full_name
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { org_id, email, password } = req.body;
    const user = await User.findByOrgAndEmail(org_id, email);
    
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }

    const token = jwt.sign(
      { userId: user.user_id, orgId: user.org_id, isAdmin: user.is_admin },
      process.env.JWT_USER_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    res.json({
      user_id: req.user.user_id,
      email: req.user.email,
      full_name: req.user.full_name
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};