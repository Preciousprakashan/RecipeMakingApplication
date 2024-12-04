
const express = require('express');
const router = express.Router();
const { userRegistration, login} = require('../controller/userController.js')
const userModel = require('../models/userData.js');

router.post('/register', userRegistration);
router.post('/login', login);


// router.get('/logout', logout);

// router.put('/update-profile', updateProfile);

module.exports = router;