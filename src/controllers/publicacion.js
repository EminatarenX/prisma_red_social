import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const obtenerPublicacion = async(req, res) => {
    const { usuario_id, publicacion_id } = req.query

    if(!usuario_id && !publicacion_id){
        return res.status(400).json({msg: "Falta el usuario o la publicacion"})
    }

    const publicaciones = await prisma.publicacion.findUnique({
        where: {
            usuario_id: parseInt(usuario_id),
            id: parseInt(publicacion_id)
        },
        include: {
            usuario: true,
            comentario: {
                orderBy: {
                    fecha_creacion: "desc"
                },
                include: {
                    usuario: true
                }
            }
        }
    })

    if(publicaciones.length === 0){
        return res.status(404).json({msg: "No hay publicaciones"})
    }

    prisma.$disconnect()
    return res.json(publicaciones)
}

const crearPublicacion = async(req, res) => {
    const { usuario_id } = req.query
    const { titulo, contenido } = req.body

    if(!usuario_id){
        return res.status(400).json({msg: "Falta el usuario"})
    }

    const publicacion = await prisma.publicacion.create({
        data: {
            titulo,
            contenido,
            usuario_id: parseInt(usuario_id)
        }
    })

    prisma.$disconnect()
    return res.json(publicacion)

}

const editarPublicacion = async(req, res) => {
    const { usuario_id } = req.query
    const { publicacion_id } = req.params
    const { titulo, contenido } = req.body

    try {
        const publicacion = await prisma.publicacion.update({
            where: {
                id: parseInt(publicacion_id),
                usuario_id: parseInt(usuario_id)
            },
            data: {
                titulo,
                contenido
            }
        })
    
        prisma.$disconnect()
        return res.json(publicacion)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "No se pudo editar la publicacion"})
    }
}

const eliminarPublicacion = async(req, res) => {
    const { usuario_id } = req.query
    const { publicacion_id } = req.params

    const existePublicacion = await prisma.publicacion.findUnique({
        where: {
            id: parseInt(publicacion_id)
        }
    })

    if(!existePublicacion){
        return res.status(404).json({msg: "no se encontro la publicacion"})
    }

    if (Number(existePublicacion.usuario_id) === Number(usuario_id)){
        return res.status(401).json({msg: "no tienes los permisos para eliminar esta publicacion"})
    }

    try {
        await prisma.publicacion.delete({
            where: {
                id: parseInt(publicacion_id),
                usuario_id: parseInt(usuario_id)
            }
        })
    
        prisma.$disconnect()
        return res.json("publicacion eliminada")
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "No se pudo eliminar la publicacion"})
    }
}

const obtenerPublicaciones = async(req, res) => {
    const { usuario_id} = req.query

    try {
        const publicaciones = await prisma.publicacion.findMany({
            where: {
                usuario_id: parseInt(usuario_id)
            },
            orderBy: {
                fecha_creacion: "desc"
            },
            include: {
                usuario: true,
                comentario: {
                    orderBy: {
                        fecha_creacion: "desc"
                    },
                    include: {
                        usuario: true
                    }
                }
            }
        })

        return res.json(publicaciones)
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: "error"})
    }
}

export default { 
    obtenerPublicacion,
    crearPublicacion,
    editarPublicacion,
    eliminarPublicacion,
    obtenerPublicaciones
 }
