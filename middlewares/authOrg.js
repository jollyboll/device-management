// middlewares/authOrg.js
const jwt = require('jsonwebtoken');
const Organization = require('../models/organization.model');

module.exports = async (req, res, next) => {
  try {
    // 1. Получаем токен из заголовка
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Требуется авторизация организации' });
    }

    // 2. Проверяем токен
    const decoded = jwt.verify(token, process.env.JWT_ORG_SECRET);
    
    // 3. Находим организацию в БД
    const org = await Organization.findById(decoded.orgId);
    if (!org) {
      return res.status(404).json({ error: 'Организация не найдена' });
    }

    // 4. Добавляем организацию в запрос
    req.org = org;
    next();
  } catch (error) {
    console.error('Ошибка аутентификации организации:', error);
    res.status(401).json({ error: 'Неверный токен авторизации' });
  }
};