const Usuarios = require('../model/usuario.model');

const obtenerUsuarios = async () => await Usuarios.find({})

module.exports = {
    obtenerUsuarios
}