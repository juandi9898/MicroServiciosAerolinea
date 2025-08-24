const express=require('express');
const router=express.Router();
const Rutas=require('../models/rutasModel');

router.get('/obtenerTodos', async (req, res) => {

    try {
        const rutas = await Rutas.find();
        res.json(rutas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener rutas' });
    }
});

router.get('/obtenerPorId/:id', async (req, res) => {
    try {
      const ruta = await Rutas.findById(req.params.id);
      if (!ruta) {
        return res.status(404).json({ message: 'Ruta no encontrada' });
      }
      res.json(ruta);
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar la ruta por ID' });
    }
  });


  //Revisar este, en el anterior trabajo lo tenemos guiarse de ese
  router.get('/buscarPorParametros', async (req, res) => {
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
  
      const clientes = await Clientes.find(query);
  
      if (clientes.length === 0) {
        return res.status(404).json({ message: 'No se encontraron clientes con esos criterios' });
      }
  
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar tiquetes por parámetros' });
    }
  });


router.post("/agregar", async(req,res)=>{
    try{
        const nuevaRuta = new Rutas(req.body);
        await nuevaRuta.save();
        res.status(201).json(nuevaRuta);
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
});

router.delete("/eliminar/:id", async(req,res)=>{
  try{
      const rutaEliminada = await Rutas.findByIdAndDelete(req.params.id);
      if(!rutaEliminada) return res.status(404).json({message:"Ruta no encontrada"});
      res.json({message:"Ruta Eliminada"});
  }
  catch(err){
      res.status(400).json({message:err.message})
  }
});


router.put('/putRuta/:id', async (req,res)=>{
    try{
        const rutaActualizada=await Rutas.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!rutaActualizada) return res.status(404).json({message:"Ruta no encontrad"})
            res.json(rutaActualizada)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})


module.exports=router;

