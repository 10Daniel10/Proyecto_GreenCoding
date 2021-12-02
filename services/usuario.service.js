const Usuarios = require('../model/usuario.model');
const Proyectos = require('../model/proyecto.model');

const obtenerUsuarios = async () => await Usuarios.find({})

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

module.exports = {
    obtenerUsuarios,
    setEstadoUsuario,
    obtenerMisPostulaciones
}