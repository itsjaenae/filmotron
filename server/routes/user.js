const express = require('express');
const {
    addUser,
    signInUser,
    signOutUser,
    checkUserAuth,
    checkAdmin
} = require('../controller/user');

const router = express.Router();

router.post('/register', addUser);
router.post('/signin', signInUser);
router.get('/signout', signOutUser);
router.get('/checkAdmin', checkAdmin);
router.get('/checkAuth', checkUserAuth);
module.exports = router;
