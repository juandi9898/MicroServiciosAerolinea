// controllers/equipajesController.js
const Equipaje = require('../models/equipajesModel');

// Obtener todos los equipajes
exports.getAllEquipajes = async (req, res) => {
  try {
    const equipajes = await Equipaje.find();
    res.json(equipajes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener equipajes' });
  }
};

// Obtener equipaje por ID
exports.getEquipajeById = async (req, res) => {
  try {
    const equipaje = await Equipaje.findById(req.params.id);
    if (!equipaje) {
      return res.status(404).json({ message: 'Equipaje no encontrado' });
    }
    res.json(equipaje);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el equipaje por ID' });
  }
};

// Buscar equipajes por parámetros
exports.buscarPorParametros = async (req, res) => {
  try {
    const query = {};
    const parametrosBusqueda = Object.keys(req.query);
 
    if (parametrosBusqueda.length === 0) {
      return res.status(400).json({ message: 'Se deben proporcionar al menos un parámetro para la búsqueda' });
    }
 
    parametrosBusqueda.forEach(parametro => {
      if (req.query[parametro]) {
        query[parametro] = req.query[parametro];
      }
    });
 
    const equipajes = await Equipaje.find(query); // ✅ Corregido aquí, usa el modelo `Equipaje`
 
    if (equipajes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron equipajes con esos criterios' });
    }
 
    res.json(equipajes); // ✅ Corregido aquí, devuelve la variable `equipajes`
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar equipajes por parámetros' });
  }
};

// Agregar un nuevo equipaje
exports.createEquipaje = async (req, res) => {
  try {
    const nuevoEquipaje = new Equipaje(req.body);
    await nuevoEquipaje.save();
    res.status(201).json(nuevoEquipaje);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un equipaje por ID
exports.deleteEquipaje = async (req, res) => {
  try {
    const equipajeEliminado = await Equipaje.findByIdAndDelete(req.params.id);
    if (!equipajeEliminado) {
      return res.status(404).json({ message: "Equipaje no encontrado" });
    }
    res.json({ message: "Equipaje Eliminado" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar un equipaje por ID
exports.updateEquipaje = async (req, res) => {
  try {
    const equipajeActualizado = await Equipaje.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!equipajeActualizado) {
      return res.status(404).json({ message: "Equipaje no encontrado" });
    }
    res.json(equipajeActualizado);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};