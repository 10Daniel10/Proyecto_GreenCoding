const Usuarios = require('../model/usuario.model');

const obtenerUsuarios = async () => await Usuarios.find()

const obtenerEstudiantes = async () => await Usuarios.find({tipo:"Estudiante"})

const setEstadoUsuario = async (id, estado) => {
    console.log(id);
    return Usuarios.updateOne({id}, {estado})
        .then(res => `Estado actualizado`)
        .catch(err => "Falló el cambio de estado")
}

module.exports = {
    obtenerUsuarios,
    setEstadoUsuario,
    obtenerEstudiantes
}