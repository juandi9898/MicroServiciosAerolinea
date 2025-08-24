const mongoose = require('mongoose');

const cambioSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  descripcion: { type: String, required: true }
});

const equipajesSchema = new mongoose.Schema({
  tiquete_id: {
    type: mongoose.Schema.Types.ObjectId, // referencia a un tiquete
    required: true,
    ref: 'Tiquete'
  },
  maletas: {
    type: Number,
    required: true
  },
  peso_total: {
    valor: { type: Number, required: true },
    unidad: { type: String, default: 'kg' }
  },
  cambios: {
    type: [cambioSchema],
    default: []
  }
});

module.exports = mongoose.model('Equipaje', equipajesSchema);
