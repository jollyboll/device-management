// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authUser = require('../middlewares/authUser');

// Регистрация пользователя
router.post('/register', userController.register);

// Логин пользователя
router.post('/login', userController.login);

// Получение профиля (требует аутентификации)
router.get('/profile', authUser, userController.getProfile);

module.exports = router;