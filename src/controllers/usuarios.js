import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getUsuario = async(req, res) => {
    const { id } = req.params
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(!usuario){
        prisma.$disconnect()
        return res.status(404).json({msg: "Usuario no encontrado"})
    }
    prisma.$disconnect()
    return res.json(usuario)
  
}

const getUsuarios = async(req, res) => {
    const usuarios = await prisma.usuario.findMany()
    if(usuarios.length === 0){
        return res.status(404).json({msg: "No hay usuarios registrados"})
    }

    prisma.$disconnect()
    return res.json(usuarios)
}

const crearUsuario = async(req, res) => {
    const { nombre, email } = req.body
    const usuario = await prisma.usuario.create({
        data: {
            nombre,
            email
        }
    })

    prisma.$disconnect()

    return res.json(usuario)
}

const editarInformacion = async (req, res ) => {
    const { id } = req.params
    const { nombre, email } = req.body

    const usuario = await prisma.usuario.update({
        where: {
            id: parseInt(id)
        },
        data: {
            nombre,
            email
        }
    })

    prisma.$disconnect()

    return res.json(usuario)
}

const eliminarUsuario = async (req, res) => {
    const { id } = req.params
    prisma.usuario.delete({
        where: {
            id: parseInt(id)
        }
    })

    prisma.$disconnect()

    return res.json("Usuario eliminado")
}

const buscarPorEmail = async(req, res) => {
    const { email } = req.params

    try {

        const usuario = await prisma.usuario.findFirst({
            where: {
                email
            }
        })

        if(!usuario) 
            return res.status(404).json({msg: "no se encontro ningun usuario con ese email"})

        return res.json(usuario)
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: 'error en el servidor', error})
    }
}

export default { 
    getUsuario,
    getUsuarios,
    crearUsuario,
    editarInformacion,
    eliminarUsuario,
    buscarPorEmail
}
