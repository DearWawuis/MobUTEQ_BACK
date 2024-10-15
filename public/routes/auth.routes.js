"use strict";

var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth.controller');

// Ruta para registrar un usuario
router.post('/register', authController.register);

// Ruta para iniciar sesión
router.post('/login', authController.login);

// Ruta para verificar el correo
router.get('/verify/:confirmationCode', authController.verify);
module.exports = router;