// controllers/rutasController.js
const Ruta = require('../models/rutasModel');

// Obtener todas las rutas
exports.getAllRutas = async (req, res) => {
  try {
    const rutas = await Ruta.find();
    res.json(rutas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener rutas' });
  }
};

// Obtener ruta por ID
exports.getRutaById = async (req, res) => {
  try {
    const ruta = await Ruta.findById(req.params.id);
    if (!ruta) {
      return res.status(404).json({ message: 'Ruta no encontrada' });
    }
    res.json(ruta);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar la ruta por ID' });
  }
};

// Buscar rutas por parámetros
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

    const rutas = await Ruta.find(query); // ✅ Corregido aquí, usa el modelo `Ruta`

    if (rutas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron rutas con esos criterios' });
    }

    res.json(rutas);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar rutas por parámetros' });
  }
};

// Agregar una nueva ruta
exports.createRuta = async (req, res) => {
  try {
    const nuevaRuta = new Ruta(req.body);
    await nuevaRuta.save();
    res.status(201).json(nuevaRuta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar una ruta por ID
exports.deleteRuta = async (req, res) => {
  try {
    const rutaEliminada = await Ruta.findByIdAndDelete(req.params.id);
    if (!rutaEliminada) {
      return res.status(404).json({ message: "Ruta no encontrada" });
    }
    res.json({ message: "Ruta Eliminada" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar una ruta por ID
exports.updateRuta = async (req, res) => {
  try {
    const rutaActualizada = await Ruta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rutaActualizada) {
      return res.status(404).json({ message: "Ruta no encontrada" });
    }
    res.json(rutaActualizada);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};