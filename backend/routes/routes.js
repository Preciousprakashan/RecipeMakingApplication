
const express = require('express');
const router = express.Router();
const { userRegistration, login} = require('../controller/userController.js')
const userModel = require('../models/userData.js');

router.post('/register',userRegistration);
router.post('/login',login);

module.exports = router;