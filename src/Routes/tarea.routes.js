//ESte archivo va a definir las operaciones a traves de las urls que damos desde el servidor 

const express= require ('express');
const router = express.Router();

const tarea = require('../models/tarea');
   

router.get('/', async (req, res)=> {
    const tareas = await tarea.find();
     console.log('tareas');
     res.json(tareas);
});

router.get('/:id', async (req, res) =>{
    const Tarea = await tarea.findById (req.params.id);
    res.json(Tarea)
})

router.post('/', async (req, res) => {
    const {titulo, descripcion} = req.body;
    const Tarea = new tarea({titulo, descripcion});
    await Tarea.save();
    res.json ({status:'Tarea guardada'});
});

router.put('/:id', async (req, res) => {
    const {titulo, descripcion} = req.body;
    const nuevaTarea = {titulo, descripcion};
    await tarea.findByIdAndUpdate(req.params.id, nuevaTarea)
    res.json({status:'Tarea actualizada'});
});

router.delete('/:id', async (req, res) => {
  await  tarea.findByIdAndRemove(req.params.id);
  res.json({status: 'Tarea eliminada'});
})

module.exports = router;