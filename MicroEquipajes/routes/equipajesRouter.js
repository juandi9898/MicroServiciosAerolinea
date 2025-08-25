// routes/equipajesRouter.js
const express = require('express');
const router = express.Router();
const equipajesController = require('../controllers/equipajesController');

// Rutas de la API para equipajes
router.get('/obtenerTodos', equipajesController.getAllEquipajes);
router.get('/obtenerPorId/:id', equipajesController.getEquipajeById);
router.get('/buscarPorParametros', equipajesController.buscarPorParametros);
router.post('/agregar', equipajesController.createEquipaje);
router.delete('/eliminar/:id', equipajesController.deleteEquipaje);
router.put('/putEquipaje/:id', equipajesController.updateEquipaje);

module.exports = router;
