const express=require('express');
const router=express.Router();
const Clientes=require('../models/clientesModel');

router.get('/obtenerTodos', async (req, res) => {

    try {
        const clientes = await Clientes.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener clientes' });
    }
});

router.get('/obtenerPorId/:id', async (req, res) => {
    try {
      const cliente = await Clientes.findById(req.params.id);
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar el cliente por ID' });
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
      res.status(500).json({ message: 'Error al buscar clientes por parámetros' });
    }
  });


router.post("/agregar", async(req,res)=>{
    try{
        const nuevoCliente = new Clientes(req.body);
        await nuevoCliente.save();
        res.status(201).json(nuevoCliente);
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
});

router.delete("/eliminar/:id", async(req,res)=>{
  try{
      const clienteEliminado = await Clientes.findByIdAndDelete(req.params.id);
      if(!clienteEliminado) return res.status(404).json({message:"Cliente no encontrado"});
      res.json({message:"Cliente Eliminado"});
  }
  catch(err){
      res.status(400).json({message:err.message})
  }
});


router.put('/putCliente/:id', async (req,res)=>{
    try{
        const clienteActualizado=await Clientes.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!clienteActualizado) return res.status(404).json({message:"Cliente no encontrado"})
            res.json(clienteActualizado)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})


module.exports=router;

