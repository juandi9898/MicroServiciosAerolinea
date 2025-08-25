// routes/clientesRouter.js
const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Rutas de la API para clientes
router.get('/obtenerTodos', clientesController.getAllClientes);
router.get('/obtenerPorId/:id', clientesController.getClienteById);
router.get('/buscarPorParametros', clientesController.buscarPorParametros);
router.post('/agregar', clientesController.createCliente);
router.delete('/eliminar/:id', clientesController.deleteCliente);
router.put('/putCliente/:id', clientesController.updateCliente);

module.exports = router;