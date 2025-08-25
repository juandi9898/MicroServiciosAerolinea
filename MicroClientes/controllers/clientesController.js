// controllers/clientesController.js
const Cliente = require('../models/clientesModel');

// Obtener todos los clientes
exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener clientes' });
  }
};

// Obtener cliente por ID
exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el cliente por ID' });
  }
};

// Buscar clientes por parámetros
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

    const clientes = await Cliente.find(query);

    if (clientes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron clientes con esos criterios' });
    }

    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar clientes por parámetros' });
  }
};

// Agregar un nuevo cliente
exports.createCliente = async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    await nuevoCliente.save();
    res.status(201).json(nuevoCliente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un cliente por ID
exports.deleteCliente = async (req, res) => {
  try {
    const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);
    if (!clienteEliminado) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json({ message: "Cliente Eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un cliente por ID
exports.updateCliente = async (req, res) => {
  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!clienteActualizado) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json(clienteActualizado);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
