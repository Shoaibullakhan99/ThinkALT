const express = require('express');
const router = express.Router();
const { registerUser, loginUser, fetchAllUsers, editExistingUser, deleteExistingUser } = require('../controllers/userController.js');
const middleware = require('../middleware/middleware.js');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/fetchAll', fetchAllUsers);
router.put('/edit/:id', editExistingUser);
router.delete('/remove/:id', deleteExistingUser);

module.exports = router;