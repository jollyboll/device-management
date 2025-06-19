const express = require('express');
const router = express.Router();
const controller = require('../controllers/organizationController');
const authOrg = require('../middlewares/authOrg');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/profile', authOrg, controller.getProfile);

module.exports = router;