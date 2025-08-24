const express=require('express');
const router=express.Router();
const Tiquetes=require('../models/tiquetesModel');

router.get('/obtenerTodos', async (req, res) => {

    try {
        const tiquetes = await Tiquetes.find();
        res.json(tiquetes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tiquetes' });
    }
});

router.get('/obtenerPorId/:id', async (req, res) => {
    try {
      const tiquete = await Tiquetes.findById(req.params.id);
      if (!tiquete) {
        return res.status(404).json({ message: 'Tiquete no encontrado' });
      }
      res.json(tiquete);
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar el producto por ID' });
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
  
      const tiquetes = await Tiquetes.find(query);
  
      if (tiquetes.length === 0) {
        return res.status(404).json({ message: 'No se encontraron tiquetes con esos criterios' });
      }
  
      res.json(productos);
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar tiquetes por parámetros' });
    }
  });


router.post("/agregar", async(req,res)=>{
    try{
        const nuevoTiquete = new Tiquetes(req.body);
        await nuevoTiquete.save();
        res.status(201).json(nuevoTiquete);
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
});

router.delete("/eliminar/:id", async(req,res)=>{
  try{
      const tiqueteEliminado = await Tiquetes.findByIdAndDelete(req.params.id);
      if(!tiqueteEliminado) return res.status(404).json({message:"Tiquetes no encontrado"});
      res.json({message:"Tiquetes Eliminado"});
  }
  catch(err){
      res.status(400).json({message:err.message})
  }
});


router.put('/putTiquete/:id', async (req,res)=>{
    try{
        const tiqueteActualizado=await Tiquetes.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!tiqueteActualizado) return res.status(404).json({message:"Tiquete no encontrado"});
            res.json(tiqueteActualizado)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

//Realizar los 5 procedimientos, buscar todos, buscar por id y buscar por dos parametros

module.exports=router;

