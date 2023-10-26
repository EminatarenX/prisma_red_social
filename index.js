
import express from 'express'
import usuariosRouter from './src/routes/usuarios.js'
import publicacionesRouter from './src/routes/publicacion.js'
import comentariosRouter from './src/routes/comentario.js'

const app = express()
const puerto = process.env.PORT || 4000

app.use(express.json())

app.use('/api/usuarios', usuariosRouter)
app.use('/api/publicaciones', publicacionesRouter)
app.use('/api/comentarios', comentariosRouter)

app.listen(puerto, () => {
    console.log('Servidor corriendo en puerto', puerto)
})

