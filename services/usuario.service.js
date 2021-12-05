const Usuarios = require('../model/usuario.model');
const Proyectos = require('../model/proyecto.model');

let aes256 = require('aes256');

const obtenerUsuarios = async () => await Usuarios.find({})

//HU_010
const obtenerEstudiantes = async () => await Usuarios.find({tipo:"Estudiante"})

//HU_005 y HU_011
const setEstadoUsuario = async (id, estado) => {
    console.log(id);
    return Usuarios.updateOne({id}, {estado})
        .then(res => `Estado actualizado`)
        .catch(err => "Falló el cambio de estado")
}

//HU_015A
const obtenerMisPostulaciones = async (id) => {
    const estudiante = await Usuarios.findOne({id})
        return await Proyectos.find({'estudiantesInscritos.estudiante': estudiante._id })
        .populate("lider")
        .populate("estudiantesInscritos.estudiante")
        .populate("estudiantesInscritos.proyecto", "nombreProyecto")
}

//HU_001
const key = 'CLAVEADMIN';
const crearUsuario = async (usuario) => {
    const { clave } = usuario;
            const nuevoUsuario = new Usuarios(usuario);
            const encryptedPlainText = aes256.encrypt(key, clave);
            nuevoUsuario.clave = encryptedPlainText
            return nuevoUsuario.save()
                .then(u => "Usuario creado")
                .catch(err => console.log(err));
}

//HU_004
const SetModificarUsuario = async (id, nombre, correo, clave) => {
    const usuario = await Usuarios.findOne({id});
    if ( usuario ) {
        if (usuario.estado === "Autorizado") {
            const claveEncriptada = aes256.encrypt(key, clave);
            return Usuarios.updateOne({id}, {$set:{nombre: nombre, correo: correo, clave: claveEncriptada}})
                .then(res => `Usuario actualizado`)
                .catch(err => `Falló la actualización: ${err}`)
        } else {
            return res => "Usuario no autorizado"
        }
    } else {
        return res => "Usuario no válido para actualiación"
    }
}

module.exports = {
    setEstadoUsuario,
    obtenerEstudiantes,
    obtenerMisPostulaciones,
    crearUsuario,
    obtenerUsuarios,
    SetModificarUsuario
}
