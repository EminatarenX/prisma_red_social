
import { Router } from 'express'
import usuariosController from '../controllers/usuarios.js'

const router = Router()

router.get('/', usuariosController.getUsuarios)
router.get('/:id', usuariosController.getUsuario)
router.post('/', usuariosController.crearUsuario)
router.put('/:id', usuariosController.editarInformacion)
router.delete('/:id', usuariosController.eliminarUsuario)
router.get('/usuario/:email', usuariosController.buscarPorEmail)

export default router
