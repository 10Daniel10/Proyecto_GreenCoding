const Proyectos = require('../model/proyecto.model');

const obtenerProyectos = async () => {
    return await Proyectos.find({}).populate("lider")
        .populate("estudiantesInscritos.estudiante")
        .populate("estudiantesInscritos.proyecto", "nombreProyecto")
}

const obtenerProyecto = async (idProyecto) => {
    return await Proyectos.findOne({idProyecto}).populate("lider")
        .populate("estudiantesInscritos.estudiante")
}

module.exports = {
    obtenerProyectos,
    obtenerProyecto
}