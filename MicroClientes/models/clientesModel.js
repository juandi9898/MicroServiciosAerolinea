const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true // recomendable: no debe repetirse
  },

  telefono: {
    type: String,
    required: true
  },

  pais: {
    type: String,
    required: true
  },

  tipo_documento: {
    type: String,
    required: true
  },

  numero_documento: {
    type: String,
    required: true,
    unique: true // también recomendable: cada documento debe ser único
  },

  fecha_nacimiento: {
    type: Date,
    required: true
  },

  nacionalidad: {
    type: String,
    required: true
  },

  frecuente: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Cliente', clienteSchema);
