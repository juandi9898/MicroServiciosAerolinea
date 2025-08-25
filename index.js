const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // ✅ Importa cors

// Routers de cada módulo
const tiquetesRouter = require('./MicroTiquetes/routes/tiquetesRouter');
const clientesRouter = require('./MicroClientes/routes/clientesRouter');
const rutasRouter = require('./MicroRutas/routes/rutasRouter');
const equipajesRouter = require('./MicroEquipajes/routes/equipajesRouter');

const app = express();

// ✅ Middleware CORS — debe ir antes de las rutas
app.use(cors({
    origin: '*', // o 'http://localhost:5173' si quieres restringirlo
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

// Middleware para parsear JSON
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.xblxobg.mongodb.net/Aerolinea')
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error al conectar a MongoDB', err));

// Rutas
app.use('/tiquetes', tiquetesRouter);
app.use('/clientes', clientesRouter);
app.use('/rutas', rutasRouter);
app.use('/equipajes', equipajesRouter);
// Servidor único
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor único ejecutándose en http://localhost:${PORT}`);
});
