// routes/rutasRouter.js
const express = require('express');
const router = express.Router();
const rutasController = require('../controllers/rutasController');

// Rutas de la API para rutas
router.get('/obtenerTodos', rutasController.getAllRutas);
router.get('/obtenerPorId/:id', rutasController.getRutaById);
router.get('/buscarPorParametros', rutasController.buscarPorParametros);
router.post('/agregar', rutasController.createRuta);
router.delete('/eliminar/:id', rutasController.deleteRuta);
router.put('/putRuta/:id', rutasController.updateRuta);

module.exports = router;