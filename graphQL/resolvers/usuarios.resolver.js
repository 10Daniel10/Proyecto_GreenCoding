const listUsuarios = [
    {
        nombre: 'Gabriela López',
        id: '1113564',
        estado: 'activo',
        correo: 'denisgaby@hotmail.como',
        tipo: 'administrador'
    },
    {
        nombre: 'Daniel Lppez',
        id: '1256265',
        estado: 'pendiente',
        correo: 'daniel@hotmail.como',
        tipo: 'estudiante'
    },
    {
        nombre: 'Gabriel Riaño',
        id: '7895456',
        estado: 'pendiente',
        correo: 'gabriel@hotmail.como',
        tipo: 'lider'
    }
]
const Usuarios = require('../schemes/usuarios.schema');

const resolverUsuarios = {
    Query: {
        obtenerUsuarios: async () => await Usuarios.find({})
    }
}

module.exports = resolverUsuarios;