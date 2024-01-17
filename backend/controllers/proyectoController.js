import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tareas.js";

const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find().where("creador").equals(req.usuario);
    res.json(proyectos);
};

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id

    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado);
    } catch (error) {
        console.log(error)
    }
};

const obtenerProyecto = async (req, res) => {
    const { id } = req.params;
   
    const proyecto = await Proyecto.findById(id);

      if(!proyecto) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message });
      };
   
      if(proyecto.creador.toString() !== req.usuario._id.toString()){
       const error = new Error("Accion no valida");
       return res.status(401).json({ msg: error.message });
      }

      //OBTENER LAS TAREAS DEL PROYECTO

      const tareas = await Tarea.find().where('proyecto').equals(proyecto._id)

      res.json({
        proyecto,
        tareas,
      });
  
  };

const editarProyecto = async (req, res) => {
    const { id } = req.params;
   
      const proyecto = await Proyecto.findById(id);

      if(!proyecto) {
        const error = new Error("No Encontrado");
        return res.satus(404).json({ msg: error.message})
      }

      if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion No Valida");
        return res.satus(401).json({ msg: error.message})
      }


    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.cliente = req.body.cliente || proyecto.cliente;

    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado);
    } catch (error) {
        console.log(error)
    }
};

const eliminarProyecto = async (req, res) => {
    const { id } = req.params;
   
      const proyecto = await Proyecto.findById(id);

      if(!proyecto) {
        const error = new Error("No Encontrado");
        return res.satus(404).json({ msg: error.message})
      }

      if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion No Valida");
        return res.satus(401).json({ msg: error.message})
      }

      try {
        await proyecto.deleteOne();
        res.json({ msg: "Proyecto Eliminado"});
      } catch (error) {
        console.log(error);
      }
};

const agregrColaborador = async (req, res) => {

};

const eliminarColaborador = async (req, res) => {

};


export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregrColaborador,
    eliminarColaborador,
};

