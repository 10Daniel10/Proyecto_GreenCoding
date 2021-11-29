const Usuarios = require('../model/usuario.model');
var mongoose = require('mongoose');
const obtenerUsuarios = async () => await Usuarios.find({})

const obtenerUsuario = async (id) => {
    console.log(id)
    return Usuarios.findOne({ _id: mongoose.Types.ObjectId(id) })
}
const borrarusuario = async (id) => {
    return Usuarios.remove({ _id: id }).then(res => `Estado actualizado`)
        .catch(err => "Falló el cambio de estado")
}

const setEstadoUsuario = async (id, estado) => {
    console.log(id);
    return Usuarios.updateOne({ _id: id }, { estado })
        .then(res => `Estado actualizado`)
        .catch(err => "Falló el cambio de estado")
}
const createUser = async (nombre, correo, clave, tipo, estado) => {

    let user = new Usuarios({
        nombre,
        correo,
        clave,
        tipo,
        estado,
    });
    user.save()
        .then(res => `Usuario insertado`)
        .catch(err => "Falló al insertar")
    return user;



}


module.exports = {
    obtenerUsuarios,
    setEstadoUsuario,
    obtenerUsuario,
    createUser,
    borrarusuario
}