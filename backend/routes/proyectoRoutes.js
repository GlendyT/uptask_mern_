import express from "express"
import { 
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregrColaborador,
    eliminarColaborador,
} from "../controllers/proyectoController.js"
import checkAuth from "../middleware/checkAuth.js"

const router = express.Router();

router
 .route("/")
 .get(checkAuth, obtenerProyectos)
 .post(checkAuth, nuevoProyecto);

router
 .route("/:id")
 .get(checkAuth, obtenerProyecto)
 .put(checkAuth, editarProyecto)
 .delete(checkAuth, eliminarProyecto);

router.post("/agregar-colaborador/:id", checkAuth, agregrColaborador)
router.post("/eliminar-colaborador/:id", checkAuth, eliminarColaborador)

export default router;