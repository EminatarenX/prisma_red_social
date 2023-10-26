import { PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

const obtenerComentario = async(req, res) => {

    return res.json({msg: "Obteniendo comentario"})
}

const comentar = async (req,res) => {
    const { usuario_id, publicacion_id } = req.query
    const { contenido } = req.body



    try {

        const existePublicacion = await prisma.publicacion.findUnique({
            where: {
                id: parseInt(publicacion_id)
            }
        })

        if(!existePublicacion){
            return res.status(404).json({msg: "publicacion no encontrada"})
        }

        const comentario = await prisma.comentario.create({
            data: {
                contenido,
                usuario_id: parseInt(usuario_id),
                publicacion_id: parseInt(publicacion_id)
            }
        })


    
        return res.json(comentario)
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: "error"})
    }
}

const eliminarComentario = async(req, res) => {
    const { usuario_id } = req.query
    const { comentario_id } = req.params

    try {
        const existeComentario = await prisma.comentario.findUnique({
            where: {
                id: parseInt(comentario_id)
            }
        })

    if(!existeComentario){
        return res.status(404).json({msg: "no existe el comentario"})
    }

    if(parseInt(existeComentario.usuario_id) !== parseInt(usuario_id)){
        return res.status(401).json({msg: "no tienes los permisos para editar esta publicacion"})
    }

    await prisma.comentario.delete({
        where: {
            id: parseInt(comentario_id)
        }
    })

    return res.status(200).json({msg: "Comentario Eliminado"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "error"})
    }
}

const editarComentario = async (req, res) => {
    const { comentario_id } = req.params
    const { usuario_id } = req.query
    const { contenido } = req.body

    try {
        const existeComentario = await prisma.comentario.findUnique({
            where: {
                id: parseInt(comentario_id)
            }
        })

        if(!existeComentario){
            return res.status(404).json({msg: "no existe el comentario"})
        }

        if(parseInt(existeComentario.usuario_id) !== parseInt(usuario_id)){
            return res.status(401).json({msg: "no tienes los permisos para editar esta publicacion"})
        }

        const comentario = await prisma.comentario.update({
            where: {
                id: parseInt(comentario_id)
            },
            data: {
                contenido
            }
        })

        return res.status(200).json(comentario)

    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "error"})
    }
}

const obtenerTodos = async(req, res) => {
    const { publicacion_id } = req.query

    try {
        const comentarios = await prisma.comentario.findMany({
            where: {
                publicacion_id: parseInt(publicacion_id)
            }
        })
    
        if(!comentarios)
            return res.status(404).json({msg: 'no hay comentarios'})
    
        return res.json(comentarios)
    
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'Hubo un error, intentalo despues', error})
    }
}
export default { 
    obtenerComentario,
    comentar,
    eliminarComentario,
    editarComentario,
    obtenerTodos
 }
