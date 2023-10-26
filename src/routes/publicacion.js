
import {Router} from "express"
import publicacionController from "../controllers/publicacion.js"

const router = Router()

router.get("/", publicacionController.obtenerPublicacion)
router.post("/", publicacionController.crearPublicacion)
router.put("/editar/:publicacion_id", publicacionController.editarPublicacion)
router.delete("/eliminar/:publicacion_id", publicacionController.eliminarPublicacion)
router.get("/todas", publicacionController.obtenerPublicaciones)
router.delete('/eliminar/fecha/:usuario_id', publicacionController.eliminarPorFecha)
export default router
