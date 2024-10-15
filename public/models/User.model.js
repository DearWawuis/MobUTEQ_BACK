"use strict";

var db = require('./Db.model');

// Buscar usuario por correo
exports.findByEmail = function (email, callback) {
  var sql = 'SELECT * FROM usuarios WHERE correo = ?';
  db.query(sql, [email], function (err, results) {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Crear un nuevo usuario
exports.create = function (name, email, hashedPassword, callback) {
  var sql = 'INSERT INTO usuarios (nombre, correo, contrasena, verificado, token_verificacion) VALUES (?, ?, ?, ?, ?)';
  var confirmationCode = require('crypto').randomBytes(32).toString('hex'); // Código de confirmación
  db.query(sql, [name, email, hashedPassword, false, confirmationCode], function (err, result) {
    if (err) return callback(err);
    callback(null, result, confirmationCode); // Devolvemos el confirmationCode para el correo de verificación
  });
};

// Activar usuario
exports.activateUser = function (confirmationCode, callback) {
  var sql = 'UPDATE usuarios SET verificado = TRUE, token_verificacion = NULL, fecha_verificacion = NOW() WHERE token_verificacion = ?';
  db.query(sql, [confirmationCode], function (err, result) {
    if (err) return callback(err);
    callback(null, result);
  });
};