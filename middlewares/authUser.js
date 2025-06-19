// middlewares/authUser.js
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Требуется авторизация пользователя' });
    }

    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.org_id !== decoded.orgId) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Ошибка аутентификации пользователя:', error);
    res.status(401).json({ error: 'Неверный токен авторизации' });
  }
};