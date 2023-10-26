
import {Router} from "express"
import comentarioController from "../controllers/comentario.js"

const router = Router()

router.get("/", comentarioController.obtenerComentario)
router.post("/comentar", comentarioController.comentar)
router.delete("/eliminar/:comentario_id", comentarioController.eliminarComentario)
router.put("/editar/:comentario_id", comentarioController.editarComentario)
router.get('/todos', comentarioController.obtenerTodos)

export default router
