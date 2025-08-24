const express=require('express');
const router=express.Router();
const Equipajes=require('../models/equipajesModel');

router.get('/obtenerTodos', async (req, res) => {

    try {
        const equipajes = await Equipajes.find();
        res.json(equipajes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tiquetes' });
    }
});

router.get('/obtenerPorId/:id', async (req, res) => {
    try {
      const equipaje = await Equipajes.findById(req.params.id);
      if (!equipaje) {
        return res.status(404).json({ message: 'Equipaje no encontrado' });
      }
      res.json(equipaje);
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
        const nuevoEquipaje = new Equipajes(req.body);
        await nuevoEquipaje.save();
        res.status(201).json(nuevoEquipaje);
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
});

router.delete("/eliminar/:id", async(req,res)=>{
  try{
      const equipajeEliminado = await Equipajes.findByIdAndDelete(req.params.id);
      if(!equipajeEliminado) return res.status(404).json({message:"Equipaje no encontrado"});
      res.json({message:"Equipaje Eliminado"});
  }
  catch(err){
      res.status(400).json({message:err.message})
  }
});


router.put('/putEquipaje/:id', async (req,res)=>{
    try{
        const equipajeActualizado=await Equipajes.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!equipajeActualizado) return res.status(404).json({message:"Equipaje no encontrado"});
            res.json(equipajeActualizado)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})



//Realizar los 5 procedimientos, buscar todos, buscar por id y buscar por dos parametros

module.exports=router;

