const express = require("express");
const authController = require('../controllers/authController.js')

const authRoutes = express.Router();

authRoutes.get('/register', authController.register );
authRoutes.get('/login', authController.login );


module.exports= authRoutes;